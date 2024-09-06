/**
 * @jest-environment node
*/
import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '@/app/api/login/route';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
    json: jest.fn(),
  },
}));

jest.mock('@/models/UserModel', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

  describe('api/login endpoint', () => {

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
      process.env.MONGODB_URI = 'your-mongodb-uri';
    });

    test('recieve request from client & logging in successfully', async () => { 
      const mockRequestBody = { 
      username: 'testuser',
      password: 'testpassword'
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;
      
      (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
        lean: jest.fn().mockResolvedValue({
          _id: 'mocked-id',
          username: 'testuser',
          password: 'hashedpassword',
        }),
      }));

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      (jwt.sign as jest.Mock).mockReturnValue('mocked-jwt-token');

      await connectDB();
      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(connectDB).toHaveBeenCalled();
      expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'mocked-id', username: 'testuser' },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }
      );
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Successfully logged in", token: 'mocked-jwt-token' },
        { status: 200 }
      );
});

    test('user not found', async () => { 
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const mockRequestBody = { 
        username: 'testuser',
        password: 'testpassword'
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;
      
      (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
        lean: jest.fn().mockResolvedValue(null),
      }));

      await connectDB();
      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(connectDB).toHaveBeenCalled();
      expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Invalid username or password."},
        { status: 400 }
      );
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('the passwords does not match', async () => { 
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const mockRequestBody = { 
      username: 'testuser',
      password: 'testpassword'
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;
      
      (UserModel.findOne as jest.Mock).mockImplementationOnce(() => ({
        lean: jest.fn().mockResolvedValue({
          _id: 'mocked-id',
          username: 'testuser',
          password: 'hashedpassword',
        }),
      }));

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      
      await connectDB();
      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(connectDB).toHaveBeenCalled();
      expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: "Invalid username or password."},
        { status: 400 }
      );
      expect(console.error).toHaveBeenCalledTimes(1);
    });
});
