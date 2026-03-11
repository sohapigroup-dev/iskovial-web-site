# Guide d'ajout d'images multiples

## Comment ajouter plusieurs images pour un terrain ou une propriété

### 1. Pour les Terrains

Dans le fichier `src/data/properties.ts`, ajoutez un tableau `images` à votre terrain :

```typescript
{
  id: "t1",
  title: "Terrain Constructible Zone Résidentielle",
  location: "Bingerville, Abidjan",
  surface: 500,
  price: 120000,
  zoning: "Résidentiel",
  description: "Terrain plat dans lotissement viabilisé, idéal pour villa.",
  image: "",
  images: [
    "/src/assets/terrain-1-photo1.jpg",
    "/src/assets/terrain-1-photo2.jpg",
    "/src/assets/terrain-1-photo3.jpg",
    "/src/assets/terrain-1-photo4.jpg"
  ]
}
```

### 2. Pour les Propriétés

Les propriétés ont déjà un champ `images`, ajoutez simplement vos images :

```typescript
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
  description: "Magnifique villa moderne...",
  features: ["Piscine", "Jardin", "Garage"],
  images: [
    "/src/assets/villa-1-exterieur.jpg",
    "/src/assets/villa-1-salon.jpg",
    "/src/assets/villa-1-cuisine.jpg",
    "/src/assets/villa-1-chambre.jpg",
    "/src/assets/villa-1-piscine.jpg"
  ],
  featured: true,
  status: "disponible"
}
```

### 3. Ajouter les images au projet

1. Placez vos images dans le dossier `src/assets/`
2. Importez-les en haut du fichier `properties.ts` :

```typescript
import terrain1Photo1 from "@/assets/terrain-1-photo1.jpg";
import terrain1Photo2 from "@/assets/terrain-1-photo2.jpg";
import terrain1Photo3 from "@/assets/terrain-1-photo3.jpg";
```

3. Utilisez les imports dans votre objet :

```typescript
{
  id: "t1",
  // ... autres propriétés
  images: [terrain1Photo1, terrain1Photo2, terrain1Photo3]
}
```

## Fonctionnalités de la galerie

### Ce qui fonctionne automatiquement :

✅ **Affichage du nombre de photos** - Badge "X photos" apparaît en haut à gauche de l'image
✅ **Navigation au clavier** - Flèches gauche/droite pour naviguer
✅ **Miniatures cliquables** - Barre de miniatures en bas du modal
✅ **Compteur** - "1/5" indique la photo actuelle
✅ **Zoom au clic** - Cliquez sur l'image pour ouvrir la galerie
✅ **Responsive** - Fonctionne sur mobile et desktop

### Exemple complet :

```typescript
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
    images: [
      "/chemin/vers/photo1.jpg",
      "/chemin/vers/photo2.jpg",
      "/chemin/vers/photo3.jpg"
    ]
  }
];
```

## Notes importantes

- Si `images` est vide ou non défini, une image par défaut sera utilisée
- Les images doivent être au format JPG, PNG ou WEBP
- Recommandation : 5-10 photos par propriété/terrain
- Résolution recommandée : 1920x1080px minimum pour une bonne qualité
