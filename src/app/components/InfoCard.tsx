'use client';

interface InfoCardProps {
  number: number;
  title: string;
  description?: string;
  variant: 'blue' | 'red' | 'green';
  delay: number;
}

export default function InfoCard({ number, title, description, variant, delay }: InfoCardProps) {
  const colors = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-600',
      number: 'text-blue-700'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-500',
      text: 'text-red-600',
      number: 'text-red-700'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-500',
      text: 'text-green-600',
      number: 'text-green-700'
    }
  };

  const colorScheme = colors[variant];

  return (
    <div 
      className={`group relative ${colorScheme.bg} p-6 rounded-xl border-l-4 ${colorScheme.border} hover-lift overflow-hidden`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />
      
      {/* Número */}
      <div className="relative">
        <span className={`text-3xl font-bold ${colorScheme.number} mb-3 block group-hover:scale-110 transition-transform duration-300`}>
          {number}
        </span>
        
        {/* Título */}
        <h4 className={`font-semibold ${colorScheme.text} mb-2 group-hover:text-gray-800 transition-colors duration-300`}>
          {title}
        </h4>
        
        {/* Descripción */}
        {description && (
          <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        )}
      </div>
      
      {/* Efecto de partículas */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`w-2 h-2 rounded-full ${colorScheme.text} animate-pulse`} />
      </div>
      
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
        <div className={`w-1 h-1 rounded-full ${colorScheme.text} animate-pulse`} />
      </div>
    </div>
  );
} 