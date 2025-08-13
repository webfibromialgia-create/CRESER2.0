'use client';

import { Phone, MapPin, Heart, Users, Stethoscope, Brain, Utensils, Activity, ChevronDown, Star, Shield, Calendar, BookOpen, Sparkles, Zap, Target, X } from 'lucide-react';
import Particles from './components/Particles';
import ServiceCard from './components/ServiceCard';
import ValidatedForm from './components/ValidatedForm';


import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function para restaurar scroll si el componente se desmonta con modal abierto
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Restaurar scroll si el componente se desmonta con modal abierto
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // Efecto para manejar la tecla Escape en el modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  // Función para navegación suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para llamada telefónica
  const handlePhoneCall = () => {
    window.open('tel:+524774125698', '_self');
  };

  // Función para WhatsApp con feedback
  const handleWhatsApp = () => {
    setIsLoading(true);
    const message = encodeURIComponent('Hola, me gustaría solicitar información sobre los servicios de CRESER para fibromialgia.');
    window.open(`https://wa.me/524774125698?text=${message}`, '_blank');
    
    // Mostrar toast de confirmación
    setToast({ message: 'Abriendo WhatsApp...', type: 'success' });
    
    // Reset loading state after a brief delay
    setTimeout(() => {
      setIsLoading(false);
      setToast(null);
    }, 2000);
  };

  // Función para email
  const handleEmail = () => {
    const subject = encodeURIComponent('Consulta sobre servicios CRESER');
    const body = encodeURIComponent('Estimado equipo de CRESER,\n\nMe gustaría obtener más información sobre sus servicios para el manejo de fibromialgia.\n\nGracias.');
    window.open(`mailto:info@creser.org?subject=${subject}&body=${body}`, '_self');
  };

  // Función para donaciones con mensaje personalizado
  const handleSpecificDonation = (tipo: string) => {
    let mensaje = '';
    const contactoInfo = '\n\n📞 CONTACTO CRESER:\n' +
                        '• Teléfonos: (477) 412-5698 / (477) 329-5370 / (477) 132-6835\n' +
                        '• WhatsApp: (477) 412-5698\n' +
                        '• Ubicación: Av. Paseo de Las Águilas 95, San Isidro, 37685 León de los Aldama, Gto.\n' +
                        '• Horarios: Lun-Vie 9:00 AM - 6:00 PM / Sáb 9:00 AM - 2:00 PM\n\n' +
                        '¡Contáctanos para iniciar tu contribución!';
    
    switch(tipo) {
      case 'PACIENTE':
        mensaje = '¡Gracias por tu interés en contribuir como PACIENTE!\n\n' +
                 '💙 Como paciente, puedes apoyar con:\n' +
                 '• Contribución mensual solidaria desde $100 MXN\n' +
                 '• Compartir tu experiencia con otros pacientes\n' +
                 '• Participar en grupos de apoyo\n' +
                 '• Testimonios para ayudar a otros\n' +
                 '• Actividades de concientización\n\n' +
                 '🤝 Tu experiencia vivida es invaluable para nuestra comunidad.\n' +
                 'Como paciente, entiendes mejor que nadie los desafíos diarios.' +
                 contactoInfo;
        break;
        
      case 'PROFESIONISTA':
        mensaje = '¡Gracias por ofrecer tu talento profesional!\n\n' +
                 '💼 Como PROFESIONISTA puedes contribuir con:\n' +
                 '• Servicios pro bono en tu área de especialidad\n' +
                 '• Consultas voluntarias especializadas\n' +
                 '• Capacitación al equipo médico\n' +
                 '• Desarrollo de material educativo\n' +
                 '• Investigación colaborativa\n' +
                 '• Conferencias y talleres\n\n' +
                 '🎯 Especialidades que necesitamos:\n' +
                 'Medicina, Psicología, Nutrición, Fisioterapia, Trabajo Social' +
                 contactoInfo;
        break;
        
      case 'FAMILIA':
        mensaje = '¡Gracias por considerar una VAQUITA FAMILIAR!\n\n' +
                 '👨‍👩‍👧‍👦 Como familia pueden organizar:\n' +
                 '• Contribución grupal mensual\n' +
                 '• Eventos familiares benéficos\n' +
                 '• Campañas de concientización\n' +
                 '• Apoyo emocional a otros familiares\n' +
                 '• Actividades de recaudación creativas\n' +
                 '• Red de apoyo entre familias\n\n' +
                 '❤️ La fibromialgia afecta a toda la familia.\n' +
                 'Su apoyo conjunto puede crear un impacto significativo.' +
                 contactoInfo;
        break;
        
      case 'VOLUNTARIO':
        mensaje = '¡Gracias por ofrecer tu tiempo como VOLUNTARIO!\n\n' +
                 '🤝 Puedes contribuir con:\n' +
                 '• Tiempo y dedicación\n' +
                 '• Apoyo en eventos y actividades\n' +
                 '• Acompañamiento a pacientes\n' +
                 '• Ayuda administrativa\n' +
                 '• Ideas innovadoras para mejorar servicios\n' +
                 '• Organización de eventos benéficos\n' +
                 '• Apoyo en redes sociales\n\n' +
                 '⭐ Áreas donde necesitamos voluntarios:\n' +
                 'Eventos, Comunicación, Apoyo administrativo, Acompañamiento' +
                 contactoInfo;
        break;
        
      case 'EMPRESA':
        mensaje = '¡Gracias por el interés de su EMPRESA!\n\n' +
                 '🏢 Como empresa pueden obtener:\n' +
                 '• Recibo fiscal deducible de impuestos\n' +
                 '• Responsabilidad social empresarial\n' +
                 '• Donaciones desde $1,000 MXN\n' +
                 '• Patrocinio de programas específicos\n' +
                 '• Reconocimiento público en eventos\n' +
                 '• Participación en campañas de concientización\n\n' +
                 '📋 Documentos que podemos proporcionar:\n' +
                 '• Constancia de donataria autorizada\n' +
                 '• Reportes de impacto de su donación\n' +
                 '• Reconocimientos oficiales' +
                 contactoInfo;
        break;
        
      case 'NEGOCIO':
        mensaje = '¡Gracias por apoyar con su NEGOCIO!\n\n' +
                 '🛍️ Pueden contribuir con:\n' +
                 '• Donación en especie (productos/servicios)\n' +
                 '• Descuentos especiales para pacientes CRESER\n' +
                 '• Patrocinio de eventos específicos\n' +
                 '• Colaboraciones comerciales con causa social\n' +
                 '• Productos promocionales para eventos\n' +
                 '• Servicios de marketing pro bono\n\n' +
                 '🎁 Tipos de donaciones en especie que necesitamos:\n' +
                 'Material médico, tecnología, servicios profesionales, productos de bienestar' +
                 contactoInfo;
        break;
        
      default:
        mensaje = '¡Gracias por tu interés en apoyar a CRESER!\n\n' +
                 '💝 FORMAS DE DONAR:\n' +
                 '• Efectivo o transferencia bancaria\n' +
                 '• Donación mensual recurrente\n' +
                 '• Donación única\n' +
                 '• Donación en especie\n' +
                 '• Servicios profesionales\n' +
                 '• Tiempo como voluntario\n\n' +
                 '📋 REQUISITOS:\n' +
                 '• Todas las donaciones son deducibles de impuestos\n' +
                 '• Proporcionamos recibo fiscal oficial\n' +
                 '• Reportes transparentes del uso de fondos' +
                 contactoInfo;
        break;
    }
    
    alert(mensaje);
  };

  // Función general para donaciones
  const handleDonation = () => {
    const contactoInfo = '\n\n📞 CONTACTO CRESER:\n' +
                        '• Teléfonos: (477) 412-5698 / (477) 329-5370 / (477) 132-6835\n' +
                        '• WhatsApp: (477) 412-5698\n' +
                        '• Ubicación: Av. Paseo de Las Águilas 95, San Isidro, 37685 León de los Aldama, Gto.\n' +
                        '• Horarios: Lun-Vie 9:00 AM - 6:00 PM / Sáb 9:00 AM - 2:00 PM\n\n' +
                        '¡Contáctanos para conocer más opciones de donación!';

    alert('¡Gracias por tu interés en apoyar a CRESER!\n\n' +
          '💝 OPCIONES DE DONACIÓN:\n' +
          '• Paciente: Desde $100 MXN mensuales\n' +
          '• Profesionista: Servicios pro bono\n' +
          '• Familia: Vaquita grupal\n' +
          '• Voluntario: Tiempo y dedicación\n' +
          '• Empresa: Desde $1,000 MXN (deducible)\n' +
          '• Negocio: Productos y servicios\n\n' +
          '📋 BENEFICIOS:\n' +
          '• Recibo fiscal deducible de impuestos\n' +
          '• Transparencia total en el uso de fondos\n' +
          '• Reconocimiento según el tipo de donación' +
          contactoInfo);
  };

  // Función para abrir Google Maps
  const handleLocation = () => {
    const address = 'Av. Paseo de Las Águilas 95, San Isidro, 37685 León de los Aldama, Gto.';
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  // Función para manejar el envío del formulario validado
  const handleValidatedFormSubmit = (data: {
    nombre: string;
    email: string;
    telefono: string;
    consulta: string;
    aceptaTerminos: boolean;
    tipoConsulta: "general" | "medica" | "psicologica" | "nutricional" | "fisioterapia";
    mensaje?: string;
  }) => {
    console.log('Formulario validado enviado:', data);
    setFormSubmitted(true);
  };

  // Función para abrir modal de imagen
  const openImageModal = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    // Prevenir scroll usando clase CSS
    document.body.classList.add('no-scroll');
  };

  // Función para cerrar modal de imagen
  const closeImageModal = () => {
    setSelectedImage(null);
    // Restaurar scroll normal
    document.body.classList.remove('no-scroll');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white">
        <Particles />
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/logo-creser.jpg"
                alt="CRESER - Centro de Atención Integral para Fibromialgia en León, Guanajuato"
                width={120}
                height={120}
                className="mx-auto rounded-full shadow-2xl"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Centro de Atención Integral para{' '}
              <span className="text-secondary-200">Fibromialgia</span>
              <br />
              <span className="text-3xl md:text-4xl text-primary-100">
                en León, Guanajuato
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Especialistas en fibromialgia y fatiga crónica. Psicólogos, médicos y terapeutas 
              especializados en León, Guanajuato. Tratamiento integral para mejorar tu calidad de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Consulta Gratuita
              </a>
              <a
                href="#servicios"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Nuestros Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              Servicios Especializados en{' '}
              <span className="text-secondary-600">Fibromialgia</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En CRESER León, Guanajuato, ofrecemos tratamiento integral para fibromialgia 
              con psicólogos, médicos y terapeutas especializados en dolor crónico.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Psicoterapia Especializada"
              description="Psicólogos expertos en fibromialgia y dolor crónico. Terapia individual, de pareja y familiar en León, Guanajuato."
              icon="🧠"
              color="from-blue-500 to-blue-600"
              delay={0.1}
            />
            <ServiceCard
              title="Medicina Especializada"
              description="Médicos especialistas en fibromialgia con más de 14 años de experiencia. Diagnóstico y tratamiento integral en León."
              icon="🏥"
              color="from-green-500 to-green-600"
              delay={0.2}
            />
            <ServiceCard
              title="Nutrición Terapéutica"
              description="Plan de alimentación personalizado para mejorar los síntomas de fibromialgia. Nutricionistas especializados en León."
              icon="🥗"
              color="from-orange-500 to-orange-600"
              delay={0.3}
            />
            <ServiceCard
              title="Fisioterapia"
              description="Terapia física especializada para reducir el dolor y mejorar la movilidad. Fisioterapeutas expertos en fibromialgia."
              icon="💪"
              color="from-purple-500 to-purple-600"
              delay={0.4}
            />
            <ServiceCard
              title="Atención Multidisciplinaria"
              description="Equipo coordinado de especialistas trabajando juntos para tu bienestar. Centro integral de fibromialgia en León."
              icon="👥"
              color="from-red-500 to-red-600"
              delay={0.5}
            />
            <ServiceCard
              title="Seguimiento Personalizado"
              description="Acompañamiento continuo en tu proceso de recuperación. Psicólogos y médicos especializados en León, Guanajuato."
              icon="📋"
              color="from-teal-500 to-teal-600"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Acerca de Section */}
      <section id="acerca-de" className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
                  CRESER - Centro Especializado en{' '}
                  <span className="text-secondary-600">Fibromialgia</span>
                </h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Somos la única clínica reconocida a nivel nacional especializada en fibromialgia. 
                  Con más de 14 años de experiencia, brindamos atención médica, psicológica, 
                  nutricional y fisioterapéutica integral en León, Guanajuato.
                </p>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Nuestro equipo de psicólogos, médicos y terapeutas especializados en fibromialgia 
                  está comprometido con mejorar la calidad de vida de nuestros pacientes en León y toda la región.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-primary-100 p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-primary-800 mb-2">14+</div>
                    <div className="text-lg font-semibold text-primary-700 mb-2">Años de Experiencia</div>
                    <div className="text-sm text-primary-600">Especialistas en fibromialgia en León, Guanajuato</div>
                  </div>
                  <div className="bg-secondary-100 p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-secondary-800 mb-2">1000+</div>
                    <div className="text-lg font-semibold text-secondary-700 mb-2">Pacientes Atendidos</div>
                    <div className="text-sm text-secondary-600">Personas con fibromialgia ayudadas en León</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/proceso de atención multidisciplinario.jpg"
                  alt="Proceso de atención multidisciplinario CRESER - Centro de fibromialgia en León, Guanajuato"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-primary-800 mb-2">
                    Atención Integral
                  </h3>
                  <p className="text-gray-600">
                    Psicólogos, médicos y terapeutas especializados en fibromialgia trabajando juntos en León.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
                  Contacta con Nuestros{' '}
                  <span className="text-secondary-600">Especialistas</span>
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  ¿Tienes fibromialgia o conoces a alguien que la padezca? Nuestros psicólogos, 
                  médicos y terapeutas especializados en León, Guanajuato están aquí para ayudarte.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-800">Teléfono Principal</h3>
                      <p className="text-gray-600">+52 (477) 412-5698</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary-100 p-3 rounded-full">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-800">Ubicación en León</h3>
                      <p className="text-gray-600">Paseo de las Águilas No. 95, León, Guanajuato</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">WhatsApp</h3>
                      <p className="text-gray-600">Consulta directa con nuestros especialistas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-primary-800 mb-6">
                    Consulta Gratuita
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nuestros psicólogos y médicos especializados en fibromialgia en León, 
                    Guanajuato te ofrecen una consulta inicial sin costo.
                  </p>
                  <ValidatedForm onSubmit={handleValidatedFormSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Image
              src="/logo-creser.jpg"
              alt="CRESER León - Centro de fibromialgia en Guanajuato"
              width={80}
              height={80}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">
              CRESER - Centro de Atención Integral para Fibromialgia
            </h3>
            <p className="text-primary-200">
              León, Guanajuato - Especialistas en fibromialgia y dolor crónico
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Nuestros Servicios</h4>
              <ul className="space-y-2 text-primary-200">
                <li>Psicoterapia Especializada</li>
                <li>Medicina Especializada</li>
                <li>Nutrición Terapéutica</li>
                <li>Fisioterapia</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto en León</h4>
              <ul className="space-y-2 text-primary-200">
                <li>📞 (477) 412-5698</li>
                <li>📍 Paseo de las Águilas 95</li>
                <li>🏙️ León, Guanajuato</li>
                <li>💬 WhatsApp disponible</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horarios de Atención</h4>
              <ul className="space-y-2 text-primary-200">
                <li>Lunes a Viernes: 9:00 - 18:00</li>
                <li>Sábados: 9:00 - 14:00</li>
                <li>Domingos: Cerrado</li>
                <li>Emergencias: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-700 pt-8">
            <p className="text-primary-200">
              © 2024 CRESER A.C. - Centro de Atención Integral para Fibromialgia en León, Guanajuato. 
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {formSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              ¡Consulta Agendada!
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestros especialistas en fibromialgia en León, Guanajuato se pondrán en contacto contigo pronto.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
