import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroKeynote from "@/assets/hero-keynote.jpg";

const HeroSection = () => (
  <section className="bg-background text-foreground">
    {/* Headline area */}
    <div className="px-6 md:px-8 pt-40 md:pt-52 pb-16 md:pb-24">
      <h1 className="text-5xl sm:text-7xl md:text-[6rem] font-medium leading-[0.95] tracking-[-0.04em] max-w-[90%] md:max-w-[70%]">
        The product conference for builders
      </h1>

      <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            June 12, 2025 · San Francisco, CA
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#tickets" className="border border-foreground text-foreground px-7 py-3 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all inline-flex items-center gap-2">
              Get your ticket <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link to="/speakers" className="border border-border text-foreground px-7 py-3 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all inline-flex items-center gap-2">
              View speakers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <p className="text-3xl md:text-5xl font-medium text-foreground tracking-tight text-right hidden md:block leading-[1.1]">
          Where product&nbsp;leaders&nbsp;gather.
        </p>
      </div>
    </div>

    {/* Full-bleed hero image */}
    <div className="w-full">
      <img
        src={heroKeynote}
        alt="Craft Summit 2025 conference"
        className="w-full h-[40vh] md:h-[56vh] object-cover"
        loading="eager"
      />
    </div>
  </section>
);

export default HeroSection;
