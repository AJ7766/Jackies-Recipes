/**
 * @jest-environment node
*/
import ValidateRegisterForm from '@/app/api/register/validations/registerValidation';

describe('Validation-form for register endpoint', () => {

    test('successful validation & creating user', async () => {
        const mockProps = {
            email: 'email@test.com',
            fullName: 'testname',
            username: 'testuser',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe(true);
    });

    test('missing fields in the form', async () => {
        const mockProps = {
            email: '',
            fullName: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Please fill out Email, Username, Full Name, Password, Confirm Password.');
    });

    test('entering a not valid email', async () => {
        const mockProps = {
            email: 'notValidEmail',
            fullName: 'testname',
            username: 'testuser',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Please enter a valid Email address.');
    });

    test('entering a not valid username using numbers and symbols', async () => {
        const mockProps = {
            email: 'email@test.com',
            fullName: 'testname',
            username: '123!"#',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Username can only contain letters.');
    });

    test('entering a username that is less than 4 letters', async () => {
        const mockProps = {
            email: 'email@test.com',
            fullName: 'testname',
            username: 'asd',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Username must be atleast 4 letters.');
    });

    test('entering a password that is less than 6 characters', async () => {
        const mockProps = {
            email: 'email@test.com',
            fullName: 'testname',
            username: 'testuser',
            password: '12345',
            confirmPassword: '12345'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Password must be atleast 6 characters.');
    });

    test('entering a password that does not match the confirm-pasword', async () => {
        const mockProps = {
            email: 'email@test.com',
            fullName: 'testname',
            username: 'testuser',
            password: '123456',
            confirmPassword: '1234567'
        };

        const result = ValidateRegisterForm(mockProps);
        expect(result).toBe('Passwords do not match.');
    });
});