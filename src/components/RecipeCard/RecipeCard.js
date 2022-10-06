export default function RecipeCard({ id, title, ingredients, instructions, handleEdit }) {

  return (
    <div className='recipe-card'>
      <h4>{title}</h4>
      <p>{ingredients}</p>
      <p>{instructions}</p>
      <button onClick={() => handleEdit(id)}>Edit</button>
    </div>
  );
}