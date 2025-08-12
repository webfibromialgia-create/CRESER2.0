// Schema.org estructurado para organizaciones médicas
export const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "CRESER A.C.",
  "alternateName": "Asociación para el Manejo Integral y Preventivo de la Fibromialgia y la Fatiga Crónica",
  "description": "OSC especializada en el manejo integral de la fibromialgia y fatiga crónica, con 14 años de experiencia y reconocimiento a nivel nacional.",
  "url": "https://creser-fibromialgia.vercel.app",
  "logo": {
    "@type": "ImageObject",
    "url": "https://creser-fibromialgia.vercel.app/logo-creser.jpg",
    "width": 1200,
    "height": 630
  },
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://creser-fibromialgia.vercel.app/logo-creser.jpg",
      "width": 1200,
      "height": 630
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Paseo de las Águilas No. 95",
    "addressLocality": "León",
    "addressRegion": "Guanajuato",
    "postalCode": "37685",
    "addressCountry": "MX"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+52-477-412-5698",
      "contactType": "customer service",
      "areaServed": "MX",
      "availableLanguage": "Spanish"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+52-477-329-5370",
      "contactType": "customer service",
      "areaServed": "MX",
      "availableLanguage": "Spanish"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+52-477-132-6835",
      "contactType": "customer service",
      "areaServed": "MX",
      "availableLanguage": "Spanish"
    }
  ],
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-14:00"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "medicalSpecialty": [
    "Fibromialgia",
    "Fatiga Crónica",
    "Dolor Crónico",
    "Medicina del Dolor",
    "Psicología Clínica",
    "Nutrición Clínica",
    "Fisioterapia"
  ],
  "availableService": [
    {
      "@type": "MedicalService",
      "name": "Consulta Médica Especializada",
      "description": "Diagnóstico y tratamiento médico integral para fibromialgia y dolor crónico",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Psicoterapia Individual",
      "description": "Tratamiento psicológico especializado para pacientes con fibromialgia",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Psicoterapia de Pareja",
      "description": "Terapia de pareja especializada en fibromialgia",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Psicoterapia Infantil",
      "description": "Tratamiento psicológico para menores con fibromialgia",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Asesoría Nutricional",
      "description": "Plan de alimentación personalizado para pacientes con fibromialgia",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Fisioterapia",
      "description": "Terapias ocupacionales y estiramientos para mejorar la movilidad",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Terapia Psico-Tanatológica",
      "description": "Acompañamiento en procesos de duelo y pérdidas significativas",
      "category": "MedicalProcedure"
    },
    {
      "@type": "MedicalService",
      "name": "Arte Terapia",
      "description": "Terapia creativa para expresión y sanación emocional",
      "category": "MedicalProcedure"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios CRESER",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Consulta Médica Integral",
          "description": "Primera consulta con entrevista inicial y valoración médica el mismo día"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalService",
          "name": "Psicoterapia Especializada",
          "description": "Sesiones individuales, de pareja e infantiles con Psic. Maricruz Ríos"
        }
      }
    ]
  },
  "foundingDate": "2010",
  "founder": {
    "@type": "Person",
    "name": "Psic. Maricruz Ríos Medina",
    "jobTitle": "Directora y Fundadora",
    "description": "Psicóloga con más de 20 años de experiencia, paciente con fibromialgia y especialista en el manejo integral de la condición"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Psic. Maricruz Ríos Medina",
      "jobTitle": "Directora y Fundadora",
      "description": "Licenciada en Psicología, Maestra en Terapia Familiar, Doctora en Tanatología, Prevetóloga Certificada"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "León",
      "addressRegion": "Guanajuato",
      "addressCountry": "MX"
    },
    {
      "@type": "State",
      "name": "Guanajuato",
      "addressCountry": "MX"
    },
    {
      "@type": "Country",
      "name": "México"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 21.1253,
      "longitude": -101.6861
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://www.facebook.com/creser.fibromialgia",
    "https://www.instagram.com/creser_fibromialgia",
    "https://twitter.com/creser_fibromialgia"
  ],
  "knowsAbout": [
    "Fibromialgia",
    "Fatiga Crónica",
    "Dolor Crónico",
    "Psicoterapia",
    "Terapia Familiar",
    "Tanatología",
    "Nutrición Clínica",
    "Fisioterapia",
    "Medicina Integrativa"
  ],
  "award": [
    "Reconocimiento a nivel nacional como única clínica especializada en fibromialgia",
    "14 años de experiencia en el manejo integral de la condición"
  ],
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Paciente CRESER"
      },
      "reviewBody": "Excelente atención integral. El equipo médico realmente entiende la fibromialgia."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Schema para servicios médicos específicos
export const medicalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalService",
  "name": "Tratamiento Integral de Fibromialgia",
  "description": "Servicio médico multidisciplinario para el manejo integral de la fibromialgia y fatiga crónica",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "CRESER A.C."
  },
  "medicalSpecialty": "Fibromialgia",
  "availableService": [
    "Consulta Médica",
    "Psicoterapia",
    "Nutrición",
    "Fisioterapia"
  ],
  "areaServed": "León, Guanajuato, México"
};

// Schema para la Psic. Maricruz Ríos
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Psic. Maricruz Ríos Medina",
  "jobTitle": "Directora y Fundadora de CRESER A.C.",
  "description": "Psicóloga especializada en fibromialgia con más de 20 años de experiencia clínica",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "CRESER A.C."
  },
  "knowsAbout": [
    "Fibromialgia",
    "Psicoterapia Individual",
    "Terapia Familiar",
    "Tanatología",
    "Prevención del Suicidio"
  ],
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "Universidad de León"
    }
  ],
  "hasCredential": [
    "Licenciada en Psicología",
    "Maestra en Terapia Familiar",
    "Doctora en Tanatología",
    "Prevetóloga Certificada"
  ],
  "workExample": [
    {
      "@type": "CreativeWork",
      "name": "Fundación de CRESER A.C.",
      "description": "Creación de la primera clínica especializada en fibromialgia reconocida a nivel nacional"
    }
  ]
};

// Schema para local business (clínica)
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CRESER A.C.",
  "description": "Clínica especializada en fibromialgia y fatiga crónica",
  "url": "https://creser-fibromialgia.vercel.app",
  "telephone": "+52-477-412-5698",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Paseo de las Águilas No. 95",
    "addressLocality": "León",
    "addressRegion": "Guanajuato",
    "postalCode": "37685",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.1253,
    "longitude": -101.6861
  },
  "openingHours": "Mo-Fr 09:00-18:00; Sa 09:00-14:00",
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "currenciesAccepted": "MXN"
};
