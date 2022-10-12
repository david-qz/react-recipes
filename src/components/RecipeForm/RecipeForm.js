import './RecipeForm.css';

export default function RecipeForm({ formTitle, handleSubmit, title = '', ingredients = '', instructions = '' }) {

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
    <form className='recipe-form' onSubmit={handleFormSubmit} aria-label={`${formTitle} form`}>
      <p className='title'>{formTitle}</p>
      <div className='field'>
        <label className='label' htmlFor='title'>Title</label>
        <input className='input' id='title' required name='title' defaultValue={title} />
      </div>
      <div className='field'>
        <label className='label' htmlFor='ingredients'>Ingredients (separated by a comma)</label>
        <textarea className='textarea' id='ingredients' required name='ingredients' defaultValue={ingredients} />
      </div>
      <div className='field'>
        <label className='label' htmlFor='instructions'>Instructions</label>
        <textarea className='textarea' id='instructions' required name='instructions' defaultValue={instructions} />
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link'>Submit</button>
        </div>
      </div>
    </form>
  );
}
