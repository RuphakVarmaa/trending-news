import { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../api/news";

export default function BreakingTicker() {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetchTopHeadlines().then((articles) => {
      setHeadlines(articles.map((a) => a.title));
    });
  }, []);

  if (!headlines.length) return null;

  const doubled = [...headlines, ...headlines];

  return (
    <div className="bg-accent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-red-800 px-4 py-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap flex-shrink-0 flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Breaking
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-scroll flex whitespace-nowrap py-2">
            {doubled.map((h, i) => (
              <span key={i} className="text-sm px-6 inline-block">
                {h} <span className="mx-4 opacity-40">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
