import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-iskovial-2.jpeg";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="ISKOVIAL GROUP" className="h-12 w-auto rounded-xl" />
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
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +225 01 02 39 00 49</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +225 07 99 99 25 17</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> iskovialgroup@iskovial.com</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> Yopougon Ananeraie, Abidjan, Côte d'Ivoire</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
        © {new Date().getFullYear()} ISKOVIAL GROUP. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
