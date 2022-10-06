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
    <header className='navbar is-warning'>
      <span className='logo'>Recipes</span>
      {user
        ? <button className='button is-primary is-small' onClick={handleSignOut}>Sign Out</button>
        : <div className='header-right'>
          <NavLink className='navbar-item' to='/auth/sign-in'>Sign In</NavLink>
          <NavLink className='navbar-item' to='/auth/sign-up'>Sign Up</NavLink>
        </div>}
    </header>
  );
}
