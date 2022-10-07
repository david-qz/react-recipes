import './Header.css';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOut } from '../../services/auth';

export default function Header() {
  const { user, setUser } = useUser();

  const handleSignOut = async () => {
    signOut();
    setUser(null);
  };

  return (
    <header className='navbar is-info'>
      <span className='logo'>Recipes</span>
      {user
        ? <button className='button is-primary' onClick={handleSignOut}>Sign Out</button>
        : <div className='header-right'>
          <NavLink className='button is-primary' to='/auth/sign-in'>Sign In</NavLink>
          <NavLink className='button is-primary' to='/auth/sign-up'>Sign Up</NavLink>
        </div>}
    </header>
  );
}
