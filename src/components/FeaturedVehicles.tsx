import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import VehicleCard from "./VehicleCard";
import { Button } from "./ui/button";
import { ArrowRight, Car } from "lucide-react";

const FeaturedVehicles = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedVehicles();
  }, []);

  const fetchFeaturedVehicles = async () => {
    try {
      // Récupérer tous les véhicules disponibles, featured en priorité
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'available')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedVehicles(data || []);
    } catch (error) {
      console.error('Error fetching featured vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          Chargement...
        </div>
      </section>
    );
  }

  if (featuredVehicles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-3 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <Car className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold">Véhicules en Vedette</h2>
          </div>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules personnels, camions et cars.
            Vente et location disponibles.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/vehicules">
            <Button size="lg" className="group text-sm md:text-base">
              Voir tous les véhicules
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
