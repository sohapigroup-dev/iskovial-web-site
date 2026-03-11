import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => (
  <section className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-hero-gradient rounded-2xl p-10 md:p-16 text-center shadow-hero"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Prêt à concrétiser votre projet ?
        </h2>
        <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
          Contactez-nous dès aujourd'hui pour une estimation gratuite ou pour discuter de votre projet immobilier.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link to="/contact">
              <Phone className="w-4 h-4" /> Nous appeler
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2 border-primary-foreground/30 text-bg-primary-foreground hover:primary-foreground">
            <Link to="/proprietes">
              Explorer les biens <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
