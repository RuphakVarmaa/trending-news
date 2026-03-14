import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchNews } from "../api/news";
import { StandardCard, SkeletonCard } from "../components/ArticleCard";
import { SidebarAd } from "../components/AdUnit";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    Promise.all([fetchNews("auto", query), fetchNews("tech", query)]).then(([auto, tech]) => {
      const combined = [...auto, ...tech].sort(() => Math.random() - 0.5);
      setArticles(combined);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-2">Search Results</h1>
      <p className="text-gray-400 mb-8">Showing results for "<span className="text-primary font-medium">{query}</span>"</p>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-6">{[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.map((a, i) => <StandardCard key={i} article={a} />)}
            </div>
          )}
          {!loading && articles.length === 0 && (
            <div className="text-center py-20 text-gray-400"><p className="text-lg">No results found for "{query}"</p></div>
          )}
        </div>
        <div className="md:col-span-4"><SidebarAd /></div>
      </div>
    </div>
  );
}
