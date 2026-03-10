import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, Home, Check, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties, formatPrice } from "@/data/properties";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const images = [property1, property2, property3];

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4 text-center py-20">
          <h1 className="font-heading text-2xl font-bold mb-4">Bien non trouvé</h1>
          <Button asChild><Link to="/proprietes">Retour aux propriétés</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const imgIndex = parseInt(property.id) % images.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <img src={images[imgIndex]} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/proprietes" className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Link>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {property.title}
              </h1>
              <p className="flex items-center gap-1 text-primary-foreground/80">
                <MapPin className="w-4 h-4" /> {property.location}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { icon: Maximize, label: "Surface", value: `${property.surface} m²` },
                  { icon: Home, label: "Pièces", value: `${property.rooms}` },
                  { icon: BedDouble, label: "Chambres", value: `${property.bedrooms}` },
                  { icon: Bath, label: "Salles de bain", value: `${property.bathrooms}` },
                ].map((s) => (
                  <div key={s.label} className="bg-card rounded-xl p-4 shadow-card text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-heading font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Caractéristiques</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent" /> {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24 space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Prix</div>
                  <div className="font-heading text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full gap-2">
                    <Phone className="w-4 h-4" /> Contacter l'agent
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <Mail className="w-4 h-4" /> Demander plus d'infos
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Réponse sous 24h garantie
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
