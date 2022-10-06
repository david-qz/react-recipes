import { useUser } from '../../context/UserContext';

export default function RecipeCard({ id, user_id, title, ingredients, instructions, handleEdit }) {
  const { user } = useUser();

  return (
    <div className='recipe-card'>
      <h4>{title}</h4>
      <p>{ingredients}</p>
      <p>{instructions}</p>
      {user.id === user_id && <button onClick={() => handleEdit(id)}>Edit</button>}
    </div>
  );
}
