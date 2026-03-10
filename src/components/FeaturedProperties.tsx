import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const featured = properties.filter((p) => p.featured);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Sélection exclusive</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Propriétés en vedette
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Découvrez notre sélection de biens d'exception, soigneusement choisis pour vous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link to="/proprietes">
              Voir toutes les propriétés <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
