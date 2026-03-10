import { Link } from "react-router-dom";
import { MapPin, Maximize, BedDouble, Bath, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Property, formatPrice } from "@/data/properties";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const images = [property1, property2, property3];

const PropertyCard = ({ property, index = 0 }: { property: Property; index?: number }) => {
  const img = images[index % images.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/proprietes/${property.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </div>
          <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4 text-destructive" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent h-20" />
          <div className="absolute bottom-3 left-3 font-heading font-bold text-lg text-primary-foreground">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-card-foreground line-clamp-1 mb-1">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="w-3.5 h-3.5" /> {property.location}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{property.surface} m²</span>
            <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{property.bedrooms} ch.</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms} sdb.</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
