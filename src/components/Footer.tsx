import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-background text-foreground border-t border-border">
    <div className="px-6 md:px-8 py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Left: logo + date */}
        <div>
          <span className="text-2xl font-medium tracking-tight block mb-3">
            Craft Summit <span className="text-muted-foreground">'25</span>
          </span>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            June 12, 2025 · San Francisco, CA
          </p>
        </div>

        {/* Right: nav links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link to="/privacy" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-[0.15em]">Privacy Policy</Link>
          <Link to="/terms" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-[0.15em]">Terms of Service</Link>
          <Link to="/code-of-conduct" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-[0.15em]">Code of Conduct</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
