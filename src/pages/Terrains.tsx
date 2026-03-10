import { motion } from "framer-motion";
import { MapPin, Maximize, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { terrains, formatPrice } from "@/data/properties";

const TerrainsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Terrains Disponibles</h1>
          <p className="text-muted-foreground">Découvrez nos terrains constructibles dans les meilleures zones.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terrains.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-primary/30" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-heading font-semibold text-card-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{t.surface} m²</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{t.zoning}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-heading font-bold text-lg text-primary">{formatPrice(t.price)}</span>
                  <Button size="sm" asChild><Link to="/contact">Contacter</Link></Button>
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

export default TerrainsPage;
