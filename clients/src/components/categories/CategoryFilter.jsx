export default function CategoryFilter({ categories = [], value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input max-w-xs">
      <option value="">Toutes les catégories</option>
      {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
    </select>
  );
}