export default function AuthorCard({ author }) {
  if (!author) return null;
  return (
    <div className="flex items-center gap-3">
      <img
        src={author.avatar || 'https://via.placeholder.com/48'}
        alt={author.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{author.name}</p>
        {author.bio && <p className="text-sm text-gray-500 line-clamp-2">{author.bio}</p>}
      </div>
    </div>
  );
}