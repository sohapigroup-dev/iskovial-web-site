# 📸 Configuration Supabase Storage - Instructions Détaillées

## 🎯 Objectif
Créer le bucket de stockage pour les images de la plateforme ISKOVIAL.

---

## 📋 Instructions étape par étape

### Étape 1 : Accéder à Supabase

1. Ouvrez votre navigateur
2. Allez sur : **https://supabase.com/dashboard**
3. Connectez-vous si nécessaire

### Étape 2 : Sélectionner votre projet

1. Dans la liste des projets, cliquez sur **ISKOVIAL** (ou le nom que vous avez donné)
2. Attendez que le dashboard se charge

### Étape 3 : Ouvrir SQL Editor

1. Dans le menu de gauche, cherchez **"SQL Editor"**
2. Cliquez dessus
3. Cliquez sur le bouton **"New Query"** (en haut à droite)

### Étape 4 : Copier le script SQL

1. Sur votre ordinateur, ouvrez le fichier :
   ```
   ISKOVIAL-SITE/supabase-storage-setup.sql
   ```

2. Sélectionnez TOUT le contenu (Ctrl+A ou Cmd+A)

3. Copiez (Ctrl+C ou Cmd+C)

### Étape 5 : Coller et exécuter

1. Retournez sur Supabase (SQL Editor)
2. Collez le code SQL dans l'éditeur (Ctrl+V ou Cmd+V)
3. Cliquez sur le bouton **"Run"** (ou appuyez sur Ctrl+Enter)

### Étape 6 : Vérifier le résultat

Vous devriez voir en bas de l'écran :
```
Success. No rows returned
```

✅ C'est normal ! Cela signifie que le script s'est exécuté correctement.

### Étape 7 : Vérifier que le bucket est créé

1. Dans le menu de gauche, cliquez sur **"Storage"**
2. Vous devriez voir un bucket nommé : **iskovial-images**
3. À côté du nom, vous devriez voir :
   - Une icône de **cadenas ouvert** 🔓 (= bucket public)
   - Le statut : **Public**

✅ Parfait ! Votre storage est configuré.

---

## ✅ Vérification finale

Pour être sûr que tout fonctionne :

1. Dans le menu de gauche, cliquez sur **Storage**
2. Cliquez sur **iskovial-images**
3. Vous devriez voir un dossier vide (c'est normal)
4. Si vous voyez une erreur ou "Bucket not found", recommencez depuis l'Étape 3

---

## 🧪 Test de l'upload

Maintenant, testez l'upload :

1. Retournez sur votre application ISKOVIAL
2. Connectez-vous au backoffice : **http://localhost:5173/admin/login**
3. Allez dans **"Gestion des Propriétés"**
4. Cliquez sur **"Nouvelle Propriété"**
5. Remplissez les champs obligatoires
6. Dans la section **"Images"**, cliquez sur **"Uploader des images"**
7. Sélectionnez une image de votre ordinateur (max 10MB)
8. Vous devriez voir :
   - "Upload de 1 image(s)..."
   - Puis "1 image(s) uploadée(s) avec succès" ✅
   - L'aperçu de l'image apparaît

---

## ❌ Que faire si ça ne fonctionne pas ?

### Erreur : "Bucket not found"

**Cause :** Le bucket n'a pas été créé.

**Solution :**
1. Retournez à l'Étape 3
2. Vérifiez que vous avez bien copié TOUT le fichier SQL
3. Exécutez à nouveau le script

### Erreur : "new row violates row-level security policy"

**Cause :** Les policies de sécurité ne sont pas créées.

**Solution :**
1. Vérifiez que le script SQL contient les sections "CREATE POLICY"
2. Exécutez à nouveau le script complet

### Erreur : "Erreur lors de l'upload des images"

**Causes possibles :**
1. Le bucket n'existe pas → Retournez à l'Étape 1
2. Vous n'êtes pas connecté au backoffice → Connectez-vous
3. L'image fait plus de 10MB → Compressez-la

**Debug :**
1. Appuyez sur F12 dans votre navigateur
2. Allez dans l'onglet "Console"
3. Essayez d'uploader une image
4. Regardez les erreurs affichées en rouge
5. Cherchez le message qui commence par "Error uploading image:"

---

## 📊 Contenu du script SQL (pour information)

Le script crée :

1. **Le bucket** `iskovial-images`
   - Public : tout le monde peut voir les images
   - Utilisé pour stocker toutes les images de la plateforme

2. **4 Policies de sécurité :**
   - 🟢 **Public Access** : Tout le monde peut LIRE les images
   - 🔵 **Authenticated users can upload** : Seuls les admins peuvent UPLOADER
   - 🟡 **Authenticated users can update** : Seuls les admins peuvent MODIFIER
   - 🔴 **Authenticated users can delete** : Seuls les admins peuvent SUPPRIMER

---

## 🎓 Comprendre le Storage Supabase

### C'est quoi un "bucket" ?
Un bucket = un dossier de stockage dans le cloud.

### Pourquoi "public" ?
- Les images doivent être visibles par les visiteurs du site
- Sinon, les photos des propriétés ne s'afficheraient pas

### C'est sécurisé ?
Oui ! Les policies garantissent que :
- ✅ Tout le monde peut VOIR les images (normal pour un site web)
- ❌ Seuls les admins authentifiés peuvent AJOUTER/MODIFIER/SUPPRIMER

### Où sont stockées les images ?
Sur les serveurs de Supabase (CDN rapide et fiable).

### Ça coûte combien ?
- **Plan gratuit** : 1 GB de stockage + 2 GB de bande passante/mois
- Largement suffisant pour commencer (environ 1000 images)
- Si vous dépassez : environ 0,021 $/GB supplémentaire

---

## 🆘 Besoin d'aide ?

1. Vérifiez le fichier [CORRECTIF-UPLOAD.md](CORRECTIF-UPLOAD.md)
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que vous êtes bien connecté au backoffice
4. Assurez-vous que votre image fait moins de 10MB

---

Bonne chance ! 🚀
