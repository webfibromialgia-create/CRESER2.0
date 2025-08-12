// Configuración de Google Analytics y herramientas de seguimiento
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real de Google Analytics

// Google Analytics 4
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Evento personalizado
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos para CRESER
export const trackContactForm = (formType: string) => {
  event({
    action: 'form_submit',
    category: 'Contact',
    label: formType,
  });
};

export const trackPhoneCall = (phoneNumber: string) => {
  event({
    action: 'phone_call',
    category: 'Contact',
    label: phoneNumber,
  });
};

export const trackWhatsApp = (section: string) => {
  event({
    action: 'whatsapp_click',
    category: 'Contact',
    label: section,
  });
};

export const trackServiceView = (serviceName: string) => {
  event({
    action: 'service_view',
    category: 'Services',
    label: serviceName,
  });
};

export const trackDonationInterest = (donationType: string) => {
  event({
    action: 'donation_interest',
    category: 'Donations',
    label: donationType,
  });
};

// Configuración de Google Tag Manager
export const GTM_ID = 'GTM-XXXXXXX'; // Reemplazar con tu ID real de GTM

// Configuración de Facebook Pixel
export const FB_PIXEL_ID = 'XXXXXXXXXX'; // Reemplazar con tu ID real de Facebook Pixel

// Configuración de LinkedIn Insight Tag
export const LINKEDIN_PARTNER_ID = 'XXXXXXXXXX'; // Reemplazar con tu ID real de LinkedIn

// Función para inicializar todas las herramientas de seguimiento
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'fibromialgia',
          'custom_parameter_2': 'leon_guanajuato',
          'custom_parameter_3': 'creser',
        },
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }

    // LinkedIn Insight Tag
    if (window.lintrk) {
      window.lintrk('track', { conversion_id: LINKEDIN_PARTNER_ID });
    }
  }
};

// Tipos para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    lintrk: (...args: any[]) => void;
  }
}
