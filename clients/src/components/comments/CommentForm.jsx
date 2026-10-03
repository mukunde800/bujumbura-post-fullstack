import { useState } from 'react';
import commentService from '../../services/commentService';
import { useAuth } from '../../hooks/useAuth';

export default function CommentForm({ articleId, onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ content: '', guestName: '', guestEmail: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await commentService.create(articleId, form);
      onSuccess?.(data);
      setForm({ content: '', guestName: '', guestEmail: '' });
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow space-y-3">
      {!user && (
        <div className="grid md:grid-cols-2 gap-3">
          <input placeholder="Votre nom" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} className="input" required />
          <input type="email" placeholder="Votre email" value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} className="input" required />
        </div>
      )}
      <textarea
        placeholder="Votre commentaire..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        rows={4}
        className="input"
        required
      />
      <button disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? 'Envoi...' : 'Publier'}
      </button>
    </form>
  );
}