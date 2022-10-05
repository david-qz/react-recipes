import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeList() {
  const { recipes, error, loading } = useRecipes();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
    </div>
  );
}