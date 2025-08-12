import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de imágenes optimizadas
  images: {
    // Dominios permitidos para imágenes externas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Tamaños de imagen responsivos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Formato de imagen preferido
    formats: ['image/webp', 'image/avif'],
    // Prevenir redimensionamiento automático
    unoptimized: false,
  },
  
  // Configuración de compresión
  compress: true,
  
  // Configuración de producción
  productionBrowserSourceMaps: false,
  
  // Configuración de experimental
  experimental: {
    // Optimizaciones de rendimiento
    optimizePackageImports: ['lucide-react'],
  },
  
  // Configuración de webpack
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirecciones
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
