const message = "CRAFT SUMMIT 25 — JUNE 12, 2025 — SAN FRANCISCO, CA";
const separator = " ✦ ";
const repeated = Array(8).fill(message).join(separator) + separator;

const MarqueeTicker = () => (
  <div className="bg-accent overflow-hidden whitespace-nowrap">
    <div className="inline-flex animate-marquee">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-foreground py-2.5 px-4">
        {repeated}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-foreground py-2.5 px-4">
        {repeated}
      </span>
    </div>
  </div>
);

export default MarqueeTicker;
