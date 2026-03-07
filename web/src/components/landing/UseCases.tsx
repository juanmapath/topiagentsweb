import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

const useCases = [
    {
        id: "ecom-whatsapp",
        niche: "E-Commerce",
        problem_scenario: "Un cliente te escribe emocionado por WhatsApp preguntando por un producto de tus anuncios. Como tu equipo está ocupado, tardan 45 minutos en responder. Para entonces, la emoción desapareció y ya le compró a tu competencia más ágil.",
        magic: "Nuestro Agente de Ventas responde en 3 segundos, consulta inventario, envía un link de pago y cierra la venta sin importar si es domingo a las 3 AM."
    },
    {
        id: "inmo-whatsapp",
        niche: "Real Estate",
        problem_scenario: "Un prospecto busca un apartamento en un sector cotizado. Si le respondes en 5 minutos, la comisión es tuya. Si tardas 2 horas porque estabas en una reunión, ya firmó con la competencia.",
        magic: "Nuestro sistema de Respuesta Instantánea le escribe por WhatsApp, califica su presupuesto y agenda la visita en tu calendario en 10 segundos."
    },
    {
        id: "clinica-reservas",
        niche: "Clínicas Médicas",
        problem_scenario: "Sillas vacías porque los pacientes agendan pero no asisten. Tu equipo pierde 3 horas al día llamando a números que envían a buzón de voz para confirmar citas, un proceso lento que te quema dinero.",
        magic: "Confirmaciones 100% automatizadas por WhatsApp y un sistema implacable que reactiva a pacientes antiguos para llenar tu agenda sin mover un dedo."
    }
]

export function UseCases() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-balance">
                        Visualiza los casos de uso
                    </h2>
                    <p className="mt-4 text-muted text-balance max-w-2xl mx-auto text-lg">
                        Deja de imaginar cómo sería automatizar tu negocio. Así es cómo se ve en la vida real.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {useCases.map((uc, idx) => (
                        <Card key={idx} className="bg-surface/50 border-border relative flex flex-col overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase bg-primary/10 px-2 py-1 rounded inline-block mb-4">
                                        {uc.niche}
                                    </span>
                                </div>

                                <div className="p-4 rounded-lg bg-surface border border-border shadow-sm flex-1">
                                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                                        <strong className="text-red-500 block mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                            El Escenario Normal (Realidad):
                                        </strong>
                                        {uc.problem_scenario}
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                    <p className="text-sm text-foreground/90 leading-relaxed">
                                        <strong className="text-primary block mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                            La Magia de TopIAgents:
                                        </strong>
                                        {uc.magic}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                                <Link href={`/product/${uc.id}`} passHref className="w-full">
                                    <Button variant="outline" className="w-full font-bold">
                                        Detalles del producto
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
