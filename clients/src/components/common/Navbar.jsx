import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-primary">
          Bujumbura<span className="text-accent">Post</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={linkClass} end>Accueil</NavLink>
          <NavLink to="/articles" className={linkClass}>Articles</NavLink>
          <NavLink to="/about" className={linkClass}>À propos</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <SearchBar />
          {user ? (
            <div className="flex items-center gap-3">
              {(user.role === 'admin' || user.role === 'editor') && (
                <Link to="/admin" className="text-sm font-medium text-primary">Admin</Link>
              )}
              <span className="text-sm text-gray-600">{user.name}</span>
              <button onClick={logout} className="text-sm text-red-600 hover:underline">Déconnexion</button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Connexion</Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          <NavLink to="/" className="block py-2">Accueil</NavLink>
          <NavLink to="/articles" className="block py-2">Articles</NavLink>
          <NavLink to="/about" className="block py-2">À propos</NavLink>
          <NavLink to="/contact" className="block py-2">Contact</NavLink>
          {user ? (
            <>
              <Link to="/admin" className="block py-2">Admin</Link>
              <button onClick={logout} className="block py-2 text-red-600">Déconnexion</button>
            </>
          ) : (
            <Link to="/login" className="block py-2 text-primary">Connexion</Link>
          )}
        </div>
      )}
    </nav>
  );
}