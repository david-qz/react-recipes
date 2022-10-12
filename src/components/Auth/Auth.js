import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signIn, signUp } from '../../services/auth';
import './Auth.css';

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

  const methodName = method === 'sign-in' ? 'Sign In' : 'Sign Up';

  return (
    <div className='box auth'>
      <h2 className='title'>{methodName}</h2>
      <form onSubmit={handleSubmit} aria-label={`${methodName} form`}>
        <div className='field' >
          <label htmlFor='email' className='label'>Email</label>
          <input id="email" className='input' required placeholder='email' name='email'></input>
        </div>
        <div className='field'>
          <label htmlFor='password' className='label'>Password</label>
          <input id="password" className='input' required placeholder='password' name='password' type='password'></input>
        </div>
        <div className='field'>
          <div className='control'>
            <button className='button is-primary'>{methodName}</button>
          </div>
        </div>
      </form>
      {error && <h2>{error}</h2>}
    </div>
  );
}
