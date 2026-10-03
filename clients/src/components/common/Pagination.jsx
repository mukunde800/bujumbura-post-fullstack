export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  const nums = [];
  for (let i = 1; i <= pages; i++) nums.push(i);

  return (
    <nav className="flex justify-center gap-2 mt-8">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded-lg disabled:opacity-50"
      >
        Précédent
      </button>
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`px-3 py-2 border rounded-lg ${n === page ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}
        >
          {n}
        </button>
      ))}
      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded-lg disabled:opacity-50"
      >
        Suivant
      </button>
    </nav>
  );
}