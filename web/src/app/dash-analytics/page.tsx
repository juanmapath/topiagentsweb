import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Analytics Dashboard | TopIAgents",
    description: "Panel de control administrativo",
}

export default function AnalyticsDashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <AnalyticsDashboard />
        </div>
    )
}
