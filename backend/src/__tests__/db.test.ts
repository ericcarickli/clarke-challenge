import mongoose from 'mongoose';
import connectDB from '../db';

describe('Database Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });
});
