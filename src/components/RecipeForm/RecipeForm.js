export default function RecipeForm({ handleSubmit }) {

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
    <form onSubmit={handleFormSubmit}>
      <input required name='title' />
      <textarea required name='ingredients' />
      <textarea required name='instructions' />
      <button>submit</button>
    </form>
  );
}
