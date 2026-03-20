# 🚀 Guide de Déploiement Vercel

## 🎯 Problème résolu : Page blanche sur Vercel

### Cause du problème

Vercel affichait une page blanche car React Router ne fonctionnait pas correctement. Quand vous accédez à une route comme `/proprietes` ou `/terrains`, Vercel cherchait un fichier physique qui n'existe pas.

### Solution

J'ai créé le fichier **[vercel.json](vercel.json)** qui redirige toutes les routes vers `index.html`, permettant à React Router de gérer le routing côté client.

---

## 📁 Fichier créé

### [vercel.json](vercel.json)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Ce que ça fait :**
- ✅ Toutes les URLs (`/`, `/proprietes`, `/terrains`, etc.) pointent vers `index.html`
- ✅ React Router peut alors gérer le routing
- ✅ Pas de page 404 sur les routes React

---

## 🔄 Étapes pour redéployer

### 1. Commit les changements

```bash
git add vercel.json
git commit -m "Fix: Ajout vercel.json pour React Router"
git push
```

### 2. Vercel va automatiquement redéployer

Vercel détecte le push et relance le déploiement automatiquement.

**OU** si vous voulez forcer un redéploiement :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet ISKOVIAL
3. Cliquez sur **"Deployments"**
4. Cliquez sur les **3 points** du dernier déploiement
5. Cliquez sur **"Redeploy"**

---

## ✅ Vérification

Une fois redéployé, testez ces URLs :

| URL | Doit afficher |
|-----|---------------|
| `https://votre-site.vercel.app/` | Page d'accueil ✅ |
| `https://votre-site.vercel.app/proprietes` | Liste des propriétés ✅ |
| `https://votre-site.vercel.app/terrains` | Liste des terrains ✅ |
| `https://votre-site.vercel.app/vehicules` | Liste des véhicules ✅ |
| `https://votre-site.vercel.app/iskovial-admin/login` | Page de connexion admin ✅ |

**Avant :** Page blanche ❌
**Après :** Toutes les pages fonctionnent ✅

---

## 🔍 Autres causes possibles de page blanche

Si le problème persiste après avoir ajouté `vercel.json`, vérifiez :

### 1. Variables d'environnement Supabase

Sur Vercel Dashboard :
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez :
   - `VITE_SUPABASE_URL` = votre URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = votre clé anonyme Supabase

### 2. Build logs

Sur Vercel, vérifiez les logs de build :
1. Cliquez sur le déploiement
2. Consultez l'onglet **"Building"**
3. Cherchez les erreurs en rouge

### 3. Runtime logs

Consultez les logs d'exécution :
1. Allez dans **"Functions"**
2. Regardez les erreurs runtime

### 4. Console du navigateur

Ouvrez la console (F12) sur votre site déployé :
- Cherchez les erreurs JavaScript
- Vérifiez les erreurs réseau (Failed to fetch)

---

## 📊 Configuration Vercel recommandée

### Build Settings

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Environment Variables

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Node Version

Assurez-vous d'utiliser Node.js 18.x ou supérieur.

---

## 🆘 Dépannage

### "Failed to compile" dans les logs

**Cause :** Erreur TypeScript ou import manquant
**Solution :**
```bash
npm run build
```
Corrigez les erreurs localement avant de push

### "Module not found"

**Cause :** Dépendance manquante dans package.json
**Solution :**
```bash
npm install
npm run build
```

### "404 - This page could not be found"

**Cause :** vercel.json manquant ou mal configuré
**Solution :** Vérifiez que vercel.json existe et contient les rewrites

### Images ne s'affichent pas

**Cause :** URLs Supabase Storage incorrectes
**Solution :** Vérifiez que :
1. Le bucket Supabase est **public**
2. Les URLs des images sont complètes
3. Les variables d'environnement sont définies

---

## 📝 Checklist avant déploiement

- [ ] `vercel.json` existe à la racine du projet
- [ ] Variables d'environnement Supabase configurées sur Vercel
- [ ] `npm run build` fonctionne localement sans erreur
- [ ] Toutes les routes fonctionnent en local
- [ ] Les images s'affichent en local
- [ ] Le bucket Supabase est configuré et public

---

## 🎉 Résultat attendu

Après le redéploiement avec `vercel.json` :

✅ **Page d'accueil** : Affiche le site
✅ **Navigation** : Tous les liens fonctionnent
✅ **Routes directes** : `/proprietes`, `/terrains`, etc. fonctionnent
✅ **Admin** : `/iskovial-admin/login` accessible
✅ **Images** : Les images Supabase s'affichent
✅ **Pas de page blanche** : Aucune route ne retourne une page vide

---

Tout devrait maintenant fonctionner sur Vercel ! 🚀
