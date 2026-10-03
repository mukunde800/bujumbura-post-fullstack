import { useState } from 'react';
import authorService from '../../services/authorService';

export default function AuthorForm({ initial = {}, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', bio: '', avatar: '', ...initial });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (form.id) await authorService.update(form.id, form);
      else await authorService.create(form);
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
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} className="input" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Avatar (URL)</label>
        <input name="avatar" value={form.avatar} onChange={handleChange} className="input" />
      </div>
      <button disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}