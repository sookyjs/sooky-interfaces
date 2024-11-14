import { BaseModel } from './BaseModel.js';

class User extends BaseModel {
    static modelName = 'User';

    static schema = {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        // ... autres champs ...
    };

    constructor() {
        super(User.schema); // Passe le schéma au constructeur de BaseModel
    }
}

export default new User().getModel(); // Exporte le modèle Mongoose prêt à l'emploi