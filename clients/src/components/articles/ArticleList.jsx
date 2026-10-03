import ArticleCard from './ArticleCard';

export default function ArticleList({ articles = [] }) {
  if (!articles.length) {
    return <p className="text-center text-gray-500 py-12">Aucun article trouvé.</p>;
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
    </div>
  );
}