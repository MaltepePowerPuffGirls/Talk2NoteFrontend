import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";
import * as testingLibraryJestDom from '@testing-library/jest-dom';



// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('Modal Component', () => {
    let mockOnClose;
    let mockNavigate;

    beforeEach(() => {
    mockOnClose = jest.fn();
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    });

    test('does not render when isOpen is false', () => {
    const { container } = render(
        <MemoryRouter>
        <Modal isOpen={false} onClose={mockOnClose} />
        </MemoryRouter>,
        { container: document.body }
    );
    expect(container).toBeEmptyDOMElement();
    });

    test('renders correctly when isOpen is true', () => {
    render(
        <MemoryRouter>
        <div id="modal"></div>
        <Modal isOpen={true} onClose={mockOnClose} />
        </MemoryRouter>,
        { container: document.body }
    );

    expect(screen.getByText(/Create Note/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose a priorty/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose a note type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });

    test('closes modal when close icon is clicked', () => {
    render(
        <MemoryRouter>
        <div id="modal"></div>
        <Modal isOpen={true} onClose={mockOnClose} />
        </MemoryRouter>,
        { container: document.body }
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('handles input changes correctly', () => {
    render(
        <MemoryRouter>
        <div id="modal"></div>
        <Modal isOpen={true} onClose={mockOnClose} />
        </MemoryRouter>,
        { container: document.body }
    );

    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'My Note' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'This is a description' } });
    fireEvent.change(screen.getByText(/Choose a priorty/i), { target: { value: 'HIGH' } });
    fireEvent.change(screen.getByText(/Choose a note type/i), { target: { value: 'DEVELOPER' } });

    expect(screen.getByPlaceholderText(/Title/i)).toHaveValue('My Note');
    expect(screen.getByPlaceholderText(/Description/i)).toHaveValue('This is a description');
    expect(screen.getByDisplayValue('HIGH')).toBeInTheDocument();
    expect(screen.getByDisplayValue('DEVELOPER')).toBeInTheDocument();
    });

    test('calls navigate and onClose when save button is clicked', () => {
    render(
        <MemoryRouter>
        <div id="modal"></div>
        <Modal isOpen={true} onClose={mockOnClose} />
        </MemoryRouter>,
        { container: document.body }
    );

    fireEvent.click(screen.getByText(/Create/i));
    expect(mockNavigate).toHaveBeenCalledWith('/create-note/1');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});

