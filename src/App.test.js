import { act, fireEvent, render, screen } from '@testing-library/react';
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
    user_id: '2fd26557-bf20-4d12-b187-22c6cec3dd54'
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

test('user can delete their own recipes', async () => {
  AuthService.getUser.mockReturnValue(mockUser);
  RecipesService.getRecipes.mockReturnValue(mockRecipes);
  RecipesService.deleteRecipe.mockReturnValue(null);

  render(
    <BrowserRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  );

  const deleteButton = await screen.findByText(/delete/i);
  await act(async () => {
    fireEvent.click(deleteButton);
  });

  expect(RecipesService.deleteRecipe).toBeCalled();
});

test('user can edit their own recipes', async () => {
  AuthService.getUser.mockReturnValue(mockUser);
  RecipesService.getRecipes.mockReturnValue(mockRecipes);
  RecipesService.updateRecipe.mockReturnValue({
    id: 1,
    title: 'plain beans and rice',
    ingredients: 'beans, rice',
    user_id: '2fd26557-bf20-4d12-b187-22c6cec3dd54'
  });

  render(
    <BrowserRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  );

  const editButton = await screen.findByText(/edit/i);
  await act(async () => {
    fireEvent.click(editButton);
  });

  const editForm = await screen.findByRole('form');
  await act(async () => {
    fireEvent.submit(editForm);
  });

  expect(RecipesService.updateRecipe).toBeCalled();
  expect(editForm).not.toBeInTheDocument();
  await screen.findByText(/plain beans and rice/i);
});

test('user can add a recipe', async () => {
  AuthService.getUser.mockReturnValue(mockUser);
  RecipesService.getRecipes.mockReturnValue(mockRecipes);
  RecipesService.addRecipe.mockReturnValue({
    id: 2,
    title: 'meat balls',
    ingredients: 'meat',
    user_id: '2fd26557-bf20-4d12-b187-22c6cec3dd54'
  });

  render(
    <BrowserRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  );

  const addButton = await screen.findByText(/add recipe/i);
  await act(async () => {
    fireEvent.click(addButton);
  });

  const editForm = await screen.findByRole('form');
  await act(async () => {
    fireEvent.submit(editForm);
  });

  expect(RecipesService.addRecipe).toBeCalled();
  expect(editForm).not.toBeInTheDocument();
  await screen.findByText(/meat balls/i);
});
