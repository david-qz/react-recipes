import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeList() {
  const { user } = useUser();
  const { recipes, error, loading } = useRecipes();

  if (!user) return <Redirect to='/auth/sign-in' />;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
    </div>
  );
}
