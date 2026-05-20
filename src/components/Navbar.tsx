import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    auth?.logout();
    navigate('/');
  }

  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/projects">Projets</Link>
      {auth?.isAuthenticated ? (
        <button onClick={handleLogout}>Déconnexion</button>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </nav>
  );
}
