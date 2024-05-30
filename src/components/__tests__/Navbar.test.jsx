import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Navbar from '../CommonComponents/Navbar/Navbar';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth');
vi.mock('../../hooks/useLogout');

describe('Navbar', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { name: 'Test User' } });
    useLogout.mockReturnValue(vi.fn());
  });

  test('renders without crashing', () => {
    const { container } = render(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  test('renders the title correctly', () => {
    const { getByText } = render(<Navbar />);
    const title = getByText('TALK2NOTE');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-white text-xl sm:text-3xl font-bold');
  });

  test('renders the logout button correctly', () => {
    const { getByRole } = render(<Navbar />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('flex items-center gap-1 text-white text-base sm:text-lg bg-transparent font-semibold px-3 py-2 rounded-[50px]');
  });

  test('calls logout function when logout button is clicked', () => {
    const logoutMock = vi.fn();
    useLogout.mockReturnValue(logoutMock);

    const { getByRole } = render(<Navbar />);
    const button = getByRole('button');
    
    fireEvent.click(button);
    expect(logoutMock).toHaveBeenCalled();
  });
});
