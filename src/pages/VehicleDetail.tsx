import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Users,
  Car,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
} from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setVehicle(data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Véhicule non trouvé</h2>
          <Link to="/vehicules">
            <Button>Retour aux véhicules</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Personnel":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Camion":
        return "bg-orange-500/10 text-orange-600 border-orange-200";
      case "Car":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-600 border-green-200">Disponible</Badge>;
      case "sold":
        return <Badge className="bg-red-500/10 text-red-600 border-red-200">Vendu</Badge>;
      case "rented":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">Loué</Badge>;
      case "reserved":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">Réservé</Badge>;
      default:
        return null;
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") setIsGalleryOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Breadcrumb */}
      <div className="bg-white border-b mt-16">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/vehicules"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux véhicules
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Main Image */}
              <div
                className="relative h-96 cursor-pointer group"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={vehicle.images[selectedImageIndex]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-semibold">
                    Cliquez pour agrandir
                  </p>
                </div>
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {vehicle.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary scale-105"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${vehicle.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Description & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 mt-6"
            >
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{vehicle.description}</p>

              <h3 className="text-xl font-bold mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <Badge className={getCategoryColor(vehicle.category)}>
                    {vehicle.category}
                  </Badge>
                  {vehicle.featured && (
                    <Badge className="bg-gold/90 text-white border-gold">
                      En vedette
                    </Badge>
                  )}
                </div>
                {getStatusBadge(vehicle.status)}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {vehicle.brand} {vehicle.model}
              </p>

              {/* Price */}
              <div className="border-t border-b py-6 mb-6">
                {vehicle.transaction_type !== "rent" && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Prix de vente</p>
                    <p className="text-4xl font-bold text-primary">
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                )}
                {vehicle.transaction_type !== "sale" && vehicle.rental_price_per_day && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location par jour</p>
                    <p className="text-2xl font-semibold text-gold">
                      {formatPrice(vehicle.rental_price_per_day)}
                    </p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <h3 className="font-bold text-lg mb-4">Spécifications</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Année</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Kilométrage</p>
                    <p className="font-semibold">{vehicle.mileage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Carburant</p>
                    <p className="font-semibold">{vehicle.fuel_type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Places</p>
                    <p className="font-semibold">{vehicle.seats} places</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Palette className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Couleur</p>
                    <p className="font-semibold">{vehicle.color || 'Non spécifié'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">État</p>
                    <p className="font-semibold">{vehicle.condition}</p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <a href={`https://wa.me/2250799992517?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20le%20véhicule%20:%20${encodeURIComponent(vehicle.title)}`} target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A]">
                    <MessageCircle className="w-5 h-5" />
                    Contacter via WhatsApp
                  </Button>
                </a>
                <Link to="/contact" className="block">
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    <Phone className="w-5 h-5" />
                    Appeler l'agent
                  </Button>
                </Link>
                <a href="mailto:iskovialgroup@iskovial.com" className="block">
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    <Mail className="w-5 h-5" />
                    Envoyer un email
                  </Button>
                </a>
              </div>

              <div className="text-xs text-muted-foreground text-center mt-4">
                Réponse sous 24h garantie
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsGalleryOpen(false)}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={vehicle.images[selectedImageIndex]}
                alt={vehicle.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
                    {selectedImageIndex + 1} / {vehicle.images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
