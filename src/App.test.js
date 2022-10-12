import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './context/UserContext';

import * as AuthService from './services/auth';
jest.mock('./services/auth');

import * as RecipesService from './services/recipes';
jest.mock('./services/recipes');

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

const mockRecipes = [
  {
    id: 0,
    title: 'pork curry',
    ingredients: 'pork, curry block, potatoes, carrots',
    user_id: 0
  },
  {
    id: 1,
    title: 'beans and rice',
    ingredients: 'beans, rice',
    user_id: 0
  },
];

test('user can see a list of recipes', async () => {
  AuthService.getUser.mockReturnValue(mockUser);
  RecipesService.getRecipes.mockReturnValue(mockRecipes);

  render(
    <BrowserRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  );

  await screen.findByText(/pork curry/i);
  await screen.findByText(/beans and rice/i);
});
