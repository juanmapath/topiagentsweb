import Link from "next/link"
import { MessageCircle, Settings, LayoutDashboard, Database, Zap } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar Privado */}
            <aside className="w-64 border-r border-border/50 bg-surface/30 p-6 flex flex-col hidden md:flex">
                <Link href="/dashboard" className="flex items-center space-x-2 mb-10">
                    {/* Replace with brand logo if exists */}
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-black">T</div>
                    <span className="font-bold text-xl tracking-tighter">Workspace</span>
                </Link>
                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors">
                        <LayoutDashboard size={18} className="text-primary" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/systems" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors">
                        <Database size={18} className="text-muted" />
                        Mis Sistemas
                    </Link>
                    <Link href="/dashboard/upgrade" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors">
                        <Zap size={18} className="text-orange-400" />
                        Upgrade Center
                    </Link>
                </nav>
                <div className="mt-8 border-t border-border/50 pt-4 space-y-2">
                    <Link href="/dashboard/support" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors text-muted">
                        <MessageCircle size={18} />
                        Soporte Legal/Técnico
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors text-muted">
                        <Settings size={18} />
                        Ajustes
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden">
                {/* Topbar móvil / Desktop ligero */}
                <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/95 backdrop-blur z-10 sticky top-0">
                    <h2 className="font-semibold md:invisible">TopIAgents Workspace</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-bold ring-1 ring-primary/20 cursor-pointer">
                            US
                        </div>
                    </div>
                </header>

                <div className="p-6 max-w-5xl mx-auto pb-24">
                    {children}
                </div>
            </main>
        </div>
    )
}
