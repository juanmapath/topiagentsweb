export function VSLDemo() {
    return (
        <section className="py-16 md:py-24 bg-surface/50 border-y border-border">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl text-balance">
                        Los Trabajadores Incansables en Acción
                    </h2>
                    <p className="mt-4 text-muted text-balance max-w-2xl mx-auto">
                        Sin instalaciones. Sin aprender software nuevo. Funciona sobre tu WhatsApp y tu correo actual. Mira cómo se ve la magia por dentro.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
                    <div className="aspect-video bg-zinc-200 flex items-center justify-center relative group cursor-pointer">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
                        {/* Play Button Overlay */}
                        <div className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-black shadow-lg shadow-primary/40 transition-transform group-hover:scale-110">
                            <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        {/* Mockup Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                            <p className="mt-4 text-foreground/80 font-medium tracking-wide">Dale Play para Ver la Instalación</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
