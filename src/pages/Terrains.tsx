import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerrainCard from "@/components/TerrainCard";
import { supabase } from "@/lib/supabase";

const TerrainsPage = () => {
  const [terrains, setTerrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerrains();
  }, []);

  const fetchTerrains = async () => {
    try {
      const { data, error } = await supabase
        .from('terrains')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTerrains(data || []);
    } catch (error) {
      console.error('Error fetching terrains:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">Chargement...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Terrains Disponibles</h1>
          <p className="text-muted-foreground">Découvrez nos terrains constructibles dans les meilleures zones.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {terrains.map((t, i) => (
            <TerrainCard key={t.id} terrain={t} index={i} />
          ))}
        </div>

        {terrains.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Aucun terrain disponible pour le moment.
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerrainsPage;
