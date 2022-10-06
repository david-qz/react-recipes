import { useState } from 'react';
import { addRecipe, updateRecipe } from '../../services/recipes';
import { useAllRecipes } from '../hooks/useAllRecipes';
import Modal from '../Modal/Modal';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeList from '../RecipeList/RecipeList';

export default function RecipeView() {
  const [userIsAddingRecipe, setUserIsAddingRecipe] = useState(false);
  const [userIsEditingRecipe, setUserIsEditingRecipe] = useState(false);
  const [editedRecipeId, setEditedRecipeId] = useState(null);
  const { recipes, setRecipes } = useAllRecipes();

  const handleUserAddedRecipe = async (recipeData) => {
    try {
      const newRecipe = await addRecipe(recipeData);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      setUserIsAddingRecipe(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };

  const handleUserEditedRecipe = async (recipeData) => {
    try {
      const editedRecipe = await updateRecipe(editedRecipeId, recipeData);
      setRecipes((prevRecipes) => prevRecipes.map(recipe => {
        return recipe.id === editedRecipeId ? editedRecipe : recipe;
      }));
      setUserIsEditingRecipe(false);
    } catch (e) {
      console.log(e);
    }
  };

  const beginEditingRecipe = (id) => {
    setEditedRecipeId(id);
    setUserIsEditingRecipe(true);
  };

  return (
    <div className='recipe-view'>
      <button onClick={() => setUserIsAddingRecipe(true)}>add recipe</button>
      <RecipeList recipes={recipes} handleEdit={beginEditingRecipe}></RecipeList>
      {userIsAddingRecipe && <Modal><RecipeForm title='Add a Recipe' handleSubmit={handleUserAddedRecipe} /></Modal>}
      {userIsEditingRecipe && <Modal><RecipeForm title='Edit a Recipe' handleSubmit={handleUserEditedRecipe} /></Modal>}
    </div>
  );
}
