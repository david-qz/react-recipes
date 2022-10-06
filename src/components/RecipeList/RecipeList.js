import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAllRecipes } from '../hooks/useAllRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipeList.css';

export default function RecipeList({ recipes, handleEdit }) {
  const { user } = useUser();
  const { error, loading } = useAllRecipes();

  if (!user) return <Redirect to='/auth/sign-in' />;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className='recipe-list'>
        {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} handleEdit={handleEdit} />)}
      </div>
    </>
    
  );
}
