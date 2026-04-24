import { Newspaper, ArrowRight } from "lucide-react";

const news = [
  {
    tag: "eSocial",
    title: "Novos eventos de SST no eSocial: o que muda em 2026",
    excerpt:
      "Confira as atualizações dos eventos S-2210, S-2220 e S-2240 e como elas impactam o envio de informações de saúde e segurança.",
  },
  {
    tag: "NR-1",
    title: "Riscos psicossociais passam a ser obrigatórios no PGR",
    excerpt:
      "A nova redação da NR-1 inclui a gestão de riscos psicossociais. Veja como adequar o Programa de Gerenciamento de Riscos.",
  },
  {
    tag: "Mercado",
    title: "Demanda por técnicos de segurança cresce 18% no Brasil",
    excerpt:
      "Levantamento mostra aumento de vagas para profissionais de SST em indústrias, construção civil e logística.",
  },
];

const NewsSection = () => (
  <section id="novidades" className="bg-background py-20 md:py-28">
    <div className="px-6 md:px-10 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3 inline-flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5" /> Novidades em SST
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
            O que está acontecendo no universo da Saúde e Segurança
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          Ver todas as notícias <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.title}
            className="group bg-background border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
              {item.tag}
            </span>
            <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ler artigo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
