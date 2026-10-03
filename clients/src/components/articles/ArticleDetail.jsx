import { formatDate } from '../../utils/formatDate';
import CategoryBadge from '../common/CategoryBadge';
import CommentList from '../comments/CommentList';

export default function ArticleDetail({ article }) {
  if (!article) return null;
  return (
    <article className="max-w-3xl mx-auto">
      <CategoryBadge category={article.category} />
      <h1 className="text-4xl font-bold mt-3 mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>Par {article.author?.name}</span>
        <span>{formatDate(article.publishedAt || article.createdAt)}</span>
        <span>👁 {article.views} vues</span>
      </div>

      {article.image && (
        <img src={article.image} alt={article.title} className="w-full rounded-xl mb-6" />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <hr className="my-10" />
      <CommentList articleId={article.id} comments={article.comments || []} />
    </article>
  );
}