/**
 * @jest-environment node
*/
import { POST } from '@/app/api/login/route';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/config/database';

// Mocking dependencies
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body: any, options: any) => ({
      json: async () => body,
      status: options?.status || 200,
    })),
  },
}));

jest.mock('@/config/database', () => ({
    connectDB: jest.fn().mockResolvedValue({
        connection: { readyState: 1 }, // Simulate a successful connection
    }),
}));
    

describe('connectDB', () => {
    beforeEach(() => {
      // Clear mock history before each test
      (connectDB as jest.Mock).mockClear();
    });
  
    test('should return mocked database connection', async () => {
      // Call the mocked function
      const result = await connectDB();
  
      // Assert that connectDB was called
      expect(connectDB).toHaveBeenCalled();
  
      // Assert that the result is what we expect
      expect(result).toEqual({
        connection: { readyState: 1 }, // Expected mock value
      });
    });
  });