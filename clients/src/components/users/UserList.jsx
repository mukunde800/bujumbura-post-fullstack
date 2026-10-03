import { formatDate } from '../../utils/formatDate';

export default function UserList({ users = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rôle</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Inscrit le</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {u.isActive ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="p-3">{formatDate(u.createdAt)}</td>
              <td className="p-3 text-right space-x-2">
                <button onClick={() => onEdit?.(u)} className="text-primary hover:underline">Modifier</button>
                <button onClick={() => onDelete?.(u)} className="text-red-600 hover:underline">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}