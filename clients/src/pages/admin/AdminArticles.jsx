import { useEffect, useState } from 'react';
import ArticleForm from '../../components/articles/ArticleForm';
import articleService from '../../services/articleService';
import { formatDate } from '../../utils/formatDate';

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => articleService.getAll({ status: '' }).then((r) => setArticles(r.data.data));

  useEffect(() => { load(); }, []);

  const handleEdit = (a) => {
    setEditing(a);
    setShowForm(true);
  };

  const handleDelete = async (a) => {
    if (!confirm(`Supprimer "${a.title}" ?`)) return;
    await articleService.remove(a.id);
    load();
  };

  const closeForm = () => { setEditing(null); setShowForm(false); };

  const onSuccess = () => { closeForm(); load(); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">+ Nouvel article</button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ArticleForm initial={editing || {}} onSuccess={onSuccess} />
          <button onClick={closeForm} className="mt-2 text-gray-600 hover:underline">Annuler</button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Catégorie</th>
              <th className="p-3 text-left">Auteur</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3">{a.category?.name}</td>
                <td className="p-3">{a.author?.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    a.status === 'published' ? 'bg-green-100 text-green-700' :
                    a.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200'
                  }`}>{a.status}</span>
                </td>
                <td className="p-3">{formatDate(a.publishedAt || a.createdAt)}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => handleEdit(a)} className="text-primary hover:underline">Modifier</button>
                  <button onClick={() => handleDelete(a)} className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}