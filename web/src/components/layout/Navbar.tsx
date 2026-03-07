import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tighter">TopIAgents</span>
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    {/* <Link href="/catalogo" passHref>
                        <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
                            Ver Catálogo
                        </Button>
                    </Link> */}
                </nav>
            </div>
        </header>
    )
}
