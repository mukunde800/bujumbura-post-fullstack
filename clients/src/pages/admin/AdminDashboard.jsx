import { useEffect, useState } from 'react';
import Dashboard from '../../components/admin/Dashboard';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/users/stats/overview')
      .then((res) => setStats(res.data))
      .catch(() => {
        // fallback basique
        Promise.all([
          api.get('/articles?limit=1&status='),
          api.get('/categories'),
          api.get('/authors'),
          api.get('/users'),
          api.get('/comments'),
        ]).then(([a, c, au, u, co]) => setStats({
          articles: a.data.total, categories: c.data.length,
          authors: au.data.length, users: u.data.length, comments: co.data.length,
          views: a.data.data.reduce((s, x) => s + (x.views || 0), 0),
        }));
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <Dashboard stats={stats} />
    </div>
  );
}