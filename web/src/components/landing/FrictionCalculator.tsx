"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { BookingModal } from "@/components/landing/BookingModal"

export function FrictionCalculator() {
    const [employees, setEmployees] = useState<number>(3)
    const [hours, setHours] = useState<number>(20) // Horas manuales a la semana (promedio)
    const [salary, setSalary] = useState<number>(1000) // Salario promedio mensual USD
    const [whatsapp, setWhatsapp] = useState<string>("")
    const [diagnostico, setDiagnostico] = useState<string>("")
    const [showResult, setShowResult] = useState(false)
    const [isCalculating, setIsCalculating] = useState(false)

    // Booking Modal
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Cálculo: ((Salario / 160 hrs mes) * horas a la semana * 4.3 semanas) * Empleados
    const hourlyRate = salary / 160
    const hoursPerMonth = hours * 4.3
    const monthlyCost = Math.round(hourlyRate * hoursPerMonth * employees)

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (whatsapp.trim() !== "") {
            setIsCalculating(true);

            // Send to Telegram
            const tgMessage = `🚨 *Usuario calculando pérdidas* 🚨\n\n` +
                `👥 *Empleados:* ${employees}\n` +
                `⏱️ *Horas/sem:* ${hours}\n` +
                `💵 *Salario (USD):* $${salary}\n` +
                `💸 *Pérdida/mes:* $${monthlyCost.toLocaleString()}\n` +
                `📱 *WhatsApp:* ${whatsapp}`;

            try {
                await fetch('/api/notify/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: tgMessage })
                });
            } catch (error) {
                console.error("Failed to notify telegram:", error);
            }

            setIsCalculating(false);
            setShowResult(true)
        }
    }

    return (
        <section id="calculadora" className="py-24 bg-background">
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                sourcePlan="option2"
                planName="Arquitectura A Medida (Desde Calculadora)"
                hideTasksField={true}
                initialTasks={diagnostico || "El usuario solicitó arquitectura a medida, sin dar detalles de diagnóstico."}
                hideWhatsappField={true}
                initialWhatsapp={whatsapp}
            />

            <div className="container mx-auto max-w-4xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-balance">
                        ¿No estás seguro de si necesitas esto?
                    </h2>
                    <p className="mt-4 text-muted text-balance max-w-2xl mx-auto text-lg">
                        Descubre exactamente cuánto dinero estás quemando cada mes en tareas repetitivas. Usa nuestra "Calculadora de Fuga de Capital".
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tus Variables</CardTitle>
                            <CardDescription>Cálculo estimado de la ineficiencia de tu equipo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCalculate} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="employees" className="text-sm font-medium">
                                        Número de empleados
                                    </label>
                                    <input
                                        id="employees"
                                        type="range"
                                        min="1"
                                        max="50"
                                        step="1"
                                        value={employees}
                                        onChange={(e) => setEmployees(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                    <div className="text-right text-sm font-mono text-primary">{employees} personas</div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="hours" className="text-sm font-medium">
                                        Horas dedicadas a tareas manuales / semana
                                    </label>
                                    <input
                                        id="hours"
                                        type="range"
                                        min="1"
                                        max="40"
                                        step="1"
                                        value={hours}
                                        onChange={(e) => setHours(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                    <div className="text-right text-sm font-mono text-primary">{hours} hr(s) / sem</div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="salary" className="text-sm font-medium">
                                        Salario promedio mensual (USD)
                                    </label>
                                    <input
                                        id="salary"
                                        type="range"
                                        min="300"
                                        max="5000"
                                        step="100"
                                        value={salary}
                                        onChange={(e) => setSalary(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                    <div className="text-right text-sm font-mono text-primary">${salary}/mes</div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-border/50">
                                    <label htmlFor="whatsapp" className="text-sm font-medium">
                                        Número de WhatsApp <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="whatsapp"
                                        type="tel"
                                        required
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        placeholder="+57 300 000 0000"
                                        className="w-full rounded-md border border-border bg-surface/50 px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                    />
                                </div>

                                <Button type="submit" className="w-full font-bold h-12" disabled={isCalculating}>
                                    {isCalculating ? "Calculando..." : "Calcular mi pérdida mensual"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className={`transition-all duration-500 bg-surface border-red-500/20 ${showResult ? "opacity-100 translate-x-0" : "opacity-50 blur-sm pointer-events-none"}`}>
                        <CardHeader>
                            <CardTitle className="text-red-500 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                Diagnóstico Letal
                            </CardTitle>
                            <CardDescription>Estás quemando capital que podría ir directo a tus utilidades.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <p className="text-sm text-foreground/80 font-medium mb-1">Pérdida Mensual Estimada</p>
                                <p className="text-5xl font-extrabold text-red-500">${monthlyCost.toLocaleString()}</p>
                            </div>
                            <div className="h-px bg-border w-full" />
                            <div className="space-y-4 pt-4">
                                <p className="text-sm font-medium leading-relaxed">
                                    Cuéntanos qué te gustaría automatizar en tu negocio y te compartiremos el sistema hecho a tu medida:
                                </p>
                                <textarea
                                    className="w-full h-32 rounded-md border border-border bg-surface/80 px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none shadow-sm"
                                    placeholder="Ej: Quiero que un bot conteste mensajes de Instagram e ingrese los datos a mi Google Sheets..."
                                    value={diagnostico}
                                    onChange={(e) => setDiagnostico(e.target.value)}
                                />
                                <Button
                                    variant="default"
                                    className="w-full font-bold h-12"
                                    onClick={() => setIsBookingOpen(true)}
                                >
                                    Solicitar Arquitectura a Medida
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
