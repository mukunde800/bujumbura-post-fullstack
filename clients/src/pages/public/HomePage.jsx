import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ArticleList from '../../components/articles/ArticleList';
import Loader from '../../components/common/Loader';
import articleService from '../../services/articleService';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleService.getAll({ limit: 6 })
      .then((res) => setArticles(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bujumbura Post</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Toute l'actualité du Burundi et de la région des Grands Lacs.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Derniers articles</h2>
        {loading ? <Loader /> : <ArticleList articles={articles} />}
      </main>

      <Footer />
    </>
  );
}