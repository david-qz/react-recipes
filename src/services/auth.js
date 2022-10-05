import { client } from './client';

export function getUser() {
  return client.auth.user();
}

export async function signUp(email, password) {
  const response = await client.auth.signUp({ email, password });
  if (response.error) throw new Error(response.error);
  return response.user;
}

export async function signIn(email, password) {
  const response = await client.auth.signIn({ email, password });
  if (response.error) throw new Error(response.error);
  return response.user;
}

export async function signOut() {
  client.auth.signOut();
}
