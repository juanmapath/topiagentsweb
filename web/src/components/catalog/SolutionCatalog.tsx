"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"

// Tipos basados en la respuesta de la API de Django
interface Tag {
    id: number;
    name: string;
}

interface Niche {
    id: number;
    name: string;
    slug: string;
}

interface ProductMedia {
    id: number;
    file: string | null;
    url: string | null;
    is_video: boolean;
    order: number;
}

interface SystemProduct {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    original_price: string | null;
    is_active: boolean;
    niches: Niche[];
    media: ProductMedia[];
    triggers: Tag[];
    actions: Tag[];
    complexities: Tag[];
    objectives: Tag[];
}

export function SolutionCatalog() {
    const [products, setProducts] = useState<SystemProduct[]>([])
    const [categories, setCategories] = useState<string[]>(["Todos"])
    const [selectedCategory, setSelectedCategory] = useState("Todos")
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/catalog/products/")
                if (res.ok) {
                    const data: SystemProduct[] = await res.json()
                    setProducts(data)

                    // Extraer nichos únicos para el filtro transversal
                    const uniqueNiches = new Set<string>()
                    data.forEach(product => {
                        product.niches.forEach(niche => uniqueNiches.add(niche.name))
                    })
                    setCategories(["Todos", ...Array.from(uniqueNiches)])
                }
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const filteredTemplates = products.filter(template => {
        const hasSelectedNiche = template.niches.some(n => n.name === selectedCategory)
        const matchesCategory = selectedCategory === "Todos" || hasSelectedNiche
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <section id="catalogo" className="py-24 bg-background">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
                        Catálogo de Ingeniería
                    </h1>
                    <p className="text-muted text-balance max-w-2xl mx-auto text-lg">
                        Sistemas empaquetados, probados y listos para inyectarse en tu operación. Escoge tu nicho, copia e instala.
                    </p>
                </div>

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 p-4 bg-surface/50 border border-border rounded-xl">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                        {categories.map((label) => (
                            <Button
                                key={label}
                                onClick={() => setSelectedCategory(label)}
                                variant={selectedCategory === label ? "default" : "outline"}
                                size="sm"
                                className="whitespace-nowrap font-bold"
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <div className="w-full md:w-72 relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Buscar sistemas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Loader State */}
                {isLoading && (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
                    </div>
                )}

                {/* Grilla de Productos */}
                {!isLoading && (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map((template) => {
                                const hasPromo = !!template.original_price;
                                const firstMedia = template.media.length > 0 ? template.media[0] : null;

                                return (
                                    <Card key={template.id} className="flex flex-col relative overflow-hidden group bg-surface border-border hover:border-primary/50 transition-colors">

                                        {/* Etiqueta de Promoción Automática */}
                                        {hasPromo && (
                                            <div className="absolute top-4 right-0 z-10 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-l-sm uppercase tracking-wider shadow-lg shadow-orange-500/20">
                                                ¡Promoción Especial!
                                            </div>
                                        )}

                                        {/* Zona de Medios (Preview) */}
                                        <div className="relative h-48 w-full bg-zinc-200 overflow-hidden border-b border-border/50 group-hover:border-primary/30 transition-colors">
                                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
                                            {firstMedia?.is_video ? (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-muted group-hover:scale-105 transition-transform duration-500">
                                                    <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 group-hover:scale-105 transition-transform duration-500" style={firstMedia?.file ? { backgroundImage: `url(${firstMedia.file})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                                                    {!firstMedia?.file && <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-300 to-zinc-200 opacity-80" />}
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="pt-6 relative z-20">
                                            {/* Mostrar Nichos */}
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {template.niches.map(niche => (
                                                    <span key={niche.id} className="text-xs font-mono text-primary uppercase tracking-wider">{niche.name}</span>
                                                ))}
                                            </div>

                                            <CardTitle className="text-xl leading-snug">{template.title}</CardTitle>

                                            <CardDescription className="mt-2 text-sm text-foreground/80 leading-relaxed min-h-[60px]">
                                                {template.description}
                                            </CardDescription>

                                            {/* Tags Adicionales */}
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                                                {template.actions.slice(0, 3).map(action => (
                                                    <span key={action.id} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">{action.name}</span>
                                                ))}
                                                {template.complexities.slice(0, 1).map(comp => (
                                                    <span key={comp.id} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] rounded border border-zinc-700">{comp.name}</span>
                                                ))}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="flex-1" />

                                        <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-6">
                                            <div className="w-full flex items-end justify-between">
                                                <div className="flex flex-col">
                                                    {hasPromo && (
                                                        <span className="text-sm text-muted line-through decoration-red-500/50">${Math.floor(parseFloat(template.original_price!))}</span>
                                                    )}
                                                    <span className="text-3xl font-extrabold text-foreground">
                                                        ${Math.floor(parseFloat(template.price))}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-primary font-bold uppercase tracking-wider">Pago Único</span>
                                                </div>
                                            </div>

                                            <Link href={`/product/${template.slug}`} passHref className="w-full">
                                                <Button variant="default" className="w-full font-bold h-12 text-base">
                                                    Ver Detalles & Demo
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                        ) : (
                            <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl">
                                <p className="text-muted text-lg">No encontramos sistemas que coincidan con tu búsqueda.</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("Todos") }} className="mt-2 text-primary">
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
