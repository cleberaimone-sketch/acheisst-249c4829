import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import MarqueeTicker from "@/components/MarqueeTicker";

const navItems = [
  { label: "Sessions", to: "/sessions" },
  { label: "Speakers", to: "/speakers" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Marquee ticker */}
      <MarqueeTicker />

      {/* Top tier: logo + CTA */}
      <div className="bg-background border-b border-border">
        <div className="px-6 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-foreground text-xl font-medium tracking-tight">
            Craft Summit <span className="text-muted-foreground">25</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="/#tickets"
              className="hidden md:inline-flex items-center gap-2 border border-foreground text-foreground px-5 py-2 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
            >
              Get your ticket <ArrowRight className="w-3 h-3" />
            </a>
            <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom tier: full-width sub-nav */}
      <nav className="hidden md:flex bg-background border-b border-border">
        {navItems.map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex-1 text-center py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors ${
              i < navItems.length - 1 ? "border-r border-border" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="py-3 border-b border-border last:border-b-0 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/sessions"
            className="mt-4 inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Get your ticket <ArrowRight className="w-3 h-3" />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
