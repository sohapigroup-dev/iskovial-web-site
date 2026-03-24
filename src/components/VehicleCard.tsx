import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Gauge, Fuel, Settings, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  mileage: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  condition: string;
  images: string[];
  featured: boolean;
  status: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
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

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "sale":
        return <Badge variant="outline">Vente uniquement</Badge>;
      case "rent":
        return <Badge variant="outline">Location uniquement</Badge>;
      case "both":
        return <Badge variant="outline">Vente & Location</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
        <div className="relative overflow-hidden h-32 md:h-56">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
            <Badge className={`${getCategoryColor(vehicle.category)} text-[10px] md:text-xs px-1.5 md:px-2 py-0.5`}>
              {vehicle.category}
            </Badge>
            {vehicle.featured && (
              <Badge className="bg-gold/90 text-white border-gold text-[10px] md:text-xs px-1.5 md:px-2 py-0.5">
                En vedette
              </Badge>
            )}
          </div>
          <div className="absolute top-2 md:top-4 right-2 md:right-4">
            <Badge className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 ${
              vehicle.status === "available" ? "bg-green-500/10 text-green-600 border-green-200" :
              vehicle.status === "sold" ? "bg-red-500/10 text-red-600 border-red-200" :
              vehicle.status === "rented" ? "bg-yellow-500/10 text-yellow-600 border-yellow-200" :
              "bg-blue-500/10 text-blue-600 border-blue-200"
            }`}>
              <span className="hidden md:inline">{
                vehicle.status === "available" ? "Disponible" :
                vehicle.status === "sold" ? "Vendu" :
                vehicle.status === "rented" ? "Loué" : "Réservé"
              }</span>
              <span className="md:hidden">{
                vehicle.status === "available" ? "Dispo" :
                vehicle.status === "sold" ? "Vendu" :
                vehicle.status === "rented" ? "Loué" : "Rés."
              }</span>
            </Badge>
          </div>
        </div>

        <CardContent className="p-3 md:p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-1 md:mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1 group-hover:text-primary transition-colors truncate">
                {vehicle.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 truncate">
                {vehicle.brand} {vehicle.model}
              </p>
            </div>
          </div>

          <div className="mb-2 md:mb-4 hidden md:block">
            {getTransactionBadge(vehicle.transaction_type)}
          </div>

          {/* Desktop specs */}
          <div className="hidden md:grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Gauge className="w-4 h-4 text-primary" />
              <span>{vehicle.mileage}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Fuel className="w-4 h-4 text-primary" />
              <span>{vehicle.fuel_type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Settings className="w-4 h-4 text-primary" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-primary" />
              <span>{vehicle.seats} places</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Car className="w-4 h-4 text-primary" />
              <span>{vehicle.condition}</span>
            </div>
          </div>

          {/* Mobile specs - compact */}
          <div className="md:hidden flex flex-wrap gap-1.5 mb-2 text-[10px] text-gray-600">
            <span className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3 text-primary" />
              {vehicle.year}
            </span>
            <span className="flex items-center gap-0.5">
              <Fuel className="w-3 h-3 text-primary" />
              {vehicle.fuel_type}
            </span>
            <span className="flex items-center gap-0.5">
              <Settings className="w-3 h-3 text-primary" />
              {vehicle.transmission === "Automatique" ? "Auto" : "Man."}
            </span>
          </div>

          <div className="mt-auto">
            <div className="mb-2 md:mb-4">
              <div className="flex flex-col gap-0.5 md:gap-1">
                {vehicle.transaction_type !== "rent" && (
                  <div>
                    <span className="text-[10px] md:text-sm text-gray-600 hidden md:inline">Prix de vente:</span>
                    <p className="text-sm md:text-2xl font-bold text-primary">
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                )}
                {vehicle.transaction_type !== "sale" && vehicle.rental_price_per_day && (
                  <div className="md:mt-2">
                    <span className="text-[10px] md:text-sm text-gray-600">
                      <span className="hidden md:inline">Location/jour:</span>
                      <span className="md:hidden">/jour:</span>
                    </span>
                    <p className="text-xs md:text-lg font-semibold text-gold">
                      {formatPrice(vehicle.rental_price_per_day)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Link to={`/vehicules/${vehicle.id}`}>
              <Button className="w-full group/btn text-xs md:text-sm h-8 md:h-10">
                <span className="hidden md:inline">Voir les détails</span>
                <span className="md:hidden">Détails</span>
                <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VehicleCard;
