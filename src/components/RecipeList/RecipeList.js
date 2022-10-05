import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useRecipes } from '../hooks/useRecipes';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeForm from '../RecipeForm/RecipeForm';

export default function RecipeList() {
  const { user } = useUser();
  const { recipes, error, loading } = useRecipes();
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
  };

  const handleSubmit = (data) => {
    // pass
  };

  if (!user) return <Redirect to='/auth/sign-in' />;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <button onClick={handleClick}>add recipe</button>
      <div className='recipe-list'>
        {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </div>
      {isAdding && <Modal><RecipeForm handleSubmit={handleSubmit} /></Modal>}
    </>
    
  );
}
