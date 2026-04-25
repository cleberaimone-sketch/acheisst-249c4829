import { Link } from "react-router-dom";
import { MapPin, BadgeCheck, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ProviderCardData {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  city: string | null;
  state: string | null;
  about: string | null;
  is_verified: boolean;
  whatsapp: string | null;
  specialties?: string[];
}

const ProviderCard = ({ p }: { p: ProviderCardData }) => {
  const initials = (p.display_name ?? "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const wppHref = p.whatsapp
    ? `https://wa.me/${p.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <article className="group bg-background border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col">
      <Link to={`/p/${p.id}`} className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border border-border">
          <AvatarImage src={p.avatar_url ?? undefined} alt={p.display_name ?? "Avatar"} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-foreground truncate">
              {p.display_name ?? "Sem nome"}
            </h3>
            {p.is_verified && (
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" aria-label="Verificado" />
            )}
          </div>
          {(p.city || p.state) && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {[p.city, p.state].filter(Boolean).join(" / ")}
            </p>
          )}
        </div>
      </Link>

      {p.about && (
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.about}</p>
      )}

      {p.specialties && p.specialties.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
        <Link
          to={`/p/${p.id}`}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Ver perfil
        </Link>
        {wppHref && (
          <a
            href={wppHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        )}
      </div>
    </article>
  );
};

export default ProviderCard;
