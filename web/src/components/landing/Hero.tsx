"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { EditableField } from "@/components/admin/EditableField"

export function Hero() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;
        fetch("http://127.0.0.1:8000/api/ui/landing/hero/")
            .then(res => res.ok ? res.json() : null)
            .then(resData => {
                if (isMounted) setData(resData);
            })
            .catch(err => console.error(err));
        return () => { isMounted = false; };
    }, []);

    const endpoint = "http://127.0.0.1:8000/api/ui/landing/hero/";

    const headline = data?.headline || "Deja de Quemar Dinero en Tareas que un Agente Inteligente Puede Hacer (GRATIS) Mientras Duermes.";
    const subheadline = data?.subheadline || "TopIAgents construye sistemas invisibles que responden a tus leads en segundos, leen tus documentos y llenan tu agenda 24/7. Sin contratar más personal. Sin tocar una sola línea de código.";
    const primaryBtnText = data?.primary_btn_text || "Ver el Catálogo de Sistemas"; // Retained original primaryBtnText as the provided line was syntactically incorrect and ambiguous.
    const primaryBtnLink = data?.primary_btn_link || "/catalogo";
    const secondaryBtnText = data?.secondary_btn_text || "Calcular mi pérdida mensual";
    const secondaryBtnLink = data?.secondary_btn_link || "/#calculadora";

    return (
        <section className="relative overflow-hidden pt-22 pb-16 md:pt-20 md:pb-24">
            <div className="container mx-auto max-w-6xl px-4 text-center">
                {/* Glow effect background */}
                <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[100px]" />

                <h1 className="mx-auto max-w-5xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <EditableField value={headline} fieldKey="headline" endpoint={endpoint} type="textarea">
                        {headline}
                    </EditableField>
                </h1>
                <p className="mx-auto mt-8 max-w-3xl text-balance text-lg text-muted md:text-xl">
                    <EditableField value={subheadline} fieldKey="subheadline" endpoint={endpoint} type="textarea">
                        {subheadline}
                    </EditableField>
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href={primaryBtnLink} passHref>
                        <Button size="lg" className="cursor-pointer w-full md:w-auto px-8 text-lg font-bold shadow-primary/30 h-14">
                            <EditableField value={primaryBtnText} fieldKey="primary_btn_text" endpoint={endpoint} type="text">
                                {primaryBtnText}
                            </EditableField>
                        </Button>
                    </Link>
                    <Link href={secondaryBtnLink} passHref>
                        <Button variant="outline" size="lg" className="cursor-pointer w-full md:w-auto px-8 font-bold h-14">
                            <EditableField value={secondaryBtnText} fieldKey="secondary_btn_text" endpoint={endpoint} type="text">
                                {secondaryBtnText}
                            </EditableField>
                        </Button>
                    </Link>
                </div>

                <div className="mt-10 text-sm text-foreground/80 font-medium">
                    <p>⚡ Únete a empresas que ya han recuperado <strong className="text-primary">+10,000 horas</strong> de trabajo inútil.</p>
                </div>
            </div>
        </section>
    )
}
