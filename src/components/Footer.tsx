import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl">
              Immo<span className="text-gradient-gold">Elite</span>
            </span>
          </Link>
          <p className="text-sm opacity-70 leading-relaxed">
            Votre partenaire de confiance pour tous vos projets immobiliers. Vente, achat, construction et matériaux.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {["Propriétés", "Terrains", "Construction", "Matériaux", "Blog", "À propos"].map((t) => (
              <li key={t}>
                <Link to={`/${t.toLowerCase().replace(/\s/g, "-").replace("é", "e")}`} className="hover:opacity-100 transition-opacity">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Vente immobilière</li>
            <li>Achat de biens</li>
            <li>Construction clé en main</li>
            <li>Vente de terrains</li>
            <li>Matériaux de construction</li>
            <li>Estimation gratuite</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +212 5 22 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@immoelite.ma</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> 123 Boulevard Mohammed V, Casablanca</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
        © {new Date().getFullYear()} ImmoElite. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
