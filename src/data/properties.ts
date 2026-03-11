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
  transactionType: "vente" | "location";
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
  images?: string[]; // Galerie d'images optionnelle
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
    location: "Cocody, Abidjan",
    surface: 350,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine privée, jardin paysager et vue panoramique. Finitions haut de gamme, cuisine équipée, garage double.",
    features: ["Piscine", "Jardin", "Garage", "Vue panoramique", "Climatisation", "Sécurité 24h"],
    images: [],
    featured: true,
    status: "disponible",
    transactionType: "vente",
  },
  {
    id: "2",
    title: "Appartement Standing Plateau",
    type: "appartement",
    price: 180000,
    location: "Plateau, Abidjan",
    surface: 120,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: "Superbe appartement en plein centre-ville, lumineux avec balcon, parking souterrain et résidence sécurisée.",
    features: ["Balcon", "Parking", "Ascenseur", "Sécurité", "Climatisation"],
    images: [],
    featured: true,
    status: "disponible",
    transactionType: "location",
  },
  {
    id: "3",
    title: "Maison Contemporaine avec Jardin",
    type: "maison",
    price: 320000,
    location: "Marcory, Abidjan",
    surface: 250,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    description: "Belle maison contemporaine avec grand jardin, terrasse couverte et finitions de qualité dans un quartier résidentiel calme.",
    features: ["Jardin", "Terrasse", "Garage", "Quartier calme", "Cuisine équipée"],
    images: [],
    featured: true,
    status: "disponible",
    transactionType: "vente",
  },
  {
    id: "4",
    title: "Villa de Luxe Riviera",
    type: "villa",
    price: 780000,
    location: "Riviera Golf, Abidjan",
    surface: 500,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    description: "Exceptionnelle villa de luxe à Riviera Golf, architecture moderne élégante, piscine à débordement, salle de sport privée.",
    features: ["Piscine à débordement", "Salle de sport", "Personnel de maison", "Jardin 2000m²", "Suite parentale"],
    images: [],
    featured: false,
    status: "disponible",
    transactionType: "vente",
  },
  {
    id: "5",
    title: "Appartement Vue Lagon",
    type: "appartement",
    price: 250000,
    location: "Zone 4, Abidjan",
    surface: 150,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: "Magnifique appartement avec vue imprenable sur le lagon. Résidence de standing avec piscine commune.",
    features: ["Vue lagon", "Piscine commune", "Terrasse", "Parking", "Gardiennage"],
    images: [],
    featured: false,
    status: "disponible",
    transactionType: "location",
  },
  {
    id: "6",
    title: "Maison Moderne Rénovée",
    type: "maison",
    price: 210000,
    location: "Deux-Plateaux, Abidjan",
    surface: 180,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    description: "Belle maison entièrement rénovée avec espace jardin, terrasse couverte et finitions modernes.",
    features: ["Jardin", "Toit-terrasse", "Moderne", "Quartier résidentiel", "Rénové"],
    images: [],
    featured: false,
    status: "disponible",
    transactionType: "vente",
  },
];

export const terrains: Terrain[] = [
  {
    id: "t1",
    title: "Terrain Constructible Zone Résidentielle",
    location: "Bingerville, Abidjan",
    surface: 500,
    price: 120000,
    zoning: "Résidentiel",
    description: "Terrain plat dans lotissement viabilisé, idéal pour villa.",
    image: "",
    // Exemple avec plusieurs images (décommentez et ajoutez vos images)
    // images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"]
  },
  { id: "t2", title: "Terrain avec Vue Panoramique", location: "Cocody, Abidjan", surface: 1000, price: 85000, zoning: "Résidentiel", description: "Grand terrain avec vue panoramique dans un quartier prisé.", image: "" },
  { id: "t3", title: "Terrain Commercial Centre-Ville", location: "Plateau, Abidjan", surface: 300, price: 200000, zoning: "Commercial", description: "Emplacement stratégique en centre-ville pour projet commercial.", image: "" },
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
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);
