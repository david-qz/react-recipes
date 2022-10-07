import { useUser } from '../../context/UserContext';

import './RecipeCard.css';

export default function RecipeCard({ id, user_id, title, ingredients, instructions, handleEdit, handleDelete }) {
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
      {user.id === user_id && <div className='button-container'>
        <button className='button is-info' onClick={() => handleEdit(id)}>Edit</button>
        <button className='button is-link' onClick={() => handleDelete(id)}>Delete</button>
      </div>
      }
    </div>
  );
}
