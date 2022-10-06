import './RecipeForm.css';

export default function RecipeForm({ title, handleSubmit }) {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleSubmit({
      title: formData.get('title'),
      ingredients: formData.get('ingredients'),
      instructions: formData.get('instructions')
    });
  };

  return (
    <form className='recipe-form' onSubmit={handleFormSubmit}>
      <p className='title'>{title}</p>
      <div className='field'>
        <label className='label'>Title</label>
        <input className='input' required name='title' />
      </div>
      <div className='field'>
        <label className='label'>Ingredients</label>
        <textarea className='textarea' required name='ingredients' />
      </div>
      <div className='field'>
        <label className='label'>Instructions</label>
        <textarea className='textarea' required name='instructions' />
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link'>Submit</button>
        </div>
        <div className='control'>
          <button className='button is-link is-light'>Cancel</button>
        </div>
      </div>
    </form>
  );
}
