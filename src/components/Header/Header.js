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
    <header>
      <span>Recipes</span>
      {user
        ? <button onClick={handleSignOut}>Sign Out</button>
        : <div>
          <NavLink to='/auth/sign-in'>Sign In</NavLink>
          <NavLink to='/auth/sign-up'>Sign Up</NavLink>
        </div>}
    </header>
  );
}
