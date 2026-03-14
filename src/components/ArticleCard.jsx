import { Link } from "react-router-dom";
import { generateSlug } from "../api/news";
import { formatDistanceToNow } from "date-fns";

export function HeroCard({ article }) {
  const slug = generateSlug(article.title);
  return (
    <Link to={`/article/${slug}`} state={{ article }} className="group block relative rounded-xl overflow-hidden h-[400px] md:h-[500px]">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <span className="inline-block bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded mb-3">Featured</span>
        <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3 group-hover:text-red-300 transition-colors">{article.title}</h2>
        <p className="text-white/70 text-sm md:text-base line-clamp-2 max-w-2xl">{article.description}</p>
        <div className="flex items-center gap-3 mt-4 text-white/50 text-xs">
          <span className="font-medium">{article.source?.name}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}

export function StandardCard({ article, size = "medium" }) {
  const slug = generateSlug(article.title);
  const isSmall = size === "small";

  return (
    <Link to={`/article/${slug}`} state={{ article }} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className={`overflow-hidden ${isSmall ? "h-36" : "h-48"}`}>
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className={`font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-2 ${isSmall ? "text-sm" : "text-base"} line-clamp-2`}>{article.title}</h3>
        {!isSmall && <p className="text-gray-500 text-sm line-clamp-2 mb-3">{article.description}</p>}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-500">{article.source?.name}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}

export function HorizontalCard({ article }) {
  const slug = generateSlug(article.title);
  return (
    <Link to={`/article/${slug}`} state={{ article }} className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-3">
      <div className="w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2 mb-1">{article.title}</h3>
        <p className="text-gray-400 text-xs line-clamp-1">{article.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
          <span>{article.source?.name}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="skeleton h-48 w-full" />
      <div className="p-4">
        <div className="skeleton h-5 w-3/4 mb-2" />
        <div className="skeleton h-4 w-full mb-1" />
        <div className="skeleton h-4 w-2/3 mb-3" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}
