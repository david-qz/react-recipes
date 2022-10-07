import { useState } from 'react';
import { addRecipe, deleteRecipe, updateRecipe } from '../../services/recipes';
import { useAllRecipes } from '../hooks/useAllRecipes';
import Modal from '../Modal/Modal';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeList from '../RecipeList/RecipeList';
import './RecipeView.css';

export default function RecipeView() {
  const [userIsAddingRecipe, setUserIsAddingRecipe] = useState(false);
  const [userIsEditingRecipe, setUserIsEditingRecipe] = useState(false);
  const [recipeBeingEdited, setRecipeBeingEdited] = useState(null);
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
      const editedRecipe = await updateRecipe(recipeBeingEdited.id, recipeData);
      setRecipes((prevRecipes) => prevRecipes.map(recipe => {
        return recipe.id === editedRecipe.id ? editedRecipe : recipe;
      }));
      setUserIsEditingRecipe(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prevRecipes) => prevRecipes.filter(recipe => {
        return recipe.id !== id;
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const beginEditingRecipe = (id) => {
    setRecipeBeingEdited(recipes.find((recipe) => recipe.id === id));
    setUserIsEditingRecipe(true);
  };

  return (
    <div className='recipe-view'>
      <button className='button is-primary' onClick={() => setUserIsAddingRecipe(true)}>Add Recipe</button>
      <RecipeList recipes={recipes} handleEdit={beginEditingRecipe} handleDelete={handleDeleteRecipe}></RecipeList>
      {userIsAddingRecipe && <Modal handleClose={() => setUserIsAddingRecipe(false)}>
        <RecipeForm formTitle='Add a Recipe' handleSubmit={handleUserAddedRecipe} />
      </Modal>}
      {userIsEditingRecipe && <Modal handleClose={() => setUserIsEditingRecipe(false)}>
        <RecipeForm formTitle='Edit a Recipe' handleSubmit={handleUserEditedRecipe} {...recipeBeingEdited}/>
      </Modal>}
    </div>
  );
}
