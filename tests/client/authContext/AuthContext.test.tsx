import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/app/authContext/AuthContext';
import { ProfileProps } from '@/app/types/types';
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
  

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

  fetchMock.enableMocks();

const DummyComponent = () => {
    useAuth();
    return <div>Dummy</div>;
};

const TestComponent = () => {
    const { isAuthenticated, user, logout, updateProfile, initializing } = useAuth();
    return (
      <div>
        <div data-testid="initializing">{initializing ? 'Loading...' : 'Loaded'}</div>
        <div data-testid="authenticated">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
        <div data-testid="user">{user ? `User: ${user.username}` : 'No User'}</div>
        <button onClick={logout}>Logout</button>
        <button onClick={() => updateProfile({ username: 'Updated User' } as ProfileProps)}>Update Profile</button>
      </div>
    );
};

const Wrapper = ({children}:{children: React.ReactNode}) => {
    return <AuthProvider>{children}</AuthProvider>;
  };

    const mockPush = jest.fn();
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        });
    });

    afterEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
        localStorage.clear();
        sessionStorage.clear();
        document.body.innerHTML = '';
    });

  describe('AuthContext', () => {

    test('render initial state', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({ message: 'Unauthorized' }), { status: 401 }],
            [JSON.stringify({ message: 'Unauthorized' }), { status: 400 }]
        );
        await act(async () => {
            render(<TestComponent />, { wrapper: Wrapper });
        });
        expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
        expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });

    test('displays loading and then user data after fetching', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({message: 'Token Valid' }),{ status: 200 }],
            [JSON.stringify({ userData: { username: 'Test User' } }),{ status: 200 }]
        );
        localStorage.setItem('token', 'test-token');
        render(<TestComponent />, { wrapper: Wrapper });
    
        await waitFor(() => {
          expect(screen.getByTestId('initializing')).toHaveTextContent('Loading...');
        });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
            expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
            expect(screen.getByTestId('user')).toHaveTextContent('User: Test User');
          });
      });

    test('has cached profile', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({message: 'Token Valid' }),{ status: 200 }],
        );

        sessionStorage.setItem('userProfile', JSON.stringify({ username: 'Test User' }));
        localStorage.setItem('token', 'test-token');
        render(<TestComponent />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loading...');
          });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
            expect(screen.getByTestId('user')).toHaveTextContent('User: Test User');
        });
    });

    test('if failed to verify token', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        fetchMock.mockResponses(
            [JSON.stringify({ message: 'Token not valid' }), { status: 401 }],
            [JSON.stringify({ message: 'Unauthorized' }), { status: 400 }]
        );
        localStorage.setItem('token', 'test-token');
        render(<TestComponent />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
            expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
            expect(screen.getByTestId('user')).toHaveTextContent('No User');
        });
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('if token is not valid', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({ message: 'Token not valid' }),{ status: 401 }],
            [JSON.stringify({ message: 'Unauthorized' }), { status: 400 }]
        );
        localStorage.setItem('token', 'test-token');
        render(<TestComponent />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loading...');
        });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
            expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
            expect(screen.getByTestId('user')).toHaveTextContent('No User');
        });
        expect(localStorage.getItem('token')).toBeNull();
    });

    test('response from user-profile is not ok', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({ message: 'Token Valid' }),{ status: 200 }],
            [JSON.stringify({ message: 'Unauthorized' }), { status: 400 }]
        );
        localStorage.setItem('token', 'test-token');
        render(<TestComponent />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loading...');
          });

        await waitFor(() => {
            expect(screen.getByTestId('initializing')).toHaveTextContent('Loaded');
            expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
            expect(screen.getByTestId('user')).toHaveTextContent('No User');
        });
    });
    
    test('Logout function', async () => {
        localStorage.setItem('token', 'test-token');
        sessionStorage.setItem('userProfile', 'test-user');
        render(<TestComponent />, { wrapper: Wrapper });

        fireEvent.click(screen.getByText('Logout'));

        await waitFor(() => {
            expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
            expect(screen.getByTestId('user')).toHaveTextContent('No User');
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });
        await waitFor(() => {
            expect(localStorage.getItem('token')).toBeNull();
            expect(sessionStorage.getItem('userProfile')).toBeNull();
        });
    })

    test('updateProfile function', async () => {
        localStorage.setItem('token', 'test-token');
        sessionStorage.setItem('userProfile', 'test-user');
        render(<TestComponent />, { wrapper: Wrapper });

        fireEvent.click(screen.getByText('Update Profile'));

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('User: Updated User');
    });
    })
    
    test('throws an error if used outside of AuthProvider', () => {
        const renderOutsideAuthProvider = () => render(<DummyComponent />);
        expect(renderOutsideAuthProvider).toThrow('useAuth must be used within an AuthProvider');
    });
});
