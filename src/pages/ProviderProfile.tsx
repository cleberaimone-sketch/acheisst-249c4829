import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BadgeCheck, MapPin, Globe, Mail, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const ACCOUNT_LABEL: Record<string, string> = {
  profissional: "Profissional SST",
  clinica: "Clínica",
  empresa_sst: "Empresa SST",
  empresa_epi: "Fornecedor EPI",
};

const ACCOUNT_BACK: Record<string, { label: string; to: string }> = {
  profissional: { label: "Profissionais", to: "/profissionais" },
  clinica: { label: "Clínicas", to: "/clinicas" },
  empresa_sst: { label: "Empresas SST", to: "/empresas-sst" },
  empresa_epi: { label: "Fornecedores EPI", to: "/empresas-epi" },
};

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*, professional_specialties(specialty)")
        .eq("id", id)
        .maybeSingle();
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [id]);

  const back = profile ? ACCOUNT_BACK[profile.account_type] : null;
  const initials = (profile?.display_name ?? "?")
    .split(" ")
    .map((s: string) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const seo = useMemo(() => {
    if (!profile) return null;
    const name = profile.display_name ?? "Prestador SST";
    const role = ACCOUNT_LABEL[profile.account_type] ?? "Prestador";
    const loc = [profile.city, profile.state].filter(Boolean).join(" / ");
    const title = `${name} — ${role}${loc ? ` em ${loc}` : ""} | AcheiSST`;
    const desc = (profile.about ?? `${role} cadastrado no AcheiSST${loc ? ` em ${loc}` : ""}.`).slice(0, 158);
    const url = typeof window !== "undefined" ? window.location.href : "";
    const isOrg = profile.account_type !== "profissional";
    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": isOrg ? "LocalBusiness" : "Person",
      name,
      description: profile.about ?? undefined,
      url,
      image: profile.avatar_url ?? undefined,
      telephone: profile.phone ?? profile.whatsapp ?? undefined,
      email: profile.public_email ?? undefined,
      address: loc
        ? {
            "@type": "PostalAddress",
            addressLocality: profile.city ?? undefined,
            addressRegion: profile.state ?? undefined,
            addressCountry: "BR",
          }
        : undefined,
    };
    return { title, desc, url, jsonLd };
  }, [profile]);

  return (
    <div className="min-h-screen bg-background">
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.desc} />
          <link rel="canonical" href={seo.url} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.desc} />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content={seo.url} />
          {profile?.avatar_url && <meta property="og:image" content={profile.avatar_url} />}
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
        </Helmet>
      )}
      <Header />
      <main className="pt-32 md:pt-40 pb-20">
        <div className="px-6 md:px-10 max-w-4xl mx-auto">
          {loading ? (
            <Skeleton className="h-72 rounded-xl" />
          ) : !profile ? (
            <div className="text-center py-20">
              <h1 className="font-display text-3xl font-bold mb-3">Perfil não encontrado</h1>
              <p className="text-muted-foreground mb-6">Este prestador não existe ou foi removido.</p>
              <Button asChild>
                <Link to="/">Voltar para a home</Link>
              </Button>
            </div>
          ) : (
            <article>
              {back && (
                <Link
                  to={back.to}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                  <ArrowLeft className="w-4 h-4" /> {back.label}
                </Link>
              )}

              <header className="bg-background border border-border rounded-xl p-6 md:p-8 shadow-card">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24 border border-border">
                    <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.display_name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-2">
                      {ACCOUNT_LABEL[profile.account_type]}
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2 flex-wrap">
                      {profile.display_name ?? "Sem nome"}
                      {profile.is_verified && (
                        <BadgeCheck className="w-6 h-6 text-primary" aria-label="Verificado" />
                      )}
                    </h1>
                    {(profile.city || profile.state) && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                        <MapPin className="w-4 h-4" />
                        {[profile.city, profile.state].filter(Boolean).join(" / ")}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {profile.whatsapp && (
                        <Button asChild variant="secondary">
                          <a
                            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MessageCircle /> WhatsApp
                          </a>
                        </Button>
                      )}
                      {profile.public_email && (
                        <Button asChild variant="outline">
                          <a href={`mailto:${profile.public_email}`}>
                            <Mail /> E-mail
                          </a>
                        </Button>
                      )}
                      {profile.website && (
                        <Button asChild variant="outline">
                          <a href={profile.website} target="_blank" rel="noreferrer">
                            <Globe /> Site
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {profile.about && (
                <section className="mt-6 bg-background border border-border rounded-xl p-6 md:p-8 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-3">Sobre</h2>
                  <p className="text-foreground whitespace-pre-line leading-relaxed">{profile.about}</p>
                </section>
              )}

              {profile.professional_specialties?.length > 0 && (
                <section className="mt-6 bg-background border border-border rounded-xl p-6 md:p-8 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-3">Especialidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.professional_specialties.map((s: any) => (
                      <span
                        key={s.specialty}
                        className="text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
                      >
                        {s.specialty}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {(profile.phone || profile.public_email || profile.website) && (
                <section className="mt-6 bg-background border border-border rounded-xl p-6 md:p-8 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-4">Contato</h2>
                  <ul className="space-y-2 text-sm">
                    {profile.phone && (
                      <li className="flex items-center gap-2 text-foreground">
                        <Phone className="w-4 h-4 text-muted-foreground" /> {profile.phone}
                      </li>
                    )}
                    {profile.public_email && (
                      <li className="flex items-center gap-2 text-foreground">
                        <Mail className="w-4 h-4 text-muted-foreground" /> {profile.public_email}
                      </li>
                    )}
                    {profile.website && (
                      <li className="flex items-center gap-2 text-foreground">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a href={profile.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                          {profile.website}
                        </a>
                      </li>
                    )}
                  </ul>
                </section>
              )}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
