import { useEffect } from 'react';
import { useState } from 'react';
import { getRecipes } from '../../services/recipes';

export function useAllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipeList = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    getRecipeList();
  }, []);

  return { recipes, setRecipes, error, loading };
}