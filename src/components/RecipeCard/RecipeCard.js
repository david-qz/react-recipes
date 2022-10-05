export default function RecipeCard({ title, ingredients, instructions }) {
  return (
    <div className='recipe-card'>
      <h4>{title}</h4>
      <p>{ingredients}</p>
      <p>{instructions}</p>
    </div>
  );
}