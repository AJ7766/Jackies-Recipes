/**
 * @jest-environment node
*/
import { connectDB, getUri } from '@/config/database';
import mongoose from 'mongoose';

jest.mock('@/config/database', () => {
  const actual = jest.requireActual('@/config/database');

  return {
    ...actual,
    getUri: jest.fn().mockResolvedValue('mocked-mongodb-uri'),
    connectDB: jest.fn().mockImplementation(() => {
      return {
        connection: {
          readyState: 1
        }
      };
    })
  };
});

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body: any, options: any) => ({
      json: async () => body,
      status: options?.status || 200,
    })),
  },
}));


describe('connectDB', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env.MONGODB_URI = 'your-mongodb-uri';
  });
  
    test('should return mocked database connection', async () => {  
      const client = await connectDB();

      expect(client).toEqual({connection: { readyState: 1 },
      });
    });
  });