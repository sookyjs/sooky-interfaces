# sooky-interfaces

**Version** : 1.0.0  

**sooky-interfaces** fournit des interfaces de base pour la gestion des modèles de données et des services dans MongoDB. Ce projet est un ensemble de classes de base en Node.js, qui centralisent les opérations CRUD et la logique métier autour des données MongoDB. Les fichiers principaux, `BaseModel` et `BaseService`, sont conçus pour être utilisés comme dépendances dans le projet `CoreApi`.

## Structure du Projet

- **BaseModel** : Modèle de base utilisant Mongoose, offrant des méthodes CRUD pour les documents MongoDB.
- **BaseService** : Service de base qui s’appuie sur `BaseModel` pour centraliser les opérations CRUD et la logique métier associée.
- **UserModel** et **UserService** : Modèle et service spécifiques pour les entités utilisateur. Ils sont créés en étendant respectivement `BaseModel` et `BaseService`, avec un schéma de données `User` personnalisé pour gérer les utilisateurs dans MongoDB.

## Prérequis

- **Node.js** (v14+ recommandé)
- **MongoDB** pour le stockage des données
- **Dépendances** :
  - `mongoose` : pour la manipulation des modèles de données.
  - `dotenv` : pour gérer les variables d’environnement.


## Installation

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/sookyjs/sooky-interfaces.git
   cd sooky-interfaces
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer l'environnement** :
   - Créez un fichier `.env` à la racine du projet avec le contenu suivant :
     ```
     MONGO_URI=mongodb://127.0.0.1:27017/sooky-interfaces
     ```
   - Ajustez `MONGO_URI` selon l'URL de votre base de données MongoDB.

## Structure du Projet

- `src/models/BaseModel.js` : Définit un modèle de base avec des méthodes CRUD générales utilisant Mongoose.
- `src/services/BaseService.js` : Service de base pour encapsuler la logique d'interaction avec le modèle.

- `src/models/UserModel.js` : Modèle utilisateur qui hérite de `BaseModel` et utilise les définitions de schéma spécifiques aux utilisateurs (par exemple, `name`, `email`).
- `src/services/UserService.js` : Service utilisateur, basé sur `BaseService`, permettant d’interagir avec `UserModel` en appliquant des règles spécifiques à la gestion des utilisateurs.

- `src/index.js` : Point d'entrée principal de l'application pour exécuter des opérations CRUD de base sur les utilisateurs via le terminal (permet notamment la création et la modification d’utilisateurs).

- `tests/models/BaseModel.test.js` : Tests unitaires pour les opérations CRUD du modèle de base.
- `tests/services/BaseService.test.js` : Tests unitaires pour les méthodes du service de base.

## Scripts

- **Démarrer l'application** :
   ```bash
   npm start
   ```
   Lance le script principal qui permet de créer des utilisateurs et de modifier leur âge en utilisant le prompt du terminal.

- **Exécuter les tests** :
   ```bash
   npm test
   ```
   Utilise Jest pour exécuter les tests et générer un rapport de couverture.

- **Afficher le rapport de couverture de tests en HTML** : Après avoir exécuté `npm test`, ouvrez le rapport généré dans le dossier `coverage` en lançant la commande suivante :  

   ```bash
   npx jest --coverage --coverageReporters="html"
   ```
Cela génère un rapport HTML dans `coverage/lcov-report/index.html` que vous pouvez ouvrir dans un navigateur pour examiner la couverture de test en détail.

## Aide et Support

Pour toute question ou problème, veuillez ouvrir un ticket sur le dépôt GitHub du projet ou contacter le mainteneur.
    
## Soutien aux Contributeurs  
Nous encourageons activement les contributions à ce projet open-source. Pour soutenir le développement continu de Sookyjs, vous pouvez nous faire un don.

[![](https://img.shields.io/badge/Salim%20%20Benfarhat's%20%20-PAYPAL-blue)](https://salim.link/paypal)  

[![](https://img.shields.io/badge/Nazim%20%20Boudeffa's%20%20-TIPEEE-pink)](https://fr.tipeee.com/nazimboudeffa)  
