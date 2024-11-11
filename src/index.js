const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const mongoose = require('mongoose');
const userService = require('./services/UserService');


require('dotenv').config();

// Fonction pour déterminer l'URI de MongoDB en fonction de l'environnement
const getMongoUri = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return process.env.MONGODB_URI_PROD;
        case 'test':
            return process.env.MONGODB_URI_TEST;
        default:
            return process.env.MONGODB_URI_DEV;
    }
};

// Connexion à la base de données
async function connectToDatabase() {
    const uri = getMongoUri();
    try {
        await mongoose.connect(uri);
        console.log(`Connecté à MongoDB à ${uri}`);
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1); // Arrête l'application en cas d'erreur
    }
}
// Prompt asynchrone pour les questions utilisateur
function questionPrompt(question) {
    return new Promise(resolve => readline.question(question, resolve));
}

// Démarrage de l'application
async function start() {
    await connectToDatabase();
    await mainLoop();
}

// Boucle principale de gestion des utilisateurs
async function mainLoop() {
    let continuer = true;
    while (continuer) {
        const answer = await questionPrompt('Voulez-vous ajouter un utilisateur ? (o/n) : ');
        if (answer.toLowerCase() === 'o') {
            await addUser();  // Ajouter un utilisateur
        } else if (answer.toLowerCase() === 'n') {
            // Passer à la boucle de recherche d'utilisateur
            await userSearchLoop();
            // Sortir de la boucle principale après la première recherche
            continuer = false;
        } else {
            console.log("Réponse invalide.");
        }
    }
    stop();
}

// Ajouter un utilisateur
async function addUser() {
    const name = await questionPrompt("Nom de l'utilisateur : ");
    const age = await questionPrompt("Âge de l'utilisateur : ");
    try {
        const newUser = await userService.create({ name, email: `${name.toLowerCase()}@example.com`, age: parseInt(age) });
        console.log('Nouvel utilisateur créé:', newUser);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
    }
}

// Boucle de recherche d'utilisateur
async function userSearchLoop() {
    let searchAgain = true;
    while (searchAgain) {
        const name = await questionPrompt("Nom de l'utilisateur à trouver : ");
        try {
            const user = await userService.findByName(name);
            if (user) {
                console.log('Utilisateur trouvé:', user);
                const updateChoice = await questionPrompt('Voulez-vous modifier l\'âge de cet utilisateur ? (o/n) : ');
                if (updateChoice.toLowerCase() === 'o') {
                    await updateUserAge(user);
                }
            } else {
                console.log('Utilisateur non trouvé.');
            }

            // Demande si l'utilisateur souhaite rechercher un autre utilisateur
            const repeatChoice = await questionPrompt('Voulez-vous rechercher un autre utilisateur ? (o/n) : ');
            searchAgain = repeatChoice.toLowerCase() === 'o';
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur:", error);
        }
    }
}

// Mettre à jour l'âge de l'utilisateur
async function updateUserAge(user) {
    const newAge = await questionPrompt('Nouvel âge de l\'utilisateur : ');
    try {
        const updatedUser = await userService.updateUserAge(user._id, parseInt(newAge));
        console.log('Utilisateur mis à jour:', updatedUser);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
}

// Nettoyer et déconnecter la base de données
async function stop() {
    try {
        console.log('Nettoyage de la base de données...');
        await mongoose.connection.db.dropDatabase();
        console.log('Base de données nettoyée.');
        await mongoose.disconnect();
        console.log('Déconnecté de MongoDB.');
        readline.close();
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du nettoyage:', error);
        process.exit(1);
    }
}

// Lancement de l'application
start();

// Gestion des signaux pour une fermeture propre
process.on('SIGINT', stop); // Ctrl+C
process.on('SIGTERM', stop); // kill command