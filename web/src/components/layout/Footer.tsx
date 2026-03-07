export function Footer() {
    return (
        <footer className="border-t border-border py-6 md:py-0">
            <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted">
                        © {new Date().getFullYear()} Trabajadores Incansables by <span className="font-medium text-foreground">TopIAgents</span>. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
