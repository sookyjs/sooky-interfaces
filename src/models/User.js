const BaseModel = require('./BaseModel');

const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    // ... autres champs ...
};

class User extends BaseModel {
    static modelName = 'User';
    constructor() {
        super(userSchema); // Passe le schéma au constructeur de BaseModel
    }
}

module.exports = new User().getModel(); // Exporte le modèle Mongoose prêt à l'emploi