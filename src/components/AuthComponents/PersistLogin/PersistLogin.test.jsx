import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersistLogin from './PersistLogin';
import useAuth from '../../../hooks/useAuth';
import useRefreshToken from '../../../hooks/useRefreshToken';
import useLocalStorage from '../../../hooks/useLocalStorage';
import * as testingLibraryJestDom from '@testing-library/jest-dom';


jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useRefreshToken');
jest.mock('../../../hooks/useLocalStorage');

describe('PersistLogin Component', () => {
  test('renders Outlet component if user is authenticated', () => {
    useAuth.mockReturnValue({
      auth: {
        accessToken: 'mockAccessToken'
      }
    });
    useRefreshToken.mockReturnValue(jest.fn());
    useLocalStorage.mockReturnValue([false]);

    render(<PersistLogin />);
    
    expect(screen.queryByText('Outlet component')).toBeInTheDocument();
  });

  test('renders Loading... text if user is not authenticated', async () => {
    useAuth.mockReturnValue({
      auth: null
    });
    useRefreshToken.mockReturnValue(jest.fn());
    useLocalStorage.mockReturnValue([false]);

    render(<PersistLogin />);
    
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('renders Outlet component if persist is true', () => {
    useAuth.mockReturnValue({
      auth: null
    });
    useRefreshToken.mockReturnValue(jest.fn());
    useLocalStorage.mockReturnValue([true]);

    render(<PersistLogin />);
    
    expect(screen.queryByText('Outlet component')).toBeInTheDocument();
  });
});
