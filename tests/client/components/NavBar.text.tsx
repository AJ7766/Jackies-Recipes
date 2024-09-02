import { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { useAuth } from '@/app/authContext/AuthContext';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/_components/NavBar';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));