import StatsCard from './StatsCard';

export default function Dashboard({ stats }) {
  const items = [
    { label: 'Articles', value: stats?.articles ?? 0, icon: '📰', color: 'bg-blue-500' },
    { label: 'Catégories', value: stats?.categories ?? 0, icon: '🏷️', color: 'bg-yellow-500' },
    { label: 'Auteurs', value: stats?.authors ?? 0, icon: '✍️', color: 'bg-green-500' },
    { label: 'Utilisateurs', value: stats?.users ?? 0, icon: '👥', color: 'bg-purple-500' },
    { label: 'Commentaires', value: stats?.comments ?? 0, icon: '💬', color: 'bg-pink-500' },
    { label: 'Vues totales', value: stats?.views ?? 0, icon: '👁', color: 'bg-indigo-500' },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((i) => <StatsCard key={i.label} {...i} />)}
    </div>
  );
}