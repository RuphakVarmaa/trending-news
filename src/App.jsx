import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BreakingTicker from "./components/BreakingTicker";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BreakingTicker />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
