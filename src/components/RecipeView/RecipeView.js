import { useState } from 'react';
import { addRecipe } from '../../services/recipes';
import { useAllRecipes } from '../hooks/useAllRecipes';
import Modal from '../Modal/Modal';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeList from '../RecipeList/RecipeList';

export default function RecipeView() {
  const [userIsAddingRecipe, setUserIsAddingRecipe] = useState(false);
  const { recipes, setRecipes } = useAllRecipes();

  const handleUserAddedRecipe = async (recipeData) => {
    try {
      const newRecipe = await addRecipe(recipeData);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };

  return (
    <div className='recipe-view'>
      <button onClick={() => setUserIsAddingRecipe(true)}>add recipe</button>
      <RecipeList recipes={recipes}></RecipeList>
      {userIsAddingRecipe && <Modal><RecipeForm handleSubmit={handleUserAddedRecipe} /></Modal>}
    </div>
  );
}