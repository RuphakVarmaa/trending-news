import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h3 className="text-xl font-bold">Trending News</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">India's fastest growing auto and technology news platform. Real-time updates, expert analysis, and comprehensive reviews.</p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-accent">Categories</h4>
          {["Auto News", "Tech Updates", "Electric Vehicles", "Gadgets & Smartphones", "AI & Machine Learning"].map((l) => (
            <Link key={l} to="/category/auto" className="block text-gray-400 text-sm mb-2 hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-accent">Company</h4>
          {["About Us", "Contact", "Advertise", "Careers", "Privacy Policy", "Terms of Service"].map((l) => (
            <a key={l} href="#" className="block text-gray-400 text-sm mb-2 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-accent">Follow Us</h4>
          <div className="flex gap-3 mb-6">
            {["Twitter", "Facebook", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-accent transition-colors">{s[0]}</a>
            ))}
          </div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-accent">Newsletter</h4>
          <form className="flex">
            <input type="email" placeholder="Your email" className="bg-white/10 rounded-l-lg px-3 py-2 text-sm outline-none flex-1 text-white placeholder-gray-500 border border-white/10" />
            <button className="bg-accent px-4 py-2 rounded-r-lg text-sm font-semibold hover:bg-red-600 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; 2026 Trending News. All rights reserved. Built by Ruphak Varmaa.</p>
          <p>Powered by GNews API | Ads by Google AdSense</p>
        </div>
      </div>
    </footer>
  );
}
