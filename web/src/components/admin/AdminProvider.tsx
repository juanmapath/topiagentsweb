"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
    isAdmin: boolean;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Persistencia simple
    useEffect(() => {
        const storedToken = localStorage.getItem("topimate_admin_jwt");
        if (storedToken) {
            setIsAdmin(true);
            setToken(storedToken);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/jwt/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const data = await res.json();
                setIsAdmin(true);
                setToken(data.access);
                localStorage.setItem("topimate_admin_jwt", data.access);
                return true;
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        setToken(null);
        localStorage.removeItem("topimate_admin_jwt");
    };

    return (
        <AdminContext.Provider value={{ isAdmin, token, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}
