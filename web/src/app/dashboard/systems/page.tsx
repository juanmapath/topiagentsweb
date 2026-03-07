import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function SystemsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Mis Sistemas</h1>
                <p className="text-muted mt-2">Gestiona las plantillas que has adquirido y sigue el estado de tus instalaciones.</p>
            </div>

            <div className="grid gap-6">
                <Card className="bg-surface/50 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl text-primary">Agente Inmobiliario IA (WhatsApp)</CardTitle>
                                <CardDescription className="mt-1">Comprado: 12 Oct 2026</CardDescription>
                            </div>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                                Activo & Operando
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-surface/50 rounded-lg border border-border">
                            <h4 className="font-bold mb-4 text-foreground">Recursos del Sistema</h4>
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="font-medium">
                                    Descargar JSON (Template)
                                </Button>
                                <Button variant="outline" size="sm" className="font-medium">
                                    Ver Video Tutorial (20 min)
                                </Button>
                                <Button variant="default" size="sm" className="font-bold">
                                    Modificar Prompts Vía Forms
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-surface/50 border-orange-500/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl text-yellow-500">Generador de Contratos Automático</CardTitle>
                                <CardDescription className="mt-1">Comprado: 24 Oct 2026 (Plan OTO: Instalación Llave en Mano)</CardDescription>
                            </div>
                            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
                                Instalando...
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-foreground">Estado Actual de tu OTO (One Time Offer):</p>

                            <div className="relative pt-2">
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-background border border-border">
                                    <div style={{ width: "66%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-foreground justify-center bg-orange-500"></div>
                                </div>
                                <div className="flex justify-between text-xs text-muted font-medium">
                                    <span className="text-foreground">Paso 1: Pago</span>
                                    <span className="text-orange-400">Paso 2: Conexión Google Auth</span>
                                    <span>Paso 3: Pruebas & Entrega</span>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-border/50">
                                <p className="text-sm text-muted">Ticket Técnico Asignado: #8492</p>
                                <Button variant="outline" size="sm">Ver Ticket</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
