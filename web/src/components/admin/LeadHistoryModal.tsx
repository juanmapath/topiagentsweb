"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Calendar, MousePointer2, ExternalLink } from "lucide-react"

interface LeadHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: number | null;
}

export function LeadHistoryModal({ isOpen, onClose, leadId }: LeadHistoryModalProps) {
    const [historyData, setHistoryData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen || !leadId) return;

        const fetchHistory = async () => {
            setIsLoading(true);
            setError("");
            
            try {
                const token = localStorage.getItem('topimate_admin_jwt');
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
                
                const res = await fetch(`${baseUrl}/api/analytics/dashboard/lead/${leadId}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("Error obteniendo el historial o falta de permisos.");
                }

                const data = await res.json();
                setHistoryData(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Fallo inesperado");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [isOpen, leadId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl p-6 relative animate-in zoom-in-95 duration-200 my-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Historial del Lead
                </h2>

                {isLoading ? (
                    <div className="text-center py-12 text-muted animate-pulse">
                        Cargando huella digital...
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500 font-medium">
                        {error}
                    </div>
                ) : historyData ? (
                    <div className="space-y-6">
                        
                        {/* Summary Header */}
                        <div className="bg-surface border border-border rounded-lg p-4">
                            <h3 className="font-semibold text-lg">{historyData.lead.first_name} {historyData.lead.last_name}</h3>
                            <p className="text-sm text-muted mb-2">{historyData.lead.email} | {historyData.lead.phone || 'Sin tel.'}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                <div><span className="text-muted block uppercase tracking-wider text-[10px]">Source</span> {historyData.lead.utm_source || '-'}</div>
                                <div><span className="text-muted block uppercase tracking-wider text-[10px]">Medium</span> {historyData.lead.utm_medium || '-'}</div>
                                <div><span className="text-muted block uppercase tracking-wider text-[10px]">Campaign</span> {historyData.lead.utm_campaign || '-'}</div>
                                <div><span className="text-muted block uppercase tracking-wider text-[10px]">Device</span> {historyData.visitor?.device_type || '-'}</div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Línea del Tiempo de Visita</h4>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                                {historyData.history.length > 0 ? historyData.history.map((entry: any, idx: number) => {
                                    const date = new Date(entry.timestamp);
                                    
                                    if (entry.type === 'pageview') {
                                        return (
                                            <div key={`pv-${idx}`} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                                        <ExternalLink size={16} />
                                                    </div>
                                                    {idx !== historyData.history.length - 1 && <div className="w-px h-full bg-border mt-2"></div>}
                                                </div>
                                                <div className="pb-4 flex-1">
                                                    <p className="text-xs text-muted mb-1">{date.toLocaleString('es-ES')}</p>
                                                    <div className="bg-surface/50 border border-border rounded-lg p-3">
                                                        <p className="text-sm font-medium text-foreground">Vio página: {entry.title || entry.path}</p>
                                                        <a href={entry.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline break-all mt-1 inline-block">{entry.url}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={`ev-${idx}`} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                                                        <MousePointer2 size={16} />
                                                    </div>
                                                    {idx !== historyData.history.length - 1 && <div className="w-px h-full bg-border mt-2"></div>}
                                                </div>
                                                <div className="pb-4 flex-1">
                                                    <p className="text-xs text-muted mb-1">{date.toLocaleString('es-ES')}</p>
                                                    <div className="bg-surface/50 border border-border rounded-lg p-3">
                                                        <p className="text-sm font-medium text-foreground">Evento: {entry.event_action}</p>
                                                        <p className="text-xs text-muted mt-1">Categoría: {entry.event_category} | Etiqueta: {entry.event_label || '-'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }) : (
                                    <p className="text-center text-sm text-muted py-4">No hay interacciones rastreadas para este visitante antes de ser Lead.</p>
                                )}
                            </div>
                        </div>

                    </div>
                ) : null}

                <div className="mt-6 pt-4 border-t border-border flex justify-end">
                    <Button onClick={onClose} variant="outline" className="font-bold">Cerrar</Button>
                </div>
            </div>
        </div>
    )
}
