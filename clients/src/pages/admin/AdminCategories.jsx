import { useEffect, useState } from 'react';
import CategoryForm from '../../components/categories/CategoryForm';
import categoryService from '../../services/categoryService';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => categoryService.getAll().then((r) => setCategories(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (c) => {
    if (!confirm(`Supprimer "${c.name}" ?`)) return;
    await categoryService.remove(c.id);
    load();
  };

  const close = () => { setEditing(null); setShowForm(false); };
  const success = () => { close(); load(); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Catégories</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">+ Nouvelle catégorie</button>
      </div>

      {showForm && (
        <div className="mb-8">
          <CategoryForm initial={editing || {}} onSuccess={success} />
          <button onClick={close} className="mt-2 text-gray-600 hover:underline">Annuler</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded text-sm font-medium" style={{ backgroundColor: `${c.color}20`, color: c.color }}>
                {c.name}
              </span>
              <div className="space-x-2 text-sm">
                <button onClick={() => { setEditing(c); setShowForm(true); }} className="text-primary hover:underline">Modifier</button>
                <button onClick={() => handleDelete(c)} className="text-red-600 hover:underline">Suppr.</button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}