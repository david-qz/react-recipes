import { checkError, client } from './client';

export async function getRecipes() {
  const response = await client
    .from('recipes')
    .select();

  return checkError(response);
}