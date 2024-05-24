import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import useLogout from '../../../hooks/useLogout';
import * as testingLibraryJestDom from '@testing-library/jest-dom';



jest.mock('../../../hooks/useLogout');

describe('Navbar Component', () => {

    beforeEach(() => {
    useLogout.mockReturnValue(jest.fn());
    });

    test('renders the Navbar with the correct title', () => {
    render(<Navbar />);
    const navbarTitle = screen.getByText(/Weather App/i);
    expect(navbarTitle).toBeInTheDocument();
    expect(navbarTitle).toHaveClass('text-white', 'text-xl', 'sm:text-2xl', 'font-semibold');
    });

    test('renders the logout button with correct text and styles', () => {
    render(<Navbar />);
    const logoutButton = screen.getByRole('button', { name: /Log out/i });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass('flex', 'items-center', 'gap-3', 'text-white', 'text-base', 'sm:text-xl', 'font-semibold', 'px-3', 'py-2', 'rounded-[50px]');
    expect(logoutButton).toHaveStyle('background: linear-gradient(to top right, #ED213A 7%, #93291E 94%)');
    expect(logoutButton).toHaveStyle('box-shadow: 0px 4px 4px #00000040');
    });

    test('renders the logout icon with correct styles', () => {
    render(<Navbar />);
    const logoutIcon = screen.getByRole('img', { hidden: true });
    expect(logoutIcon).toBeInTheDocument();
    expect(logoutIcon).toHaveClass('w-[1.3em]', 'h-[1.3em]', 'sm:w-[1.8em]', 'sm:h-[1.8em]', 'bg-[rgba(0,0,0,0.3)]', 'rounded-full', 'py-[3px]', 'sm:py-[6px]');
    });

    test('calls logout function when logout button is clicked', () => {
    const mockLogout = jest.fn();
    useLogout.mockReturnValue(mockLogout);

    render(<Navbar />);
    const logoutButton = screen.getByRole('button', { name: /Log out/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('checks the Navbar container styles', () => {
    render(<Navbar />);
    const navbarContainer = screen.getByRole('banner');
    expect(navbarContainer).toHaveStyle('background: linear-gradient(to top right, #4A00E0 7%, #8E2DE2 94%)');
    });
});
