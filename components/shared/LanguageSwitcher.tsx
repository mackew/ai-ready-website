'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Locale = 'sv' | 'en';

interface LanguageSwitcherProps {
  currentLocale?: Locale;
}

export default function LanguageSwitcher({ currentLocale = 'sv' }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<Locale>(currentLocale);
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    
    // For now, we'll just store the preference in localStorage
    // Later we can implement proper routing with [locale] folders
    localStorage.setItem('preferred-locale', newLocale);
    
    // Reload the page to apply the new language
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 bg-black-alpha-4 rounded-6 p-1">
      <button 
        onClick={() => switchLanguage('sv')}
        className={`px-3 py-1 rounded-4 text-sm transition-all ${
          locale === 'sv' 
            ? 'bg-white text-black font-medium' 
            : 'text-white hover:bg-black-alpha-4'
        }`}
      >
        SV
      </button>
      <button 
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded-4 text-sm transition-all ${
          locale === 'en' 
            ? 'bg-white text-black font-medium' 
            : 'text-white hover:bg-black-alpha-4'
        }`}
      >
        EN
      </button>
    </div>
  );
}