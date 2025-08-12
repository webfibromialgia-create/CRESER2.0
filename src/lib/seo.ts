import { Metadata } from 'next';

// Configuración base de SEO para CRESER
export const baseSEO: Metadata = {
  metadataBase: new URL('https://creser-fibromialgia.vercel.app'),
  title: {
    default: 'CRESER - Asociación para el Manejo Integral de la Fibromialgia',
    template: '%s | CRESER - Fibromialgia'
  },
  description: 'OSC Asociación para el Manejo Integral y Preventivo de la Fibromialgia y la Fatiga Crónica CRESER A.C. - Atención especializada en León, Guanajuato.',
  keywords: [
    'fibromialgia',
    'fatiga crónica',
    'tratamiento fibromialgia',
    'psicoterapia fibromialgia',
    'medicina especializada',
    'León Guanajuato',
    'CRESER',
    'asociación fibromialgia',
    'centro atención integral',
    'dolor crónico',
    'terapia fibromialgia',
    'nutrición fibromialgia',
    'fisioterapia fibromialgia'
  ],
  authors: [{ name: 'CRESER A.C.' }],
  creator: 'CRESER A.C.',
  publisher: 'CRESER A.C.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://creser-fibromialgia.vercel.app',
    siteName: 'CRESER - Asociación Fibromialgia',
    title: 'CRESER - Centro de Atención Integral para Fibromialgia',
    description: 'Atención especializada en fibromialgia y fatiga crónica en León, Guanajuato. Servicios médicos, psicológicos, nutricionales y de fisioterapia.',
    images: [
      {
        url: '/logo-creser.jpg',
        width: 1200,
        height: 630,
        alt: 'Logo CRESER - Asociación para el Manejo Integral de la Fibromialgia',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRESER - Centro de Atención Integral para Fibromialgia',
    description: 'Atención especializada en fibromialgia y fatiga crónica en León, Guanajuato.',
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
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-google-verification', // Reemplazar con código real
    yandex: 'tu-codigo-yandex',
    yahoo: 'tu-codigo-yahoo',
  },
  alternates: {
    canonical: 'https://creser-fibromialgia.vercel.app',
    languages: {
      'es-MX': 'https://creser-fibromialgia.vercel.app',
      'es': 'https://creser-fibromialgia.vercel.app',
    },
  },
};

// Metadatos específicos para la página principal
export const homeSEO: Metadata = {
  ...baseSEO,
  title: 'CRESER - Centro de Atención Integral para Fibromialgia | León, Guanajuato',
  description: 'CRESER A.C. es la única clínica reconocida a nivel nacional especializada en fibromialgia. 14 años de experiencia con atención médica, psicológica, nutricional y fisioterapéutica integral en León, Guanajuato.',
  openGraph: {
    ...baseSEO.openGraph,
    title: 'CRESER - Centro de Atención Integral para Fibromialgia',
    description: 'La única clínica reconocida a nivel nacional especializada en fibromialgia. Atención integral en León, Guanajuato.',
    images: [
      {
        url: '/logo-creser.jpg',
        width: 1200,
        height: 630,
        alt: 'CRESER - Centro Especializado en Fibromialgia',
      }
    ],
  },
};

// Metadatos para servicios médicos
export const serviciosSEO: Metadata = {
  ...baseSEO,
  title: 'Servicios Médicos Especializados en Fibromialgia | CRESER',
  description: 'Servicios integrales para fibromialgia: medicina especializada, psicoterapia, nutrición y fisioterapia. Atención personalizada en León, Guanajuato.',
  openGraph: {
    ...baseSEO.openGraph,
    title: 'Servicios Médicos Especializados en Fibromialgia | CRESER',
    description: 'Medicina, psicología, nutrición y fisioterapia especializada en fibromialgia. Atención integral en León, Guanajuato.',
    images: [
      {
        url: '/proceso de atención multidisciplinario.jpg',
        width: 1200,
        height: 630,
        alt: 'Proceso de atención multidisciplinario CRESER',
      }
    ],
  },
};

// Metadatos para psicoterapia
export const psicoterapiaSEO: Metadata = {
  ...baseSEO,
  title: 'Psicoterapia Especializada en Fibromialgia | Psic. Maricruz Ríos | CRESER',
  description: 'Psicoterapia individual y de pareja especializada en fibromialgia. Más de 20 años de experiencia con Psic. Maricruz Ríos Medina en León, Guanajuato.',
  openGraph: {
    ...baseSEO.openGraph,
    title: 'Psicoterapia Especializada en Fibromialgia | Psic. Maricruz Ríos',
    description: 'Psicoterapia individual, de pareja e infantil especializada en fibromialgia. Directora Psic. Maricruz Ríos Medina en León, Guanajuato.',
    images: [
      {
        url: '/Psicoterapia por profesionales.jpg',
        width: 1200,
        height: 630,
        alt: 'Psic. Maricruz Ríos Medina - Directora CRESER',
      }
    ],
  },
};

// Metadatos para contacto
export const contactoSEO: Metadata = {
  ...baseSEO,
  title: 'Contacto CRESER - Fibromialgia León, Guanajuato | Teléfonos y Ubicación',
  description: 'Contacta con CRESER en León, Guanajuato. Teléfonos: (477) 412-5698, (477) 329-5370, (477) 132-6835. Ubicación: Paseo de las Águilas 95, San Isidro.',
  openGraph: {
    ...baseSEO.openGraph,
    title: 'Contacto CRESER - Fibromialgia León, Guanajuato',
    description: 'Teléfonos, ubicación y horarios de atención. Paseo de las Águilas 95, San Isidro, León, Guanajuato.',
    images: [
      {
        url: '/logo-creser.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto CRESER - Asociación Fibromialgia',
      }
    ],
  },
};

// Metadatos para donativos
export const donativosSEO: Metadata = {
  ...baseSEO,
  title: 'Donativos CRESER - Apoya la Causa de la Fibromialgia | León, Guanajuato',
  description: 'Apoya a CRESER con donativos para continuar brindando atención integral especializada a pacientes con fibromialgia. Deducible de impuestos.',
  openGraph: {
    ...baseSEO.openGraph,
    title: 'Donativos CRESER - Apoya la Causa de la Fibromialgia',
    description: 'Tu apoyo nos permite continuar brindando atención integral especializada. Diferentes formas de contribuir: paciente, profesionista, familia, voluntario, empresa.',
    images: [
      {
        url: '/Donativos creser .jpg',
        width: 1200,
        height: 630,
        alt: 'Donativos CRESER - Pon tu corazón',
      }
    ],
  },
};

// Función para generar metadatos dinámicos
export function generateDynamicSEO(
  page: 'home' | 'servicios' | 'psicoterapia' | 'contacto' | 'donativos',
  customData?: {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string[];
  }
): Metadata {
  const baseMetadata = {
    home: homeSEO,
    servicios: serviciosSEO,
    psicoterapia: psicoterapiaSEO,
    contacto: contactoSEO,
    donativos: donativosSEO,
  }[page];

  if (!customData) return baseMetadata;

  return {
    ...baseMetadata,
    title: customData.title || baseMetadata.title,
    description: customData.description || baseMetadata.description,
    keywords: customData.keywords || baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title: customData.title || baseMetadata.openGraph?.title,
      description: customData.description || baseMetadata.openGraph?.description,
      images: customData.image ? [
        {
          url: customData.image,
          width: 1200,
          height: 630,
          alt: customData.title || 'CRESER - Fibromialgia',
        }
      ] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: customData.title || baseMetadata.twitter?.title,
      description: customData.description || baseMetadata.twitter?.description,
      images: customData.image ? [customData.image] : baseMetadata.twitter?.images,
    },
  };
}
