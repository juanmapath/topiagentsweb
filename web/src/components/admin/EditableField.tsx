"use client"

import React, { useState } from "react"
import { useAdmin } from "./AdminProvider"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"

interface EditableFieldProps {
    value: string | number;
    fieldKey: string;
    endpoint: string;
    type?: "text" | "textarea" | "number";
    className?: string;
    children: React.ReactNode;
}

export function EditableField({ value, fieldKey, endpoint, type = "text", className = "", children }: EditableFieldProps) {
    const { isAdmin, token, logout } = useAdmin();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isSaving, setIsSaving] = useState(false);

    if (!isAdmin) {
        return <>{children}</>;
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `JWT ${token}` } : {})
                },
                body: JSON.stringify({ [fieldKey]: editValue })
            });

            if (res.ok) {
                // Forzamos que NextJS re-fetchea
                router.refresh();
                setIsEditing(false);
            } else if (res.status === 401 || res.status === 403) {
                console.error("No autorizado o token expirado.");
                logout(); // Fuerza el relogueo
            } else {
                console.error("Failed to update field", fieldKey);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className={`relative group inline-block ${className}`}>
                {children}

                {/* Botoncito de editar que aparece en hover */}
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 hover:scale-110 active:scale-95"
                    title="Editar campo"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            </div>

            {/* Modal de Edición Inline */}
            {isEditing && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
                    <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="bg-primary/20 text-primary p-1 rounded">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>
                            Editando: <span className="text-muted font-normal text-sm">{fieldKey}</span>
                        </h3>

                        <div className="space-y-4">
                            {type === "textarea" ? (
                                <textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full h-32 px-4 py-3 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none"
                                />
                            ) : (
                                <input
                                    type={type}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                />
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
