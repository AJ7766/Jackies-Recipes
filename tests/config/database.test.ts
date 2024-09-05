/**
 * @jest-environment node
*/
import { connectDB, getUri } from '@/config/database';
import mongoose from 'mongoose';

jest.mock('mongoose', () => {
    return {
        connect: jest.fn(),
        connection: {
        readyState: 0,
        },
    };
});

jest.mock('@/config/database', () => {
    return {
        getUri: jest.fn(),
        connectDB: jest.requireActual('@/config/database').connectDB
    };
});

  describe('connectDB', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        process.env.MONGODB_URI = 'your-mongodb-uri';
    });
  
    test('throws an error if MONGODB_URI is not set', async () => {
        delete process.env.MONGODB_URI;
        (getUri as jest.Mock).mockRejectedValue(new Error('no mongoDB uri found'));

        await expect(connectDB()).rejects.toThrow('no mongoDB uri found');
    });
  
    test('connect to database successfully & if i reconnect i should get a cached connection', async () => {
        const mockSuccessClient = { connection: { readyState: 1 } }; 
        (mongoose.connect as jest.Mock).mockResolvedValue(mockSuccessClient);

        const client = await connectDB();

        expect(mongoose.connect).toHaveBeenCalledTimes(1);
        expect(mongoose.connect).toHaveBeenCalledWith('your-mongodb-uri');
        expect(client).toBe(mockSuccessClient);
        expect(client && client.connection.readyState).toBe(1);
        
        (mongoose.connect as jest.Mock).mockClear();

        const cachedClientResult = await connectDB();
        expect(mongoose.connect).not.toHaveBeenCalled();
        expect(cachedClientResult).toBe(mockSuccessClient);
        expect(cachedClientResult && cachedClientResult.connection.readyState).toBe(1);
    });
  });