// Script pour ajouter le champ badges aux utilisateurs existants
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/devsite';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  badges: [String],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Mettre à jour tous les utilisateurs qui n'ont pas le champ badges
    const result = await User.updateMany(
      { badges: { $exists: false } },
      { $set: { badges: [] } }
    );

    console.log(`✅ Migration completed: ${result.modifiedCount} users updated`);

    // Afficher tous les utilisateurs
    const users = await User.find({}, 'username email badges');
    console.log('\n📋 All users:');
    users.forEach(user => {
      console.log(`  - ${user.username} (${user.email}): badges = ${JSON.stringify(user.badges)}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrate();
