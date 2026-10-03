import { useEffect, useState } from 'react';
import UserForm from '../../components/users/UserForm';
import UserList from '../../components/users/UserList';
import userService from '../../services/userService';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => userService.getAll().then((r) => setUsers(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (u) => {
    if (!confirm(`Supprimer "${u.name}" ?`)) return;
    await userService.remove(u.id);
    load();
  };

  const close = () => { setEditing(null); setShowForm(false); };
  const success = () => { close(); load(); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">+ Nouvel utilisateur</button>
      </div>

      {showForm && (
        <div className="mb-8">
          <UserForm initial={editing || {}} onSuccess={success} />
          <button onClick={close} className="mt-2 text-gray-600 hover:underline">Annuler</button>
        </div>
      )}

      <UserList users={users} onEdit={(u) => { setEditing(u); setShowForm(true); }} onDelete={handleDelete} />
    </div>
  );
}