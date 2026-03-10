import { motion } from "framer-motion";
import { Hammer, ClipboardCheck, Ruler, HardHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  { icon: Hammer, title: "Construction Clé en Main", desc: "De la conception à la remise des clés, nous gérons l'intégralité de votre projet de construction avec les meilleurs artisans." },
  { icon: Ruler, title: "Architecture & Design", desc: "Nos architectes conçoivent des plans modernes et fonctionnels adaptés à vos besoins et votre budget." },
  { icon: HardHat, title: "Rénovation", desc: "Transformez votre bien avec nos services de rénovation complète ou partielle." },
  { icon: ClipboardCheck, title: "Suivi de Chantier", desc: "Un suivi rigoureux de votre chantier avec des rapports réguliers et un respect strict des délais." },
];

const ConstructionPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Construction</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Services de Construction
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            De la conception à la réalisation, notre équipe d'experts vous accompagne dans tous vos projets de construction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-xl shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-card-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-hero-gradient rounded-2xl p-10 md:p-14 text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Demandez un devis gratuit
          </h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
            Décrivez votre projet et recevez une estimation détaillée sous 48h.
          </p>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link to="/contact">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ConstructionPage;
