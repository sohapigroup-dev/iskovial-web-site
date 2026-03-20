# ⚙️ Configuration des Variables d'Environnement sur Vercel

## 🔑 Variables à ajouter

Vous devez ajouter ces 2 variables d'environnement sur Vercel :

```
VITE_SUPABASE_URL=https://qliiodjerqasazbmiuft.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_26RFN5BcwwrAsdmK0QP7Wg_Q9oe64Jv
```

---

## 📋 Étapes (2 minutes)

### 1. Aller sur Vercel Dashboard

👉 https://vercel.com/dashboard

### 2. Sélectionner votre projet ISKOVIAL

Cliquez sur le projet dans la liste

### 3. Ouvrir les Settings

Cliquez sur l'onglet **"Settings"** en haut

### 4. Aller dans Environment Variables

Dans le menu de gauche, cliquez sur **"Environment Variables"**

### 5. Ajouter la première variable

1. **Key :** `VITE_SUPABASE_URL`
2. **Value :** `https://qliiodjerqasazbmiuft.supabase.co`
3. **Environments :** Cochez **Production**, **Preview**, et **Development**
4. Cliquez sur **"Add"**

### 6. Ajouter la deuxième variable

1. **Key :** `VITE_SUPABASE_ANON_KEY`
2. **Value :** `sb_publishable_26RFN5BcwwrAsdmK0QP7Wg_Q9oe64Jv`
3. **Environments :** Cochez **Production**, **Preview**, et **Development**
4. Cliquez sur **"Add"**

---

## 🔄 Redéployer

Après avoir ajouté les variables :

1. Retournez à l'onglet **"Deployments"**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **"Redeploy"**
4. Cochez **"Use existing Build Cache"** (optionnel, plus rapide)
5. Cliquez sur **"Redeploy"**

---

## ✅ Vérification

Une fois redéployé :

1. Allez sur votre site Vercel
2. Ouvrez la console du navigateur (F12)
3. Tapez : `import.meta.env.VITE_SUPABASE_URL`
4. Vous devriez voir : `"https://qliiodjerqasazbmiuft.supabase.co"`

Si vous voyez `undefined`, les variables ne sont pas correctement configurées.

---

## 📸 Capture d'écran de la configuration

```
Environment Variables
┌──────────────────────────────────────────────────────────┐
│ VITE_SUPABASE_URL                                        │
│ https://qliiodjerqasazbmiuft.supabase.co                │
│ ☑ Production  ☑ Preview  ☑ Development                  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ VITE_SUPABASE_ANON_KEY                                   │
│ sb_publishable_26RFN5BcwwrAsdmK0QP7Wg_Q9oe64Jv          │
│ ☑ Production  ☑ Preview  ☑ Development                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🆘 Si ça ne fonctionne toujours pas

### 1. Vérifier que les variables sont bien enregistrées

Dans Settings → Environment Variables, vous devriez voir 2 lignes.

### 2. Vérifier le nom exact

Les noms doivent être **EXACTEMENT** :
- `VITE_SUPABASE_URL` (pas `SUPABASE_URL` ou autre)
- `VITE_SUPABASE_ANON_KEY` (pas `SUPABASE_KEY` ou autre)

### 3. Vérifier que tous les environnements sont cochés

Cochez bien **Production**, **Preview** ET **Development**

### 4. Forcer un rebuild complet

Au lieu de "Redeploy", faites :
1. Ajoutez un espace dans un fichier (ex: README.md)
2. Commit et push
3. Vercel va rebuild automatiquement

---

## 🔐 Sécurité

**Important :** Ces clés sont déjà **publiques** (ANON_KEY = Anonymous Key).

- ✅ Elles peuvent être exposées dans le code frontend
- ✅ Elles sont protégées par les Row Level Security (RLS) de Supabase
- ❌ Ne partagez JAMAIS la clé **SERVICE_ROLE_KEY** (celle-ci est privée)

---

Vos variables d'environnement sont maintenant configurées ! 🎉
