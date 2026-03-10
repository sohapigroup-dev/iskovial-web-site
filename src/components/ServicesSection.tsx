import { motion } from "framer-motion";
import { Building2, MapPin, Hammer, Package, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Building2, title: "Vente de Maisons", desc: "Large catalogue de maisons et appartements dans les meilleures localisations.", to: "/proprietes" },
  { icon: TrendingUp, title: "Achat de Biens", desc: "Nous rachetons vos biens immobiliers au meilleur prix du marché.", to: "/contact" },
  { icon: MapPin, title: "Vente de Terrains", desc: "Terrains constructibles dans des zones à fort potentiel.", to: "/terrains" },
  { icon: Hammer, title: "Construction", desc: "Construction clé en main, rénovation et suivi de chantier.", to: "/construction" },
  { icon: Package, title: "Matériaux", desc: "Ciment, briques, fer, sable et tout pour vos chantiers.", to: "/materiaux" },
  { icon: Shield, title: "Accompagnement", desc: "Conseil juridique, estimation et accompagnement personnalisé.", to: "/contact" },
];

const ServicesSection = () => (
  <section className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-medium text-accent uppercase tracking-wider">Nos services</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Une solution complète
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          De la recherche à la construction, nous couvrons tous vos besoins immobiliers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={s.to}
              className="block bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 group h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
