"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Calendar, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react"

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    // Identificador oculto para saber de qué plan viene (option1 o option2)
    sourcePlan: "option1" | "option2" | null;
    planName: string;
    hideTasksField?: boolean;
    initialTasks?: string;
    hideWhatsappField?: boolean;
    initialWhatsapp?: string;
}

export function BookingModal({ isOpen, onClose, sourcePlan, planName, hideTasksField = false, initialTasks = "", hideWhatsappField = false, initialWhatsapp = "" }: BookingModalProps) {
    const [step, setStep] = useState<1 | 2>(1);

    // Form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState(initialWhatsapp);
    const [website, setWebsite] = useState("");
    const [tasks, setTasks] = useState(initialTasks);

    // Slot fetching & selection state
    const [slots, setSlots] = useState<Record<string, { start: string }[]> | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [expandedDate, setExpandedDate] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    // Sync state with props when modal opens
    useEffect(() => {
        if (isOpen) {
            setTasks(initialTasks);
            setWhatsapp(initialWhatsapp);
        }
    }, [isOpen, initialTasks, initialWhatsapp]);

    if (!isOpen) return null;

    const resetForm = () => {
        setStep(1);
        setName("");
        setEmail("");
        setWhatsapp(initialWhatsapp);
        setWebsite("");
        setTasks(initialTasks);
        setSlots(null);
        setSelectedSlot(null);
        setExpandedDate(null);
        setIsSuccess(false);
        setError("");
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Fetch slots
            const res = await fetch("/api/cal/slots");
            if (!res.ok) throw new Error("Error obteniendo horarios");
            const data = await res.json();

            if (data.status === "success" && data.data) {
                setSlots(data.data);
                setStep(2);
                // Expandir la primera fecha disponible
                const firstDate = Object.keys(data.data)[0];
                if (firstDate) setExpandedDate(firstDate);
            } else {
                throw new Error("Formato de horarios inválido");
            }
        } catch (err: any) {
            console.error("Fetch Slots Error:", err);
            setError(err.message || "Hubo un error obteniendo los horarios de la agenda.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookSubmit = async () => {
        if (!selectedSlot) {
            setError("Por favor selecciona una fecha y hora.");
            return;
        }

        setError("");
        setIsLoading(true);

        const payload = {
            name,
            email,
            whatsapp: whatsapp || null,
            website: website || null,
            tasks,
            sourcePlan,
            planName,
            start: selectedSlot
        };

        try {
            const res = await fetch("/api/cal/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Error al procesar la reserva");

            // --- TRACKING LEAD CREATION ---
            try {
                const sessionId = localStorage.getItem('visitor_session_id');
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                
                await fetch(`${API_URL}/api/analytics/lead/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name: name.split(' ')[0],
                        last_name: name.split(' ').slice(1).join(' '),
                        email: email,
                        phone: whatsapp || null,
                        company: website || null,
                        session_id: sessionId,
                        utm_source: sessionStorage.getItem('utm_source'),
                        utm_medium: sessionStorage.getItem('utm_medium'),
                        utm_campaign: sessionStorage.getItem('utm_campaign'),
                        utm_term: sessionStorage.getItem('utm_term'),
                        utm_content: sessionStorage.getItem('utm_content'),
                        landing_page: window.location.href,
                        form_name: `Booking Modal (${sourcePlan})`
                    })
                });
            } catch (trackingErr) {
                console.error("Tracking lead creation failed, but booking succeeded:", trackingErr);
            }
            // ------------------------------

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                resetForm();
            }, 4000);

        } catch (err: any) {
            console.error(err);
            setError("Hubo un error al confirmar tu reserva. Por favor intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 my-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-foreground">¡Agendado con Éxito!</h2>
                        <p className="text-muted">Tu auditoría ha sido confirmada en nuestra agenda. Revisa tu correo electrónico para encontrar la invitación de Cal.com y el enlace de la reunión.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2 text-foreground">
                            {step === 1 ? "Agendar Auditoría" : "Elige tu Fecha y Hora"}
                        </h2>
                        <p className="text-sm text-muted mb-6">
                            {step === 1
                                ? `Estás a un paso de instalar un empleado digital en tu negocio. Déjanos algunos datos para preparar la sesión de ${sourcePlan === "option1" ? "hágalo usted mismo" : "magia absoluta"}.`
                                : "Nuestra agenda está conectada en tiempo real. Por favor selecciona el horario que mejor te funcione."
                            }
                        </p>

                        {step === 1 ? (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Nombre Completo <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ej: Elon Musk"
                                        className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className={`grid grid-cols-1 ${!hideWhatsappField ? 'md:grid-cols-2' : ''} gap-4`}>
                                    <div>
                                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="elon@ejemplo.com"
                                            className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                            required
                                        />
                                    </div>
                                    {!hideWhatsappField && (
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">WhatsApp <span className="text-muted/50 lowercase font-normal">(opcional)</span></label>
                                            <input
                                                type="tel"
                                                value={whatsapp}
                                                onChange={(e) => setWhatsapp(e.target.value)}
                                                placeholder="+57 300 000 0000"
                                                className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">URL Sitio Web / Instagram <span className="text-muted/50 lowercase font-normal">(opcional)</span></label>
                                    <input
                                        type="url"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="https://tu-negocio.com"
                                        className="w-full px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                                    />
                                </div>

                                {!hideTasksField && (
                                    <div>
                                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">¿Qué tareas quieres delegarle a la IA? <span className="text-red-500">*</span></label>
                                        <textarea
                                            value={tasks}
                                            onChange={(e) => setTasks(e.target.value)}
                                            placeholder="Ej: Contestar WhatsApp, agendar citas en Cal.com, leer y entender PDFs largos..."
                                            className="w-full h-24 px-4 py-2 border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none"
                                            required
                                        />
                                    </div>
                                )}

                                {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}

                                <Button type="submit" className="w-full font-bold h-12 text-lg mt-2 shadow-primary/30" disabled={isLoading}>
                                    {isLoading ? "Buscando Horarios..." : "Siguiente: Elegir Fecha"}
                                </Button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="max-h-64 overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: "thin" }}>
                                    {slots && Object.entries(slots).length > 0 ? (
                                        Object.entries(slots).map(([date, daySlots]) => {
                                            const isExpanded = expandedDate === date;
                                            return (
                                                <div key={date} className="border border-border rounded-lg bg-surface/50 overflow-hidden">
                                                    <button
                                                        onClick={() => setExpandedDate(isExpanded ? null : date)}
                                                        className="w-full flex items-center justify-between p-3 bg-surface hover:bg-border/50 transition-colors text-sm font-semibold text-foreground"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={16} className="text-primary" />
                                                            <span>{new Date(date).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                                                        </div>
                                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                    </button>
                                                    {isExpanded && (
                                                        <div className="p-3 grid grid-cols-3 gap-2 bg-background/50 border-t border-border">
                                                            {daySlots.map((slot, idx) => {
                                                                const slotDate = new Date(slot.start);
                                                                const timeString = slotDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                                                                const isSelected = selectedSlot === slot.start;
                                                                return (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => setSelectedSlot(slot.start)}
                                                                        className={`px-2 py-2 text-sm rounded-md transition-all font-medium border ${isSelected
                                                                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 flex items-center justify-center gap-1'
                                                                            : 'bg-surface border-border hover:border-primary/50 text-foreground'
                                                                            }`}
                                                                    >
                                                                        {isSelected && <CheckCircle2 size={14} />} {timeString}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-muted text-center py-8">No hay horarios disponibles próximamente.</p>
                                    )}
                                </div>

                                {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}

                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <Button type="button" variant="outline" className="w-auto font-bold" disabled={isLoading} onClick={() => setStep(1)}>
                                        Atrás
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full font-bold"
                                        disabled={isLoading || !selectedSlot}
                                        onClick={handleBookSubmit}
                                    >
                                        {isLoading ? "Confirmando..." : selectedSlot ? `Confirmar ${new Date(selectedSlot).toLocaleString('es-ES', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}` : "Selecciona una fecha"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
