'use client';

import { medicalOrganizationSchema, medicalServiceSchema, personSchema, localBusinessSchema } from '@/lib/schema';

interface SEOSchemaProps {
  type: 'organization' | 'service' | 'person' | 'business';
  additionalData?: any;
}

export default function SEOSchema({ type, additionalData }: SEOSchemaProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          ...medicalOrganizationSchema,
          ...additionalData
        };
      case 'service':
        return {
          ...medicalServiceSchema,
          ...additionalData
        };
      case 'person':
        return {
          ...personSchema,
          ...additionalData
        };
      case 'business':
        return {
          ...localBusinessSchema,
          ...additionalData
        };
      default:
        return medicalOrganizationSchema;
    }
  };

  const schema = getSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}

// Componente especializado para la página principal
export function CRESEROrganizationSchema() {
  return <SEOSchema type="organization" />;
}

// Componente para servicios médicos
export function MedicalServiceSchema() {
  return <SEOSchema type="service" />;
}

// Componente para la Psic. Maricruz Ríos
export function MaricruzRiosSchema() {
  return <SEOSchema type="person" />;
}

// Componente para la clínica como negocio local
export function LocalBusinessSchema() {
  return <SEOSchema type="business" />;
}
