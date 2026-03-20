# 🔧 Correctif Upload d'Images - ISKOVIAL

## ✅ Ce qui a été corrigé

### 1. Augmentation de la limite à 10MB
- **Avant :** 5MB maximum par image
- **Maintenant :** 10MB maximum par image
- **Fichier modifié :** [src/components/ImageUpload.tsx](src/components/ImageUpload.tsx)

### 2. Amélioration des messages d'erreur
- Ajout de logs détaillés dans la console
- Meilleure identification des erreurs Supabase
- **Fichier modifié :** [src/lib/storage.ts](src/lib/storage.ts)

### 3. Activation du fichier SQL
- Le fichier était entièrement commenté (toutes les lignes commençaient par `--`)
- Maintenant décommenté et prêt à être exécuté
- **Fichier modifié :** [supabase-storage-setup.sql](supabase-storage-setup.sql)

---

## 🚨 ACTION REQUISE : Configurer Supabase Storage

**L'erreur "Erreur lors de l'upload des images" vient du fait que le bucket Supabase n'existe pas encore.**

### Étapes à suivre (2 minutes) :

#### 1️⃣ Aller sur Supabase Dashboard
👉 https://supabase.com/dashboard

#### 2️⃣ Sélectionner votre projet ISKOVIAL

#### 3️⃣ Ouvrir SQL Editor
- Dans le menu de gauche, cliquez sur **SQL Editor**
- Cliquez sur **New Query**

#### 4️⃣ Exécuter le script
- Ouvrez le fichier [supabase-storage-setup.sql](supabase-storage-setup.sql)
- Copiez TOUT le contenu (43 lignes)
- Collez dans l'éditeur SQL Supabase
- Cliquez sur **Run** (ou Ctrl+Enter)

#### 5️⃣ Vérifier que ça a fonctionné
Vous devriez voir :
```
Success. No rows returned
```

#### 6️⃣ Vérifier le bucket
- Dans le menu de gauche, cliquez sur **Storage**
- Vous devriez voir un bucket nommé **iskovial-images**
- Il doit avoir une icône de **cadenas ouvert** (= public)

---

## 🧪 Tester l'upload

### Option 1 : Test automatique (recommandé)

1. Connectez-vous au backoffice : `/admin/login`
2. Allez sur n'importe quelle page du backoffice
3. Ouvrez la console du navigateur (F12)
4. Dans la console, tapez :
   ```javascript
   import('./lib/test-storage').then(m => m.testStorageConfig())
   ```
5. Appuyez sur Entrée
6. Le script va :
   - ✅ Vérifier que le bucket existe
   - ✅ Vérifier que vous êtes authentifié
   - ✅ Tester un upload
   - ✅ Tester la récupération d'URL
   - ✅ Nettoyer les fichiers de test

Si tous les tests passent, vous verrez : **"🎉 TOUS LES TESTS SONT PASSÉS !"**

### Option 2 : Test manuel

1. Connectez-vous au backoffice : `/admin/login`
2. Allez sur une page de gestion (Properties, Terrains, Véhicules ou Matériaux)
3. Cliquez sur "Nouveau" ou modifiez un élément existant
4. Dans la section "Images", cliquez sur **"Uploader des images"**
5. Sélectionnez une ou plusieurs images (max 10MB chacune)
6. L'upload devrait fonctionner ! ✅

---

## 🔍 Si ça ne fonctionne toujours pas

### Ouvrir la console du navigateur
1. Appuyez sur **F12** dans votre navigateur
2. Allez dans l'onglet **Console**
3. Essayez d'uploader une image
4. Regardez les erreurs affichées

### Messages d'erreur possibles :

#### "Bucket not found"
→ Vous n'avez pas exécuté le script SQL
→ Retournez à l'étape 1 ci-dessus

#### "new row violates row-level security policy"
→ Les policies ne sont pas créées
→ Vérifiez que vous avez bien exécuté TOUT le script SQL (pas seulement la première partie)

#### "File size exceeds maximum allowed"
→ Votre image fait plus de 10MB
→ Compressez-la avant de l'uploader

---

## 📊 Récapitulatif des changements

| Fichier | Changement | Ligne(s) |
|---------|-----------|----------|
| [ImageUpload.tsx](src/components/ImageUpload.tsx) | 5MB → 10MB | 29, 31, 108 |
| [storage.ts](src/lib/storage.ts) | Logs détaillés | 8, 13-16, 23-29 |
| [supabase-storage-setup.sql](supabase-storage-setup.sql) | Décommenté | Toutes |
| [GUIDE-UPLOAD-IMAGES.md](GUIDE-UPLOAD-IMAGES.md) | Mise à jour docs | Plusieurs sections |

---

## 💡 Pourquoi cette erreur ?

Le système d'upload essaie d'envoyer des fichiers vers Supabase Storage, mais :
1. **Le bucket n'existe pas** → Supabase rejette l'upload
2. **Les policies ne sont pas configurées** → Même si le bucket existe, vous n'avez pas la permission d'uploader

Le script SQL crée :
- ✅ Le bucket `iskovial-images` (public)
- ✅ Policy de lecture publique (tout le monde peut voir les images)
- ✅ Policy d'upload (seuls les admins authentifiés peuvent uploader)
- ✅ Policy de modification (seuls les admins authentifiés peuvent modifier)
- ✅ Policy de suppression (seuls les admins authentifiés peuvent supprimer)

---

## 🎯 Après la configuration

Une fois le script SQL exécuté, vous pourrez :
- ✅ Uploader des images jusqu'à 10MB
- ✅ Gérer plusieurs images par propriété/terrain/véhicule/matériau
- ✅ Prévisualiser les images avant sauvegarde
- ✅ Supprimer des images
- ✅ Les images seront hébergées sur Supabase (CDN rapide)

---

Besoin d'aide ? Vérifiez les logs dans la console du navigateur (F12) ! 🔍
