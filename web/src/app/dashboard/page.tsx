import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default function DashboardIndex() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Impacto Operativo</h1>
                <p className="text-muted mt-2">Bienvenido de nuevo. Así están operando tus Trabajadores Incansables este mes.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Metric 1 */}
                <Card className="border-t-4 border-t-primary bg-surface/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted uppercase tracking-wider">Horas Ahorradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-foreground">142<span className="text-xl text-primary ml-1">hrs</span></div>
                        <p className="text-xs text-primary/80 mt-2 font-medium">+12% vs. mes anterior</p>
                    </CardContent>
                </Card>

                {/* Metric 2 */}
                <Card className="bg-surface/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted uppercase tracking-wider">Dólares Generados / Recuperados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-foreground">$4,250</div>
                        <p className="text-xs text-muted mt-2 font-medium">Basado en tu tarifa hora y leads rescatados.</p>
                    </CardContent>
                </Card>

                {/* Metric 3 */}
                <Card className="bg-surface/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted uppercase tracking-wider">Tareas Autónomas Ejecutadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-foreground">8,491</div>
                        <p className="text-xs text-muted mt-2 font-medium">Contratos, agendas y mensajes.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
                <Card className="col-span-4 bg-surface/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 border-b border-border/50 pb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Sistemas Activos (Status)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="flex justify-between items-center p-4 bg-surface rounded-lg border border-border hover:border-primary/50 transition-colors shadow-sm">
                            <div>
                                <p className="font-bold text-foreground">Agente Inmobiliario IA (WhatsApp)</p>
                                <p className="text-sm text-primary">Operando 100% Sin Errores</p>
                            </div>
                            <p className="text-xs text-muted">Último lead: hace 12 min</p>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-surface rounded-lg border border-border hover:border-yellow-500/50 transition-colors shadow-sm">
                            <div>
                                <p className="font-bold text-foreground">Generador de Contratos (Legal)</p>
                                <p className="text-sm text-yellow-500">En Fase de Instalación OTO</p>
                            </div>
                            <p className="text-xs text-muted">Paso 2/3 (Conectando Google Auth)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-surface/30 border-orange-500/20">
                    <CardHeader>
                        <CardTitle className="border-b border-border/50 pb-4">Vitrina de Oportunidad</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4 text-center">
                        <div className="mx-auto w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400 mb-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <p className="font-bold text-lg text-balance">Potencia tu Agente de WhatsApp</p>
                        <p className="text-sm text-muted text-balance max-w-[200px] mx-auto">
                            Sincroniza todas tus consultas automáticamente a un Google Sheet clasificado.
                        </p>
                        <div className="pt-2">
                            <button className="text-sm font-bold text-black bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-md transition-colors w-full">
                                Ver Módulo ($199)
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
