import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import VehicleCard from "@/components/VehicleCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Car } from "lucide-react";

interface Vehicle {
  id: string;
  title: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  transaction_type: string;
  rental_price_per_day?: number;
  description: string;
  features: string[];
  mileage: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  color: string;
  condition: string;
  images: string[];
  featured: boolean;
  status: string;
}

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] = useState<string>("all");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles
    .filter((vehicle: Vehicle) => {
      const matchesSearch = vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || vehicle.category === selectedCategory;
      const matchesTransaction = selectedTransaction === "all" ||
                                vehicle.transaction_type === selectedTransaction ||
                                vehicle.transaction_type === "both";
      const matchesFuelType = selectedFuelType === "all" || vehicle.fuel_type === selectedFuelType;

      return matchesSearch && matchesCategory && matchesTransaction && matchesFuelType;
    })
    .sort((a: Vehicle, b: Vehicle) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "featured":
        default:
          return b.featured ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20 pt-32"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200')] opacity-20 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Nos Véhicules</h1>
            </div>
            <p className="text-xl text-white/90">
              Découvrez notre sélection de véhicules personnels, camions et cars.
              Vente et location disponibles.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <div className="bg-white shadow-md sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="Personnel">Personnel</SelectItem>
                <SelectItem value="Camion">Camion</SelectItem>
                <SelectItem value="Car">Car</SelectItem>
              </SelectContent>
            </Select>

            {/* Transaction Type Filter */}
            <Select value={selectedTransaction} onValueChange={setSelectedTransaction}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Vente & Location</SelectItem>
                <SelectItem value="sale">Vente uniquement</SelectItem>
                <SelectItem value="rent">Location uniquement</SelectItem>
              </SelectContent>
            </Select>

            {/* Fuel Type Filter */}
            <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
              <SelectTrigger>
                <SelectValue placeholder="Carburant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous carburants</SelectItem>
                <SelectItem value="Essence">Essence</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Électrique">Électrique</SelectItem>
                <SelectItem value="Hybride">Hybride</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? "s" : ""} trouvé{filteredVehicles.length > 1 ? "s" : ""}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">En vedette</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="year-desc">Plus récents</SelectItem>
                <SelectItem value="year-asc">Plus anciens</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle: Vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Aucun véhicule trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Vehicles;
