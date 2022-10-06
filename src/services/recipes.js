import { checkError, client } from './client';

export async function getRecipes() {
  const response = await client
    .from('recipes')
    .select();

  return checkError(response);
}

export async function addRecipe(data) {
  const response = await client
    .from('recipes')
    .insert(data)
    .single();

  return checkError(response);
}

export async function updateRecipe(id, data) {
  const response = await client
    .from('recipes')
    .update(data)
    .match({ id })
    .single();

  return checkError(response);
}