import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ArticleDetail from '../../components/articles/ArticleDetail';
import RelatedArticles from '../../components/articles/RelatedArticles';
import Loader from '../../components/common/Loader';
import articleService from '../../services/articleService';

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    articleService.getBySlug(slug)
      .then((res) => {
        setArticle(res.data);
        return articleService.getAll({ category: res.data.category?.slug, limit: 3 });
      })
      .then((res) => setRelated(res.data.data.filter((a) => a.slug !== slug)))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        {loading ? <Loader /> : (
          <>
            <ArticleDetail article={article} />
            <RelatedArticles articles={related} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}