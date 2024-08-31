import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

// Mocking the context and navigation
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test('renders LoginForm when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
      updateProfile: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});