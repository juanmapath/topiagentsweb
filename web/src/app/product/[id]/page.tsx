import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock database de los sistemas / templates
const db = {
    "inmo-whatsapp": {
        niche: "Inmobiliaria",
        title: "Agente Inmobiliario IA (WhatsApp)",
        demoUrl: "#", // Placeholder
        pain: "Pierdes el 70% de tus ventas porque tardas más de 10 minutos en contestarle a un prospecto. Para cuando le hablas, ya le compró a la competencia.",
        feature: "Respuesta en 4 segundos, perfilado del cliente, agenda la visita y lo guarda en tu CRM sin que toques el teléfono.",
        price: 99
    },
    "legal-docs": {
        niche: "Legal",
        title: "Generador de Contratos Automático",
        demoUrl: "#",
        pain: "Tus abogados juniors pasan 4 horas copiando y pegando cláusulas de Word a Word, cometiendo errores tipográficos que pueden costar millones.",
        feature: "Extrae los datos clave del correo del cliente y escupe un GDoc listo para revisión en 15 segundos.",
        price: 99
    },
    "clinica-reservas": {
        niche: "Clínicas",
        title: "Gestor Inflexible de Citas",
        demoUrl: "#",
        pain: "Los 'no-shows' te cuestan $3,000 al mes. Tu secretaria pierde horas persiguiendo a gente que no contesta para confirmar asistencia.",
        feature: "Agendamiento 24/7, recordatorios por WhatsApp y penalización automática si no cancelan con 24 hrs de aviso.",
        price: 99
    }
}

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params
    const product = db[id as keyof typeof db]

    if (!product) {
        notFound()
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
            <Link href="/#catalogo" className="text-sm text-primary hover:underline mb-8 inline-flex items-center gap-2">
                ← Volver al catálogo
            </Link>

            <div className="grid gap-12 md:grid-cols-2 lg:gap-16 mt-8">
                <div>
                    <div className="text-xs font-mono text-primary mb-2 uppercase tracking-wider">{product.niche}</div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-balance">{product.title}</h1>

                    <div className="space-y-6 text-lg text-muted">
                        <div className="p-6 rounded-xl bg-red-950/20 border border-red-900/50">
                            <h3 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                                El Problema Letal
                            </h3>
                            <p className="text-foreground/90 text-base">{product.pain}</p>
                        </div>

                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                                La Solución
                            </h3>
                            <p className="text-foreground/90 text-base">{product.feature}</p>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-border pt-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted">Precio del Template</p>
                            <p className="text-4xl font-extrabold">${product.price}</p>
                        </div>
                        <Link href={`/checkout?t=${id}`} passHref>
                            <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-primary/30">
                                Obtener Sistema
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 opacity-20 group-hover:opacity-40 blur-xl transition duration-1000"></div>
                        <div className="aspect-[9/16] md:aspect-[4/3] w-full bg-zinc-200 rounded-2xl border border-border shadow-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
                            <div className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg shadow-primary/40 transition-transform group-hover:scale-110 cursor-pointer">
                                <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className="absolute bottom-6 text-foreground/80 font-medium tracking-wide">Video Explicativo de la Herramienta</p>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted italic">Resultados 100% reales. Nada de teoría.</p>
                </div>
            </div>
        </div>
    )
}
