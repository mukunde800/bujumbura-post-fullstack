import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ArticleList from '../../components/articles/ArticleList';
import Pagination from '../../components/common/Pagination';
import CategoryFilter from '../../components/categories/CategoryFilter';
import Loader from '../../components/common/Loader';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';

export default function ArticlesPage() {
  const [params, setParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(+params.get('page') || 1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState(params.get('category') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAll().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    articleService.getAll({ page, limit: 9, category })
      .then((res) => {
        setArticles(res.data.data);
        setPages(res.data.pages);
      })
      .finally(() => setLoading(false));
  }, [page, category]);

  useEffect(() => {
    const p = {};
    if (page > 1) p.page = page;
    if (category) p.category = category;
    setParams(p);
  }, [page, category, setParams]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-3xl font-bold">Tous les articles</h1>
          <CategoryFilter categories={categories} value={category} onChange={(v) => { setCategory(v); setPage(1); }} />
        </div>

        {loading ? <Loader /> : (
          <>
            <ArticleList articles={articles} />
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}