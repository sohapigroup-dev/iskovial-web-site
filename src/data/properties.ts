export interface Property {
  id: string;
  title: string;
  type: "maison" | "appartement" | "villa" | "terrain";
  price: number;
  location: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  status: "disponible" | "vendu" | "réservé";
}

export interface Terrain {
  id: string;
  title: string;
  location: string;
  surface: number;
  price: number;
  zoning: string;
  description: string;
  image: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Villa Moderne avec Piscine",
    type: "villa",
    price: 450000,
    location: "Casablanca, Ain Diab",
    surface: 350,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine privée, jardin paysager et vue panoramique sur l'océan. Finitions haut de gamme, cuisine équipée, garage double.",
    features: ["Piscine", "Jardin", "Garage", "Vue mer", "Climatisation", "Sécurité 24h"],
    images: [],
    featured: true,
    status: "disponible",
  },
  {
    id: "2",
    title: "Appartement Standing Centre-Ville",
    type: "appartement",
    price: 180000,
    location: "Rabat, Agdal",
    surface: 120,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: "Superbe appartement en plein centre-ville, lumineux avec balcon, parking souterrain et résidence sécurisée.",
    features: ["Balcon", "Parking", "Ascenseur", "Sécurité", "Climatisation"],
    images: [],
    featured: true,
    status: "disponible",
  },
  {
    id: "3",
    title: "Maison Contemporaine avec Jardin",
    type: "maison",
    price: 320000,
    location: "Marrakech, Targa",
    surface: 250,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    description: "Belle maison contemporaine avec grand jardin, terrasse couverte et finitions de qualité dans un quartier résidentiel calme.",
    features: ["Jardin", "Terrasse", "Garage", "Quartier calme", "Cuisine équipée"],
    images: [],
    featured: true,
    status: "disponible",
  },
  {
    id: "4",
    title: "Villa de Luxe Palmeraie",
    type: "villa",
    price: 780000,
    location: "Marrakech, Palmeraie",
    surface: 500,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    description: "Exceptionnelle villa de luxe dans la Palmeraie, architecture traditionnelle revisitée, piscine à débordement, hammam privatif.",
    features: ["Piscine à débordement", "Hammam", "Personnel de maison", "Jardin 2000m²", "Suite parentale"],
    images: [],
    featured: false,
    status: "disponible",
  },
  {
    id: "5",
    title: "Appartement Vue Mer",
    type: "appartement",
    price: 250000,
    location: "Tanger, Malabata",
    surface: 150,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: "Magnifique appartement avec vue imprenable sur la mer et le détroit de Gibraltar. Résidence de standing avec piscine commune.",
    features: ["Vue mer", "Piscine commune", "Terrasse", "Parking", "Gardiennage"],
    images: [],
    featured: false,
    status: "disponible",
  },
  {
    id: "6",
    title: "Maison Traditionnelle Rénovée",
    type: "maison",
    price: 210000,
    location: "Fès, Médina",
    surface: 180,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    description: "Riad traditionnel entièrement rénové avec patio central, fontaine, et toit-terrasse avec vue sur la médina.",
    features: ["Patio", "Toit-terrasse", "Fontaine", "Architecture traditionnelle", "Rénové"],
    images: [],
    featured: false,
    status: "disponible",
  },
];

export const terrains: Terrain[] = [
  { id: "t1", title: "Terrain Constructible Zone Résidentielle", location: "Casablanca, Bouskoura", surface: 500, price: 120000, zoning: "Résidentiel", description: "Terrain plat dans lotissement viabilisé, idéal pour villa.", image: "" },
  { id: "t2", title: "Terrain avec Vue Montagne", location: "Ifrane", surface: 1000, price: 85000, zoning: "Résidentiel", description: "Grand terrain avec vue panoramique sur les montagnes de l'Atlas.", image: "" },
  { id: "t3", title: "Terrain Commercial Centre-Ville", location: "Rabat, Hassan", surface: 300, price: 200000, zoning: "Commercial", description: "Emplacement stratégique en centre-ville pour projet commercial.", image: "" },
];

export const materials: Material[] = [
  { id: "m1", name: "Ciment Portland CPJ 45", category: "Ciment", price: 75, unit: "sac 50kg", description: "Ciment haute résistance pour tous travaux.", image: "", inStock: true },
  { id: "m2", name: "Briques Rouges 12 Trous", category: "Briques", price: 2.5, unit: "unité", description: "Briques de construction standard.", image: "", inStock: true },
  { id: "m3", name: "Fer à Béton Ø12", category: "Fer", price: 12, unit: "barre 12m", description: "Acier pour armature béton armé.", image: "", inStock: true },
  { id: "m4", name: "Sable de Rivière", category: "Sable", price: 150, unit: "m³", description: "Sable lavé pour béton et mortier.", image: "", inStock: true },
  { id: "m5", name: "Gravier 15/25", category: "Gravier", price: 180, unit: "m³", description: "Gravier concassé pour béton.", image: "", inStock: true },
  { id: "m6", name: "Peinture Acrylique Blanche", category: "Peinture", price: 350, unit: "seau 25L", description: "Peinture intérieure haute couvrabilité.", image: "", inStock: true },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD", minimumFractionDigits: 0 }).format(price);
