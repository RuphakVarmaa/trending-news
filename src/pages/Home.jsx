import { useState, useEffect } from "react";
import { fetchNews } from "../api/news";
import { HeroCard, StandardCard, HorizontalCard, SkeletonCard } from "../components/ArticleCard";
import AdUnit, { SidebarAd } from "../components/AdUnit";

export default function Home() {
  const [autoNews, setAutoNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchNews("auto"), fetchNews("tech")]).then(([auto, tech]) => {
      setAutoNews(auto);
      setTechNews(tech);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-[400px] rounded-xl mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const heroArticle = autoNews[0];
  const sideHero = [autoNews[1], techNews[0]].filter(Boolean);
  const restAuto = autoNews.slice(2);
  const restTech = techNews.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero section — TOI style */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          {heroArticle && <HeroCard article={heroArticle} />}
        </div>
        <div className="flex flex-col gap-4">
          {sideHero.map((a, i) => a && <StandardCard key={i} article={a} size="small" />)}
        </div>
      </div>

      {/* Ad after hero */}
      <AdUnit slot="hero-bottom-ad" format="horizontal" />

      {/* Auto News Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-accent rounded-full" />
          <h2 className="text-2xl font-bold text-primary">Auto & Cars</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
            {restAuto.map((a, i) => <StandardCard key={i} article={a} />)}
          </div>
          <div className="md:col-span-4">
            <SidebarAd />
          </div>
        </div>
      </section>

      {/* Ad between sections */}
      <AdUnit slot="mid-page-ad" format="auto" />

      {/* Tech News Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-500 rounded-full" />
          <h2 className="text-2xl font-bold text-primary">Tech & Gadgets</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {restTech.slice(0, 2).map((a, i) => <StandardCard key={i} article={a} />)}
            </div>
            <div className="flex flex-col gap-3">
              {restTech.slice(2).map((a, i) => <HorizontalCard key={i} article={a} />)}
            </div>
          </div>
          <div className="md:col-span-4">
            {/* Trending sidebar */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" /></svg>
                Trending Now
              </h3>
              {[...autoNews.slice(0, 2), ...techNews.slice(0, 2)].map((a, i) => (
                <div key={i} className="flex gap-3 mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                  <span className="text-2xl font-bold text-gray-200">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary leading-tight line-clamp-2">{a.title}</h4>
                    <span className="text-xs text-gray-400">{a.source?.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <SidebarAd />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
