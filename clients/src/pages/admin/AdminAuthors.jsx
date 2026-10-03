import { useEffect, useState } from 'react';
import AuthorForm from '../../components/authors/AuthorForm';
import authorService from '../../services/authorService';

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => authorService.getAll().then((r) => setAuthors(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (a) => {
    if (!confirm(`Supprimer "${a.name}" ?`)) return;
    await authorService.remove(a.id);
    load();
  };

  const close = () => { setEditing(null); setShowForm(false); };
  const success = () => { close(); load(); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Auteurs</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">+ Nouvel auteur</button>
      </div>

      {showForm && (
        <div className="mb-8">
          <AuthorForm initial={editing || {}} onSuccess={success} />
          <button onClick={close} className="mt-2 text-gray-600 hover:underline">Annuler</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <img
              src={a.avatar || 'https://via.placeholder.com/48'}
              alt={a.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-500">{a.email}</p>
            </div>
            <div className="space-x-2 text-sm">
              <button onClick={() => { setEditing(a); setShowForm(true); }} className="text-primary hover:underline">Modif.</button>
              <button onClick={() => handleDelete(a)} className="text-red-600 hover:underline">Suppr.</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}