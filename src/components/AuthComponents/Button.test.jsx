import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';
import { extendExpect } from '@testing-library/jest-dom';



describe('Button Component', () => {
  test('renders button with text correctly', () => {
    const onClick = jest.fn();
    const buttonText = 'Submit';

    render(<Button onClick={onClick} loading={false} text={buttonText} />);
    
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);
  });

  test('button onClick event works correctly', () => {
    const onClick = jest.fn();
    const buttonText = 'Submit';

    render(<Button onClick={onClick} loading={false} text={buttonText} />);
    
    const buttonElement = screen.getByRole('button', { name: buttonText });
    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when loading is true', () => {
    const onClick = jest.fn();
    const buttonText = 'Submit';

    render(<Button onClick={onClick} loading={true} text={buttonText} />);
    
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent('Loading ...');
  });

  test('button is enabled when loading is false', () => {
    const onClick = jest.fn();
    const buttonText = 'Submit';

    render(<Button onClick={onClick} loading={false} text={buttonText} />);
    
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).not.toBeDisabled();
    expect(buttonElement).toHaveTextContent(buttonText);
  });
});
