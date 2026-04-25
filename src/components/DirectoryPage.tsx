import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProviderCard, { ProviderCardData } from "@/components/ProviderCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AccountType = Database["public"]["Enums"]["account_type"];

interface DirectoryPageProps {
  accountType: AccountType;
  title: string;
  subtitle: string;
  eyebrow: string;
}

const BR_STATES = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

const DirectoryPage = ({ accountType, title, subtitle, eyebrow }: DirectoryPageProps) => {
  const [searchParams] = useSearchParams();
  const [profiles, setProfiles] = useState<ProviderCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [stateFilter, setStateFilter] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, city, state, about, is_verified, whatsapp, professional_specialties(specialty)")
        .eq("account_type", accountType)
        .order("is_verified", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProfiles(
          data.map((p: any) => ({
            id: p.id,
            display_name: p.display_name,
            avatar_url: p.avatar_url,
            city: p.city,
            state: p.state,
            about: p.about,
            is_verified: p.is_verified,
            whatsapp: p.whatsapp,
            specialties: (p.professional_specialties ?? []).map((s: any) => s.specialty),
          })),
        );
      }
      setLoading(false);
    };
    load();
  }, [accountType]);

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (stateFilter && p.state !== stateFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        const blob = `${p.display_name ?? ""} ${p.city ?? ""} ${(p.specialties ?? []).join(" ")} ${p.about ?? ""}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [profiles, query, stateFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-40 pb-20">
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <header className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
              {eyebrow}
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-4 text-muted-foreground">{subtitle}</p>
          </header>

          <div className="flex flex-col md:flex-row gap-3 mb-10 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center bg-background border border-border rounded-full pl-5 pr-2 py-2 focus-within:border-primary transition-all">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, especialidade, cidade..."
                className="flex-1 bg-transparent outline-none px-3 py-1.5 text-sm placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center bg-background border border-border rounded-full pl-4 pr-3 py-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-transparent outline-none px-2 py-1.5 text-sm text-foreground"
              >
                <option value="">Todos os estados</option>
                {BR_STATES.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-foreground font-semibold mb-2">Nada encontrado por aqui</p>
              <p className="text-sm text-muted-foreground">
                Ajuste os filtros ou volte em breve — novos cadastros chegam todos os dias.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProviderCard key={p.id} p={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DirectoryPage;
