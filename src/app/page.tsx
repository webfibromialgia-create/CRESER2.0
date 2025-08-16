'use client';

import { Phone, MapPin, Heart, Users, Stethoscope, Brain, Utensils, Activity, ChevronDown, Star, Shield, Calendar, BookOpen, Sparkles, Zap, Target, X, Youtube, Facebook, MessageCircle, Play, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [tiktokScrollPosition, setTiktokScrollPosition] = useState(0);
  const [facebookScrollPosition, setFacebookScrollPosition] = useState(0);

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

  // Función para abrir el aviso de privacidad
  const handlePrivacyPolicy = () => {
    window.open('/aviso-privacidad.pdf', '_blank');
  };

  // Función para redes sociales
  const handleSocialMedia = (platform: string) => {
    const urls = {
      youtube: 'https://m.youtube.com/@creserleon',
      facebook: 'https://www.facebook.com/share/oprV6AZNcUoABDnL/',
      whatsapp: 'https://bit.ly/CentroCreserSaludIntegralparatuFamilia',
      tiktok: 'https://www.tiktok.com/@creserfibromialgia'
    };
    
    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank');
      setToast({ message: `Abriendo ${platform}...`, type: 'success' });
      setTimeout(() => setToast(null), 2000);
    }
  };

  // Función para abrir testimonios
  const handleTestimonio = (url: string) => {
    window.open(url, '_blank');
    setToast({ message: 'Abriendo testimonio...', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  // Funciones para el carrusel de testimonios
  const scrollTestimonios = (direction: 'left' | 'right', type: 'tiktok' | 'facebook') => {
    if (typeof window === 'undefined') return; // No ejecutar durante SSR
    
    const cardWidth = 320; // Ancho de cada tarjeta (w-80 = 320px)
    const gap = 16; // gap-4 = 16px
    const scrollAmount = cardWidth + gap;
    const containerWidth = window.innerWidth - 32; // Ancho del contenedor menos padding
    const visibleCards = Math.floor(containerWidth / scrollAmount);
    
    if (type === 'tiktok') {
      const totalCards = 8;
      const maxScroll = Math.max(0, (totalCards - visibleCards) * scrollAmount);
      
      const newPosition = direction === 'left' 
        ? Math.max(0, tiktokScrollPosition - scrollAmount)
        : Math.min(maxScroll, tiktokScrollPosition + scrollAmount);
      setTiktokScrollPosition(newPosition);
    } else {
      const totalCards = 2;
      const maxScroll = Math.max(0, (totalCards - visibleCards) * scrollAmount);
      
      const newPosition = direction === 'left' 
        ? Math.max(0, facebookScrollPosition - scrollAmount)
        : Math.min(maxScroll, facebookScrollPosition + scrollAmount);
      setFacebookScrollPosition(newPosition);
    }
  };

  // Funciones para verificar si los botones deben estar habilitados
  const canScrollLeft = (type: 'tiktok' | 'facebook') => {
    return type === 'tiktok' ? tiktokScrollPosition > 0 : facebookScrollPosition > 0;
  };

  const canScrollRight = (type: 'tiktok' | 'facebook') => {
    if (typeof window === 'undefined') return true; // Durante SSR, permitir scroll
    
    const cardWidth = 320;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    const containerWidth = window.innerWidth - 32;
    const visibleCards = Math.floor(containerWidth / scrollAmount);
    
    if (type === 'tiktok') {
      const totalCards = 8;
      const maxScroll = Math.max(0, (totalCards - visibleCards) * scrollAmount);
      return tiktokScrollPosition < maxScroll;
    } else {
      const totalCards = 2;
      const maxScroll = Math.max(0, (totalCards - visibleCards) * scrollAmount);
      return facebookScrollPosition < maxScroll;
    }
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
  const handleValidatedFormSubmit = async (data: {
    nombre: string;
    email: string;
    telefono: string;
    tipoConsulta: string;
    consulta: string;
    mensaje?: string;
  }) => {
    setIsLoading(true);
    
    // Aquí se podría integrar con un backend real
    console.log('Datos del formulario validado:', data);
    
    // Crear mensaje para WhatsApp con los datos del formulario
    const whatsappMessage = encodeURIComponent(
      `*Solicitud de Consulta CRESER*\n\n` +
      `*Nombre:* ${data.nombre}\n` +
      `*Email:* ${data.email}\n` +
      `*Teléfono:* ${data.telefono}\n` +
      `*Tipo de consulta:* ${data.tipoConsulta}\n` +
      `*Consulta:* ${data.consulta}\n` +
      `*Mensaje adicional:* ${data.mensaje || 'No especificado'}`
    );
    
    // Simulación de envío con feedback
    setTimeout(() => {
      window.open(`https://wa.me/524774125698?text=${whatsappMessage}`, '_blank');
      
      // Mostrar confirmación con toast
      setToast({ message: 'Formulario enviado exitosamente. Abriendo WhatsApp...', type: 'success' });
      
      setIsLoading(false);
    }, 1000);
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
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <header className="gradient-primary text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-black/90 border-b border-white/10">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="relative">
                <Image
                  src="/logo-creser.jpg" 
                  alt="Logo CRESER - Asociación para el Manejo Integral de la Fibromialgia"
                  width={80}
                  height={80}
                  className="md:w-20 md:h-20 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
                  priority
                  sizes="(max-width: 768px) 60px, 80px"
                  quality={90}
                />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-glow font-display">CRESER</h1>
                <p className="text-xs md:text-sm opacity-90 font-medium hidden sm:block">Centro de Atención Integral • Fibromialgia</p>
              </div>
            </div>
            <nav className="hidden lg:flex space-x-8">
              {[
                { name: 'Inicio', icon: <Sparkles className="w-4 h-4" />, action: () => scrollToSection('inicio') },
                { name: 'Acerca de', icon: <Heart className="w-4 h-4" />, action: () => scrollToSection('acerca-de') },
                { name: 'Servicios', icon: <Stethoscope className="w-4 h-4" />, action: () => scrollToSection('servicios') },
                { name: 'Información', icon: <BookOpen className="w-4 h-4" />, action: () => scrollToSection('informacion') },
                { name: 'Contacto', icon: <Phone className="w-4 h-4" />, action: () => scrollToSection('contacto') }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={item.action}
                  className="relative group hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-white/10"
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </nav>
            
            {/* Mobile menu - simplified */}
            <div className="lg:hidden flex items-center space-x-3">
              <button 
                onClick={() => scrollToSection('servicios')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Servicios"
              >
                <Stethoscope className="w-5 h-5" />
              </button>
            <button 
              onClick={() => scrollToSection('contacto')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Contacto"
            >
              <Phone className="w-5 h-5" />
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Revolutionary Hero Section */}
      <section id="inicio" className="hero-bg text-white py-8 md:py-16 lg:py-24 relative overflow-hidden min-h-screen flex items-center">
        <Particles />
        
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 w-16 md:w-32 h-16 md:h-32 rounded-full bg-gradient-to-br from-yellow-400/30 to-transparent blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-24 md:w-48 h-24 md:h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`${isVisible ? 'fade-in' : 'opacity-0'} max-w-7xl mx-auto`}>
                        <div className="max-w-5xl mx-auto text-center space-y-8">
              {/* Main headline with enhanced typography */}
              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-300" />
                  <span className="text-xs md:text-sm font-medium">Centro Especializado en Fibromialgia</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight">
                  Centro de Atención
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 text-glow">
                    Integral
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 md:mt-4 text-blue-200">
                    FIBROMIALGIA
                  </span>
                </h1>
              </div>

              {/* Enhanced subtitle */}
              <div className="max-w-3xl mx-auto">
                <div className="glass-card p-4 md:p-6 rounded-2xl">
                  <p className="text-sm md:text-lg lg:text-xl opacity-90 leading-relaxed">
                    <span className="font-semibold text-yellow-200">OSC Asociación para el Manejo Integral y Preventivo</span> de la Fibromialgia y la Fatiga Crónica{' '}
                    <span className="font-bold text-yellow-300">CRESER A.C.</span>
                  </p>
                </div>
              </div>

              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mt-8 md:mt-12">
                <button 
                  onClick={handleWhatsApp} 
                  disabled={isLoading}
                  className="btn-primary group w-full sm:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                    <Phone className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                    )}
                    <span>{isLoading ? 'Conectando...' : 'Contactar Ahora'}</span>
                  </span>
                </button>
                <button onClick={handleDonation} className="btn-secondary group w-full sm:w-auto">
                  <span className="flex items-center justify-center space-x-2">
                    <Heart className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                    <span>Apoyar la Causa</span>
                  </span>
                </button>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 max-w-4xl mx-auto">
                {[
                  { number: '4', label: 'Áreas Especializ.', icon: <Stethoscope className="w-4 md:w-6 h-4 md:h-6" /> },
                  { number: '24/7', label: 'Apoyo Disponible', icon: <Heart className="w-4 md:w-6 h-4 md:h-6" /> },
                  { number: 'León', label: 'Guanajuato', icon: <MapPin className="w-4 md:w-6 h-4 md:h-6" /> },
                  { number: 'CRESER', label: 'A.C.', icon: <Shield className="w-4 md:w-6 h-4 md:h-6" /> }
                ].map((stat, index) => (
                  <div key={index} className="glass-card p-4 md:p-6 rounded-xl text-center hover-lift">
                    <div className="text-yellow-300 mb-2 md:mb-3 flex justify-center">{stat.icon}</div>
                    <div className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.number}</div>
                    <div className="text-xs md:text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        
        {/* Enhanced scroll indicator */}
        <button 
          onClick={() => scrollToSection('acerca-de')}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator hover:scale-110 transition-transform"
        >
          <ChevronDown className="w-6 md:w-8 h-6 md:h-8 text-yellow-300" />
        </button>
      </section>

      {/* Vision & Mission Section */}
      <section id="acerca-de" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="section-divider"></div>
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Encabezado Principal */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Quiénes Somos</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 text-gradient">
              Nuestra 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Identidad
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conoce los principios, objetivos y valores que definen nuestro compromiso con la comunidad de fibromialgia
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-8"></div>
          </div>

          {/* Sección principal con 3 columnas */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Columna 1: Visión */}
            <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
              <div className="card-glow bg-white/70 backdrop-blur-sm p-8 rounded-3xl h-full border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Visión</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              </div>
                <div className="text-center mb-6">
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    Aspiramos a transformar vidas
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  CRESER A.C. aspira a ser un centro de atención que contribuya a mejorar la calidad de vida de los pacientes con fibromialgia y sus familias, a través de la información, el re-aprendizaje y la contención.
                </p>
              </div>
              </div>
              
            {/* Columna 2: Misión */}
            <div className={`${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
              <div className="card-glow bg-white/70 backdrop-blur-sm p-8 rounded-3xl h-full border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Misión</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto rounded-full"></div>
                  </div>
                <div className="text-center mb-6">
                  <span className="inline-block bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    Herramientas para el bienestar
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Brindar a nuestros visitantes herramientas terapéuticas necesarias para afrontar de manera favorable la fibromialgia, promoviendo un manejo efectivo a través de tratamientos personalizados.
                </p>
              </div>
            </div>
            
            {/* Columna 3: Valores */}
            <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
              <div className="card-glow bg-white/70 backdrop-blur-sm p-8 rounded-3xl h-full border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Valores</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"></div>
                </div>
                <div className="text-center mb-6">
                  <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                    Principios que nos guían
                  </span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      icon: <Heart className="w-4 h-4" />, 
                      title: 'Respeto', 
                      color: 'from-red-500 to-pink-500' 
                    },
                    { 
                      icon: <Shield className="w-4 h-4" />, 
                      title: 'Compromiso', 
                      color: 'from-blue-500 to-cyan-500' 
                    },
                    { 
                      icon: <Star className="w-4 h-4" />, 
                      title: 'Profesionalismo', 
                      color: 'from-yellow-500 to-orange-500' 
                    },
                    { 
                      icon: <Users className="w-4 h-4" />, 
                      title: 'Responsabilidad', 
                      color: 'from-green-500 to-emerald-500' 
                    },
                    { 
                      icon: <Brain className="w-4 h-4" />, 
                      title: 'Atención Personalizada', 
                      color: 'from-purple-500 to-violet-500' 
                    },
                    { 
                      icon: <Activity className="w-4 h-4" />, 
                      title: 'Humanidad', 
                      color: 'from-indigo-500 to-blue-500' 
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-200">
                      <div className={`w-8 h-8 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          {value.icon}
                        </div>
                      <span className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                            {value.title}
                      </span>
                        </div>
                  ))}
                      </div>
                    </div>
            </div>
                </div>
                
          {/* Sección final motivacional */}
          <div className="mt-20 text-center">
            <div className="card-glow bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 md:p-12 rounded-3xl border border-white/50 shadow-xl max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Comprometidos con el
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Bienestar</span>
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Estos principios fundamentales nos impulsan a brindar la mejor atención posible, 
                creando un ambiente de confianza y esperanza para toda nuestra comunidad.
              </p>
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-gray-800 font-medium">Juntos hacia una mejor calidad de vida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Services Section */}
      <section id="servicios" className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-full mb-6">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Atención Multidisciplinaria</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Nuestros Servicios</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ofrecemos atención integral especializada en cuatro áreas fundamentales para el manejo completo de la fibromialgia y fatiga crónica
            </p>
          </div>
          
          {/* Imagen destacada de servicios y procedimiento */}
          <div className="mb-16">
            <div className="card-glow p-8 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Atención Integral Especializada</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    CRESER tiene 14 años trabajando con pacientes que tienen fibromialgia, siendo la única clínica 
                    reconocida a nivel nacional. Fue fundada por la Maestra Maricruz Ríos, quien es una paciente 
                    con fibromialgia que comprende profundamente las necesidades de quienes viven con esta condición.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Médicos Especialistas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Psicólogos Clínicos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Nutricionistas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Fisioterapeutas</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="/proceso de atención multidisciplinario.jpg"
                    alt="Proceso de atención multidisciplinario en CRESER"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-lg w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Procedimiento de Tratamiento */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Procedimiento de Tratamiento</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestro proceso estructurado garantiza una atención personalizada y efectiva desde el primer contacto
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Entrevista Inicial",
                  description: "Apertura de expediente y evaluación de signos y síntomas para conocer cómo recibimos al paciente",
                  icon: <Users className="w-6 h-6" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "2", 
                  title: "Valoración Médica",
                  description: "El paciente recibe diagnóstico médico especializado y tratamiento personalizado",
                  icon: <Stethoscope className="w-6 h-6" />,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  step: "3",
                  title: "Valoración Psicológica", 
                  description: "Evaluación psicológica integral para abordar el impacto emocional de la fibromialgia",
                  icon: <Brain className="w-6 h-6" />,
                  color: "from-purple-500 to-violet-500"
                },
                {
                  step: "4",
                  title: "Valoración Nutricional",
                  description: "Asesoramiento nutricional especializado para complementar el tratamiento integral",
                  icon: <Utensils className="w-6 h-6" />,
                  color: "from-yellow-500 to-orange-500"
                }
              ].map((item, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl hover-lift transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto`}>
                    {item.step}
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto`}>
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 text-center">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-blue-50 p-8 rounded-2xl border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <Calendar className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-blue-800 mb-2">Proceso de Inicio</h4>
                  <p className="text-blue-700">
                    <strong>Ofrecemos inicialmente:</strong> Entrevista inicial y valoración médica el mismo día para 
                    optimizar tu tiempo y comenzar inmediatamente con el proceso de diagnóstico y tratamiento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <ServiceCard
              icon={<Stethoscope />}
              title="Medicina"
              description="Atención médica especializada con enfoque integral bio-psicológico-social. Consultas presenciales y en línea disponibles."
              color="#6B83BD"
              delay={0.1}
            />
            <ServiceCard
              icon={<Brain />}
              title="Psicología"
              description="Soporte emocional y terapias para manejar el impacto psicológico, incluyendo manejo de crisis emocionales."
              color="#554781"
              delay={0.2}
            />
            <ServiceCard
              icon={<Utensils />}
              title="Nutrición"
              description="Asesoramiento nutricional personalizado para mejorar la salud general y mitigar síntomas específicos."
              color="#B39A41"
              delay={0.3}
            />
            <ServiceCard
              icon={<Activity />}
              title="Fisioterapia"
              description="Terapias ocupacionales y estiramientos suaves para aliviar el dolor y mejorar la movilidad funcional."
              color="#2F5C78"
              delay={0.4}
            />
          </div>


                  </div>
      </section>

      {/* Sección Personal Médico */}
      <section id="personal-medico" className="py-24 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full mb-6">
              <Stethoscope className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Equipo Médico Profesional</span>
                </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Personal Médico</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conoce a nuestro equipo médico especializado en fibromialgia y dolor crónico, 
              comprometido con brindar atención integral y personalizada a cada paciente
            </p>
          </div>

          {/* Grid de Personal Médico */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Personal Médico Principal */}
            <div className="glass-card p-8 rounded-3xl hover-lift">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Personal médico.jpg", "Personal Médico - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src="/Personal médico.jpg"
                    alt="Personal Médico CRESER"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover object-[center_20%] cursor-pointer"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Medicina Especializada</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Diagnóstico y tratamiento médico integral para fibromialgia y dolor crónico con 
                enfoque personalizado para cada paciente.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Especialidades:</h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">• Medicina del Dolor</p>
                  <p className="text-sm text-gray-700">• Reumatología</p>
                  <p className="text-sm text-gray-700">• Medicina Interna</p>
                  <p className="text-sm text-gray-700">• Fibromialgia y Fatiga Crónica</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="text-sm text-green-700">
                  <strong>Consultas:</strong> Presenciales y en línea disponibles
                </p>
              </div>
            </div>

            {/* Equipo Médico Integral */}
            <div className="glass-card p-8 rounded-3xl hover-lift">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Personal medico 2.jpg", "Equipo Médico Integral - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src="/Personal medico 2.jpg"
                    alt="Equipo Médico Integral CRESER"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover object-[center_20%] cursor-pointer"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Equipo Multidisciplinario</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Colaboración médica coordinada para brindar atención integral en todas las 
                áreas del manejo de fibromialgia.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Áreas de cobertura:</h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">• Diagnóstico especializado</p>
                  <p className="text-sm text-gray-700">• Manejo farmacológico</p>
                  <p className="text-sm text-gray-700">• Seguimiento clínico</p>
                  <p className="text-sm text-gray-700">• Evaluación integral</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm text-blue-700">
                  <strong>Enfoque:</strong> Atención personalizada y humanizada
                </p>
              </div>
            </div>

            {/* Profesionales Especializados */}
            <div className="glass-card p-8 rounded-3xl hover-lift">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Psicoterapia por profesionales.jpg", "Profesionales Especializados - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src="/Psicoterapia por profesionales.jpg"
                    alt="Profesionales Especializados CRESER"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover cursor-pointer"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Profesionales Certificados</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Equipo de profesionales de la salud con certificaciones especializadas 
                en el manejo de fibromialgia, trabajando bajo protocolos de atención estandarizados.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Certificaciones:</h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">• Manejo de Dolor Crónico</p>
                  <p className="text-sm text-gray-700">• Fibromialgia Especializada</p>
                  <p className="text-sm text-gray-700">• Medicina Integrativa</p>
                  <p className="text-sm text-gray-700">• Protocolos CRESER</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <p className="text-sm text-purple-700">
                  <strong>Compromiso:</strong> Actualización continua y excelencia profesional
                </p>
              </div>
            </div>
          </div>

          {/* Información adicional del equipo médico */}
          <div className="glass-card p-8 rounded-3xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Nuestro Compromiso Médico</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Nuestro equipo médico se especializa en el manejo integral de la fibromialgia, 
              combinando experiencia clínica, conocimiento científico actualizado y una 
              aproximación humana centrada en el paciente.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-green-800 mb-3">Diagnóstico Preciso</h4>
                <p className="text-green-700 text-sm">
                  Evaluación integral utilizando criterios médicos actualizados 
                  para un diagnóstico certero de fibromialgia.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-blue-800 mb-3">Tratamiento Personalizado</h4>
                <p className="text-blue-700 text-sm">
                  Planes de tratamiento individualizados según las necesidades 
                  específicas de cada paciente.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-purple-800 mb-3">Atención Integral</h4>
                <p className="text-purple-700 text-sm">
                  Coordinación con psicología, nutrición y fisioterapia 
                  para un abordaje completo.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={handleWhatsApp} className="btn-primary w-full sm:w-auto">
                <span className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Contactar Especialista</span>
                </span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Sección de Psicoterapia Especializada */}
      <section id="psicoterapia" className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-6 py-3 rounded-full mb-6">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Servicios Psicológicos Especializados</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Psicoterapia Integral</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Servicios psicológicos especializados dirigidos por la <strong>Psic. Maricruz Ríos Medina</strong>, 
              con más de 20 años de experiencia y formación especializada en múltiples áreas terapéuticas
            </p>
          </div>

          {/* Perfil profesional */}
          <div className="mb-16">
            <div className="card-glow p-8 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <Image
                    src="/Psicoterapia por profesionales.jpg"
                    alt="Psic. Maricruz Ríos Medina - Directora CRESER"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-lg w-full h-auto"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Psic. Maricruz Ríos Medina</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Directora y fundadora de CRESER, con una comprensión única de la fibromialgia al ser 
                    paciente y profesional especializada. Su enfoque combina experiencia clínica con 
                    empatía personal hacia quienes viven con esta condición.
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: "🎓", text: "Licenciada en Psicología" },
                      { icon: "👨‍👩‍👧‍👦", text: "Maestra en Terapia Familiar" },
                      { icon: "🕊️", text: "Doctora en Tanatología" },
                      { icon: "🔒", text: "Prevetóloga Certificada" },
                      { icon: "🏛️", text: "Ex-Directora de Atención a la Infancia en DIF León (4 años)" },
                      { icon: "📚", text: "Catedrática Universitaria" },
                      { icon: "⭐", text: "Más de 20 años de experiencia clínica" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-gray-700 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios de psicoterapia */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 auto-rows-fr">
            {/* Psicoterapia Individual */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Psicoterapia por profesionales.jpg", "Psicoterapia Individual - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                    src="/Psicoterapia por profesionales.jpg"
                  alt="Psicoterapia Individual"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Psicoterapia Individual</h4>
              <p className="text-sm text-purple-600 font-medium mb-3">PRESENCIAL / EN LÍNEA • 60 minutos</p>
              
              {/* Destacar a Maricruz como fundadora */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl mb-4 border border-purple-100">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-semibold text-purple-800 mb-1">
                      Con Psic. Maricruz Ríos Medina
                    </p>
                    <p className="text-xs text-purple-600">
                      Directora y Fundadora de CRESER • Especialista en Fibromialgia
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tratamiento colaborativo basado en la relación terapéutica, en un ambiente de apoyo, 
                confiabilidad y honestidad para identificar y cambiar patrones de pensamiento y comportamiento.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Tratamos:</h5>
                {[
                  "🫣 Trastornos de ansiedad",
                  "😟 Trastornos del estado de ánimo", 
                  "😖 Adicciones",
                  "🤢 Trastornos de la alimentación",
                  "😩 Trastornos de la personalidad"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Contactar para Información
              </button>
            </div>

            {/* Psicoterapia de Pareja */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Psicoterapia todo tipo de parejas.jpg", "Psicoterapia de Pareja - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/Psicoterapia todo tipo de parejas.jpg"
                  alt="Psicoterapia de Pareja"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Psicoterapia de Pareja</h4>
              <p className="text-sm text-pink-600 font-medium mb-3">PRESENCIAL • 90 minutos</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Espacio para analizar problemas, conflictos y desacuerdos entre parejas, creando soluciones 
                para RE-significar el vínculo o cerrarlo de manera sana y voluntaria desde el amor.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Abordamos:</h5>
                {[
                  "👩‍❤‍👨 Heridas de la infancia que repercutan en la relación",
                  "👨‍❤️‍💋‍👨 Comunicación, asertividad e inteligencia en la pareja",
                  "👩‍❤️‍👩 El perdón en la pareja", 
                  "👩‍❤‍💋‍👨 Acuerdos y restructuraciones de límites"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Contactar para Información
              </button>
            </div>

            {/* Psicoterapia Infantil */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/atencion infantil.jpg", "Psicoterapia Infantil - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/atencion infantil.jpg"
                  alt="Psicoterapia Infantil"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover object-[center_25%] cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Psicoterapia Infantil</h4>
              <p className="text-sm text-green-600 font-medium mb-3">PRESENCIAL • 60 minutos</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Proceso de análisis y tratamiento especializado para menores de 11 años, 
                con valoración psicométrica integral y planeación de tratamiento personalizado.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Proceso:</h5>
                {[
                  "1. Entrevista inicial (menor con padres/tutores)",
                  "2. Seis sesiones de valoración psicométrica completa",
                  "3. Devolución de diagnóstico y planeación",
                  "4. Inicio de proceso terapéutico personalizado"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Consulta Infantil
              </button>
            </div>

            {/* Psicoterapia para Personal de Salud */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Para pagina 11 (Atencion a personal medico).jpg", "Personal del Área de Salud - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/Para pagina 11 (Atencion a personal medico).jpg"
                  alt="Psicoterapia para Personal de Salud"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Personal del Área de Salud</h4>
              <p className="text-sm text-blue-600 font-medium mb-3">OCTUBRE - MES DE LA SALUD MENTAL • 60 minutos</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Atención especializada para trabajadores de la salud, considerando las demandas únicas 
                de su profesión: turnos rotativos, exposición al sufrimiento y alta carga emocional.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Atendemos:</h5>
                {[
                  "📍 Ansiedad",
                  "📍 Depresión",
                  "📍 Ideación e intento suicida",
                  "📍 Acompañamiento tanatológico",
                  "📍 Relaciones interpersonales",
                  "📍 Proyecto de vida"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Atención Especializada
              </button>
            </div>

            {/* Terapia Psico-Tanatológica */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Atencion tanatologica.jpg", "Terapia Psico-Tanatológica - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/Atencion tanatologica.jpg"
                  alt="Terapia Psico-Tanatológica"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Terapia Psico-Tanatológica</h4>
              <p className="text-sm text-indigo-600 font-medium mb-3">PRESENCIAL • 60 minutos</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Espacio terapéutico especializado que proporciona ayuda, acompañamiento y estrategias 
                de afrontamiento durante procesos de duelo y pérdidas significativas.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Tipos de duelo:</h5>
                {[
                  "🕊 Pérdida de una pareja",
                  "🕊 Pérdida de una mascota",
                  "🕊 Pérdida de la salud",
                  "🕊 Pérdida de algún órgano o extremidad corporal"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Acompañamiento Tanatológico
              </button>
            </div>

            {/* Arte Terapia */}
            <div className="glass-card p-8 rounded-3xl hover-lift flex flex-col h-full">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Arte terapia.jpg", "Arte Terapia - CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/Arte terapia.jpg"
                  alt="Arte Terapia"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover object-[center_15%] cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Arte Terapia</h4>
              <p className="text-sm text-yellow-600 font-medium mb-3">PRESENCIAL • Sesiones grupales e individuales</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Terapia creativa que utiliza el arte como medio de expresión y sanación, 
                especialmente beneficiosa para pacientes con fibromialgia al ofrecer una forma 
                no verbal de procesar emociones y dolor.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Beneficios:</h5>
                {[
                  "🎨 Expresión creativa sin palabras",
                  "🎨 Liberación de tensiones emocionales",
                  "🎨 Mejora del estado de ánimo",
                  "🎨 Desarrollo de nuevas formas de comunicación",
                  "🎨 Fortalecimiento de la autoestima"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleWhatsApp} className="w-full btn-primary text-sm py-3 mt-auto">
                Conocer Arte Terapia
              </button>
            </div>
          </div>

          {/* Información de contacto para psicoterapia */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Contacto Directo</h3>
              <p className="text-gray-600">Contacta directamente con nuestros especialistas</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Teléfonos Directos</h4>
                <p className="text-gray-600">📱 477 132-6835</p>
                <p className="text-gray-600">📱 477 412-5698</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Ubicación</h4>
                <p className="text-gray-600">Paseo de las Águilas No. 95</p>
                <p className="text-gray-600">Col. San Isidro, León Gto.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={handleWhatsApp} className="btn-primary">
                <span className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>WhatsApp: Profesionales para tu Salud Integral</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del Equipo de Apoyo Integral */}
      <section id="equipo" className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-6 py-3 rounded-full mb-6">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-800 font-medium">Equipo de Apoyo y Bienestar</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Equipo de Apoyo Integral</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conoce al equipo de apoyo especializado que complementa la atención médica, 
              brindando servicios de bienestar y soporte administrativo integral
            </p>
          </div>

          {/* Imagen del personal de la asociación */}
          <div className="mb-16">
            <div className="card-glow p-8 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <Image
                    src="/Para pagina 10 (PERSONAL DE LA ASOCIACIÓN).jpg"
                    alt="Personal de la Asociación CRESER"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-lg w-full h-auto"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Equipo de Apoyo Administrativo</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Nuestro equipo de apoyo administrativo y operativo complementa la atención médica, 
                    garantizando una experiencia integral y coordinada. Cada miembro del equipo está 
                    comprometido con brindar soporte especializado en diferentes áreas de la organización.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Coordinación de Servicios</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Atención al Paciente</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Gestión Administrativa</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Apoyo Logístico</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal profesional detallado */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Atención a Personal Médico */}
            <div className="glass-card p-8 rounded-3xl hover-lift">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Para pagina 12 (Atencion a personal medico).jpg", "Atención a Personal Médico")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src="/Para pagina 12 (Atencion a personal medico).jpg"
                    alt="Atención a Personal Médico"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover cursor-pointer"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Atención a Personal Médico</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Programas especializados de bienestar y apoyo psicológico dirigidos específicamente 
                a profesionales de la salud, reconociendo las demandas únicas de su profesión.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Servicios:</h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">• Manejo del estrés laboral</p>
                  <p className="text-sm text-gray-700">• Prevención del burnout</p>
                  <p className="text-sm text-gray-700">• Apoyo en duelo por pérdida de pacientes</p>
                  <p className="text-sm text-gray-700">• Equilibrio vida-trabajo</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="text-sm text-green-700">
                  <strong>Octubre:</strong> Mes de la Salud Mental - Precios especiales
                </p>
              </div>
            </div>

            {/* Personal de la Asociación */}
            <div className="glass-card p-8 rounded-3xl hover-lift">
              <div className="relative mb-6">
                <button 
                  onClick={() => openImageModal("/Para pagina 13 (Personal de la asociacion).jpg", "Personal de Apoyo CRESER")}
                  className="w-full h-48 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
                >
                <Image
                  src="/Para pagina 13 (Personal de la asociacion).jpg"
                  alt="Personal de la Asociación"
                  width={300}
                  height={200}
                    className="w-full h-full object-cover object-[center_35%] cursor-pointer"
                  unoptimized
                />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Personal de Apoyo</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Equipo de apoyo administrativo y operativo que garantiza una experiencia 
                cálida y eficiente para todos nuestros pacientes y sus familias.
              </p>
              <div className="space-y-2 mb-6">
                <h5 className="font-bold text-gray-800">Áreas de apoyo:</h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">• Recepción y atención al paciente</p>
                  <p className="text-sm text-gray-700">• Trabajo social</p>
                  <p className="text-sm text-gray-700">• Coordinación de tratamientos</p>
                  <p className="text-sm text-gray-700">• Seguimiento de pacientes</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <p className="text-sm text-purple-700">
                  <strong>Compromiso:</strong> Atención humana y personalizada
                </p>
              </div>
            </div>
          </div>

          {/* Llamada a la acción para unirse al equipo */}
          <div className="glass-card p-8 rounded-3xl text-center">
            <div className="relative mb-8">
              <Image
                src="/Unete a fibromialgia Creser.jpg"
                alt="Únete a CRESER"
                width={600}
                height={300}
                className="rounded-2xl shadow-lg w-full h-auto max-w-2xl mx-auto"
                unoptimized
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">¿Quieres Formar Parte de Nuestro Equipo?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Buscamos profesionales comprometidos con mejorar la calidad de vida de pacientes con fibromialgia. 
              Si tienes experiencia en medicina, psicología, nutrición, fisioterapia o áreas afines, 
              nos gustaría conocerte.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-3">¿Eres Profesional de la Salud?</h4>
                <p className="text-blue-700 text-sm">
                  Ofrece servicios voluntarios o únete a nuestro equipo permanente. 
                  Tu experiencia puede transformar vidas.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-purple-800 mb-3">¿Quieres Ser Voluntario?</h4>
                <p className="text-purple-700 text-sm">
                  Contribuye con tu tiempo, ideas y energía para apoyar nuestra misión 
                  de atención integral.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => handleSpecificDonation('PROFESIONISTA')} className="btn-primary w-full sm:w-auto">
                <span className="flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Únete como Profesional</span>
                </span>
              </button>
              <button onClick={() => handleSpecificDonation('VOLUNTARIO')} className="btn-primary w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <span className="flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Ser Voluntario</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Information Section */}
      <section id="informacion" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Educación Especializada</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Información Vital</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Enhanced 9 Things Section */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
                <Star className="w-4 md:w-5 h-4 md:h-5 text-blue-600" />
                <span className="text-blue-800 font-medium text-sm md:text-base">Educación Fundamental</span>
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold font-display mb-4 md:mb-6 text-gray-800 px-4">
                9 Cosas Esenciales sobre Fibromialgia
              </h3>
              <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Conocimiento fundamental respaldado por evidencia científica que todo paciente debe comprender para manejar efectivamente su condición
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {/* Imagen destacada de dolor */}
              <div className="md:col-span-2 lg:col-span-3 mb-8">
                <div className="card-glow p-6 rounded-3xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Comprensión del Dolor en Fibromialgia</h4>
                      <p className="text-gray-600 leading-relaxed">
                        El dolor en la fibromialgia es real, complejo y afecta múltiples sistemas del cuerpo. 
                        No es &quot;solo psicológico&quot; - tiene bases fisiológicas documentadas que incluyen alteraciones 
                        en el procesamiento del dolor y la respuesta del sistema nervioso central.
                      </p>
                    </div>
                    
                  </div>
                </div>
              </div>
              {[
                {
                  number: 1,
                  title: "Dolor Generalizado y Persistente",
                  content: "El síntoma principal es el dolor musculoesquelético crónico que afecta múltiples áreas del cuerpo.",
                  details: "Se caracteriza por dolor en múltiples puntos específicos, con duración mínima de 3 meses según criterios médicos.",
                  icon: <Target className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-red-500 to-pink-500"
                },
                {
                  number: 2,
                  title: "Fatiga Crónica Debilitante",
                  content: "No es cansancio común, es una fatiga profunda que no mejora con el descanso.",
                  details: "Afecta la capacidad de realizar actividades cotidianas y puede durar todo el día, independientemente del nivel de actividad.",
                  icon: <Zap className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-orange-500 to-red-500"
                },
                {
                  number: 3,
                  title: "Neblina Mental (Fibrofog)",
                  content: "Dificultades de concentración, problemas de memoria y confusión mental.",
                  details: "Incluye problemas de memoria a corto plazo, dificultad para encontrar palabras y reducción de la capacidad de concentración.",
                  icon: <Brain className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  number: 4,
                  title: "Problemas del Sueño",
                  content: "Es crucial mantener una buena higiene del sueño con rutinas regulares.",
                  details: "Incluye horarios regulares, ambiente adecuado, y técnicas de relajación. El sueño reparador es fundamental para el manejo.",
                  icon: <Calendar className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-blue-500 to-purple-500"
                },
                {
                  number: 5,
                  title: "Rigidez Matutina",
                  content: "La rigidez al despertar se alivia gradualmente con el movimiento suave y progresivo.",
                  details: "Puede durar desde minutos hasta horas. Se recomienda movimiento muy gradual y estiramientos suaves al levantarse.",
                  icon: <Activity className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-green-500 to-teal-500"
                },
                {
                  number: 6,
                  title: "Cambios de Estado de Ánimo",
                  content: "Los cambios emocionales son frecuentes y están relacionados con la condición.",
                  details: "Pueden incluir depresión, ansiedad e irritabilidad. Tienen base fisiológica real, no son 'solo psicológicos'.",
                  icon: <Heart className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-pink-500 to-rose-500"
                },
                {
                  number: 7,
                  title: "Proceso de Adaptación",
                  content: "El diagnóstico y adaptación es un proceso que requiere tiempo y apoyo.",
                  details: "Requiere tiempo, múltiples evaluaciones y aceptación gradual. Es normal experimentar diferentes emociones en el proceso.",
                  icon: <Stethoscope className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  number: 8,
                  title: "Manejo, No Cura",
                  content: "No existe una cura definitiva, pero sí se puede manejar efectivamente la condición.",
                  details: "El tratamiento se enfoca en el manejo de síntomas, mejora de calidad de vida y prevención de recaídas.",
                  icon: <Shield className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-amber-500 to-orange-500"
                },
                {
                  number: 9,
                  title: "Enfoque Multidisciplinario",
                  content: "La fibromialgia requiere un enfoque de tratamiento integral con múltiples especialidades.",
                  details: "Incluye medicina, psicología, nutrición, fisioterapia y apoyo familiar. Requiere adaptación y re-aprendizaje.",
                  icon: <Users className="w-5 md:w-6 h-5 md:h-6" />,
                  color: "from-emerald-500 to-green-500"
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="card-glow p-6 md:p-8 rounded-3xl hover-lift transition-all duration-500 h-full">
                    <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
                      <div className={`w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.number}
                      </div>
                      <div className={`w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-gray-700 font-medium mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                      {item.content}
                    </p>
                    
                    <div className="bg-blue-50 p-3 md:p-4 rounded-xl border-l-4 border-blue-500">
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-blue-700">Detalle clínico:</span> {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced What NOT to do section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-red-100 px-6 py-3 rounded-full mb-6">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Prevención de Complicaciones</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 text-red-800">
                Qué NO Hacer con Fibromialgia
              </h3>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Comportamientos y prácticas que pueden agravar significativamente tu condición y entorpecer el proceso de recuperación
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Imagen destacada de estrés y dolor de cabeza */}
              <div className="md:col-span-2 lg:col-span-3 mb-8">
                <div className="card-glow p-6 rounded-3xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-red-800 mb-4">Evitar Factores Agravantes</h4>
                      <p className="text-gray-600 leading-relaxed">
                        El estrés, la falta de sueño y la sobrecarga física son factores que pueden desencadenar 
                        crisis severas en pacientes con fibromialgia. Es fundamental aprender a identificar y 
                        evitar estos desencadenantes para mantener una mejor calidad de vida.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
              {[
                {
                  number: 1,
                  title: "Sobreexigirte Físicamente",
                  subtitle: "Respeta los límites de tu cuerpo",
                  content: "Evita el ejercicio intenso o actividades que superen tu capacidad actual.",
                  consequences: "Puede provocar brotes severos, aumentar el dolor y prolongar los períodos de recuperación.",
                  alternative: "Realiza ejercicio suave y progresivo, respetando las señales de tu cuerpo.",
                  icon: <Activity className="w-6 h-6" />,
                  color: "from-red-500 to-pink-500"
                },
                {
                  number: 2,
                  title: "Romper la Clínica del Sueño",
                  subtitle: "Mantén horarios regulares de descanso",
                  content: "No alteres tus horarios de sueño ni te desveles frecuentemente.",
                  consequences: "Desregula los ciclos circadianos, aumenta la fatiga y empeora todos los síntomas.",
                  alternative: "Establece una rutina de sueño fija con técnicas de higiene del sueño.",
                  icon: <Calendar className="w-6 h-6" />,
                  color: "from-indigo-500 to-purple-500"
                },
                {
                  number: 3,
                  title: "Exponerte a Estrés Extremo",
                  subtitle: "Prioriza lo urgente e importante",
                  content: "Evita situaciones de alto estrés emocional o físico prolongado.",
                  consequences: "El estrés crónico exacerba el dolor, la fatiga y puede desencadenar crisis severas.",
                  alternative: "Practica técnicas de manejo del estrés y establece límites claros.",
                  icon: <Zap className="w-6 h-6" />,
                  color: "from-orange-500 to-red-500"
                },
                {
                  number: 4,
                  title: "Automedicarte sin Supervisión",
                  subtitle: "Consulta siempre con profesionales",
                  content: "No tomes medicamentos sin prescripción médica o modifiques dosis arbitrariamente.",
                  consequences: "Puede causar interacciones peligrosas, efectos secundarios graves o empeorar síntomas.",
                  alternative: "Mantén comunicación constante con tu equipo médico sobre cualquier cambio.",
                  icon: <Stethoscope className="w-6 h-6" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  number: 5,
                  title: "Consumir Información No Científica",
                  subtitle: "Verifica fuentes médicas confiables",
                  content: "Evita consejos de redes sociales, blogs no médicos o testimonios sin respaldo científico.",
                  consequences: "Puede llevarte a decisiones incorrectas que agraven tu condición o retrasen el tratamiento.",
                  alternative: "Consulta solo fuentes médicas reconocidas y verifica con tu médico.",
                  icon: <BookOpen className="w-6 h-6" />,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  number: 6,
                  title: "Usar Productos 'Milagrosos'",
                  subtitle: "Desconfía de soluciones mágicas",
                  content: "No caigas en tratamientos que prometen curas rápidas o definitivas.",
                  consequences: "Pérdida de tiempo y dinero, posibles efectos adversos y retraso en tratamiento efectivo.",
                  alternative: "Sigue tratamientos basados en evidencia científica supervisados por profesionales.",
                  icon: <Shield className="w-6 h-6" />,
                  color: "from-amber-500 to-orange-500"
                },
                {
                  number: 7,
                  title: "Permanecer Completamente Inmóvil",
                  subtitle: "El movimiento previene la atrofia",
                  content: "Evita el reposo absoluto o la inactividad total prolongada.",
                  consequences: "Aumenta la rigidez, debilita músculos, empeora el dolor y reduce la capacidad funcional.",
                  alternative: "Mantén actividad física suave y adaptada, incluso en días difíciles.",
                  icon: <Target className="w-6 h-6" />,
                  color: "from-green-500 to-teal-500"
                },
                {
                  number: 8,
                  title: "Aislarte Socialmente",
                  subtitle: "Comunica tus necesidades",
                  content: "No te alejes completamente de familiares, amigos o actividades sociales.",
                  consequences: "Aumenta la depresión, ansiedad y reduce el sistema de apoyo necesario para la recuperación.",
                  alternative: "Mantén vínculos sociales adaptados a tu condición y comunica tus limitaciones.",
                  icon: <Users className="w-6 h-6" />,
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  number: 9,
                  title: "Priorizar a Otros Antes que a Ti",
                  subtitle: "Tu salud es la prioridad principal",
                  content: "No sacrifiques tu tratamiento o cuidado personal por atender a otros.",
                  consequences: "Empeora tu condición, prolonga la recuperación y afecta tu capacidad de ayudar a otros.",
                  alternative: "Establece límites saludables y prioriza tu autocuidado sin culpa.",
                  icon: <Heart className="w-6 h-6" />,
                  color: "from-pink-500 to-rose-500"
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="card-glow p-8 rounded-3xl hover-lift transition-all duration-500 h-full border-l-4 border-red-500">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.number}
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-sm font-semibold text-red-600 mb-4">
                      {item.subtitle}
                    </p>
                    
                    <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                      {item.content}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-400">
                        <p className="text-sm text-red-700">
                          <span className="font-semibold">⚠️ Consecuencias:</span> {item.consequences}
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-400">
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">✅ Alternativa:</span> {item.alternative}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crisis Management */}
          <div className="glass-card p-12 rounded-3xl">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gray-800">
                Manejo de Crisis
              </h3>
              <p className="text-xl text-gray-600">
                Protocolo profesional para gestionar episodios agudos de fibromialgia
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-6">
                <div className="bg-red-50 p-4 md:p-6 lg:p-8 rounded-2xl border-l-4 border-red-500">
                  <h4 className="text-xl md:text-2xl font-bold text-red-800 mb-3 md:mb-4">¿Qué es una Crisis?</h4>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Es el empeoramiento súbito e intenso de los signos y síntomas del padecimiento, 
                    generando un estado de vulnerabilidad emocional y física.
                  </p>
                  
                  <h5 className="font-bold text-red-700 text-base md:text-lg mb-3 md:mb-4">Síntomas Asociados:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {['Miedo intenso', 'Confusión mental', 'Enojo', 'Sensación de impotencia', 'Vulnerabilidad extrema'].map((symptom, index) => (
                      <div key={index} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium text-sm md:text-base break-words">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 md:p-6 lg:p-8 rounded-2xl border-l-4 border-green-500">
                  <h4 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">Protocolo de Manejo:</h4>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      "1. Identifica los factores desencadenantes",
                      "2. PARA. Prioriza únicamente actividades esenciales",
                      "3. Recurre a la medicación de crisis prescrita",
                      "4. Implementa terapia ocupacional suave",
                      "5. Realiza estiramientos muy graduales",
                      "6. Solicita apoyo emocional inmediato",
                      "7. Modifica temporalmente tu alimentación",
                      "8. Practica escucha activa de tu cuerpo"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-2 md:space-x-4 p-3 md:p-4 bg-white rounded-lg shadow-sm hover-lift">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0 mt-0.5 md:mt-1">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 font-medium text-sm md:text-base break-words leading-relaxed">{step.substring(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios de Pacientes */}
      <section id="testimonios" className="py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Testimonios de Nuestros Pacientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Historias reales de transformación y esperanza. Conoce las experiencias de quienes han encontrado alivio y mejora en su calidad de vida.
            </p>
          </div>

          {/* TikTok Testimonios - Carrusel */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.83-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79-.06-3.57-.04-5.36z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Testimonios TikTok</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => scrollTestimonios('left', 'tiktok')}
                  className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${canScrollLeft('tiktok') ? 'hover:border-pink-300 group' : 'cursor-not-allowed opacity-50'}`}
                  disabled={!canScrollLeft('tiktok')}
                >
                  <ChevronLeft className={`w-5 h-5 ${!canScrollLeft('tiktok') ? 'text-gray-400' : 'text-gray-600 group-hover:text-pink-600'}`} />
                </button>
                <button
                  onClick={() => scrollTestimonios('right', 'tiktok')}
                  className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${canScrollRight('tiktok') ? 'hover:border-pink-300 group' : 'cursor-not-allowed opacity-50'}`}
                  disabled={!canScrollRight('tiktok')}
                >
                  <ChevronRight className={`w-5 h-5 ${!canScrollRight('tiktok') ? 'text-gray-400' : 'text-gray-600 group-hover:text-pink-600'}`} />
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden py-4">
              <div 
                className="flex space-x-4 transition-transform duration-500 ease-out px-4"
                style={{ transform: `translateX(-${tiktokScrollPosition}px)` }}
              >
                {[
                  { url: 'https://vt.tiktok.com/ZSkKAaRCB/', title: 'Experiencia con la fibromialgia', description: 'Paciente comparte su experiencia de mejora' },
                  { url: 'https://vt.tiktok.com/ZSkEE7EW8/', title: 'Mensajes de apoyo', description: 'Cómo el tratamiento cambió su vida' },
                  { url: 'https://vt.tiktok.com/ZSBJuBN7r/', title: 'Una vida con fibromialgia', description: 'Transformación notable en su bienestar' },
                  { url: 'https://vt.tiktok.com/ZSBdjnK8m/', title: 'Reflexión: Dolor y sufrimiento', description: 'Mejora significativa en actividades diarias' },
                  { url: 'https://vt.tiktok.com/ZSBd6dc9g/', title: 'Compartiendo experiencias', description: 'Encontrando nuevas posibilidades' },
                  { url: 'https://vt.tiktok.com/ZSBBAMdL8/', title: 'Testimonios y entrevistas', description: 'La importancia del equipo multidisciplinario' },
                  { url: 'https://vt.tiktok.com/ZSBQGeWXU/', title: 'Historia con la Fibromialgia', description: 'Regresando a las actividades que ama' },
                  { url: 'https://vt.tiktok.com/ZSBw4r4tN/', title: 'Viviendo con fibromialgia', description: 'Encontrando fuerza en la comunidad CRESER' }
                ].map((testimonio, index) => (
                  <div key={index} className="flex-none w-80 group">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-300 transform hover:scale-102 h-76">
                      {/* Thumbnail compacto para TikTok */}
                      <div className="relative h-48 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.83-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79-.06-3.57-.04-5.36z"/>
                            </svg>
                            <span className="text-xs font-semibold">TikTok</span>
                          </div>
                          <p className="text-xs opacity-90">@creserfibromialgia</p>
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col h-28">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors duration-300 text-center">
                          {testimonio.title}
                        </h4>
                        <button
                          onClick={() => handleTestimonio(testimonio.url)}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 mt-auto"
                        >
                          <Play className="w-4 h-4" />
                          <span>Ver Video</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Facebook Testimonios - Carrusel */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Testimonios Facebook</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => scrollTestimonios('left', 'facebook')}
                  className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${canScrollLeft('facebook') ? 'hover:border-blue-300 group' : 'cursor-not-allowed opacity-50'}`}
                  disabled={!canScrollLeft('facebook')}
                >
                  <ChevronLeft className={`w-5 h-5 ${!canScrollLeft('facebook') ? 'text-gray-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </button>
                <button
                  onClick={() => scrollTestimonios('right', 'facebook')}
                  className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${canScrollRight('facebook') ? 'hover:border-blue-300 group' : 'cursor-not-allowed opacity-50'}`}
                  disabled={!canScrollRight('facebook')}
                >
                  <ChevronRight className={`w-5 h-5 ${!canScrollRight('facebook') ? 'text-gray-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden py-4">
              <div 
                className="flex space-x-4 transition-transform duration-500 ease-out px-4"
                style={{ transform: `translateX(-${facebookScrollPosition}px)` }}
              >
                {[
                  { url: 'https://www.facebook.com/share/v/16owsbESHz/', title: 'Experiencia en Facebook', description: 'Testimonio compartido en nuestra página oficial' },
                  { url: 'https://www.facebook.com/share/v/1B4beZJdFJ/', title: 'Historia de Superación', description: 'Paciente comparte su proceso de recuperación' }
                ].map((testimonio, index) => (
                  <div key={index} className="flex-none w-80 group">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100 hover:border-blue-300 transform hover:scale-102 h-76">
                      {/* Thumbnail compacto para Facebook */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Facebook className="w-4 h-4" />
                            <span className="text-xs font-semibold">Facebook</span>
                          </div>
                          <p className="text-xs opacity-90">CRESER Fibromialgia</p>
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col h-28">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 text-center">
                          {testimonio.title}
                        </h4>
                        <button
                          onClick={() => handleTestimonio(testimonio.url)}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 mt-auto"
                        >
                          <Play className="w-4 h-4" />
                          <span>Ver Video</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Llamada a la acción */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Quieres compartir tu historia?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Tu testimonio puede inspirar a otros pacientes. Comparte tu experiencia y ayuda a crear una comunidad de apoyo y esperanza.
              </p>
              <button
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contactar para Testimonio</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Donations Section */}
      <section id="donaciones" className="py-24 gradient-primary text-white relative overflow-hidden">
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="font-medium">Pon tu Corazón</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
              <span className="text-yellow-300 text-glow">DONATIVOS</span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-light mb-8">CRESER FIBROMIALGIA</h3>
            <div className="w-32 h-1 bg-yellow-300 mx-auto rounded-full mb-8"></div>
            
            {/* Imagen de donativos */}
            <div className="mb-8">
              <div className="max-w-2xl mx-auto">
                <Image
                  src="/Donativos creser .jpg"
                  alt="Donativos CRESER - Pon tu corazón"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tu apoyo nos permite continuar brindando atención integral especializada 
              y desarrollar nuevos programas de apoyo para pacientes con fibromialgia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {[
              { title: "PACIENTE", desc: "Contribución mensual solidaria", icon: "💙", amount: "Desde $100 MXN" },
              { title: "PROFESIONISTA", desc: "Tu talento y experiencia son valiosos", icon: "💼", amount: "Servicios pro bono" },
              { title: "FAMILIA", desc: "Una vaquita familiar por ti", icon: "👨‍👩‍👧‍👦", amount: "Contribución grupal" },
              { title: "VOLUNTARIO", desc: "Tus manos e ideas transforman vidas", icon: "🤝", amount: "Tiempo y dedicación" },
              { title: "EMPRESA", desc: "Recibo fiscal deducible de impuestos", icon: "🏢", amount: "Desde $1,000 MXN" },
              { title: "NEGOCIO", desc: "Productos y servicios con causa social", icon: "🛍️", amount: "Donación en especie" }
            ].map((item, index) => (
              <button 
                key={index} 
                onClick={() => handleSpecificDonation(item.title)}
                className="glass-card p-6 md:p-8 rounded-2xl hover-lift group transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-yellow-300">{item.title}</h4>
                <p className="text-blue-100 mb-3 md:mb-4 text-sm md:text-base">{item.desc}</p>
                <div className="text-xs md:text-sm text-yellow-200 font-medium">{item.amount}</div>
              </button>
            ))}
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-4 md:mb-6">
              <Heart className="w-8 md:w-12 h-8 md:h-12 text-red-400 animate-pulse" />
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">¡Tu apoyo transforma vidas!</span>
            </div>
            <p className="text-base md:text-lg text-blue-100 mb-4 md:mb-6 px-4">
              Cada donativo nos acerca más a nuestro objetivo de brindar atención integral 
              y accesible para todas las personas que viven con fibromialgia.
            </p>
            <button onClick={handleDonation} className="btn-primary w-full sm:w-auto">
              <span className="flex items-center justify-center space-x-2">
                <Heart className="w-4 md:w-5 h-4 md:h-5" />
                <span>Donar Ahora</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Revolutionary Contact Section */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-full mb-6">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Estamos Aquí para Ti</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-gradient">Contacto</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Imagen destacada de contacto */}
          <div className="mb-16">
            <div className="card-glow p-8 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Estamos Aquí para Ayudarte</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    En CRESER, entendemos que cada paciente es único y requiere atención personalizada. 
                    Nuestro equipo está comprometido a brindarte el apoyo que necesitas en tu camino 
                    hacia una mejor calidad de vida.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Consultas Personalizadas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Atención Multidisciplinaria</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Seguimiento Continuo</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Apoyo Emocional</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Información de Contacto</h3>
              
              {[
                {
                  icon: <Phone className="w-6 md:w-8 h-6 md:h-8 text-blue-600" />,
                  title: "Teléfonos de Consulta",
                  content: ["(477) 412-5698", "(477) 329-5370", "(477) 132-6835"],
                  bg: "from-blue-500 to-cyan-500",
                  action: handlePhoneCall
                },
                {
                  icon: <MapPin className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />,
                  title: "Ubicación",
                  content: ["Av. Paseo de Las Águilas 95, San Isidro, 37685 León de los Aldama, Gto."],
                  bg: "from-purple-500 to-pink-500",
                  action: handleLocation
                },
                {
                  icon: <Calendar className="w-6 md:w-8 h-6 md:h-8 text-green-600" />,
                  title: "Horarios de Atención",
                  content: ["Lunes a Viernes: 9:00 AM - 6:00 PM", "Sábados: 9:00 AM - 2:00 PM", "Consultas disponibles"],
                  bg: "from-green-500 to-emerald-500",
                  action: handleWhatsApp
                }
              ].map((contact, index) => (
                <button 
                  key={index} 
                  onClick={contact.action}
                  className="glass-card p-6 md:p-8 rounded-2xl hover-lift w-full text-left"
                >
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className={`w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br ${contact.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{contact.title}</h4>
                      <div className="space-y-1">
                        {contact.content.map((item, idx) => (
                          <p key={idx} className="text-gray-700 text-sm md:text-lg">{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="glass-card p-6 md:p-10 rounded-3xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Solicita Información</h3>
              <ValidatedForm 
                onSubmit={handleValidatedFormSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="gradient-primary text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-6">
              <div className="relative">
          <Image
                  src="/logo-creser.jpg" 
                  alt="Logo CRESER - Asociación para el Manejo Integral de la Fibromialgia"
                  width={60}
                  height={60}
                  className="rounded-lg shadow-lg"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold font-display">CRESER</h3>
                <p className="text-blue-200 font-medium">Centro de Atención Integral • Fibromialgia</p>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                <span className="font-semibold text-yellow-200">OSC Asociación para el Manejo Integral y Preventivo</span> de la Fibromialgia y la Fatiga Crónica Creser A.C.
              </p>
              <p className="text-blue-200">
                Transformando vidas a través de la atención especializada, la educación y el apoyo integral.
              </p>
            </div>
            
            {/* Redes Sociales */}
            <div className="border-t border-white/20 pt-6">
              <h4 className="text-xl font-semibold text-yellow-200 mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {/* YouTube */}
                <button 
                  onClick={() => handleSocialMedia('youtube')}
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 hover:scale-105 border border-red-400/30 hover:border-red-400/50"
                  aria-label="Síguenos en YouTube"
                >
                  <div className="p-3 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors duration-300">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-100 group-hover:text-yellow-200 transition-colors duration-300">YouTube</span>
                  <span className="text-xs text-blue-200">@creserleon</span>
                </button>

                {/* Facebook */}
                <button 
                  onClick={() => handleSocialMedia('facebook')}
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 hover:scale-105 border border-blue-400/30 hover:border-blue-400/50"
                  aria-label="Síguenos en Facebook"
                >
                  <div className="p-3 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-100 group-hover:text-yellow-200 transition-colors duration-300">Facebook</span>
                  <span className="text-xs text-blue-200">CRESER Fibromialgia</span>
                </button>

                {/* WhatsApp */}
                <button 
                  onClick={() => handleSocialMedia('whatsapp')}
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 hover:scale-105 border border-green-400/30 hover:border-green-400/50"
                  aria-label="Contáctanos por WhatsApp"
                >
                  <div className="p-3 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-100 group-hover:text-yellow-200 transition-colors duration-300">WhatsApp</span>
                  <span className="text-xs text-blue-200">Centro Creser</span>
                </button>

                {/* TikTok */}
                <button 
                  onClick={() => handleSocialMedia('tiktok')}
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 transition-all duration-300 hover:scale-105 border border-pink-400/30 hover:border-pink-400/50"
                  aria-label="Síguenos en TikTok"
                >
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full group-hover:from-pink-400 group-hover:to-blue-400 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.83-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79-.06-3.57-.04-5.36z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-blue-100 group-hover:text-yellow-200 transition-colors duration-300">TikTok</span>
                  <span className="text-xs text-blue-200">@creserfibromialgia</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <button onClick={handlePrivacyPolicy} className="hover:text-yellow-300 transition-colors flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Política de Privacidad</span>
              </button>
              <button onClick={handleLocation} className="hover:text-yellow-300 transition-colors flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Mapa del Sitio</span>
              </button>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <p className="text-sm text-blue-200">
                © 2025 CRESER A.C. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Imagen */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Botón de cerrar */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Contenedor de la imagen */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
              <div className="relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[75vh] object-contain"
                  unoptimized
                  priority
                />
              </div>
              
              {/* Título de la imagen */}
              <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 
                  id="modal-title"
                  className="text-xl md:text-2xl font-bold text-gray-800 text-center"
                >
                  {selectedImage.alt}
                </h3>
                <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
                  Presiona <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">ESC</kbd> o haz clic fuera de la imagen para cerrar
                </p>
              </div>
            </div>
          </div>
          
          {/* Área clickeable para cerrar */}
          <div 
            className="absolute inset-0 -z-10 cursor-pointer"
            onClick={closeImageModal}
            aria-label="Cerrar modal haciendo clic en el fondo"
          ></div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500 text-white' :
            toast.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              {toast.type === 'success' && <Heart className="w-5 h-5" />}
              {toast.type === 'error' && <X className="w-5 h-5" />}
              {toast.type === 'info' && <Star className="w-5 h-5" />}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
