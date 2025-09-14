'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function NotFound() {
  const { t } = useTranslations();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-base">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent-black mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-accent-black mb-4">
          This page could not be found.
        </h2>
        <p className="text-accent-black/70 mb-8">
          The page you are looking for does not exist.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-accent-black text-white rounded-lg hover:bg-accent-black/90 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}