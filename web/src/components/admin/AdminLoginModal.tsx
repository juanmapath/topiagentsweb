"use client"

import { useState } from "react"
import { useAdmin } from "./AdminProvider"
import { Button } from "@/components/ui/Button"

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
    const { isAdmin, login, logout } = useAdmin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const success = await login(username, password);
        if (success) {
            onClose();
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
            <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-sm p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-bold mb-1 text-foreground">Modo Edición</h2>
                {!isAdmin && <p className="text-sm text-muted mb-6">Ingresa la contraseña de administrador.</p>}

                {isAdmin ? (
                    <div className="text-center py-4">
                        <p className="text-sm text-muted mb-6">Actualmente estás autenticado y puedes editar los textos de la plataforma.</p>
                        <Button
                            variant="outline"
                            className="w-full text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-600"
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                        >
                            Cerrar Sesión (Salir de Modo Edición)
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario..."
                                className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm mb-3"
                                required
                                autoFocus
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña..."
                                className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                required
                            />
                            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                            {isLoading ? "Verificando..." : "Acceder"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
