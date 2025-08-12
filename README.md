# 🩺 CRESER - Asociación Fibromialgia

## 📋 Descripción
Sitio web oficial de la Asociación para el Manejo Integral y Preventivo de la Fibromialgia y Fatiga Crónica CRESER A.C. Plataforma informativa que conecta a pacientes con servicios especializados en el tratamiento de fibromialgia.

## 🚀 **NUEVAS MEJORAS IMPLEMENTADAS**

### ✨ **1. Tailwind CSS Configurado con Variables Personalizadas**
- **Paleta de colores CRESER** completamente integrada
- **Animaciones personalizadas** con keyframes optimizados
- **Gradientes y sombras** específicos de la marca
- **Sistema de diseño** consistente y escalable

### ✨ **2. Formularios con Validación Robusta**
- **React Hook Form** + **Zod** para validación de esquemas
- **Validación en tiempo real** con feedback visual
- **Manejo de errores** avanzado y user-friendly
- **Estados de carga** y confirmación de envío
- **Validación de campos** con regex y reglas personalizadas

### ✨ **3. Imágenes Optimizadas con Next.js Image**
- **Lazy loading** automático para mejor rendimiento
- **Formatos modernos** (WebP, AVIF) cuando sea posible
- **Tamaños responsivos** para todos los dispositivos
- **Modal de vista ampliada** para imágenes médicas
- **Fallbacks** y manejo de errores de carga

### ✨ **4. SEO Avanzado con Metadatos Dinámicos** 🆕
- **Metadatos dinámicos** por página y sección
- **Open Graph** y **Twitter Cards** optimizados
- **Schema.org estructurado** para organizaciones médicas
- **Sitemap dinámico** con prioridades optimizadas
- **Robots.txt** configurado para mejor indexación
- **Meta tags geográficos** para búsquedas locales
- **Google Analytics** y herramientas de seguimiento
- **Verificación de dominio** para Google Search Console

## 🌟 Características Principales
- **Información Médica Especializada**: Servicios integrales para el manejo de fibromialgia
- **Galería Interactiva**: Visualización de personal médico y especialistas
- **Formularios de Contacto Validados**: Comunicación directa con validación robusta
- **Navegación Intuitiva**: Estructura clara y fácil de usar
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Integración WhatsApp**: Contacto directo para consultas
- **Imágenes Optimizadas**: Carga rápida y experiencia visual mejorada

## 🏥 Servicios Informados
- Medicina especializada en fibromialgia
- Psicoterapia individual y de pareja
- Psicoterapia infantil y para adultos mayores
- Terapia psico-tanatológica
- Arte terapia
- Atención a personal médico
- Servicios de apoyo integral

## 📍 Ubicación
**CRESER A.C.**  
Paseo de las Águilas No. 95  
Col. San Isidro de Jerez  
León, Guanajuato, México

## 📞 Contacto
- **Teléfono Principal**: (477) 412-5698
- **Teléfono Secundario**: (477) 132-6835
- **WhatsApp**: Disponible para consultas
- **Horarios**: Lunes a Viernes 9:00 AM - 6:00 PM, Sábados 9:00 AM - 2:00 PM

## 🎯 Misión
Brindar herramientas terapéuticas necesarias para afrontar de manera favorable la fibromialgia, promoviendo un manejo efectivo a través de tratamientos personalizados y un enfoque integral bio-psicológico-social.

## 🌟 Visión
Ser un centro de atención que contribuya a mejorar la calidad de vida de los pacientes con fibromialgia y sus familias, a través de la información, el re-aprendizaje y la contención.

## 💎 Valores
- **Respeto**: Valoramos la dignidad y autonomía de cada persona
- **Compromiso**: Dedicación constante hacia el bienestar de nuestros pacientes
- **Profesionalismo**: Excelencia en todos nuestros servicios y atención
- **Responsabilidad**: Cumplimiento ético de nuestras obligaciones hacia la comunidad
- **Atención Personalizada**: Tratamiento individualizado según las necesidades únicas
- **Humanidad**: Compasión y empatía en cada interacción

## 🏛️ Organización
CRESER A.C. es una organización de la sociedad civil (OSC) dedicada al manejo integral de la fibromialgia, operando bajo los más altos estándares de calidad y ética médica.

## 🛠️ **TECNOLOGÍAS Y HERRAMIENTAS**

### **Frontend**
- **Next.js 15.4.5** - Framework React de última generación
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Framework CSS utilitario con configuración personalizada

### **Validación y Formularios**
- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de esquemas TypeScript
- **@hookform/resolvers** - Integración entre React Hook Form y Zod

### **Componentes y UI**
- **Lucide React** - Iconografía moderna y consistente
- **Componentes personalizados** - Optimizados para CRESER
- **Sistema de diseño** - Consistente y escalable

### **Optimización**
- **Next.js Image** - Optimización automática de imágenes
- **Lazy loading** - Carga diferida para mejor rendimiento
- **Code splitting** - División automática de bundles
- **Compresión** - Optimización de assets

## 🚀 **INSTALACIÓN Y DESARROLLO**

### **Requisitos**
- Node.js 18+ 
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Navegar al directorio
cd asociacion-fibromialgia-creser

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### **Scripts Disponibles**
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificación de código

## 📁 **ESTRUCTURA DEL PROYECTO**

```
src/
├── app/
│   ├── components/
│   │   ├── ValidatedForm.tsx      # Formulario con validación robusta
│   │   ├── OptimizedImage.tsx     # Componente de imagen optimizada
│   │   ├── ServiceCard.tsx        # Tarjeta de servicio
│   │   ├── Particles.tsx          # Efectos de partículas
│   │   ├── InfoCard.tsx           # Tarjeta de información
│   │   └── SEOSchema.tsx          # Schema.org estructurado 🆕
│   ├── globals.css                # Estilos globales con variables CSS
│   ├── layout.tsx                 # Layout principal con SEO 🆕
│   ├── page.tsx                   # Página principal
│   ├── sitemap.ts                 # Sitemap dinámico 🆕
│   └── robots.ts                  # Robots.txt optimizado 🆕
├── lib/
│   ├── seo.ts                     # Configuración de metadatos SEO 🆕
│   ├── schema.ts                  # Schema.org para organizaciones médicas 🆕
│   └── analytics.ts               # Google Analytics y tracking 🆕
├── public/                        # Assets estáticos
│   └── google-verification.html   # Verificación Google Search Console 🆕
└── tailwind.config.ts             # Configuración de Tailwind
```

## 🎨 **SISTEMA DE DISEÑO**

### **Paleta de Colores CRESER**
- **Azul Principal**: #6B83BD
- **Púrpura**: #554781
- **Oro**: #B39A41
- **Azul Claro**: #95B8E4
- **Lavanda**: #988BA9

### **Tipografías**
- **Primaria**: Inter (Sans-serif)
- **Display**: Playfair Display (Serif)

### **Animaciones**
- **Fade In**: Entrada suave
- **Slide In**: Deslizamiento desde diferentes direcciones
- **Hover Lift**: Elevación en hover
- **Card Glow**: Efecto de brillo en tarjetas

## 🔧 **CONFIGURACIONES AVANZADAS**

### **Tailwind CSS Personalizado**
- Variables CSS para colores CRESER
- Animaciones personalizadas
- Sombras y gradientes específicos
- Sistema de espaciado consistente

### **Next.js Optimizado**
- Configuración de imágenes avanzada
- Headers de seguridad
- Optimizaciones de webpack
- Code splitting automático

### **Validación de Formularios**
- Esquemas Zod para validación
- Validación en tiempo real
- Manejo de errores avanzado
- Estados de carga y confirmación

### **SEO Avanzado Implementado** 🆕
- **Metadatos dinámicos** por página con configuración específica
- **Open Graph** optimizado para redes sociales (Facebook, LinkedIn)
- **Twitter Cards** para mejor visualización en Twitter
- **Schema.org estructurado** para organizaciones médicas que Google entiende
- **Sitemap dinámico** con prioridades y frecuencias de actualización
- **Robots.txt** configurado para control de indexación
- **Meta tags geográficos** para búsquedas locales en León, Guanajuato
- **Google Analytics 4** configurado para seguimiento de eventos
- **Facebook Pixel** para remarketing y conversiones
- **LinkedIn Insight Tag** para campañas B2B
- **Verificación de dominio** para Google Search Console
- **Meta tags móviles** para mejor experiencia en dispositivos
- **Canonical URLs** para evitar contenido duplicado
- **Alternate languages** para soporte multiidioma futuro

## 📱 **RESPONSIVIDAD**

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 640px, 768px, 1024px, 1280px
- **Grid System**: Sistema de grid responsivo
- **Touch Friendly**: Interacciones optimizadas para táctil

## 🚀 **PRÓXIMAS MEJORAS PLANIFICADAS**

### **SEO Avanzado**
- Metadatos dinámicos por página
- Open Graph y Twitter Cards
- Schema.org para organizaciones médicas
- Sitemap dinámico

### **Funcionalidades Avanzadas**
- Sistema de citas en línea
- Blog educativo sobre fibromialgia
- CMS headless para gestión de contenido
- Analytics y métricas de usuario

### **Performance**
- Service Worker para offline
- PWA capabilities
- Optimización de Core Web Vitals
- Caching avanzado

---

## 🔍 **CONFIGURACIÓN SEO - PASOS FINALES**

### **1. Google Search Console**
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu dominio: `https://creser-fibromialgia.vercel.app`
3. Verifica la propiedad usando el archivo `google-verification.html`
4. Envía tu sitemap: `https://creser-fibromialgia.vercel.app/sitemap.xml`

### **2. Google Analytics 4**
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad para CRESER
3. Copia el ID de medición (G-XXXXXXXXXX)
4. Reemplaza `G-XXXXXXXXXX` en `src/lib/analytics.ts`

### **3. Google Tag Manager (Opcional)**
1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea una cuenta para CRESER
3. Copia el ID del contenedor (GTM-XXXXXXX)
4. Reemplaza `GTM-XXXXXXX` en `src/lib/analytics.ts`

### **4. Facebook Pixel (Opcional)**
1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Crea un pixel para CRESER
3. Copia el ID del pixel
4. Reemplaza `XXXXXXXXXX` en `src/lib/analytics.ts`

### **5. Verificación de Redes Sociales**
- **Facebook**: Configura Open Graph tags
- **Twitter**: Configura Twitter Cards
- **LinkedIn**: Configura LinkedIn Insight Tag

### **6. Monitoreo de Rendimiento**
- **Core Web Vitals**: Usa Google PageSpeed Insights
- **SEO**: Usa Google Search Console
- **Analytics**: Revisa Google Analytics semanalmente

---

*Este sitio web está diseñado para proporcionar información y facilitar el contacto con los servicios especializados de CRESER A.C. Las mejoras implementadas garantizan una experiencia de usuario excepcional, un rendimiento optimizado y un SEO avanzado para mejor posicionamiento en buscadores.*
