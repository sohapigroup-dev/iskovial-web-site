# 🚨 FIX : Page Blanche sur Vercel

## ✅ Solution Rapide (5 minutes)

### 1️⃣ J'ai créé le fichier [vercel.json](vercel.json)

Ce fichier permet à React Router de fonctionner sur Vercel.

### 2️⃣ Vous devez faire 3 choses :

---

## 📝 Étape 1 : Commit et Push

```bash
git add vercel.json
git commit -m "Fix: Ajout vercel.json pour React Router"
git push
```

✅ Vercel va automatiquement redéployer

---

## ⚙️ Étape 2 : Configurer les Variables d'Environnement

### Sur Vercel Dashboard :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet ISKOVIAL
3. Cliquez sur **Settings** → **Environment Variables**
4. Ajoutez ces 2 variables :

```
VITE_SUPABASE_URL = https://qliiodjerqasazbmiuft.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_26RFN5BcwwrAsdmK0QP7Wg_Q9oe64Jv
```

**Important :** Cochez **Production**, **Preview** ET **Development**

### Guide détaillé : [VERCEL-ENV-SETUP.md](VERCEL-ENV-SETUP.md)

---

## 🔄 Étape 3 : Redéployer

Après avoir ajouté les variables :

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **"Redeploy"**

**OU** faites un nouveau push pour forcer le rebuild.

---

## ✅ Vérification

Une fois redéployé, testez :

| URL | Résultat attendu |
|-----|------------------|
| `https://votre-site.vercel.app/` | ✅ Page d'accueil |
| `https://votre-site.vercel.app/proprietes` | ✅ Liste des propriétés |
| `https://votre-site.vercel.app/terrains` | ✅ Liste des terrains |
| `https://votre-site.vercel.app/iskovial-admin/login` | ✅ Page de connexion |

**Si page blanche persiste :**
- Vérifiez les variables d'environnement
- Consultez les logs de build sur Vercel
- Ouvrez la console du navigateur (F12) pour voir les erreurs

---

## 🎯 Pourquoi ça ne marchait pas ?

### Avant (❌ Page blanche)
```
Utilisateur visite : https://site.vercel.app/proprietes
Vercel cherche : /proprietes.html (n'existe pas)
Résultat : 404 → Page blanche
```

### Après (✅ Fonctionne)
```
Utilisateur visite : https://site.vercel.app/proprietes
Vercel redirige vers : /index.html (grâce à vercel.json)
React Router prend le relais et affiche la bonne page
Résultat : Page des propriétés s'affiche
```

---

## 📚 Documentation complète

- **[GUIDE-DEPLOIEMENT-VERCEL.md](GUIDE-DEPLOIEMENT-VERCEL.md)** - Guide complet de déploiement
- **[VERCEL-ENV-SETUP.md](VERCEL-ENV-SETUP.md)** - Configuration des variables d'environnement

---

## 🆘 Aide supplémentaire

Si le problème persiste après ces étapes :

1. **Vérifiez les logs de build** sur Vercel
2. **Ouvrez la console** (F12) sur votre site déployé
3. **Consultez** [GUIDE-DEPLOIEMENT-VERCEL.md](GUIDE-DEPLOIEMENT-VERCEL.md) pour le dépannage avancé

---

C'est tout ! Après ces 3 étapes, votre site devrait fonctionner sur Vercel 🚀
