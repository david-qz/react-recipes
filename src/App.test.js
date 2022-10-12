import { findByRole, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './context/UserContext';

import * as authFns from './services/auth';

jest.mock('./services/auth');

const mockUser = {
  email: 'example@exam.ple',
  aud: 'authenticated',
  role: 'authenticated',
  id: '27'
};

test('users can sign in', async () => {

  authFns.getUser.mockReturnValue(null);
  authFns.signIn.mockReturnValue(mockUser);

  render(
    <MemoryRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MemoryRouter>
  );

  const headerEl = screen.getByText(/recipes/i);
  expect(headerEl).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email');
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'example@exam.ple' } });
  expect(emailInput.value).toBe('example@exam.ple');

  const passwordInput = screen.getByLabelText('Password');
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: 'abc123' } });
  expect(passwordInput.value).toBe('abc123');

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const signOutButton = await screen.findByRole('button', { name: /sign out/i });
  expect(signOutButton).toBeInTheDocument();

});
