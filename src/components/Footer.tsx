import { Link } from "react-router-dom";
import logoText from "@/assets/acheisst-logo-text.png";

const Footer = () => (
  <footer className="bg-muted border-t border-border">
    <div className="px-6 md:px-10 py-14 md:py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={logoText} alt="AcheiSST" className="h-9 w-auto mb-4" />
          <p className="text-sm text-muted-foreground max-w-sm">
            A primeira plataforma que reúne profissionais e empresas de Saúde e Segurança do Trabalho do Brasil.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/#categorias" className="hover:text-primary transition-colors">Categorias</Link></li>
            <li><Link to="/#planos" className="hover:text-primary transition-colors">Planos</Link></li>
            <li><Link to="/#novidades" className="hover:text-primary transition-colors">Novidades</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Institucional</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacidade</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Termos de uso</Link></li>
            <li><Link to="/code-of-conduct" className="hover:text-primary transition-colors">Código de conduta</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()} AcheiSST. Fazendo um mundo mais seguro.
      </div>
    </div>
  </footer>
);

export default Footer;
