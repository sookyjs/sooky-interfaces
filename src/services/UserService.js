const BaseService = require('./BaseService');
const UserModel = require('../models/User');

class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }

    // Méthodes spécifiques au service UserService

    async findByName(name) {
        return this.model.findOne({ name });
    }

    async updateUserAge(id, newAge) {
        // Ajout de logique métier - validation de l'âge, par exemple.
        if (newAge < 0) {
            throw new Error('L\'âge ne peut pas être négatif.');
        }
        return this.model.findByIdAndUpdate(id, { age: newAge }, { new: true });
    }

    // Vous pouvez ajouter d'autres méthodes spécifiques ici...
}


module.exports = new UserService(); // Exporte une instance du service