"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Calendar, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react"

// Tipos de mensaje
type Message = {
    id: string
    role: "user" | "agent"
    content: string
    action?: "SHOW_SLOTS" | "BOOK_SLOT" | "BOOKING_SUCCESS"
    slots?: Record<string, { start: string }[]>
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "init",
            role: "agent",
            content: "¡Hola! Soy tu asistente de TopIAgents. ¿En qué te puedo ayudar hoy? ¿Te gustaría agendar una auditoría sin costo?",
        }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [sessionId] = useState(() => Math.random().toString(36).substring(7))

    // Estado para flujo de reserva
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [bookingName, setBookingName] = useState("")
    const [bookingEmail, setBookingEmail] = useState("")
    const [isBooking, setIsBooking] = useState(false)
    const [expandedDate, setExpandedDate] = useState<string | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const nameInputRef = useRef<HTMLInputElement>(null)

    // Auto-scroll al fondo
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const toggleChat = () => setIsOpen(!isOpen)

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!inputMessage.trim() || isLoading) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputMessage.trim(),
        }

        setMessages((prev) => [...prev, userMsg])
        setInputMessage("")
        setIsLoading(true)

        try {
            const response = await fetch("https://n8n.topi.cash/webhook/topimate-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    message: userMsg.content,
                }),
            })

            if (!response.ok) throw new Error("Network response was not ok")

            const rawData = await response.json()
            const data = Array.isArray(rawData) ? rawData[0] : rawData

            const agentMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "agent",
                content: data?.message || data?.output || "Lo siento, tuve un problema procesando tu mensaje.",
                action: data?.action,
                slots: data?.slots,
            }

            setMessages((prev) => [...prev, agentMsg])

        } catch (error) {
            console.error("Error sending message to n8n:", error)
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "agent",
                content: "Error de conexión. Por favor, intenta de nuevo más tarde.",
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleBookSlot = async () => {
        if (!selectedSlot || !bookingName.trim() || !bookingEmail.trim()) return

        setIsBooking(true)
        setIsLoading(true)

        // Mensaje optimista
        setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            role: "user",
            content: `Reservando para el ${new Date(selectedSlot).toLocaleString()} a nombre de ${bookingName}`,
        }])

        try {
            const response = await fetch("https://n8n.topi.cash/webhook/topimate-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    action: "BOOK_SLOT",
                    start: selectedSlot,
                    name: bookingName,
                    email: bookingEmail
                }),
            })

            if (!response.ok) throw new Error("Booking failed")

            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "agent",
                content: "¡Excelente! Tu auditoría de 15 minutos ha sido agendada con éxito. Te hemos enviado un correo con los detalles de la conexión.",
                action: "BOOKING_SUCCESS"
            }])

            // Limpiar estados de reserva
            setSelectedSlot(null)
            setBookingName("")
            setBookingEmail("")

        } catch (error) {
            console.error("Error booking slot:", error)
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "agent",
                content: "Hubo un problema confirmando tu cita. Intenta nuevamente o contáctanos directamente.",
            }])
        } finally {
            setIsBooking(false)
            setIsLoading(false)
        }
    }

    const renderMessageContent = (msg: Message) => {
        return (
            <div className={`flex max-w-[85%] flex-col rounded-[16px] px-4 py-3 text-sm shadow-sm leading-relaxed ${msg.role === "user"
                ? "bg-primary text-white rounded-br-none ml-auto"
                : "bg-surface text-foreground border border-border rounded-bl-none"
                }`}>
                <span className="whitespace-pre-wrap text-sm">{msg.content}</span>

                {/* Renderizar Slots si la acción lo dicta */}
                {msg.action === "SHOW_SLOTS" && msg.slots && (
                    <div className="mt-4 space-y-4">
                        <div className="text-sm font-semibold text-[#00FF66] flex items-center gap-2">
                            <Calendar size={16} /> Horarios Disponibles
                        </div>
                        {Object.entries(msg.slots).map(([date, slots]) => {
                            const isExpanded = expandedDate === date;
                            return (
                                <div key={date} className="border-t border-border pt-2">
                                    <button
                                        onClick={() => setExpandedDate(isExpanded ? null : date)}
                                        className="w-full flex items-center justify-between text-xs text-muted font-medium hover:text-foreground transition-colors py-2"
                                    >
                                        <span>{new Date(date).toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' })}</span>
                                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </button>
                                    {isExpanded && (
                                        <div
                                            className="flex flex-wrap gap-2 pt-2 pb-2 max-h-40 overflow-y-auto overflow-x-hidden"
                                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                        >
                                            <style jsx>{`
                                                div::-webkit-scrollbar {
                                                    display: none;
                                                }
                                            `}</style>
                                            {slots.map((slot, idx) => {
                                                const slotDate = new Date(slot.start)
                                                const timeString = slotDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
                                                const isSelected = selectedSlot === slot.start
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setSelectedSlot(slot.start)
                                                            setTimeout(() => nameInputRef.current?.focus(), 50)
                                                        }}
                                                        className={`px-3 py-1.5 text-xs rounded-md transition-all ${isSelected
                                                            ? 'bg-primary text-white'
                                                            : 'bg-surface hover:bg-border text-foreground'
                                                            }`}
                                                    >
                                                        {timeString}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Formulario de Datos (solo visible si se seleccionó slot) */}
                        {selectedSlot && (
                            <div className="mt-4 space-y-3 bg-background p-3 rounded-lg border border-border">
                                <div className="text-xs text-[#00FF66] mb-1 font-medium">Confirma tus datos:</div>
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    placeholder="Tu Nombre"
                                    value={bookingName}
                                    onChange={(e) => setBookingName(e.target.value)}
                                    className="w-full bg-surface border border-border rounded p-2 text-sm text-foreground focus:border-primary outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Tu Correo"
                                    value={bookingEmail}
                                    onChange={(e) => setBookingEmail(e.target.value)}
                                    className="w-full bg-surface border border-border rounded p-2 text-sm text-foreground focus:border-primary outline-none"
                                />
                                <button
                                    onClick={handleBookSlot}
                                    disabled={!bookingName || !bookingEmail || isBooking}
                                    className="w-full bg-primary text-white py-2 px-2 rounded-md font-semibold text-sm transition-opacity disabled:opacity-50 mt-2 truncate"
                                >
                                    {isBooking ? 'Reservando...' : `Confirmar el ${new Date(selectedSlot).toLocaleString('es-ES', { weekday: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' })}`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {msg.action === "BOOKING_SUCCESS" && (
                    <div className="mt-3 flex items-center justify-center gap-2 bg-[#00FF66]/10 text-[#00FF66] p-2 rounded-md">
                        <CheckCircle2 size={16} /> <span className="text-xs font-semibold">Cita Confirmada</span>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                aria-label="Abrir Chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-[12px] border border-border bg-background shadow-2xl sm:w-[400px]">
                    <div className="bg-surface border-b border-border p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground">TopIAgents Agent</span>
                                <span className="text-[10px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> En línea</span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-muted hover:text-foreground transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {renderMessageContent(msg)}
                            </div>
                        ))}
                        {isLoading && !isBooking && (
                            <div className="flex w-full justify-start">
                                <div className="flex max-w-[85%] items-center gap-2 rounded-[16px] rounded-bl-none border border-border bg-surface px-4 py-3 text-foreground shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-border bg-background p-3">
                        <form
                            onSubmit={handleSendMessage}
                            className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1 shadow-sm"
                        >
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder-muted outline-none"
                                disabled={isLoading || selectedSlot !== null}
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim() || isLoading || selectedSlot !== null}
                                className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-primary text-white transition-opacity disabled:opacity-50"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
