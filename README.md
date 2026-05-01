# Osintlab - Plateforme de recherche OSINT

Site inspiré d'OSINT Lab, construit avec Next.js 14, React et Tailwind CSS avec authentification MongoDB.

## Installation

```bash
npm install
```

## Configuration

1. Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine
2. Configurez votre fichier `.env.local` avec votre URI MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/devsite
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Fonctionnalités

- Interface de recherche OSINT moderne
- Système d'authentification avec username uniquement (pas de fullName)
- Gestion de profil utilisateur avec photo de profil
- Liste des utilisateurs enregistrés avec photos de profil
- Catégories de recherche (Personnes, Entreprises, Images, etc.)
- Design responsive avec animations, grille et particules animées
- Barre de navigation compacte et moderne
- Mode sombre avec effets visuels

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MongoDB avec Mongoose
- bcryptjs pour le hachage des mots de passe

## Corrections apportées

- Correction de l'erreur `Cannot read properties of undefined (reading 'charAt')` dans Header.tsx
- Ajout de vérifications de sécurité pour les propriétés utilisateur (username)
- Protection contre les valeurs undefined dans tous les composants
- Gestion appropriée des cas où les données utilisateur sont manquantes
- Modification du système de login pour utiliser username au lieu d'email
- Réduction de la taille de la barre de navigation (plus compacte)
- Affichage des photos de profil dans la liste des utilisateurs
- Ajout d'un fond avec grille de carrés et particules animées
- Suppression du système fullName (uniquement username maintenant)
