import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { InArticleAd, SidebarAd } from "../components/AdUnit";
import AdUnit from "../components/AdUnit";

export default function Article() {
  const { state } = useLocation();
  const article = state?.article;

  // Dynamic SEO
  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} - Trending News`;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(name.startsWith("og:") || name.startsWith("twitter:") ? "property" : "name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", article.description);
    setMeta("og:title", article.title);
    setMeta("og:description", article.description);
    setMeta("og:image", article.image);
    setMeta("twitter:title", article.title);
    setMeta("twitter:description", article.description);
    setMeta("twitter:image", article.image);
    return () => { document.title = "Trending News - Latest Car Prices, Tech Reviews & Auto News India 2026"; };
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-400 mb-4">Article not found</h1>
        <Link to="/" className="text-accent hover:underline">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <span className="text-gray-600">{article.source?.name}</span>
      </nav>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Main article */}
        <article className="md:col-span-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">{article.title}</h1>
            <p className="text-lg text-gray-500 mb-4">{article.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-sm">{article.source?.name?.[0]}</div>
                <span className="font-medium text-gray-600">{article.source?.name}</span>
              </div>
              <span>·</span>
              <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </header>

          {/* Featured image */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
          </div>

          {/* Ad before content */}
          <AdUnit slot="article-top" format="auto" />

          {/* Article content */}
          <div className="article-content prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.description}</p>` }} />

          {/* In-article ad */}
          <InArticleAd />

          {/* Share buttons */}
          <div className="border-t border-gray-100 pt-6 mt-8">
            <h3 className="font-bold text-sm text-gray-600 mb-3">Share this article</h3>
            <div className="flex gap-3">
              {[
                { name: "Twitter", color: "bg-blue-400" },
                { name: "Facebook", color: "bg-blue-600" },
                { name: "WhatsApp", color: "bg-green-500" },
                { name: "LinkedIn", color: "bg-blue-700" },
              ].map((s) => (
                <button key={s.name} className={`${s.color} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom ad */}
          <AdUnit slot="article-bottom" format="auto" />
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          <SidebarAd />

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mt-6">
            <h3 className="font-bold text-primary mb-4">More from {article.source?.name}</h3>
            <p className="text-gray-400 text-sm">Stay tuned for more articles from this source.</p>
          </div>

          <div className="mt-6">
            <SidebarAd />
          </div>
        </aside>
      </div>
    </div>
  );
}
