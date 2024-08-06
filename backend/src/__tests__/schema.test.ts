import mongoose from 'mongoose';
import Provider from '../models/Provider';

const mongoURI = process.env.MONGO_URI || 'mongodb://root:example@mongodb:27017/mydatabase';

beforeAll(async () => {
  await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
  });
}, 30000); // 30 seconds timeout

afterAll(async () => {
  await mongoose.connection.close();
}, 30000); // 30 seconds timeout

it('should create a new provider', async () => {
  const provider = new Provider({
    clientRate: '0.10',
    kwhCost: '0.15',
    minimumLimit: '100',
    name: 'Test Provider',
    state: 'Test State',
    totalClients: '1000',
    logoUrl: 'http://example.com/logo.png',
  });

  const savedProvider = await provider.save();
  expect(savedProvider._id).toBeDefined();
  expect(savedProvider.name).toBe('Test Provider');
}, 10000); // 10 seconds timeout
