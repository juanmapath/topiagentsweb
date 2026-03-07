import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const apiKey = process.env.CAL_API_KEY;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    const tgThreadId = process.env.TELEGRAM_THREAD_ID;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing Cal.com API Key" }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { start, name, email, whatsapp, website, tasks, sourcePlan, planName } = body;

        const eventTypeId = 4900843; // Hardcoded from instructions

        // 1. Enviar el Booking a Cal.com
        const calApiUrl = `https://api.cal.com/v2/bookings`;
        const calPayload = {
            start: start,
            eventTypeId: eventTypeId,
            attendee: {
                name: name,
                email: email,
                timeZone: "America/Bogota",
                language: "es"
            }
        };

        const calResponse = await fetch(calApiUrl, {
            method: 'POST',
            headers: {
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(calPayload)
        });

        if (!calResponse.ok) {
            const errorData = await calResponse.json();
            console.error("Cal.com Error:", errorData);
            return NextResponse.json({ error: "Error creating booking", details: errorData }, { status: calResponse.status });
        }

        const calData = await calResponse.json();

        // 2. Enviar Notificación a Telegram
        if (tgToken && tgChatId) {
            const planText = planName || (sourcePlan === "option1" ? "Hágalo usted mismo ($99)" : sourcePlan === "option2" ? "Magia Absoluta ($497)" : "Desconocido");

            const tgMessage = `🚀 *Nuevo Lead Agendado* 🚀\n\n` +
                `👤 *Nombre:* ${name}\n` +
                `📧 *Email:* ${email}\n` +
                `📱 *WhatsApp:* ${whatsapp || 'N/A'}\n` +
                `🌐 *Web:* ${website || 'N/A'}\n` +
                `💼 *Plan de Interés:* ${planText}\n` +
                `📅 *Cita (UTC):* ${start}\n\n` +
                `📝 *Tareas a Automatizar:*\n${tasks}`;

            const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
            const tgPayload: any = {
                chat_id: tgChatId,
                text: tgMessage,
                parse_mode: 'Markdown',
            };

            if (tgThreadId) {
                tgPayload.message_thread_id = tgThreadId;
            }

            try {
                await fetch(tgUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tgPayload)
                });
            } catch (tgError) {
                console.error("Failed to send Telegram notification:", tgError);
                // No rompemos la request porque el booking ya fue exitoso
            }
        }

        return NextResponse.json({ success: true, booking: calData });

    } catch (error) {
        console.error("Error in /api/cal/book:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
