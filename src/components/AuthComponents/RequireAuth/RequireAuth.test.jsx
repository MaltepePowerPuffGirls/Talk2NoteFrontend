import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequireAuth from './RequireAuth';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import * as testingLibraryJestDom from '@testing-library/jest-dom';


jest.mock('../../../hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Navigate: jest.fn()
}));

describe('RequireAuth Component', () => {
  test('renders Outlet component if user is authenticated and has allowed role', () => {
    useAuth.mockReturnValue({
      auth: {
        accessToken: 'mockAccessToken'
      }
    });
    const allowedRoles = ['ADMIN'];

    render(<RequireAuth allowedRoles={allowedRoles} />);
    
    expect(screen.queryByText('Outlet component')).toBeInTheDocument();
  });

  test('redirects to unauthorized page if user is authenticated but does not have allowed role', () => {
    useAuth.mockReturnValue({
      auth: {
        accessToken: 'mockAccessToken'
      }
    });
    const allowedRoles = ['USER'];

    render(<RequireAuth allowedRoles={allowedRoles} />);
    
    expect(Navigate).toHaveBeenCalledWith('/unauthorized', { state: { from: undefined }, replace: true });
  });

  test('redirects to login page if user is not authenticated', () => {
    useAuth.mockReturnValue({
      auth: null
    });
    useLocation.mockReturnValue({ pathname: '/current-path' });

    render(<RequireAuth allowedRoles={['ADMIN']} />);
    
    expect(Navigate).toHaveBeenCalledWith('/login', { state: { from: '/current-path' }, replace: true });
  });

  test('decodes JWT correctly', () => {
    useAuth.mockReturnValue({
      auth: {
        accessToken: 'mockAccessToken'
      }
    });

    const allowedRoles = ['ADMIN'];
    const mockDecodedToken = {
      roles: [{ authority: 'ADMIN' }]
    };
    jwtDecode.mockReturnValue(mockDecodedToken);

    render(<RequireAuth allowedRoles={allowedRoles} />);
    
    expect(jwtDecode).toHaveBeenCalledWith('mockAccessToken');
  });
});
