import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import PropertyCard from "./PropertyCard";
import TerrainCard from "./TerrainCard";

const FeaturedProperties = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  const [featuredTerrains, setFeaturedTerrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const [propertiesRes, terrainsRes] = await Promise.all([
        supabase
          .from('properties')
          .select('*')
          .eq('featured', true)
          .eq('status', 'available')
          .limit(3),
        supabase
          .from('terrains')
          .select('*')
          .eq('featured', true)
          .eq('status', 'available')
          .limit(3),
      ]);

      if (propertiesRes.data) setFeatured(propertiesRes.data);
      if (terrainsRes.data) setFeaturedTerrains(terrainsRes.data);
    } catch (error) {
      console.error('Error fetching featured:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          Chargement...
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>

        {/* Section Terrains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-8"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Terrains disponibles
          </h3>
          <p className="text-muted-foreground text-center mb-8">
            Des terrains constructibles dans les meilleurs emplacements
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredTerrains.map((t, i) => (
            <TerrainCard key={t.id} terrain={t} index={i} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link to="/proprietes">
              Voir toutes les propriétés <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" asChild className="gap-2">
            <Link to="/terrains">
              Voir tous les terrains <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
