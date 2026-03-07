import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const upgrades = [
    {
        id: "sheets",
        title: "Conector de Google Sheets",
        desc: "Vuelca automáticamente los datos de los leads de cualquier sistema hacia un Spreadsheet clasificado.",
        price: 199,
        popular: true
    },
    {
        id: "slack",
        title: "Alertas Letales en Slack",
        desc: "Recibe un ping inmediato cada vez que un cliente caliente entra y necesita cierre humano urgente.",
        price: 99,
        popular: false
    },
    {
        id: "crm",
        title: "Vínculo Hubspot / Salesforce",
        desc: "Sincroniza el Agente IA con la base final para que no exista doble captura de datos.",
        price: 299,
        popular: false
    }
]

export default function UpgradePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-orange-400">Upgrade Center</h1>
                <p className="text-muted mt-2">Multiplica el ROI de los sistemas que ya tienes instalados agregándoles módulos de potencia pura.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upgrades.map((mod) => (
                    <Card key={mod.id} className="bg-surface flex flex-col relative overflow-hidden group">
                        {mod.popular && (
                            <div className="absolute top-4 right-4 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                                Lo más pedido
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-xl pr-12">{mod.title}</CardTitle>
                            <CardDescription className="text-base mt-2 h-16">{mod.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1" />
                        <CardFooter className="flex items-center justify-between border-t border-border/50 pt-5">
                            <span className="text-2xl font-bold">${mod.price}</span>
                            <Button className="font-bold border-orange-500/50 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-black">
                                Sumar Módulo
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
