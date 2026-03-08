"use client"

import { useState, useEffect } from "react"
import { PieChartCard } from "./PieChartCard"
import { LeadHistoryModal } from "./LeadHistoryModal"
import { Button } from "@/components/ui/Button"

export function AnalyticsDashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('topimate_admin_jwt');
                if (!token) {
                    throw new Error("No estás autenticado como administrador.");
                }

                const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
                const res = await fetch(`${baseUrl}/api/analytics/dashboard/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        throw new Error("No tienes permisos para ver el dashboard.");
                    }
                    throw new Error("Error al obtener datos del servidor.");
                }

                const json = await res.json();
                setData(json);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Fallo inesperado de red.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const logout = () => {
        localStorage.removeItem('topimate_admin_jwt');
        window.location.href = "/";
    };

    if (isLoading) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <h2 className="text-xl font-bold text-foreground">Cargando métricas...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 max-w-md mx-auto text-center px-4">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Acceso Denegado</h2>
                <p className="text-muted text-balance">{error}</p>
                <Button onClick={() => window.location.href = '/'} variant="outline" className="mt-4 font-bold">
                    Volver al Inicio
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <LeadHistoryModal 
                isOpen={!!selectedLeadId} 
                onClose={() => setSelectedLeadId(null)} 
                leadId={selectedLeadId} 
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                        Panel de Control <span className="text-primary">Analytics</span>
                    </h1>
                    <p className="text-muted mt-2">Visión general de adquisición de leads y tráfico.</p>
                </div>
                <Button onClick={logout} variant="outline" className="mt-4 sm:mt-0 font-bold hidden sm:inline-flex border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    Cerrar Sesión Admin
                </Button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <PieChartCard title="Top Fuentes (Sources)" data={data?.top_sources || []} />
                <PieChartCard title="Top Medios (Mediums)" data={data?.top_mediums || []} />
            </div>

            {/* Leads Table */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                    <span>Leads Recientes</span>
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2.5 py-1 rounded-full">{data?.recent_leads?.length || 0}</span>
                </h2>
                
                <div className="bg-background border border-border rounded-xl overflow-x-auto shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-surface/50 text-muted uppercase text-[10px] font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Lead</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Fuente UTM</th>
                                <th className="px-6 py-4 font-semibold">Medio UTM</th>
                                <th className="px-6 py-4 font-semibold">Campaña</th>
                                <th className="px-6 py-4 font-semibold">Fecha (Local)</th>
                                <th className="px-6 py-4 text-center font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {data?.recent_leads?.length > 0 ? (
                                data.recent_leads.map((lead: any) => (
                                    <tr key={lead.id} className="hover:bg-surface/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-foreground">{lead.first_name} {lead.last_name || ''}</td>
                                        <td className="px-6 py-4 text-muted">{lead.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                                                {lead.utm_source || 'N/D'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                                                {lead.utm_medium || 'N/D'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted text-xs truncate max-w-[150px]" title={lead.utm_campaign}>
                                            {lead.utm_campaign || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-muted text-xs">
                                            {new Date(lead.created_at).toLocaleString('es-ES', { 
                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Button 
                                                onClick={() => setSelectedLeadId(lead.id)}
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 text-xs font-bold w-full bg-primary/10 border-primary/20 text-primary hover:bg-primary shadow-none hover:text-white transition-all opacity-80 group-hover:opacity-100"
                                            >
                                                Ver Viaje
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-muted">
                                        No se encontraron leads recientes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Button onClick={logout} variant="outline" className="mt-8 font-bold w-full sm:hidden border-red-500/50 text-red-500">
                Cerrar Sesión Admin
            </Button>
        </div>
    )
}
