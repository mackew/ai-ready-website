"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import shared components
import { HeaderProvider } from "@/components/shared/header/HeaderContext";

// Import hero section components
import HomeHero from "@/components/app/(home)/sections/hero/Hero";
import { Endpoint } from "@/components/shared/Playground/Context/types";
import InlineResults from "@/components/app/(home)/sections/ai-readiness/InlineResults";
import ControlPanel from "@/components/app/(home)/sections/ai-readiness/ControlPanel";

// Import header components
import HeaderBrandKit from "@/components/shared/header/BrandKit/BrandKit";
import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";

export default function StyleGuidePage() {
  const [tab, setTab] = useState<Endpoint>(Endpoint.Scrape);
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false);
  const [hasFirecrawlKey, setHasFirecrawlKey] = useState(false);

  useEffect(() => {
    // Check for API keys
    const checkKeys = async () => {
      try {
        const response = await fetch('/api/check-keys');
        const data = await response.json();
        setHasOpenAIKey(data.hasOpenAI);
        setHasFirecrawlKey(data.hasFirecrawl);
      } catch (error) {
        console.error('Error checking API keys:', error);
      }
    };
    checkKeys();
  }, []);

  const handleAnalysis = async () => {
    if (!url) return;
    
    // Auto-prepend https:// if no protocol is provided
    let processedUrl = url.trim();
    if (!processedUrl.match(/^https?:\/\//i)) {
      processedUrl = 'https://' + processedUrl;
    }
    
    // Validate URL format
    try {
      const urlObj = new URL(processedUrl);
      // Check if it's http or https
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        setUrlError('Please enter a valid URL (e.g., example.com)');
        return;
      }
    } catch (error) {
      // If URL constructor throws, it's not a valid URL
      setUrlError('Please enter a valid URL (e.g., example.com)');
      return;
    }
    
    setIsAnalyzing(true);
    setShowResults(false);
    setAnalysisData(null);
    
    try {
      // Start basic analysis
      const basicAnalysisPromise = fetch('/api/ai-readiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: processedUrl }),
      });
      
      // Disable automatic AI analysis for now - user will click button
      let aiAnalysisPromise = null;
      
      // Wait for basic analysis
      const response = await basicAnalysisPromise;
      const data = await response.json();
      
      if (data.success) {
        setAnalysisData({
          ...data,
          aiAnalysisPromise: null, // No auto AI analysis
          hasOpenAIKey: false, // Disable auto AI
        });
        setShowResults(true);
      } else {
        setUrlError(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setUrlError('Network error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <HeaderProvider>
      <div className="min-h-screen bg-surface-primary text-text-primary">
        {/* Header */}
        <HeaderWrapper>
          <div className="container flex items-center justify-between py-16 px-16">
            <HeaderBrandKit />
            
            <div className="flex items-center gap-16">
              <HeaderDropdownWrapper />
            </div>
          </div>
        </HeaderWrapper>

        {/* Hero Section */}
        <HomeHero />

        {/* Analysis Results */}
        <AnimatePresence>
          {(isAnalyzing || showResults) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="container px-16 py-32"
            >
              <ControlPanel
                isAnalyzing={isAnalyzing}
                showResults={showResults}
                url={url}
                analysisData={analysisData}
                onReset={() => {
                  setIsAnalyzing(false);
                  setShowResults(false);
                  setAnalysisStep(0);
                  setAnalysisData(null);
                  setUrl("");
                }}
              />
              
              {showResults && analysisData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <InlineResults
                    isAnalyzing={isAnalyzing}
                    showResults={showResults}
                    analysisStep={analysisStep}
                    url={url}
                    onReset={() => {
                      setIsAnalyzing(false);
                      setShowResults(false);
                      setAnalysisStep(0);
                      setAnalysisData(null);
                      setUrl("");
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HeaderProvider>
  );
}