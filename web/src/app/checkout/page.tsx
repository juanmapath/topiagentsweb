"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"

export default function CheckoutPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1)

    return (
        <div className="container mx-auto max-w-3xl px-4 py-16">
            {/* Paso 1: Pago Simple del Template */}
            {step === 1 && (
                <Card className="border-border">
                    <CardHeader className="text-center border-b border-border/50 pb-8">
                        <CardTitle className="text-2xl">Confirmar Compra del Sistema</CardTitle>
                        <CardDescription className="text-base">Estás a un paso de automatizar tu problema.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6">
                        <div className="flex justify-between items-center bg-surface/50 p-4 rounded-lg border border-border shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center text-primary font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">Sistema Seleccionado</h3>
                                    <p className="text-sm text-muted">Pago único. Licencia de uso.</p>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                                $99
                            </div>
                        </div>
                        {/* Formulario Mock */}
                        <div className="space-y-4">
                            <input className="w-full bg-surface border border-border rounded-md px-4 py-3" placeholder="Nombre completo" />
                            <input className="w-full bg-surface border border-border rounded-md px-4 py-3" placeholder="Email" type="email" />
                            <input className="w-full bg-surface border border-border rounded-md px-4 py-3" placeholder="Tarjeta (Mock)" disabled defaultValue="**** **** **** 4242" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full font-bold h-12" onClick={() => setStep(2)}>
                            Pagar $99
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Paso 2: OTO (One Time Offer) */}
            {step === 2 && (
                <Card className="border-primary/50 relative overflow-hidden ring-1 ring-primary">
                    <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                    <CardHeader className="text-center pb-6">
                        <p className="text-primary font-bold mb-2 uppercase tracking-wide text-sm">Pago Confirmado. Pero espera...</p>
                        <CardTitle className="text-3xl text-balance">¿No quieres lidiar con tutoriales?</CardTitle>
                        <p className="text-sm mt-2 text-foreground/80 leading-relaxed">
                            Nuestro equipo de Trabajadores Incansables puede conectarse, instalar y configurar este sistema en tu cuenta hoy mismo por un pago único de <strong>$497</strong>.
                            Ahorras horas de frustración técnica y lo tienes funcionando esta misma semana.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="lg:col-span-1">
                            <div className="bg-surface/50 p-6 rounded-xl border border-primary/30 shadow-xl shadow-primary/5 relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-foreground">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-sm uppercase tracking-wider">Oferta Única</span>
                                    ¿Lo instalamos por ti?
                                </h3>

                                <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
                                    Evita tocar código, servidores o APIs. Nuestro equipo de ingenieros toma tu cuenta, instala el sistema, conecta tu WhatsApp/CRM y te lo deja <strong>llave en mano</strong> en 48 horas.
                                </p>

                                <div className="flex items-center gap-3 mb-6 p-3 bg-background rounded border border-border">
                                    <input type="checkbox" className="w-5 h-5 accent-primary" id="upsell" />
                                    <label htmlFor="upsell" className="text-sm font-medium cursor-pointer flex-1">
                                        Sí, añadan la instalación <strong className="text-primary italic">Done-For-You</strong> a mi cuenta.
                                    </label>
                                </div>

                                <div className="flex justify-between items-end border-t border-border pt-4">
                                    <span className="text-sm text-muted">Añadir por solo:</span>
                                    <span className="text-3xl font-extrabold text-foreground">+$497</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full font-bold h-14 text-lg" onClick={() => setStep(3)}>
                            Sí, háganlo por mí (Agregar $497)
                        </Button>
                        <button className="text-sm text-muted hover:text-foreground underline transition-colors" onClick={() => setStep(3)}>
                            No gracias, yo lo instalaré por mi cuenta con el tutorial.
                        </button>
                    </CardFooter>
                </Card>
            )}

            {/* Paso 3: Confirmación / Creación de Cuenta */}
            {step === 3 && (
                <Card className="text-center py-12">
                    <CardContent className="space-y-6">
                        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <CardTitle className="text-3xl">¡Todo Listo!</CardTitle>
                        <p className="text-muted text-lg max-w-md mx-auto">
                            Hemos procesado tu pago y creado tu cuenta privada. Tus sistemas están listos para descargarse o gestionarse.
                        </p>
                        <div className="pt-6">
                            <Link href="/dashboard" passHref>
                                <Button className="font-bold h-12 px-8">Ir a Mi Área Privada</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
