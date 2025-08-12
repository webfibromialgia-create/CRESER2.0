'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onClick?: () => void;
  showModal?: boolean;
  caption?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onClick,
  showModal = false,
  caption
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageClick = () => {
    if (onClick) {
      onClick();
    } else if (showModal) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Si hay error, mostrar placeholder
  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 ${className}`}>
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Error al cargar la imagen</p>
          <p className="text-xs text-gray-400">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative overflow-hidden ${className}`}>
        {/* Indicador de carga */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-creser-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Imagen optimizada */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${onClick || showModal ? 'cursor-pointer hover:scale-105' : ''}`}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={handleImageClick}
          unoptimized={src.startsWith('/') && !src.includes('http')}
        />

        {/* Overlay con información */}
        {(onClick || showModal) && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        )}

        {/* Caption */}
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {caption}
          </div>
        )}
      </div>

      {/* Modal para vista ampliada */}
      {isModalOpen && showModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
            >
              <EyeOff className="w-6 h-6" />
            </button>

            {/* Imagen en modal */}
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              priority
              unoptimized={src.startsWith('/') && !src.includes('http')}
            />

            {/* Caption en modal */}
            {caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
                <p className="text-center font-medium">{caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Componente especializado para imágenes médicas
export function MedicalImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  medicalInfo,
  ...props
}: OptimizedImageProps & {
  medicalInfo?: {
    specialty: string;
    description: string;
    doctor?: string;
  };
}) {
  return (
    <div className={`group relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        showModal={true}
        className="rounded-lg shadow-lg"
        {...props}
      />
      
      {/* Información médica overlay */}
      {medicalInfo && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h4 className="font-semibold text-lg mb-1">{medicalInfo.specialty}</h4>
            <p className="text-sm mb-2">{medicalInfo.description}</p>
            {medicalInfo.doctor && (
              <p className="text-xs text-creser-gold">Dr. {medicalInfo.doctor}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para galería de imágenes
export function ImageGallery({
  images,
  className = '',
  columns = 3
}: {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]} ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="group">
          <OptimizedImage
            {...image}
            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            showModal={true}
          />
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center group-hover:text-creser-blue transition-colors duration-200">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
