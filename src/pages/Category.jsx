import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchNews } from "../api/news";
import { StandardCard, SkeletonCard } from "../components/ArticleCard";
import AdUnit, { SidebarAd } from "../components/AdUnit";

export default function Category() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchNews(category, query).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [category, query]);

  const title = category === "auto" ? "Auto & Cars" : "Tech & Gadgets";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-1 h-8 rounded-full ${category === "auto" ? "bg-accent" : "bg-blue-500"}`} />
        <h1 className="text-3xl font-bold text-primary">{query ? `Search: "${query}"` : title}</h1>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">{articles.length} articles</span>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                {articles.map((a, i) => (
                  <div key={i}>
                    <StandardCard article={a} />
                    {i === 1 && <AdUnit slot="in-feed-ad" format="auto" className="mt-6" />}
                  </div>
                ))}
              </div>
              {articles.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-lg">No articles found.</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="md:col-span-4">
          <SidebarAd />
        </div>
      </div>
    </div>
  );
}
