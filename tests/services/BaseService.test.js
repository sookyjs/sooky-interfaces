const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userService = require('../../src/services/UserService');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('UserService CRUD operations and validations', () => {
    it('should create a user', async () => {
        const newUser = await userService.create({ name: 'User1', email: 'user1@example.com', age: 30 });
        expect(newUser).toHaveProperty('_id');
        expect(newUser.name).toBe('User1');
        expect(newUser.email).toBe('user1@example.com');
        expect(newUser.age).toBe(30);
    });

    it('should find a user by name', async () => {
        await userService.create({ name: 'User2', email: 'user2@example.com', age: 25 });
        const foundUser = await userService.findByName('User2');
        expect(foundUser).not.toBeNull();
        expect(foundUser.name).toBe('User2');
        expect(foundUser.email).toBe('user2@example.com');
    });

    it('should update the age of a user', async () => {
        const user = await userService.create({ name: 'User3', email: 'user3@example.com', age: 40 });
        const updatedUser = await userService.updateUserAge(user._id, 45);
        expect(updatedUser.age).toBe(45);
    });

    it('should throw an error for negative age update', async () => {
        const user = await userService.create({ name: 'User4', email: 'user4@example.com', age: 50 });
        await expect(userService.updateUserAge(user._id, -5)).rejects.toThrow('L\'âge ne peut pas être négatif.');
    });

    it('should delete a user by ID', async () => {
        const user = await userService.create({ name: 'User5', email: 'user5@example.com', age: 35 });
        await userService.deleteById(user._id);
        const deletedUser = await userService.findById(user._id);
        expect(deletedUser).toBeNull();
    });
});

describe('Additional BaseService operations', () => {
    it('should find a user by ID', async () => {
        const newUser = await userService.create({ name: 'FindByIdTest', email: 'findbyid@example.com', age: 28 });
        const foundUser = await userService.findById(newUser._id);
        expect(foundUser).not.toBeNull();
        expect(foundUser.name).toBe('FindByIdTest');
    });

    it('should find all users matching a query', async () => {
        await userService.create({ name: 'FindAllTest1', email: 'findall1@example.com', age: 22 });
        await userService.create({ name: 'FindAllTest2', email: 'findall2@example.com', age: 22 });
        const foundUsers = await userService.findAll({ age: 22 });
        expect(foundUsers.length).toBeGreaterThanOrEqual(2);
        foundUsers.forEach(user => expect(user.age).toBe(22));
    });

    it('should update a user directly by ID', async () => {
        const user = await userService.create({ name: 'UpdateTest', email: 'updatetest@example.com', age: 33 });
        const updatedUser = await userService.update(user._id, { age: 34 });
        expect(updatedUser).not.toBeNull();
        expect(updatedUser.age).toBe(34);
    });
});