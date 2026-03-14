import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { name: "Home", path: "/" },
  { name: "Auto", path: "/category/auto" },
  { name: "Tech", path: "/category/tech" },
  { name: "EVs", path: "/category/auto?q=electric+vehicles" },
  { name: "Gadgets", path: "/category/tech?q=gadgets+smartphones" },
  { name: "AI", path: "/category/tech?q=artificial+intelligence" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="hidden sm:block">India's #1 Auto & Tech News Platform</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary leading-tight">Trending News</h1>
                <p className="text-[10px] text-gray-400 leading-tight -mt-0.5">AUTO & TECH</p>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-80 border border-gray-200 focus-within:border-accent transition-colors">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 text-gray-700"
              />
            </form>

            {/* Hamburger */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="border-t border-gray-100 bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-accent hover:bg-red-50 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-accent"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-full px-4 py-2 mb-4 border border-gray-200">
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-sm flex-1" />
            </form>
            {categories.map((cat) => (
              <Link key={cat.name} to={cat.path} className="block py-2 text-gray-600 hover:text-accent" onClick={() => setMobileOpen(false)}>{cat.name}</Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
