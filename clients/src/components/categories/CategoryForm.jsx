import { useState } from 'react';
import categoryService from '../../services/categoryService';
import { slugify } from '../../utils/slugify';

export default function CategoryForm({ initial = {}, onSuccess }) {
  const [form, setForm] = useState({ name: '', slug: '', description: '', color: '#1e40af', ...initial });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value, ...(name === 'name' && !initial.id ? { slug: slugify(value) } : {}) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (form.id) await categoryService.update(form.id, form);
      else await categoryService.create(form);
      onSuccess?.();
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input name="name" value={form.name} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Couleur</label>
        <input type="color" name="color" value={form.color} onChange={handleChange} className="w-16 h-10 rounded border" />
      </div>
      <button disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}