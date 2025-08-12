'use client';

import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

export default function ServiceCard({ icon, title, description, color, delay }: ServiceCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover-lift card-glow overflow-hidden"
      style={{ 
        animationDelay: `${delay}s`,
        borderTop: `4px solid ${color}`
      }}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Contenido */}
      <div className="relative p-8 text-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <div className="text-3xl" style={{ color }}>
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
          {description}
        </p>
        
        {/* Efecto de borde animado */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current transition-all duration-500 opacity-0 group-hover:opacity-20" />
      </div>
      
      {/* Partículas de fondo */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-current opacity-60 animate-pulse" />
        <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-6 w-1.5 h-1.5 rounded-full bg-current opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
} 