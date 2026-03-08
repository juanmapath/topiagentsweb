"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PieChartCardProps {
    title: string;
    data: { name: string; value: number }[];
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b', '#ec4899', '#14b8a6'];

export function PieChartCard({ title, data }: PieChartCardProps) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col h-full min-h-[300px]">
                <h3 className="text-lg font-bold mb-4 text-foreground">{title}</h3>
                <div className="flex-1 flex items-center justify-center text-muted text-sm">
                    No hay suficientes datos.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background border border-border rounded-xl p-6 flex flex-col h-full min-h-[300px]">
            <h3 className="text-lg font-bold mb-4 text-foreground">{title}</h3>
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                            itemStyle={{ color: 'var(--foreground)' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
