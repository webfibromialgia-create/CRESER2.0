import { Metadata } from 'next';

export const baseSEO: Metadata = {
  metadataBase: new URL('https://creser-fibromialgia.vercel.app'),
  title: {
    default: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
    template: '%s | CRESER - Fibromialgia León Guanajuato'
  },
  description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados. Tratamiento integral para fibromialgia en León.',
  keywords: [
    'fibromialgia león', 'fibromialgia guanajuato', 'tratamiento fibromialgia león',
    'psicólogo fibromialgia león', 'asociación fibromialgia león', 'centro fibromialgia león',
    'dolor crónico león', 'fatiga crónica león', 'psicoterapia fibromialgia león',
    'medicina especializada león', 'terapia fibromialgia guanajuato', 'CRESER león',
    'asociación fibromialgia guanajuato', 'centro atención integral león', 'fibromialgia tratamiento león'
  ],
  authors: [{ name: 'CRESER A.C. - León, Guanajuato' }],
  creator: 'CRESER A.C. - Centro de Atención Integral para Fibromialgia',
  publisher: 'CRESER A.C. - León, Guanajuato',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://creser-fibromialgia.vercel.app',
    siteName: 'CRESER - Centro de Atención Integral para Fibromialgia en León',
    title: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
    description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados. Tratamiento integral para fibromialgia.',
    images: [
      {
        url: '/logo-creser.jpg',
        width: 1200,
        height: 630,
        alt: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
    description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados.',
    images: ['/logo-creser.jpg'],
    creator: '@creser_fibromialgia',
    site: '@creser_fibromialgia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'tu-codigo-google-verification',
    yandex: 'tu-codigo-yandex',
    yahoo: 'tu-codigo-yahoo'
  },
  alternates: {
    canonical: 'https://creser-fibromialgia.vercel.app',
    languages: {
      'es-MX': 'https://creser-fibromialgia.vercel.app',
      'es': 'https://creser-fibromialgia.vercel.app'
    }
  },
};

// SEO específico para la página principal
export const homeSEO: Metadata = {
  ...baseSEO,
  title: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
  description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados. Tratamiento integral para fibromialgia en León. Ubicado en Paseo de las Águilas No. 95, León.',
  keywords: [
    'fibromialgia león', 'fibromialgia guanajuato', 'tratamiento fibromialgia león',
    'psicólogo fibromialgia león', 'asociación fibromialgia león', 'centro fibromialgia león',
    'dolor crónico león', 'fatiga crónica león', 'psicoterapia fibromialgia león',
    'medicina especializada león', 'terapia fibromialgia guanajuato', 'CRESER león',
    'asociación fibromialgia guanajuato', 'centro atención integral león', 'fibromialgia tratamiento león',
    'león guanajuato fibromialgia', 'psicólogo león fibromialgia', 'terapeuta fibromialgia león'
  ],
  openGraph: {
    ...baseSEO.openGraph,
    title: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
    description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados. Tratamiento integral para fibromialgia en León.',
  },
  twitter: {
    ...baseSEO.twitter,
    title: 'CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato',
    description: 'Centro especializado en fibromialgia y fatiga crónica en León, Guanajuato. Psicólogos, médicos y terapeutas especializados.',
  },
};

// SEO para página de servicios
export const servicesSEO: Metadata = {
  ...baseSEO,
  title: 'Servicios de Fibromialgia en León, Guanajuato | CRESER',
  description: 'Servicios especializados para fibromialgia en León, Guanajuato. Psicoterapia, medicina especializada, nutrición y fisioterapia. Tratamiento integral para fibromialgia.',
  keywords: [
    'servicios fibromialgia león', 'psicoterapia fibromialgia león', 'medicina fibromialgia león',
    'nutrición fibromialgia león', 'fisioterapia fibromialgia león', 'tratamiento fibromialgia león guanajuato',
    'psicólogo especializado fibromialgia león', 'terapia fibromialgia león', 'centro servicios fibromialgia león'
  ],
};

// SEO para página de psicoterapia
export const psychoterapySEO: Metadata = {
  ...baseSEO,
  title: 'Psicoterapia para Fibromialgia en León, Guanajuato | CRESER',
  description: 'Psicoterapia especializada para fibromialgia en León, Guanajuato. Psicólogos expertos en dolor crónico y fatiga. Terapia individual, de pareja y familiar.',
  keywords: [
    'psicoterapia fibromialgia león', 'psicólogo fibromialgia león', 'terapia fibromialgia león',
    'psicólogo dolor crónico león', 'terapia fatiga crónica león', 'psicólogo especializado león',
    'psicoterapia individual león', 'terapia pareja fibromialgia león', 'psicólogo león guanajuato'
  ],
};

// SEO para página de contacto
export const contactSEO: Metadata = {
  ...baseSEO,
  title: 'Contacto CRESER - Centro de Fibromialgia en León, Guanajuato',
  description: 'Contacta con CRESER en León, Guanajuato. Centro especializado en fibromialgia. Teléfono: +52-477-412-5698. Ubicado en Paseo de las Águilas No. 95, León.',
  keywords: [
    'contacto CRESER león', 'teléfono fibromialgia león', 'dirección CRESER león',
    'ubicación centro fibromialgia león', 'contactar psicólogo fibromialgia león',
    'CRESER león guanajuato contacto', 'centro atención fibromialgia león dirección'
  ],
};

// SEO para página de donativos
export const donationsSEO: Metadata = {
  ...baseSEO,
  title: 'Donativos para CRESER - Centro de Fibromialgia en León, Guanajuato',
  description: 'Apoya a CRESER en León, Guanajuato. Tu donativo ayuda a personas con fibromialgia. Asociación sin fines de lucro comprometida con la salud de la comunidad.',
  keywords: [
    'donativos CRESER león', 'apoyar fibromialgia león', 'donar CRESER guanajuato',
    'asociación fibromialgia león donativos', 'ayudar personas fibromialgia león',
    'CRESER león donaciones', 'centro fibromialgia león apoyo'
  ],
};

// Función para generar SEO dinámico
export function generateDynamicSEO(
  pageType: 'home' | 'services' | 'psychoterapy' | 'contact' | 'donations',
  additionalData?: Record<string, string>
): Metadata {
  const baseMetadata = {
    home: homeSEO,
    services: servicesSEO,
    psychoterapy: psychoterapySEO,
    contact: contactSEO,
    donations: donationsSEO,
  }[pageType];

  if (!additionalData) return baseMetadata;

  return {
    ...baseMetadata,
    title: additionalData.title ? `${additionalData.title} | CRESER - Fibromialgia León Guanajuato` : baseMetadata.title,
    description: additionalData.description || baseMetadata.description,
    keywords: additionalData.keywords ? [...(baseMetadata.keywords || []), ...additionalData.keywords.split(',')] : baseMetadata.keywords,
  };
}
