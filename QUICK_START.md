# Guide de démarrage rapide

## Prérequis

1. Node.js installé (version 18 ou supérieure)
2. MongoDB installé et en cours d'exécution

## Démarrage de MongoDB

### Windows
```bash
# Démarrer MongoDB (si installé comme service)
net start MongoDB

# Ou démarrer manuellement
mongod --dbpath C:\data\db
```

### Linux/Mac
```bash
# Démarrer MongoDB
sudo systemctl start mongod

# Ou
brew services start mongodb-community
```

## Lancer l'application

1. Installer les dépendances:
```bash
npm install
```

2. Vérifier le fichier `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/devsite
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

3. Lancer le serveur de développement:
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000)

## Tester l'application

1. Créer un compte sur `/register`
2. Se connecter sur `/login`
3. Accéder à votre profil sur `/profile`
4. Voir tous les utilisateurs sur `/users`

## Problèmes courants

### MongoDB n'est pas connecté
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez l'URI dans `.env.local`

### Erreur de connexion
- Assurez-vous que le port 27017 n'est pas utilisé par un autre processus
- Vérifiez les logs MongoDB

### Erreur "Cannot read properties of undefined"
- Cette erreur a été corrigée dans les fichiers suivants:
  - `components/Header.tsx`
  - `app/profile/page.tsx`
  - `app/users/page.tsx`
- Tous les accès aux propriétés utilisateur sont maintenant protégés

## Fonctionnalités

- ✅ Inscription avec validation
- ✅ Connexion sécurisée avec bcrypt
- ✅ Gestion de profil avec photo
- ✅ Liste des utilisateurs
- ✅ Protection des routes
- ✅ Gestion des erreurs
