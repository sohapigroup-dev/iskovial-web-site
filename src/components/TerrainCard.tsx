import { Link } from "react-router-dom";
import { MapPin, Maximize, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Terrain, formatPrice } from "@/data/properties";
import property1 from "@/assets/property-1.jpg";

const TerrainCard = ({ terrain, index = 0 }: { terrain: Terrain; index?: number }) => {
  // Utiliser la première image uploadée ou l'image par défaut
  const img = terrain.images && terrain.images.length > 0
    ? terrain.images[0]
    : terrain.image || property1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/terrains/${terrain.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={terrain.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full">
            Terrain {terrain.zoning}
          </div>
          <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent h-16 md:h-20" />
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 font-heading font-bold text-xs md:text-lg text-primary-foreground">
            {formatPrice(terrain.price)}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5 md:p-4">
          <h3 className="font-heading font-semibold text-xs md:text-base text-card-foreground line-clamp-1 mb-1 leading-tight">
            {terrain.title}
          </h3>
          <p className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-3">
            <MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> {terrain.location}
          </p>
          <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Maximize className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
              {terrain.surface} m²
            </span>
            <span className="text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-muted">
              {terrain.zoning}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TerrainCard;
