import { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { useAuth } from '@/app/authContext/AuthContext';
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

jest.mock('@/app/authContext/AuthContext', () => ({
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

  const fillForm = async (username: string, password: string) => {
        fireEvent.change(screen.getByPlaceholderText('Username') as HTMLInputElement, { target: { value: username } });
        fireEvent.change(screen.getByPlaceholderText('Password') as HTMLInputElement, { target: { value: password } });
  };

describe('Interaction Tests', () => {

  test('register button redirects me to /register page', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    await act(async () => {
    render(<LoginForm />);
    })

    const registerButton = await screen.findByRole('button', { name: /register/i }) as HTMLButtonElement;
    expect(registerButton).toBeInTheDocument();
  
    await act(async() => {
    fireEvent.click(registerButton);
    });

    expect(screen.getByRole('link', { name: /register/i })).toHaveAttribute('href', '/register');
  });

  test('user missed to fill username in the form', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({ message: 'Invalid username or password.'}),
        { status: 400 }
    );
    await act(async () => {
        render(<LoginForm />);
    });

    await fillForm("username", "password123");
    const submitButton = await screen.findByRole('button', { name: /login/i });

    expect(screen.getByPlaceholderText('Username')).toHaveValue("username");
    expect(screen.getByPlaceholderText('Password')).toHaveValue("password123");

    await waitFor(() => {
        fireEvent.submit(screen.getByTestId('login-form'));
        expect(submitButton).toBeDisabled();
    });

    await waitFor(() => {
        expect(screen.getByText('Invalid username or password.')).toBeInTheDocument();
    });
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

    await act(async () => {
      render(<LoginForm />);
    });
      await fillForm('wronguser', 'wrongpassword');
      const submitButton = await screen.findByRole('button', { name: /login/i });

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId('login-form'));
        expect(submitButton).toBeDisabled();
      });
      
      await waitFor(() => {
        expect(screen.getByText('Invalid username or password.')).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
});

test('displays default error message when error is not an instance of Error after submitting', async () => {
  fetchMock.mockReject(() => Promise.reject("Some non-Error message"));

  await act(async () => {
    render(<LoginForm />);
  });

  await fillForm('correctuser', 'correctpassword');
  const submitButton = await screen.findByRole('button', { name: /login/i });

  await waitFor(() => {
    fireEvent.submit(screen.getByTestId('login-form'));
    expect(submitButton).toBeDisabled();
  });

  await waitFor(() => {
    expect(screen.getByText('Failed to login.')).toBeInTheDocument();
  });
});

test('displays default error message when server response does not include an error message after submitting', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({}),
      { status: 400 }
    );
  
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    await act(async () => {
        render(<LoginForm />);
    });

    await fillForm('wronguser', 'wrongpassword');
    const submitButton = await screen.findByRole('button', { name: /login/i });

    await waitFor(() => {
        fireEvent.submit(screen.getByTestId('login-form'));
        expect(submitButton).toBeDisabled();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to login.')).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
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

    await fillForm('correctuser', 'correctpassword');
    const submitButton = await screen.findByRole('button', { name: /login/i }) as HTMLButtonElement;
  
  await waitFor(() => {
    fireEvent.submit(screen.getByTestId('login-form'));
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