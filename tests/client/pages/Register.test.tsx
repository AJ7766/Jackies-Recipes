import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import RegisterPage from '@/app/register/page';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Register Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe('Rendering Tests', () => {

    test('initializing: true = does not render any content', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: true,
      });

      await act(async() => {
      const { container } = render(<RegisterPage />);
      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('register-form')).toBeNull();
      });
      
    });

    test('initializing: false = render register form and elements', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: false,
      });

      await act(async () => {
        render(<RegisterPage />);
      });

      expect(screen.getByTestId('register-form')).toBeInTheDocument();
      expect(screen.getByAltText('logo')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });
  });
})