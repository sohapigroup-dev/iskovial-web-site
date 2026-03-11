import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-villa.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroImage} alt="Villa de luxe" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10 pt-16">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-accent/20 text-accent backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-accent/30">
            ✦ ISKOVIAL GROUP
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Trouvez le bien
            <br />
            <span className="text-gradient-gold">de vos rêves</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
            Vente, achat, construction et matériaux — une plateforme complète pour tous vos projets immobiliers.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-card/95 backdrop-blur-md rounded-2xl p-2 shadow-hero max-w-xl"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-muted">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ville, quartier, type de bien..."
                className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
              />
            </div>
            <Button size="lg" className="rounded-xl gap-2" asChild>
              <Link to="/proprietes">
                Rechercher <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-8 mt-10"
        >
          {[
            { value: "500+", label: "Biens vendus" },
            { value: "12+", label: "Années d'expérience" },
            { value: "98%", label: "Clients satisfaits" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading text-2xl font-bold text-primary-foreground">{s.value}</div>
              <div className="text-xs text-primary-foreground/60">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
