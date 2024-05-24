import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthInput from './AuthInput';
import { HiOutlineMail } from "react-icons/hi";
import * as testingLibraryJestDom from '@testing-library/jest-dom';


describe('AuthInput Component', () => {
    test('renders input field without icon correctly', () => {
    const inputAttribs = {
        type: 'text',
        placeholder: 'Enter your email',
    };

    render(<AuthInput inputAttribs={inputAttribs} />);
    
    const inputField = screen.getByPlaceholderText('Enter your email');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute('type', 'text');
    });

    test('renders input field with icon correctly', () => {
    const inputAttribs = {
        type: 'password',
        placeholder: 'Enter your password',
    };

    render(<AuthInput inputAttribs={inputAttribs} isLoginInput={true} Icon={HiOutlineMail} />);
    
    const inputField = screen.getByPlaceholderText('Enter your password');
    const iconElement = screen.getByRole('img', { hidden: true });
    
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute('type', 'password');
    expect(iconElement).toBeInTheDocument();
    });

    test('input field changes value correctly', () => {
        const inputAttribs = {
        type: 'text',
        placeholder: 'Enter your name',
    };

    render(<AuthInput inputAttribs={inputAttribs} />);
    
    const inputField = screen.getByPlaceholderText('Enter your name');
    expect(inputField).toBeInTheDocument();

    // Simulate user typing
    const testValue = 'John Doe';
    fireEvent.change(inputField, { target: { value: testValue } });
    
    expect(inputField).toHaveValue(testValue);
    });

    test('input field displays placeholder correctly', () => {
    const inputAttribs = {
        type: 'text',
        placeholder: 'Enter your username',
    };

    render(<AuthInput inputAttribs={inputAttribs} />);
    
    const inputField = screen.getByPlaceholderText('Enter your username');
    expect(inputField).toBeInTheDocument();
    });
});
