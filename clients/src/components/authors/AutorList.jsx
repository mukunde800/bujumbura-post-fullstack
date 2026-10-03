import AuthorCard from '../common/AuthorCard';

export default function AuthorList({ authors = [] }) {
  if (!authors.length) return <p className="text-gray-500">Aucun auteur.</p>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {authors.map((a) => (
        <div key={a.id} className="bg-white p-4 rounded-xl shadow">
          <AuthorCard author={a} />
        </div>
      ))}
    </div>
  );
}