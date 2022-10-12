import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './context/UserContext';

import * as AuthService from './services/auth';
jest.mock('./services/auth');

const mockUser = {
  id: '2fd26557-bf20-4d12-b187-22c6cec3dd54',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'user@test.com'
};

test('user can sign in', async () => {
  AuthService.getUser.mockReturnValue(null);
  AuthService.signIn.mockReturnValue(mockUser);

  render(
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  );

  const signInForm = screen.getByRole('form');
  screen.getByLabelText(/email/i).value = mockUser.email;
  screen.getByLabelText(/password/i).value = '123456';
  fireEvent.submit(signInForm);

  const signOutButton = await screen.findByText(/sign out/i);
  expect(signOutButton).toBeInTheDocument();
});
