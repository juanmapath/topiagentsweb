import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function SupportPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Soporte Estratégico & Técnico</h1>
                <p className="text-muted mt-2">¿Algo falló o necesitas un desarrollo a medida? Estamos aquí.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-surface/50 border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">Abrir un Ticket de Falla</CardTitle>
                        <CardDescription>Para sistemas "Llave en mano" (OTO) cubiertos por la garantía de 30 días.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <input className="w-full bg-surface border border-border rounded-md px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Título del problema..." />
                        <textarea className="w-full bg-surface border border-border rounded-md px-4 py-3 text-sm h-32 resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Describe qué dejó de funcionar detalladamente. Nuestro equipo lo revisará en < 24 hrs." />
                        <Button className="w-full font-bold">Enviar Reporte (Prioridad Alta)</Button>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-primary font-bold text-sm tracking-widest uppercase">Consultoría VIP</span>
                        </div>
                        <CardTitle className="text-xl">¿Tienes una locura en mente que requiere código a medida?</CardTitle>
                        <CardDescription className="text-foreground/80 text-base mt-2">
                            Si tus flujos requieren integraciones nativas complejas, puedes contratar a un Arquitecto de TopIAgents por hora para que desarrolle en tu sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-surface rounded-lg border border-border shadow-sm flex justify-between items-center hover:border-primary/50 transition-colors">
                            <div>
                                <p className="font-bold text-foreground">Hora de Consultoría / Arquitectura</p>
                                <p className="text-xs text-muted">Llamada Zoom + Ejecución asíncrona</p>
                            </div>
                            <p className="text-xl font-bold">$150</p>
                        </div>
                        <Button className="w-full font-bold h-12">
                            Agendar Hora de Consultoría
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
