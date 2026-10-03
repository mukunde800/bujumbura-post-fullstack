import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">Inscription</h2>
          {error && <p className="text-red-600 bg-red-50 p-3 rounded">{error}</p>}
          <input placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" required />
          <input type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" required minLength={6} />
          <button disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Création...' : "S'inscrire"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Déjà un compte ? <Link to="/login" className="text-primary hover:underline">Connectez-vous</Link>
          </p>
        </form>
      </main>
    </>
  );
}