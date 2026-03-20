export interface Vehicle {
  id: string;
  title: string;
  category: "Personnel" | "Camion" | "Car";
  brand: string;
  model: string;
  year: number;
  price: number;
  transactionType: "sale" | "rent" | "both";
  rentalPricePerDay?: number;
  description: string;
  features: string[];
  specifications: {
    mileage: string;
    fuelType: "Essence" | "Diesel" | "Électrique" | "Hybride";
    transmission: "Manuelle" | "Automatique";
    seats: number;
    color: string;
    condition: "Neuf" | "Occasion";
  };
  images: string[];
  featured: boolean;
  status: "available" | "sold" | "rented" | "reserved";
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    title: "Toyota Land Cruiser V8",
    category: "Personnel",
    brand: "Toyota",
    model: "Land Cruiser V8",
    year: 2022,
    price: 35000000,
    transactionType: "both",
    rentalPricePerDay: 75000,
    description: "SUV de luxe 4x4, idéal pour tous types de terrains. Véhicule en excellent état avec toutes les options de confort et de sécurité.",
    features: [
      "Climatisation automatique",
      "Sièges en cuir",
      "GPS intégré",
      "Caméra de recul",
      "Système audio premium",
      "Toit ouvrant",
      "7 places",
      "4x4 tout-terrain"
    ],
    specifications: {
      mileage: "45 000 km",
      fuelType: "Diesel",
      transmission: "Automatique",
      seats: 7,
      color: "Blanc",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"
    ],
    featured: true,
    status: "available"
  },
  {
    id: "2",
    title: "Mercedes-Benz Classe E",
    category: "Personnel",
    brand: "Mercedes-Benz",
    model: "Classe E 220d",
    year: 2023,
    price: 28000000,
    transactionType: "both",
    rentalPricePerDay: 65000,
    description: "Berline de luxe allemande, confort et élégance. Parfaite pour vos déplacements professionnels et personnels.",
    features: [
      "Sellerie cuir Nappa",
      "Écran multimédia 12.3 pouces",
      "Assistant de stationnement",
      "Régulateur de vitesse adaptatif",
      "Phares LED intelligents",
      "Système audio Burmester",
      "Sièges chauffants et ventilés"
    ],
    specifications: {
      mileage: "12 000 km",
      fuelType: "Diesel",
      transmission: "Automatique",
      seats: 5,
      color: "Noir",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800"
    ],
    featured: true,
    status: "available"
  },
  {
    id: "3",
    title: "Peugeot 508",
    category: "Personnel",
    brand: "Peugeot",
    model: "508 GT",
    year: 2021,
    price: 15000000,
    transactionType: "both",
    rentalPricePerDay: 35000,
    description: "Berline élégante et économique. Idéale pour la ville et les longs trajets avec un excellent confort.",
    features: [
      "I-Cockpit Peugeot",
      "Navigation 3D connectée",
      "Sièges ergonomiques",
      "Aide au stationnement",
      "Détection angles morts",
      "Régulateur de vitesse"
    ],
    specifications: {
      mileage: "68 000 km",
      fuelType: "Diesel",
      transmission: "Automatique",
      seats: 5,
      color: "Gris métallisé",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"
    ],
    featured: false,
    status: "available"
  },
  {
    id: "4",
    title: "Isuzu NPR Camion Benne",
    category: "Camion",
    brand: "Isuzu",
    model: "NPR 75L",
    year: 2020,
    price: 18000000,
    transactionType: "both",
    rentalPricePerDay: 45000,
    description: "Camion benne robuste pour transport de matériaux. Capacité de charge élevée, moteur économique et fiable.",
    features: [
      "Benne basculante hydraulique",
      "Capacité 5 tonnes",
      "Cabine double",
      "Direction assistée",
      "Freins ABS",
      "Suspension renforcée"
    ],
    specifications: {
      mileage: "95 000 km",
      fuelType: "Diesel",
      transmission: "Manuelle",
      seats: 3,
      color: "Blanc",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800",
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800"
    ],
    featured: true,
    status: "available"
  },
  {
    id: "5",
    title: "MAN TGS Camion Porteur",
    category: "Camion",
    brand: "MAN",
    model: "TGS 26.440",
    year: 2019,
    price: 32000000,
    transactionType: "sale",
    description: "Camion porteur grande capacité pour transport lourd. Moteur puissant 440 CV, idéal pour chantiers et transport de marchandises.",
    features: [
      "Plateau fixe 10m",
      "Capacité 15 tonnes",
      "Moteur Euro 5",
      "Cabine couchette",
      "Suspension pneumatique",
      "Ralentisseur intégré",
      "Hayon élévateur"
    ],
    specifications: {
      mileage: "180 000 km",
      fuelType: "Diesel",
      transmission: "Manuelle",
      seats: 2,
      color: "Rouge",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800"
    ],
    featured: false,
    status: "available"
  },
  {
    id: "6",
    title: "Mercedes-Benz Sprinter Bus 22 Places",
    category: "Car",
    brand: "Mercedes-Benz",
    model: "Sprinter 516",
    year: 2021,
    price: 25000000,
    transactionType: "both",
    rentalPricePerDay: 55000,
    description: "Minibus confortable pour transport de personnes. Climatisé, spacieux et sécurisé. Idéal pour écoles, entreprises et événements.",
    features: [
      "22 places assises",
      "Climatisation centrale",
      "Sièges rembourrés",
      "Porte-bagages",
      "Système audio",
      "Caméra de recul",
      "ESP et ABS",
      "Ceintures de sécurité"
    ],
    specifications: {
      mileage: "75 000 km",
      fuelType: "Diesel",
      transmission: "Manuelle",
      seats: 22,
      color: "Blanc",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
    ],
    featured: true,
    status: "available"
  },
  {
    id: "7",
    title: "Yutong ZK6122 Bus 53 Places",
    category: "Car",
    brand: "Yutong",
    model: "ZK6122H9",
    year: 2022,
    price: 42000000,
    transactionType: "sale",
    description: "Grand bus de transport interurbain. Confort premium, climatisation efficace, spacieux et économique. Parfait pour lignes régulières.",
    features: [
      "53 places + chauffeur",
      "Double climatisation",
      "Sièges inclinables",
      "Soutes à bagages",
      "Système multimédia",
      "Double porte pneumatique",
      "Suspension air",
      "Normes Euro 4"
    ],
    specifications: {
      mileage: "45 000 km",
      fuelType: "Diesel",
      transmission: "Manuelle",
      seats: 53,
      color: "Blanc et bleu",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800"
    ],
    featured: false,
    status: "available"
  },
  {
    id: "8",
    title: "Toyota Hiace Minibus 14 Places",
    category: "Car",
    brand: "Toyota",
    model: "Hiace Commuter",
    year: 2023,
    price: 16500000,
    transactionType: "both",
    rentalPricePerDay: 40000,
    description: "Minibus compact et fiable. Très économique, facile à manœuvrer. Parfait pour transport d'équipes ou familles nombreuses.",
    features: [
      "14 places",
      "Climatisation",
      "Direction assistée",
      "Lecteur audio USB/Bluetooth",
      "Sièges confortables",
      "Double porte latérale",
      "Économe en carburant"
    ],
    specifications: {
      mileage: "18 000 km",
      fuelType: "Diesel",
      transmission: "Manuelle",
      seats: 14,
      color: "Blanc",
      condition: "Occasion"
    },
    images: [
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800"
    ],
    featured: false,
    status: "available"
  }
];
