import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import axiosCustom from '../../../services/api'; // Importing the axiosCustom instance for mocking
import LoginForm from './LoginForm';
import * as testingLibraryJestDom from '@testing-library/jest-dom';


// Mocking axiosCustom post method
jest.mock('../../../services/api', () => ({
  post: jest.fn(),
}));

describe('LoginForm', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders LoginForm component', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('submits login form with valid credentials', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(axiosCustom.post).toHaveBeenCalledTimes(1));
    expect(axiosCustom.post).toHaveBeenCalledWith(
      '/api/v1/auth/authenticate',
      { email: 'test@example.com', password: 'password123' },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  });

  test('displays error message for invalid email', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Please enter a valid email!')).toBeInTheDocument());
  });

  test('displays error message for empty password', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Please enter a password!')).toBeInTheDocument());
  });

  test('displays error message for incorrect username or password', async () => {
    axiosCustom.post.mockRejectedValueOnce(new Error('Unauthorized'));
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Username or password is wrong')).toBeInTheDocument());
  });

  test('redirects user to the specified page after successful login', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(axiosCustom.post).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Welcome to the app')).toBeInTheDocument();
  });
});
