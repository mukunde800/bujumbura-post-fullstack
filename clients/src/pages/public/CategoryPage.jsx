import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ArticleList from '../../components/articles/ArticleList';
import Loader from '../../components/common/Loader';
import articleService from '../../services/articleService';

export default function CategoryPage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    articleService.getAll({ category: slug, limit: 12 })
      .then((res) => setArticles(res.data.data))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 capitalize">Catégorie : {slug}</h1>
        {loading ? <Loader /> : <ArticleList articles={articles} />}
      </main>
      <Footer />
    </>
  );
}