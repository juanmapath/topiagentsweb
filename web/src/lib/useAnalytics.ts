import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Inicializar o recuperar sesión (Visitor)
  useEffect(() => {
    let sessionId = localStorage.getItem('visitor_session_id');

    const initVisitor = async () => {
      try {
        const response = await fetch(`${API_URL}/api/analytics/session/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_agent: navigator.userAgent,
            device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('visitor_session_id', data.session_id);
        }
      } catch (error) {
        console.error('Failed to initialize visitor session:', error);
      }
    };

    if (!sessionId) {
      initVisitor();
    }
  }, []);

  // Rastrear UTMs
  useEffect(() => {
    if (!searchParams) return;
    
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utms.forEach(utm => {
      const value = searchParams.get(utm);
      if (value) {
        sessionStorage.setItem(utm, value);
      }
    });
  }, [searchParams]);

  // Rastrear PageViews (Cambios de Ruta)
  useEffect(() => {
    if (!pathname) return;

    const trackPageView = async () => {
      // Esperar brevemente por si la sesión se está inicializando
      await new Promise(resolve => setTimeout(resolve, 500));
      const sessionId = localStorage.getItem('visitor_session_id');
      
      if (!sessionId) return;

      try {
        await fetch(`${API_URL}/api/analytics/pageview/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
            url: window.location.href,
            path: pathname,
            title: document.title,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error('Failed to track pageview:', error);
      }
    };

    trackPageView();
  }, [pathname, searchParams]);
}

// Función helper para exportar eventos manuales (clics, videos, etc.)
export const trackEvent = async (category: string, action: string, label?: string, eventData?: any) => {
  const sessionId = localStorage.getItem('visitor_session_id');
  if (!sessionId) return;

  try {
    await fetch(`${API_URL}/api/analytics/event/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        event_category: category,
        event_action: action,
        event_label: label,
        event_data: eventData,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
