"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import Link from "next/link"
import { EditableField } from "@/components/admin/EditableField"
import { AdminLoginModal } from "@/components/admin/AdminLoginModal"
import { BookingModal } from "@/components/landing/BookingModal"

export function ValueLadderOffer() {
    const [data, setData] = useState<any>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // Estados para el Booking Modal
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [sourcePlan, setSourcePlan] = useState<"option1" | "option2" | null>(null);
    const [planName, setPlanName] = useState<string>("");

    const handleOpenBooking = (plan: "option1" | "option2", name: string) => {
        setSourcePlan(plan);
        setPlanName(name);
        setIsBookingOpen(true);
    };

    useEffect(() => {
        let isMounted = true;
        fetch("http://127.0.0.1:8000/api/ui/landing/value-ladder/")
            .then(res => res.ok ? res.json() : null)
            .then(resData => {
                if (isMounted) setData(resData);
            })
            .catch(err => console.error(err));
        return () => { isMounted = false; };
    }, []);

    const endpoint = "http://127.0.0.1:8000/api/ui/landing/value-ladder/";

    const title = data?.title || "Dos formas de recuperar tu tiempo. Tú eliges.";
    const subtitle = data?.subtitle || "Hacerlo con nosotros es la única opción lógica para no quedarte atrás.";

    // Opt 1
    const opt1Title = data?.opt1_title || "El Camino Hágalo Usted Mismo";
    const opt1Desc = data?.opt1_description || "Llévate la plantilla exacta de la automatización pre-fabricada.";
    const opt1Price = data?.opt1_price ? Math.floor(data.opt1_price) : "99";
    const opt1Text = data?.opt1_text || "Ideal si tienes a un ingeniero de IT y tienes tiempo de sobra para pelear con configuración de servidores, APIs y lectura de documentación técnica.";
    const opt1BtnText = data?.opt1_btn_text || "Ver Templates de $99";

    // Opt 2
    const opt2Title = data?.opt2_title || "El Camino de la Magia Absoluta";
    const opt2Desc = data?.opt2_description || "No toques absolutamente nada. Nosotros hacemos el trabajo sucio.";
    const opt2Price = data?.opt2_price ? Math.floor(data.opt2_price) : "497";
    const opt2Text1 = data?.opt2_text_1 || "Nosotros conectamos el sistema a tu WhatsApp, correo y CRM.";
    const opt2Text2 = data?.opt2_text_2 || "Te entregamos las llaves del vehículo con el motor en marcha en 48 horas.";
    const opt2Guarantee = data?.opt2_guarantee || "Si el sistema no te ahorra al menos 20 horas de trabajo comprobable en 30 días, te devolvemos el dinero de la instalación.";
    const opt2BtnText = data?.opt2_btn_text || "Quiero Magia Absoluta (Ver Sistemas)";

    return (
        <section id="oferta" className="py-24 bg-surface/30 border-y border-border">
            <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} sourcePlan={sourcePlan} planName={planName} />

            <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-balance">
                        <EditableField value={title} fieldKey="title" endpoint={endpoint} type="text">
                            {title}
                        </EditableField>
                    </h2>
                    <p className="mt-4 text-muted text-balance max-w-2xl mx-auto text-lg">
                        <EditableField value={subtitle} fieldKey="subtitle" endpoint={endpoint} type="textarea">
                            {subtitle}
                        </EditableField>
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">

                    {/* Opción 1: DIY */}
                    <Card className="bg-background border-border flex flex-col">
                        <CardHeader className="text-center pb-4 relative">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <p className="text-muted font-bold tracking-widest uppercase text-xs">Opción 1</p>
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="w-1.5 h-1.5 rounded-full bg-border hover:bg-primary transition-colors cursor-pointer"
                                    title="Modo Admin"
                                />
                            </div>
                            <CardTitle className="text-2xl">
                                <EditableField value={opt1Title} fieldKey="opt1_title" endpoint={endpoint} type="text">
                                    {opt1Title}
                                </EditableField>
                            </CardTitle>
                            <CardDescription className="text-base mt-2 min-h-[60px]">
                                <EditableField value={opt1Desc} fieldKey="opt1_description" endpoint={endpoint} type="textarea">
                                    {opt1Desc}
                                </EditableField>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="text-center">
                                <EditableField value={opt1Price} fieldKey="opt1_price" endpoint={endpoint} type="number">
                                    <span className="text-5xl font-extrabold">${opt1Price}</span>
                                </EditableField>
                                <span className="text-muted ml-2">/ único</span>
                            </div>
                            <div className="p-4 bg-muted/10 rounded-lg border border-border">
                                <p className="text-sm text-foreground/80 leading-relaxed text-balance">
                                    <EditableField value={opt1Text} fieldKey="opt1_text" endpoint={endpoint} type="textarea">
                                        {opt1Text}
                                    </EditableField>
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-6">
                            <Button
                                variant="outline"
                                className="w-full font-bold h-12 cursor-pointer"
                                onClick={() => handleOpenBooking("option1", `${opt1Title} ($${opt1Price})`)}
                            >
                                <EditableField value={opt1BtnText} fieldKey="opt1_btn_text" endpoint={endpoint} type="text">
                                    {opt1BtnText}
                                </EditableField>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Opción 2: DFY (La Oferta Real) */}
                    <Card className="bg-surface border-primary ring-1 ring-primary flex flex-col relative overflow-hidden shadow-2xl shadow-primary/10 transform md:-translate-y-4">
                        <div className="absolute top-0 inset-x-0 h-1px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                            La Oferta Real
                        </div>

                        <CardHeader className="text-center pb-4 pt-8">
                            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Opción 2</p>
                            <CardTitle className="text-2xl text-foreground">
                                <EditableField value={opt2Title} fieldKey="opt2_title" endpoint={endpoint} type="text">
                                    {opt2Title}
                                </EditableField>
                            </CardTitle>
                            <CardDescription className="text-base mt-2 text-foreground/90 min-h-[60px]">
                                <EditableField value={opt2Desc} fieldKey="opt2_description" endpoint={endpoint} type="textarea">
                                    {opt2Desc}
                                </EditableField>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="text-center">
                                <span className="text-sm text-muted block mb-1">Pago único de instalación</span>
                                <EditableField value={opt2Price} fieldKey="opt2_price" endpoint={endpoint} type="number">
                                    <span className="text-5xl font-extrabold text-primary">${opt2Price}</span>
                                </EditableField>
                                <span className="text-sm text-muted block mt-1">+ Mantenimiento mensual</span>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">✓</span>
                                    <p className="text-sm leading-relaxed">
                                        <EditableField value={opt2Text1} fieldKey="opt2_text_1" endpoint={endpoint} type="textarea">
                                            {opt2Text1}
                                        </EditableField>
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">✓</span>
                                    <p className="text-sm leading-relaxed font-bold">
                                        <EditableField value={opt2Text2} fieldKey="opt2_text_2" endpoint={endpoint} type="textarea">
                                            {opt2Text2}
                                        </EditableField>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Garantía de Riesgo Cero</p>
                                <p className="text-sm text-foreground/90 leading-tight">
                                    <EditableField value={opt2Guarantee} fieldKey="opt2_guarantee" endpoint={endpoint} type="textarea">
                                        {opt2Guarantee}
                                    </EditableField>
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-6">
                            <Button
                                className="w-full font-bold h-14 text-lg cursor-pointer"
                                onClick={() => handleOpenBooking("option2", `${opt2Title} ($${opt2Price})`)}
                            >
                                <EditableField value={opt2BtnText} fieldKey="opt2_btn_text" endpoint={endpoint} type="text">
                                    {opt2BtnText}
                                </EditableField>
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </section>
    )
}
