import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, Home, Check, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const defaultImages = [property1, property2, property3];

const PropertyDetail = () => {
  const { id } = useParams();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4 text-center py-20">
          <div>Chargement...</div>
        </div>
        <Footer />
      </div>
    );
  }

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

  // Utiliser les images de la propriété ou les images par défaut
  const images = property.images && property.images.length > 0
    ? property.images
    : property.image
    ? [property.image]
    : [defaultImages[0]];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/proprietes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour aux propriétés
          </Link>

          {/* Hero image */}
          <Dialog open={imageModalOpen} onOpenChange={(open) => {
            setImageModalOpen(open);
            if (open) setCurrentImageIndex(0);
          }}>
            <DialogTrigger asChild>
              <div className="relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
                <img src={images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize className="w-5 h-5 text-foreground" />
                </div>
                {images.length > 1 && (
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
                    {images.length} photos
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h1 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-2">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-1 text-primary-foreground/90 text-sm md:text-base">
                    <MapPin className="w-4 h-4" /> {property.location}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full p-0 overflow-hidden bg-background">
              <div className="relative bg-black">
                {/* Image principale */}
                <div className="relative aspect-video">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />

                  {/* Contrôles de navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background p-3 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Miniatures */}
                {images.length > 1 && (
                  <div className="bg-background p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <img src={img} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="container mx-auto px-4 pt-8 pb-10">
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
                  <Button size="lg" className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A]" asChild>
                    <a href="https://wa.me/2250799992517?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20la%20propriété%20:%20" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" /> Contacter via WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2" asChild>
                    <Link to="/contact">
                      <Phone className="w-4 h-4" /> Appeler l'agent
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4" /> Demander plus d'infos
                    </Link>
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
