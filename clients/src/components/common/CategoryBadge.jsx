import { Link } from 'react-router-dom';

export default function CategoryBadge({ category }) {
  if (!category) return null;
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="inline-block text-xs uppercase font-semibold px-2 py-1 rounded"
      style={{ backgroundColor: `${category.color}20`, color: category.color }}
    >
      {category.name}
    </Link>
  );
}