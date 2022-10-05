import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signIn, signUp } from '../../services/auth';

export default function Auth() {
  const { method } = useParams();
  const { user, setUser } = useUser();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (method === 'sign-in') {
        const newUser = await signIn(formData.get('email'), formData.get('password'));
        setUser(newUser);
      }

      if (method === 'sign-up') {
        const newUser = await signUp(formData.get('email'), formData.get('password'));
        setUser(newUser);
      }
    } catch (e) {
      setError(e.message);
    }
    
  };

  if (user) {
    return <Redirect to='/recipes' />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input required placeholder='email' name='email'></input>
        <input required placeholder='password' name='password' type='password'></input>
        <button>submit</button>
      </form>
      {error && <h2>{error}</h2>}
    </div>
  );
}
