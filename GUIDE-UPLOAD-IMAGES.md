# Guide : Upload d'Images avec Supabase Storage

## 📋 Ce qui a été fait

J'ai remplacé le système d'URLs par un **véritable système d'upload d'images** qui stocke les fichiers dans Supabase Storage.

### Nouveaux fichiers créés :

1. **[src/lib/storage.ts](src/lib/storage.ts)** - Fonctions d'upload/suppression d'images
2. **[src/components/ImageUpload.tsx](src/components/ImageUpload.tsx)** - Composant d'upload avec drag & drop visuel
3. **[supabase-storage-setup.sql](supabase-storage-setup.sql)** - Configuration du bucket de stockage

### Fichiers modifiés :

- **[PropertiesManagement.tsx](src/pages/admin/PropertiesManagement.tsx)** - Intégré le composant ImageUpload

---

## 🚀 Installation (2 minutes)

### Étape 1 : Configurer Supabase Storage

**⚠️ IMPORTANT : Cette étape est OBLIGATOIRE pour que l'upload fonctionne !**

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet **ISKOVIAL**
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **New Query**
5. Copiez TOUT le contenu du fichier **[supabase-storage-setup.sql](supabase-storage-setup.sql)**
6. Collez-le dans l'éditeur SQL
7. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)
8. Vous devriez voir "Success. No rows returned"

✅ **Terminé !** Le bucket `iskovial-images` est créé avec les bonnes permissions.

### Comment vérifier que ça fonctionne :

1. Dans le menu de gauche, cliquez sur **Storage**
2. Vous devriez voir un bucket nommé **iskovial-images**
3. Il doit avoir une icône de cadenas ouvert (= public)

---

## 💡 Comment utiliser

### Dans le Backoffice (PropertiesManagement)

1. Allez sur `/admin/properties`
2. Cliquez sur "Nouvelle Propriété" ou modifiez une propriété existante
3. Dans le formulaire, vous verrez maintenant une section **"Images (0/10)"**
4. Cliquez sur **"Uploader des images"**
5. Sélectionnez une ou plusieurs images (JPG, PNG, WebP)
6. Les images s'uploadent automatiquement !
7. **La première image** devient l'image principale
8. Vous pouvez **supprimer** une image en survolant et cliquant sur le bouton rouge

### Caractéristiques :

- ✅ Upload multiple (jusqu'à 10 images)
- ✅ Formats acceptés : JPG, PNG, WebP
- ✅ Taille max : **10MB** par image
- ✅ Aperçu visuel avec miniatures
- ✅ Suppression facile
- ✅ Indicateur d'image principale
- ✅ Messages de confirmation

---

## 🔧 Intégrer dans les autres pages CRUD

Pour ajouter l'upload d'images aux autres pages (Terrains, Véhicules, Matériaux), suivez ce modèle :

### 1. Importer le composant

```typescript
import ImageUpload from '@/components/ImageUpload';
```

### 2. Modifier le state

```typescript
const [formData, setFormData] = useState({
  // ... autres champs
  images: [] as string[], // ← Changer de string à string[]
});
```

### 3. Adapter handleOpenDialog

```typescript
// Au lieu de :
images: terrain.images.join(', ')

// Utiliser :
images: terrain.images || []
```

### 4. Adapter handleSubmit

```typescript
// Au lieu de :
images: formData.images.split(',').map(i => i.trim()).filter(i => i)

// Utiliser :
images: formData.images
```

### 5. Remplacer le Textarea par ImageUpload

```typescript
<ImageUpload
  images={formData.images}
  onImagesChange={(images) => setFormData({ ...formData, images })}
  folder="terrains"  // ← Changer selon l'entité : "vehicles", "materials"
  maxImages={10}
/>
```

---

## 📂 Structure du Storage

Les images sont organisées par dossier :

```
iskovial-images/
├── properties/
│   ├── 1234567890-abc123.jpg
│   ├── 1234567891-def456.png
│   └── ...
├── terrains/
│   └── ...
├── vehicles/
│   └── ...
└── materials/
    └── ...
```

---

## 🎯 Avantages du nouveau système

| Avant (URLs) | Maintenant (Upload) |
|-------------|---------------------|
| ❌ Vous deviez héberger les images ailleurs | ✅ Images hébergées sur Supabase |
| ❌ Copier/coller des URLs manuellement | ✅ Upload direct depuis votre ordinateur |
| ❌ Pas d'aperçu des images | ✅ Aperçu visuel en temps réel |
| ❌ Erreurs de liens cassés | ✅ Images toujours disponibles |
| ❌ Pas de contrôle de taille | ✅ Validation automatique |

---

## 🔐 Sécurité

- **Lecture publique** : Tout le monde peut voir les images (normal pour un site web)
- **Upload restreint** : Seuls les admins authentifiés peuvent uploader
- **Suppression protégée** : Seuls les admins peuvent supprimer
- **Validation** : Type et taille de fichier vérifiés

---

## 📝 Notes importantes

1. **Quotas Supabase gratuit** :
   - 1 GB de stockage
   - 2 GB de bande passante/mois
   - Largement suffisant pour commencer !

2. **Optimisation d'images** :
   - Les images sont stockées telles quelles
   - Pour un site en production, pensez à compresser vos images avant upload
   - Utilisez des outils comme TinyPNG ou ImageOptim

3. **Suppression d'images** :
   - Actuellement, supprimer une image du formulaire ne la supprime PAS du storage
   - Les images restent accessibles si vous avez l'URL
   - C'est une sécurité pour éviter les suppressions accidentelles

---

## 🆘 Dépannage

### "Erreur lors de l'upload des images"
**Cause principale :** Le bucket Supabase n'a pas été créé.

**Solution :**
1. Allez sur https://supabase.com/dashboard
2. Ouvrez le **SQL Editor**
3. Exécutez le fichier [supabase-storage-setup.sql](supabase-storage-setup.sql)
4. Vérifiez que le bucket `iskovial-images` apparaît dans **Storage**

### "Les images ne s'affichent pas"
→ Vérifiez que le bucket est bien public (icône de cadenas ouvert dans Storage)

### "Taille de fichier dépassée"
→ La limite est de **10MB** par image. Si votre image est plus grande, utilisez un outil de compression.

---

## ✨ Prochaines améliorations possibles

- [ ] Compression automatique des images à l'upload
- [ ] Réorganisation des images par drag & drop
- [ ] Suppression des images du storage lors de la suppression d'une propriété
- [ ] Génération automatique de thumbnails
- [ ] Support du drag & drop de fichiers

---

Voilà ! Vous avez maintenant un **système d'upload professionnel** 🎉
