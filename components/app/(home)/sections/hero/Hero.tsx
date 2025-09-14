'use client';

import Link from "next/link";

import { Connector } from "@/components/shared/layout/curvy-rect";
import HeroFlame from "@/components/shared/effects/flame/hero-flame";
import { useTranslations } from "@/hooks/useTranslations";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

import HomeHeroBackground from "./Background/Background";
import { BackgroundOuterPiece } from "./Background/BackgroundOuterPiece";
import HomeHeroBadge from "./Badge/Badge";
import HomeHeroPixi from "./Pixi/Pixi";
import HomeHeroTitle from "./Title/Title";
import HeroInput from "../hero-input/HeroInput";
import HeroScraping from "../hero-scraping/HeroScraping";

export default function HomeHero() {
  const { t, locale } = useTranslations();

  return (
    <section className="overflow-x-clip" id="home-hero">
      <div
        className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative"
        id="hero-content"
      >
        <HomeHeroPixi />
        <HeroFlame />

        <BackgroundOuterPiece />

        <HomeHeroBackground />

        <div className="relative container px-16">
          <div className="absolute top-4 right-4 z-10">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <HomeHeroBadge />
          <HomeHeroTitle />
        </div>

        <div className="container px-16">
          <p className="text-center text-body-large">
            {t('hero.description')}
          </p>
        </div>
      </div>

      <div className="container lg:contents !p-16 relative -mt-90">
        <div className="absolute top-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />
        <div className="absolute bottom-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />

        <Connector className="-top-10 -left-[10.5px] lg:hidden" />
        <Connector className="-top-10 -right-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -left-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -right-[10.5px] lg:hidden" />

        <HeroInput />
      </div>

      <HeroScraping />
    </section>
  );
}
