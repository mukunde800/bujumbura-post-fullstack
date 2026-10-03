import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Tableau de bord', icon: '📊', end: true },
  { to: '/admin/articles', label: 'Articles', icon: '📰' },
  { to: '/admin/categories', label: 'Catégories', icon: '🏷️' },
  { to: '/admin/authors', label: 'Auteurs', icon: '✍️' },
  { to: '/admin/users', label: 'Utilisateurs', icon: '👥' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary-dark text-white min-h-screen p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Bujumbura<span className="text-accent">Post</span></h2>
      <nav className="space-y-1 flex-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'
              }`
            }
          >
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <NavLink to="/" className="mt-4 text-sm text-white/70 hover:text-accent">← Retour au site</NavLink>
    </aside>
  );
}