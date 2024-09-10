/**
 * @jest-environment node
*/
import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { POST } from '@/app/api/register/route';
import ValidateRegisterForm from '@/app/api/register/validateForm';

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

jest.mock('bcrypt', () => ({
   hash: jest.fn(),
}));

jest.mock('@/models/UserModel', () => ({
   UserModel: {
      create: jest.fn(),
   },
}));

jest.mock('@/app/api/register/validateForm');
describe('api/register endpoint', () => {

   beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
      process.env.MONGODB_URI = 'your-mongodb-uri';
   });

   test('recieve request from client', async () => {
      const mockRequestBody = { email: 'email@test.com', fullName: 'testname', username: 'testuser', password: 'testpassword', confirmPassword: 'testpassword' };
      const mockRequest = {
         json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;

      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
   });

   test('successful validation & creating user', async () => {
      const mockRequestBody = {
         email: 'email@test.com',
         fullName: 'testname',
         username: 'testuser',
         password: 'testpassword',
         confirmPassword: 'testpassword'
      };

      const mockRequest = {
         json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;

      (ValidateRegisterForm as jest.Mock).mockResolvedValue(true);

      const saltRounds = 10;
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

      (UserModel.create as jest.Mock).mockImplementationOnce(() =>
         Promise.resolve({
            _id: 'mocked-id',
            email: 'email@test.com',
            fullName: 'testname',
            username: 'testuser',
            password: 'hashedpassword'
         })
      );

      await connectDB();
      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', saltRounds);
      expect(UserModel.create).toHaveBeenCalledWith({
         email: 'email@test.com',
         fullName: 'testname',
         username: 'testuser',
         password: 'hashedpassword'
      });
      expect(NextResponse.json).toHaveBeenCalledWith(
         { message: "Your account email@test.com has been successfully created!" },
         { status: 201 }
      );
   });

   test('recieve request from client & validation returns a string(error)', async () => {
      const mockRequestBody = {
         email: 'email@test.com',
         fullName: 'testname',
         username: 'testuser',
         password: 'testpassword',
         confirmPassword: 'testpassword'
      };
      const mockRequest = {
         json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;

      (ValidateRegisterForm as jest.Mock).mockReturnValue('mock-error-message');

      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
         { success: false, message: "mock-error-message" },
         { status: 400 }
      );
   });

   test('request failed, duplicate email error code: 11000', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => { });
      const mockRequestBody = {
         email: 'email@test.com',
         fullName: 'testname',
         username: 'testuser',
         password: 'testpassword',
         confirmPassword: 'testpassword'
      };
      const duplicateKeyError = {
         code: 11000,
         keyPattern: { email: 1 },
         keyValue: { email: 'email@test.com' }
      };
      const mockRequest = {
         json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;
   
      (UserModel.create as jest.Mock).mockRejectedValue(duplicateKeyError);
      (ValidateRegisterForm as jest.Mock).mockReturnValue(null);

      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
         { message: "Email 'email@test.com' is already registered." },
         { status: 400 }
      );
      expect(console.error).toHaveBeenCalledTimes(1);
   });

   test('request failed, duplicate username error code: 11000', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => { });
      const mockRequestBody = {
         email: 'email@test.com',
         fullName: 'testname',
         username: 'testuser',
         password: 'testpassword',
         confirmPassword: 'testpassword'
      };
      const duplicateKeyError = {
         code: 11000,
         keyPattern: { username: 1 },
         keyValue: { username: 'testuser' }
      };
      const mockRequest = {
         json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as NextRequest;
   
      (UserModel.create as jest.Mock).mockRejectedValue(duplicateKeyError);
      (ValidateRegisterForm as jest.Mock).mockReturnValue(null);

      await POST(mockRequest);

      expect(mockRequest.json).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
         { message: "Username 'testuser' is already taken." },
         { status: 400 }
      );
      expect(console.error).toHaveBeenCalledTimes(1);
   });
});