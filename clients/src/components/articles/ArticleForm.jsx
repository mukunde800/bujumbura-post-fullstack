import { useEffect, useState } from 'react';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';
import authorService from '../../services/authorService';

export default function ArticleForm({ initial = {}, onSuccess }) {
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', status: 'draft',
    categoryId: '', authorId: '', image: null, ...initial,
  });
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryService.getAll().then((res) => setCategories(res.data));
    authorService.getAll().then((res) => setAuthors(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) fd.append(k, v);
      });
      if (form.id) await articleService.update(form.id, fd);
      else await articleService.create(fd);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      {error && <p className="text-red-600 bg-red-50 p-3 rounded">{error}</p>}

      <div>
        <label className="block mb-1 font-medium">Titre</label>
        <input name="title" value={form.title} onChange={handleChange} className="input" required />
      </div>

      <div>
        <label className="block mb-1 font-medium">Extrait</label>
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Contenu (HTML)</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={12} className="input font-mono text-sm" required />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Catégorie</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange} className="input" required>
            <option value="">— Choisir —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Auteur</label>
          <select name="authorId" value={form.authorId} onChange={handleChange} className="input" required>
            <option value="">— Choisir —</option>
            {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Statut</label>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="input" />
      </div>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}