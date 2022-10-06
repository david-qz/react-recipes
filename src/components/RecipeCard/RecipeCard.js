import { useUser } from '../../context/UserContext';

import './RecipeCard.css';

export default function RecipeCard({ id, user_id, title, ingredients, instructions, handleEdit }) {
  const { user } = useUser();

  return (
    <div className='recipe-card box content'>
      <h4 className='recipe-title subtitle is-4'>{title}</h4>
      <hr className='recipe-line'></hr>
      <p className='ingredients-heading'>Ingredients</p>
      <ul>
        {ingredients.split(',').map((ingredient, i) => <li key={i}><span>{ingredient}</span></li>)}
      </ul>
      <p className='instructions-heading'>Instructions</p>
      <p className='instructions'>{instructions}</p>
      {user.id === user_id && <button onClick={() => handleEdit(id)}>Edit</button>}
    </div>
  );
}
