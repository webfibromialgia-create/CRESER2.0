'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Esquema de validación con Zod
const contactFormSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  email: z.string()
    .email('Ingresa un email válido')
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números, espacios, guiones y paréntesis'),
  
  consulta: z.string()
    .min(10, 'La consulta debe tener al menos 10 caracteres')
    .max(200, 'La consulta no puede exceder 200 caracteres'),
  
  mensaje: z.string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(500, 'El mensaje no puede exceder 500 caracteres')
    .optional(),
  
  aceptaTerminos: z.boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones'),
  
  tipoConsulta: z.enum(['general', 'medica', 'psicologica', 'nutricional', 'fisioterapia'])
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ValidatedFormProps {
  onSubmit: (data: ContactFormData) => void;
  isLoading?: boolean;
}

export default function ValidatedForm({ onSubmit, isLoading = false }: ValidatedFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  const watchedFields = watch();
  const isFormValid = isValid && Object.keys(errors).length === 0;

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      await onSubmit(data);
      setShowSuccess(true);
      reset();
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  const getFieldError = (fieldName: keyof ContactFormData) => {
    return errors[fieldName]?.message;
  };

  const getFieldStatus = (fieldName: keyof ContactFormData) => {
    const hasError = getFieldError(fieldName);
    const hasValue = watchedFields[fieldName];
    
    if (hasError) return 'error';
    if (hasValue) return 'success';
    return 'neutral';
  };

  const getStatusIcon = (status: 'error' | 'success' | 'neutral') => {
    switch (status) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getInputClasses = (fieldName: keyof ContactFormData) => {
    const status = getFieldStatus(fieldName);
    const baseClasses = "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch (status) {
      case 'error':
        return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
      case 'success':
        return `${baseClasses} border-green-300 focus:ring-green-500 bg-green-50`;
      default:
        return `${baseClasses} border-gray-300 focus:ring-creser-blue bg-white`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <h4 className="font-semibold text-green-800">¡Formulario enviado exitosamente!</h4>
            <p className="text-green-600 text-sm">Nos pondremos en contacto contigo pronto.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <div className="relative">
            <input
              {...register('nombre')}
              type="text"
              id="nombre"
              className={getInputClasses('nombre')}
              placeholder="Ingresa tu nombre completo"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon(getFieldStatus('nombre'))}
            </div>
          </div>
          {getFieldError('nombre') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('nombre')}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              id="email"
              className={getInputClasses('email')}
              placeholder="tu@email.com"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon(getFieldStatus('email'))}
            </div>
          </div>
          {getFieldError('email') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('email')}</span>
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <div className="relative">
            <input
              {...register('telefono')}
              type="tel"
              id="telefono"
              className={getInputClasses('telefono')}
              placeholder="(477) 123-4567"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getStatusIcon(getFieldStatus('telefono'))}
            </div>
          </div>
          {getFieldError('telefono') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('telefono')}</span>
            </p>
          )}
        </div>

        {/* Tipo de Consulta */}
        <div>
          <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de consulta *
          </label>
          <select
            {...register('tipoConsulta')}
            id="tipoConsulta"
            className={getInputClasses('tipoConsulta')}
          >
            <option value="">Selecciona el tipo de consulta</option>
            <option value="general">Consulta general</option>
            <option value="medica">Consulta médica</option>
            <option value="psicologica">Consulta psicológica</option>
            <option value="nutricional">Consulta nutricional</option>
            <option value="fisioterapia">Consulta de fisioterapia</option>
          </select>
          {getFieldError('tipoConsulta') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('tipoConsulta')}</span>
            </p>
          )}
        </div>

        {/* Consulta */}
        <div>
          <label htmlFor="consulta" className="block text-sm font-medium text-gray-700 mb-2">
            Consulta específica *
          </label>
          <textarea
            {...register('consulta')}
            id="consulta"
            rows={3}
            className={getInputClasses('consulta')}
            placeholder="Describe brevemente tu consulta"
          />
          {getFieldError('consulta') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('consulta')}</span>
            </p>
          )}
        </div>

        {/* Mensaje adicional */}
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje adicional (opcional)
          </label>
          <textarea
            {...register('mensaje')}
            id="mensaje"
            rows={4}
            className={getInputClasses('mensaje')}
            placeholder="Información adicional que consideres importante..."
          />
          {getFieldError('mensaje') && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{getFieldError('mensaje')}</span>
            </p>
          )}
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start space-x-3">
          <input
            {...register('aceptaTerminos')}
            type="checkbox"
            id="aceptaTerminos"
            className="w-4 h-4 text-creser-blue border-gray-300 rounded focus:ring-creser-blue focus:ring-2 mt-1"
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-gray-700">
            Acepto los{' '}
            <a href="#" className="text-creser-blue hover:text-creser-dark underline">
              términos y condiciones
            </a>
            {' '}y la{' '}
            <a href="#" className="text-creser-blue hover:text-creser-dark underline">
              política de privacidad
            </a>
            *
          </label>
        </div>
        {getFieldError('aceptaTerminos') && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{getFieldError('aceptaTerminos')}</span>
          </p>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting || isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            isFormValid && !isSubmitting && !isLoading
              ? 'bg-creser-blue hover:bg-creser-dark text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting || isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Enviar consulta</span>
            </>
          )}
        </button>

        {/* Indicador de progreso */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Campos requeridos marcados con *</span>
          <span className={`font-medium ${
            isFormValid ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isFormValid ? 'Formulario válido' : 'Completa todos los campos'}
          </span>
        </div>
      </form>
    </div>
  );
}
