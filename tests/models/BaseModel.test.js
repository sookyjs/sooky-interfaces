import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import BaseModel from '../../src/models/BaseModel.js';

// Définition d'un schéma simple pour le test
const testSchema = {
    name: { type: String, required: true },
    age: { type: Number, required: true },
};

// Initialisation du modèle de test basé sur BaseModel
class TestModel extends BaseModel {
    static modelName = 'TestModel';
    static schema = testSchema;
}

let mongoServer;
let testModelInstance;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    testModelInstance = new TestModel(testSchema);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('BaseModel CRUD operations', () => {
    it('should create a new document', async () => {
        const newDoc = await testModelInstance.create({ name: 'John Doe', age: 30 });
        expect(newDoc).toHaveProperty('_id');
        expect(newDoc.name).toBe('John Doe');
        expect(newDoc.age).toBe(30);
    });

    it('should find a document by query', async () => {
        await testModelInstance.create({ name: 'Jane Doe', age: 25 });
        const foundDoc = await testModelInstance.findOne({ name: 'Jane Doe' });
        expect(foundDoc).not.toBeNull();
        expect(foundDoc.name).toBe('Jane Doe');
        expect(foundDoc.age).toBe(25);
    });

    it('should update a document by ID', async () => {
        const doc = await testModelInstance.create({ name: 'Alice', age: 40 });
        const updatedDoc = await testModelInstance.findByIdAndUpdate(doc._id, { age: 41 }, { new: true });
        expect(updatedDoc.age).toBe(41);
    });

    it('should delete a document by query', async () => {
        const doc = await testModelInstance.create({ name: 'Bob', age: 50 });
        await testModelInstance.deleteOne({ name: 'Bob' });
        const deletedDoc = await testModelInstance.findOne({ name: 'Bob' });
        expect(deletedDoc).toBeNull();
    });
});

describe('Additional BaseModel operations', () => {
    it('should find multiple documents by query', async () => {
        await testModelInstance.create({ name: 'User1', age: 20 });
        await testModelInstance.create({ name: 'User2', age: 25 });
        const docs = await testModelInstance.find({ age: { $gte: 20 } });
        expect(docs.length).toBeGreaterThanOrEqual(2);
    });

    it('should find a document by ID', async () => {
        const doc = await testModelInstance.create({ name: 'FindByIdTest', age: 30 });
        const foundDoc = await testModelInstance.findById(doc._id);
        expect(foundDoc).not.toBeNull();
        expect(foundDoc.name).toBe('FindByIdTest');
    });

    it('should update one document by query', async () => {
        await testModelInstance.create({ name: 'UpdateOneTest', age: 35 });
        await testModelInstance.updateOne({ name: 'UpdateOneTest' }, { age: 36 });
        const updatedDoc = await testModelInstance.findOne({ name: 'UpdateOneTest' });
        expect(updatedDoc.age).toBe(36);
    });

    it('should update multiple documents by query', async () => {
        await testModelInstance.create({ name: 'UserToUpdate', age: 40 });
        await testModelInstance.create({ name: 'UserToUpdate', age: 45 });
        await testModelInstance.updateMany({ name: 'UserToUpdate' }, { age: 50 });
        const updatedDocs = await testModelInstance.find({ name: 'UserToUpdate' });
        updatedDocs.forEach(doc => expect(doc.age).toBe(50));
    });

    it('should delete multiple documents by query', async () => {
        await testModelInstance.create({ name: 'UserToDelete', age: 55 });
        await testModelInstance.create({ name: 'UserToDelete', age: 60 });
        const result = await testModelInstance.deleteMany({ name: 'UserToDelete' });
        expect(result.deletedCount).toBeGreaterThanOrEqual(2);
    });

    it('should count documents by query', async () => {
        await testModelInstance.create({ name: 'CountTest1', age: 28 });
        await testModelInstance.create({ name: 'CountTest2', age: 28 });
        const count = await testModelInstance.countDocuments({ age: 28 });
        expect(count).toBeGreaterThanOrEqual(2);
    });

    it('should aggregate documents', async () => {
        await testModelInstance.deleteMany({});
        await testModelInstance.create({ name: 'AggTest1', age: 30 });
        await testModelInstance.create({ name: 'AggTest2', age: 40 });
        const results = await testModelInstance.aggregate([
            { $match: { age: { $gte: 30 } } },
            { $group: { _id: null, total: { $sum: "$age" } } }
        ]);
        expect(results.length).toBe(1);
        expect(results[0].total).toBe(70); // 30 + 40
    });
});
