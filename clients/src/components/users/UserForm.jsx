import { useState } from 'react';
import userService from '../../services/userService';

export default function UserForm({ initial = {}, onSuccess }) {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'reader', isActive: true, ...initial,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (form.id && !payload.password) delete payload.password;
      if (form.id) await userService.update(form.id, payload);
      else await userService.create(payload);
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
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Mot de passe {form.id && '(laisser vide pour ne pas changer)'}</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className="input" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Rôle</label>
          <select name="role" value={form.role} onChange={handleChange} className="input">
            <option value="reader">Lecteur</option>
            <option value="author">Auteur</option>
            <option value="editor">Éditeur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <label className="flex items-center gap-2 mt-6">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
          Actif
        </label>
      </div>
      <button disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}