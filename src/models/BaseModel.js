/**
 * Interface for data models. The default data layer uses an internal mongoose
 * model and is as such compatible with MongoDB.
 */

import mongoose from 'mongoose';

class BaseModel {
    constructor(schemaDefinition, options = {}) {
        this.schema = new mongoose.Schema(schemaDefinition, options);
        this.modelName = this.constructor.modelName || this.constructor.name;
    }

    getModel() {
        return mongoose.models[this.modelName] || mongoose.model(this.modelName, this.schema);
    }

    create(data) { return this.getModel().create(data); }
    findOne(query, options) { return this.getModel().findOne(query, options); }
    find(query, options) { return this.getModel().find(query, options); }
    findById(id, options) { return this.getModel().findById(id, options); }
    updateOne(query, update, options) { return this.getModel().updateOne(query, update, options); }
    updateMany(query, update, options) { return this.getModel().updateMany(query, update, options); }
    findByIdAndUpdate(id, update, options) { return this.getModel().findByIdAndUpdate(id, update, options); }
    deleteOne(query, options) { return this.getModel().deleteOne(query, options); }
    deleteMany(query, options) { return this.getModel().deleteMany(query, options); }
    countDocuments(query, options) { return this.getModel().countDocuments(query, options); }
    aggregate(pipeline, options) { return this.getModel().aggregate(pipeline, options); }
}

export default BaseModel;