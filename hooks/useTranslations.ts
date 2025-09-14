'use client';

import { useState, useEffect } from 'react';

type Locale = 'sv' | 'en';
type TranslationKey = string;

interface Translations {
  [key: string]: any;
}

const translations: Record<Locale, Translations> = {
  sv: {
    hero: {
      title: "Är din webbplats AI-redo?",
      description: "Analysera hur AI-redo din webbsida är från en enda sidsnapshot. Högkvalitativa mätvärden för LLM-kompatibilitet."
    },
    analysis: {
      headingHierarchy: "Rubrikhierarki",
      readability: "Läsbarhet",
      contentQuality: "Innehållskvalitet för AI",
      semanticHtml: "Semantisk HTML",
      accessibility: "Tillgänglighet",
      metaData: "Metadata",
      analyzeAnother: "Analysera en annan sida",
      runAnalysis: "Kör analys",
      analyzing: "Analyserar...",
      enterUrl: "Ange URL för att analysera",
      urlPlaceholder: "https://exempel.se"
    },
    status: {
      pass: "Godkänd",
      fail: "Underkänd",
      warning: "Varning",
      excellent: "Utmärkt",
      good: "Bra",
      needsImprovement: "Behöver förbättring"
    },
    errors: {
      invalidUrl: "Ogiltig URL. Vänligen ange en giltig webbadress.",
      analysisError: "Ett fel uppstod under analysen. Försök igen.",
      networkError: "Nätverksfel. Kontrollera din internetanslutning."
    },
    ui: {
      language: "Språk",
      swedish: "Svenska",
      english: "English"
    }
  },
  en: {
    hero: {
      title: "Is your website AI Ready?",
      description: "Analyze how AI-ready your webpage is from a single page snapshot. High-signal metrics for LLM compatibility."
    },
    analysis: {
      headingHierarchy: "Heading Hierarchy",
      readability: "Readability",
      contentQuality: "Content Quality for AI",
      semanticHtml: "Semantic HTML",
      accessibility: "Accessibility",
      metaData: "Meta Data",
      analyzeAnother: "Analyze Another Site",
      runAnalysis: "Run Analysis",
      analyzing: "Analyzing...",
      enterUrl: "Enter URL to analyze",
      urlPlaceholder: "https://example.com"
    },
    status: {
      pass: "Pass",
      fail: "Fail",
      warning: "Warning",
      excellent: "Excellent",
      good: "Good",
      needsImprovement: "Needs Improvement"
    },
    errors: {
      invalidUrl: "Invalid URL. Please enter a valid web address.",
      analysisError: "An error occurred during analysis. Please try again.",
      networkError: "Network error. Please check your internet connection."
    },
    ui: {
      language: "Language",
      swedish: "Svenska",
      english: "English"
    }
  }
};

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>('sv');

  useEffect(() => {
    // Get preferred locale from localStorage
    const savedLocale = localStorage.getItem('preferred-locale') as Locale;
    if (savedLocale && (savedLocale === 'sv' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, locale, setLocale };
}