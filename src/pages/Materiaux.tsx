import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

const categories = ["Tous", "Ciment", "Briques", "Fer", "Sable", "Gravier", "Peinture", "Autre"];

const MateriauxPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() =>
    materials.filter((m) => {
      const matchCat = category === "Tous" || m.category === category;
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }),
    [search, category, materials]
  );

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Matériaux de Construction</h1>
            <p className="text-muted-foreground">Tout ce dont vous avez besoin pour vos chantiers.</p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card shadow-card border border-border max-w-md">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un matériau..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="h-40 bg-muted flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs font-medium text-accent uppercase">{m.category}</span>
                  <h3 className="font-heading font-semibold text-card-foreground">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="font-heading font-bold text-primary">{formatPrice(m.price)}</span>
                      <span className="text-xs text-muted-foreground ml-1">/ {m.unit}</span>
                    </div>
                    <Button size="sm" asChild><Link to="/contact">Devis</Link></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MateriauxPage;
