import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    const tgThreadId = process.env.TELEGRAM_THREAD_ID;

    if (!tgToken || !tgChatId) {
        return NextResponse.json({ error: "Missing Telegram credentials" }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Missing message body" }, { status: 400 });
        }

        const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
        const tgPayload: any = {
            chat_id: tgChatId,
            text: message,
            parse_mode: 'Markdown',
        };

        if (tgThreadId) {
            tgPayload.message_thread_id = tgThreadId;
        }

        const response = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tgPayload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API Error:", errorData);
            return NextResponse.json({ error: "Failed to send Telegram message" }, { status: response.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in /api/notify/telegram:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
