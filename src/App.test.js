import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as recipeFns from './services/recipes';

jest.mock('./services/auth');
jest.mock('./services/recipes');

const mockUser = {
  email: 'example@exam.ple',
  aud: 'authenticated',
  role: 'authenticated',
  id: '27'
};

it('users can sign in', async () => {

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

const mockRecipes = [
  {
    id: 1,
    title: 'Mock Recipe 1',
    ingredients: 'ingredient 1, ingredient 2',
    instructions: 'instructions 1'
  },
  {
    id: 2,
    title: 'Mock Recipe 2',
    ingredients: 'ingredient 3, ingredient 4',
    instructions: 'instructions 2'
  }
];

it('authenticated users can see a list of recipes', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  recipeFns.getRecipes.mockReturnValue(mockRecipes);
  render(
    <MemoryRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MemoryRouter>
  );

  await screen.findByText(/Mock Recipe 1/i);
  await screen.findByText(/ingredient 1/i);
  await screen.findByText(/instructions 1/i);
  await screen.findByText(/Mock Recipe 2/i);
});

const newMockRecipe = {
  id: 3,
  title: 'New Recipe',
  ingredients: 'new ingredients',
  instructions: 'new instructions'
};

it('authenticated users can add a recipe', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  recipeFns.getRecipes.mockReturnValue(mockRecipes);
  recipeFns.addRecipe.mockReturnValue(newMockRecipe);

  render(
    <MemoryRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MemoryRouter>
  );

  const addRecipeButton = screen.getByRole('button', { name: 'Add Recipe' });
  fireEvent.click(addRecipeButton);
  
  const titleInput = await screen.findByLabelText(/Title/i);
  expect(titleInput).toBeInTheDocument();
  fireEvent.change(titleInput, { value: newMockRecipe.title });

  const ingredientsInput = await screen.findByLabelText('Ingredients (separated by a comma)');
  expect(ingredientsInput).toBeInTheDocument();
  fireEvent.change(ingredientsInput, { value: newMockRecipe.ingredients });

  const instructionsInput = await screen.findByLabelText(/Instructions/i);
  expect(instructionsInput).toBeInTheDocument();
  fireEvent.change(instructionsInput, { value: newMockRecipe.instructions });

  const submitButton = await screen.findByRole('button', { name: 'Submit' });
  await act(async () => {
    fireEvent.click(submitButton);
  });

  const recipeForm = screen.queryByRole('form');
  expect(recipeForm).not.toBeInTheDocument();

  await screen.findByText('New Recipe');
});

const mockUserRecipe = {
  id: 4,
  title: 'My Recipe',
  ingredients: 'my ingredients',
  instructions: 'my instructions',
  user_id: mockUser.id
};

it('authorized users can delete their own recipes', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  recipeFns.getRecipes.mockReturnValue([...mockRecipes, mockUserRecipe]);
  recipeFns.deleteRecipe.mockReturnValue(mockUserRecipe);

  render(
    <MemoryRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MemoryRouter>
  );

  await screen.findByText('My Recipe');

  const deleteButton = await screen.findByRole('button', { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(deleteButton);
  });

  const userRecipeTitle = screen.queryByText('My Recipe');
  expect(userRecipeTitle).not.toBeInTheDocument();
});

it('authorized users can update their own recipes', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  recipeFns.getRecipes.mockReturnValue([...mockRecipes, mockUserRecipe]);
  recipeFns.updateRecipe.mockReturnValue({ ...mockUserRecipe, title: 'My Updated Recipe' });

  render(
    <MemoryRouter initialEntries={['/recipes']}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MemoryRouter>
  );

  await screen.findByText('My Recipe');

  const editButton = await screen.findByRole('button', { name: /edit/i });
  await act(async () => {
    fireEvent.click(editButton);
  });

  const updateForm = await screen.findByRole('form');
  expect(updateForm).toBeInTheDocument();

  const titleInput = screen.getByLabelText(/title/i);
  fireEvent.change(titleInput, { value: 'My Updated Recipe' });
  
  const ingredientInput = screen.getByLabelText('Ingredients (separated by a comma)');
  fireEvent.change(ingredientInput, { value: mockUserRecipe.ingredients });

  const instructionInput = screen.getByLabelText(/instructions/i);
  fireEvent.change(instructionInput, { value: mockUserRecipe.instructions });

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  await act(async () => {
    fireEvent.click(submitButton);
  });

  await screen.findByText('My Updated Recipe');
  const previousTitle = screen.queryByText('My Recipe');
  expect(previousTitle).not.toBeInTheDocument();

});


