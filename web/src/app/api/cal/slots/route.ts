import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const eventTypeId = searchParams.get('eventTypeId') || "4900843"; // Default event ID

    // Obtener las fechas de inicio y fin (4 días desde hoy)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 4);

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const calApiUrl = `https://api.cal.com/v2/slots?eventTypeId=${eventTypeId}&start=${startStr}&end=${endStr}`;
    const apiKey = process.env.CAL_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing Cal.com API Key" }, { status: 500 });
    }

    try {
        const response = await fetch(calApiUrl, {
            method: 'GET',
            headers: {
                "cal-api-version": "2024-09-04",
                "Authorization": `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: "Error fetching slots from Cal.com", details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in /api/cal/slots:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
