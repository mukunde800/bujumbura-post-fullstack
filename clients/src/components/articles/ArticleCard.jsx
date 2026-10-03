import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import CategoryBadge from '../common/CategoryBadge';

export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <img
        src={article.image || 'https://via.placeholder.com/600x300?text=Bujumbura+Post'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <CategoryBadge category={article.category} />
        <h3 className="mt-2 text-xl font-bold line-clamp-2">
          <Link to={`/articles/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{article.excerpt}</p>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>{article.author?.name}</span>
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}