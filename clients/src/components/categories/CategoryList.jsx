import { Link } from 'react-router-dom';

export default function CategoryList({ categories = [] }) {
  if (!categories.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          to={`/categories/${c.slug}`}
          className="px-3 py-1 rounded-full text-sm font-medium transition hover:opacity-80"
          style={{ backgroundColor: `${c.color}20`, color: c.color }}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}