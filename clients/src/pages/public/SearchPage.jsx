import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ArticleList from '../../components/articles/ArticleList';
import Loader from '../../components/common/Loader';
import articleService from '../../services/articleService';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return setLoading(false);
    setLoading(true);
    articleService.getAll({ search: q, limit: 20 })
      .then((res) => setArticles(res.data.data))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Résultats pour « {q} »</h1>
        {loading ? <Loader /> : <ArticleList articles={articles} />}
      </main>
      <Footer />
    </>
  );
}