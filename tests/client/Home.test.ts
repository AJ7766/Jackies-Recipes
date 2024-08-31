import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    // Mock implementation for useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test('renders LoginForm when user is not authenticated', () => {
    // Mock implementation for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(<Home/>);

    // Check if LoginForm is rendered
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});