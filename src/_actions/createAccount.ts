import { connectDB } from "../config/database";
import { UserModel, UserProps } from "../models/UserModel";

export async function createUser(email: string, fullName: string, username: string, password: string): Promise<UserProps> {
    try {
        const newUser = new UserModel({ email, fullName, username, password });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function createRandomUser() {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected to DB.');

        const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
        const randomFullName = `Test User ${Math.floor(Math.random() * 100)}`;
        const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
        const randomPassword = `password${Math.floor(Math.random() * 10000)}`;

        console.log('Generated random user data:', { randomEmail, randomFullName, randomUsername, randomPassword });

        const newUserData = {
            email: randomEmail,
            fullName: randomFullName,
            username: randomUsername,
            password: randomPassword
        };

        console.log('Creating new user...');
        const newUser = new UserModel(newUserData);
        console.log('newUser instance created:', newUser);

        const savedUser = await newUser.save();
        console.log('Created new account:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error creating random user:', error);
        throw error;
    }
}