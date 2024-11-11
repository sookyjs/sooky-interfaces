const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userService = require('./services/UserService');

async function runTest() {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    try {
        const newUser = await userService.create({ name: 'Isolated Test User', email: 'isolated@example.com', age: 25 });
        console.log('Created User:', newUser);

        const foundUser = await userService.findByName('Isolated Test User');
        console.log('Found User:', foundUser);

        await userService.deleteById(newUser._id);
        console.log('User deleted');
    } catch (error) {
        console.error('Error during isolated test:', error);
    } finally {
        await mongoose.disconnect();
        await mongoServer.stop();
    }
}

runTest();