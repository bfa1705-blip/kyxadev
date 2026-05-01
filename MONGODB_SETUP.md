# Configuration MongoDB pour Osintlab

## 📋 Prérequis

Tu as besoin de MongoDB installé sur ton système ou d'utiliser MongoDB Atlas (cloud).

## 🚀 Option 1 : MongoDB Local

### Installation de MongoDB sur Windows

1. Télécharge MongoDB Community Server : https://www.mongodb.com/try/download/community
2. Installe MongoDB avec les paramètres par défaut
3. MongoDB démarre automatiquement sur `mongodb://localhost:27017`

### Démarrer MongoDB

```bash
# Vérifier si MongoDB est en cours d'exécution
mongosh

# Si ce n'est pas le cas, démarre le service
net start MongoDB
```

## ☁️ Option 2 : MongoDB Atlas (Cloud - Recommandé)

1. Va sur https://www.mongodb.com/cloud/atlas/register
2. Crée un compte gratuit
3. Crée un nouveau cluster (Free Tier M0)
4. Clique sur "Connect" → "Connect your application"
5. Copie la connection string

### Exemple de connection string Atlas :
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/osintlab?retryWrites=true&w=majority
```

## ⚙️ Configuration du projet

### 1. Mettre à jour .env.local

Ouvre le fichier `.env.local` et modifie la ligne MONGODB_URI :

**Pour MongoDB Local :**
```env
MONGODB_URI=mongodb://localhost:27017/osintlab
```

**Pour MongoDB Atlas :**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/osintlab?retryWrites=true&w=majority
```

⚠️ Remplace `username` et `password` par tes identifiants Atlas

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer le serveur

```bash
npm run dev
```

## 🧪 Tester la connexion

### 1. Créer un compte

Va sur http://localhost:3000/register et crée un compte

### 2. Se connecter

Va sur http://localhost:3000/login et connecte-toi

### 3. Vérifier dans MongoDB

**MongoDB Local :**
```bash
mongosh
use osintlab
db.users.find()
```

**MongoDB Atlas :**
- Va dans ton cluster Atlas
- Clique sur "Browse Collections"
- Tu devrais voir la base `osintlab` et la collection `users`

## 📁 Structure des fichiers créés

```
├── lib/
│   └── mongodb.ts          # Connexion MongoDB
├── models/
│   └── User.ts             # Modèle utilisateur
├── app/api/auth/
│   ├── register/
│   │   └── route.ts        # API d'inscription
│   └── login/
│       └── route.ts        # API de connexion
└── .env.local              # Variables d'environnement
```

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Ne partage jamais ton fichier .env.local
- Change NEXTAUTH_SECRET en production

## ❓ Problèmes courants

### Erreur : "MongoServerError: Authentication failed"
- Vérifie tes identifiants dans MONGODB_URI
- Pour Atlas, assure-toi d'avoir ajouté ton IP dans "Network Access"

### Erreur : "connect ECONNREFUSED"
- MongoDB n'est pas démarré
- Lance `net start MongoDB` sur Windows

### Erreur : "User already exists"
- L'email est déjà utilisé
- Utilise un autre email ou supprime l'utilisateur existant

## 📚 Ressources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
