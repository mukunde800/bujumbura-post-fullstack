import ArticleCard from './ArticleCard';

export default function RelatedArticles({ articles = [] }) {
  if (!articles.length) return null;
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
    </section>
  );
}