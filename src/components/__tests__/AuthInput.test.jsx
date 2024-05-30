import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import AuthInput from '../AuthComponents/AuthInput';

// Mock Icon component for testing
const MockIcon = (props) => <svg {...props} data-testid="mock-icon" />;

describe('AuthInput Component', () => {
  it('renders input element with correct attributes', () => {
    const inputAttribs = { type: 'text', placeholder: 'Enter text', name: 'testInput' };
    
    render(<AuthInput inputAttribs={inputAttribs} isLoginInput={false} Icon={MockIcon} />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'testInput');
  });

  it('renders icon when isLoginInput is true', () => {
    const inputAttribs = { type: 'password', placeholder: 'Enter password' };
    
    render(<AuthInput inputAttribs={inputAttribs} isLoginInput={true} Icon={MockIcon} />);
    
    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });


});
