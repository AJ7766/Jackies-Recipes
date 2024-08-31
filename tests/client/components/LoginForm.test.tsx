import { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/_components/LoginForm';

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: ReactNode }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('LoginForm component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

describe('Interaction Tests', () => {

  test('register button redirects me to /register page', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });
    const originalConsoleError = console.error;
    console.error = jest.fn();

    await act(async () => {
    render(<LoginForm />);
    })

    const registerButton = await screen.findByRole('button', { name: /register/i }) as HTMLButtonElement;
    expect(registerButton).toBeInTheDocument();
  
    await act(async() => {
    fireEvent.click(registerButton);
    });

    expect(screen.getByRole('link', { name: /register/i })).toHaveAttribute('href', '/register');
    console.error = originalConsoleError;
  });

  test('submits the form with the wrong user credentials', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({ message: 'Invalid username or password.' }),
        { status: 400 }
      );
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });
    const originalConsoleError = console.error;
    console.error = jest.fn();

      render(<LoginForm />);
      const form = screen.getByTestId('login-form');
      const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
      const submitButton = await screen.findByRole('button', { name: /login/i });
      
      fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      await waitFor(() => {
        fireEvent.submit(form);
        expect(submitButton).toBeDisabled();
      });
      
      await waitFor(() => {
        expect(screen.getByText('Invalid username or password.')).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
      console.error = originalConsoleError;
});

test('displays default error message when server response does not include an error message', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({}),
      { status: 400 }
    );
  
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<LoginForm />);
    const form = screen.getByTestId('login-form');
    const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const submitButton = await screen.findByRole('button', { name: /login/i });
    
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    await waitFor(() => {
      fireEvent.submit(form);
      expect(submitButton).toBeDisabled();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to login.')).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
    console.error = originalConsoleError;
  });

test('submits the form with the right credentials and redirects', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({ token: 'fake-token' }),
        { status: 200 }
      );
      const mockLogin = jest.fn();
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: false,
        login: mockLogin,
      });
    await act(async () => {
    render(<LoginForm />);
    });

  const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
  const submitButton = await screen.findByRole('button', { name: /login/i }) as HTMLButtonElement;

  act(() => {
  fireEvent.change(usernameInput, { target: { value: 'correctuser' } });
  fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
  });

  act(() => {
  fireEvent.submit(screen.getByTestId('login-form'));
  });
  
  await waitFor(() => {
    expect(submitButton).toBeDisabled();
  });

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('fake-token');
  });

  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/correctuser');
  });
  });
});
});