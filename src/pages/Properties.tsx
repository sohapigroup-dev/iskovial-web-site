import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

const types = ["Tous", "Maison", "Appartement", "Villa"];
const sortOptions = [
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Surface", value: "surface" },
];

const PropertiesPage = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Tous");
  const [sort, setSort] = useState("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minSurface, setMinSurface] = useState(0);

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const matchType = activeType === "Tous" || p.type === activeType.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price <= maxPrice;
      const matchSurface = p.surface >= minSurface;
      return matchType && matchSearch && matchPrice && matchSurface;
    });
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "surface") result.sort((a, b) => b.surface - a.surface);
    return result;
  }, [search, activeType, sort, maxPrice, minSurface]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nos Propriétés
            </h1>
            <p className="text-muted-foreground">
              {filtered.length} bien{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card shadow-card border border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher par ville, quartier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filtres
              </Button>
            </div>

            {/* Type tabs */}
            <div className="flex gap-2 flex-wrap">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeType === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Prix max: {new Intl.NumberFormat("fr-FR").format(maxPrice)} MAD
                    </label>
                    <input
                      type="range"
                      min={50000}
                      max={1000000}
                      step={10000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Surface min: {minSurface} m²
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={10}
                      value={minSurface}
                      onChange={(e) => setMinSurface(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Trier par</label>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              Aucun bien ne correspond à vos critères.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertiesPage;
