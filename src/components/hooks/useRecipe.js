import { useState } from 'react';
import { useEffect } from 'react';
import { getRecipeById } from '../../services/recipes';

export function useRecipe(id) {

  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchRecipe();
  }, [id]);

  return { recipe, error };
}