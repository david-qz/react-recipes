import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './context/UserContext';

import * as authFuncs from './services/auth';
import * as recipeFuncs from './services/recipes';

jest.mock('./services/auth');
jest.mock('./services/recipes');

const mockUser = {
  id: '1234',
  user_id: '1234',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'testing@test.com'
};

test('user can sign in', async () => {
  authFuncs.getUser.mockReturnValue(null);
  authFuncs.signIn.mockReturnValue(mockUser);

  render(
    <UserContextProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserContextProvider>
  );

  const headerEl = screen.getByText(/Recipes/i);
  expect(headerEl).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email');
  const passInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: 'testing@test.com' } });
  fireEvent.change(passInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByText('Sign Out');
  expect(headerText).toBeInTheDocument();

});

const fakeRecipes = [
  {
    id: 1,
    ingredients: 'sock, shoe, belt',
    title: 'sock shoe belt stirfry',
    instructions: 'stirfry the sock shoe and belt',
    user_id: '1234'
  },
  {
    id: 2,
    ingredients: 'test',
    title: 'testing the test',
    instructions: 'test the test',
    user_id: '400'
  },
  {
    id: 3,
    ingredients: 'test',
    title: 'testing',
    instructions: 'test the test',
    user_id: '2'
  },
];

it('singed in user should see list of recipes', async () => {
  authFuncs.getUser.mockReturnValue(mockUser);
  recipeFuncs.getRecipes.mockReturnValue(fakeRecipes);

  render(
    <UserContextProvider>
      <MemoryRouter initialEntries={['/recipes']}>
        <App />
      </MemoryRouter>
    </UserContextProvider>
  );
  
  const postOne = await screen.findByText('sock shoe belt stirfry');
  expect(postOne).toBeInTheDocument();

  const postTwo = await screen.findByText('testing the test');
  expect(postTwo).toBeInTheDocument();

  const postThree = await screen.findByText('testing');
  expect(postThree).toBeInTheDocument();

});

it('signed in user should see edit and delete buttons on their recipes', async () => {
  authFuncs.getUser.mockReturnValue(mockUser);
  recipeFuncs.getRecipes.mockReturnValue(fakeRecipes);

  render(
    <UserContextProvider>
      <MemoryRouter initialEntries={['/recipes']}>
        <App />
      </MemoryRouter>
    </UserContextProvider>
  );

  const postOne = await screen.findByText('sock shoe belt stirfry');
  expect(postOne).toBeInTheDocument();
  
  const editButton = await screen.findByText('Edit');
  const deleteButton = await screen.findByText('Delete');

  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

});
