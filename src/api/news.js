// News API service using GNews (free, no CORS issues, 100 req/day)
// Sign up at https://gnews.io to get your API key
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || "demo";
const BASE_URL = "https://gnews.io/api/v4";

// Fallback data when API is unavailable
const FALLBACK_ARTICLES = {
  auto: [
    {
      title: "BMW M5 2026: Price Drop Expected After India-EU FTA Agreement",
      description: "The India-EU Free Trade Agreement signed in January 2026 could bring significant price reductions for BMW's M-series lineup. The M5, currently priced at ₹2.01 crore, may see prices drop to ₹1.34 crore with the phased tariff reductions.",
      content: `<h2>BMW M5 Price Impact After FTA</h2><p>The India-EU Free Trade Agreement is set to reshape luxury car pricing in India. BMW's flagship M5, powered by a twin-turbo V8 hybrid producing 727 HP, currently carries an ex-showroom price of ₹2.01 crore.</p><h3>Expected Price Reductions</h3><table><tr><th>Model</th><th>Current Price</th><th>Post-FTA Estimate</th></tr><tr><td>BMW M2</td><td>₹1.00 Cr</td><td>₹66.66 L</td></tr><tr><td>BMW M3</td><td>₹1.47 Cr</td><td>₹1.00 Cr</td></tr><tr><td>BMW M4</td><td>₹1.52 Cr</td><td>₹1.01 Cr</td></tr><tr><td>BMW M5</td><td>₹2.01 Cr</td><td>₹1.34 Cr</td></tr></table><p>However, these reductions will be phased over 5+ years with annual import quotas of 2.5 lakh vehicles.</p>`,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      publishedAt: new Date().toISOString(),
      source: { name: "Auto Insider", url: "#" },
      url: "#",
    },
    {
      title: "Tesla Model 3 Highland Refresh Hits Indian Roads — Full Review",
      description: "Tesla's refreshed Model 3 has finally arrived in India with competitive pricing starting at ₹34.99 lakh. We take it for a spin across Mumbai's streets to test range, performance, and value.",
      content: `<h2>Tesla Model 3 Highland — First Drive India</h2><p>The wait is over. Tesla's most affordable sedan has landed in India, and it's making waves with an aggressive price point of ₹34.99 lakh (ex-showroom). The Highland refresh brings a completely redesigned interior, improved range of 513 km, and a refined driving experience.</p><h3>Key Specifications</h3><table><tr><th>Spec</th><th>Value</th></tr><tr><td>Range</td><td>513 km (WLTP)</td></tr><tr><td>0-100 km/h</td><td>6.1 seconds</td></tr><tr><td>Top Speed</td><td>201 km/h</td></tr><tr><td>Price</td><td>₹34.99 L onwards</td></tr></table>`,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: "EV World", url: "#" },
      url: "#",
    },
    {
      title: "Mahindra XUV.e9 Electric SUV Unveiled — 500km Range, Stunning Design",
      description: "Mahindra pulls the covers off the production-ready XUV.e9 electric SUV-coupe with a 500km range, dual motors, and a starting price under ₹30 lakh.",
      content: `<h2>Mahindra XUV.e9: India's Answer to Tesla Model Y</h2><p>Mahindra has unveiled the production-ready XUV.e9, an electric SUV-coupe that promises to disrupt the Indian EV market. Built on the INGLO platform, it features a 79 kWh battery, dual motors producing 340 HP, and a claimed range of 500 km.</p><p>The design is striking — a coupe-like roofline, flush door handles, and a massive 16-inch central screen dominate the cabin. Pricing starts at an aggressive ₹29.99 lakh.</p>`,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: "Auto Today", url: "#" },
      url: "#",
    },
    {
      title: "Hyundai Creta EV vs Tata Curvv EV: The Ultimate Comparison 2026",
      description: "Two of India's most anticipated electric SUVs go head to head. We compare range, features, pricing, and value for money.",
      content: `<h2>Battle of the Electric SUVs</h2><p>The Indian compact electric SUV segment is heating up with the launch of Hyundai Creta EV alongside the Tata Curvv EV. Both target the ₹18-25 lakh bracket and promise over 400 km range.</p>`,
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: "Car Dekho", url: "#" },
      url: "#",
    },
    {
      title: "Royal Enfield Guerrilla 450 Review: The Fun Roadster",
      description: "Royal Enfield's Guerrilla 450 brings modern performance to the classic brand. 40 HP, USD forks, and that unmistakable thump — all for ₹2.39 lakh.",
      content: `<h2>Royal Enfield Goes Modern</h2><p>The Guerrilla 450 is Royal Enfield's most modern motorcycle yet. Powered by a 452cc single producing 40.02 HP and 36.5 Nm, it rides on USD forks and a monoshock rear — a massive upgrade from the classic twins.</p>`,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: "Bike Wale", url: "#" },
      url: "#",
    },
  ],
  tech: [
    {
      title: "Apple iPhone 17 Air: The Thinnest iPhone Ever — Full Specs Leaked",
      description: "Apple's upcoming iPhone 17 Air will be just 5.5mm thin, featuring an A19 chip, 48MP camera with periscope zoom, and a new titanium-aluminum alloy frame.",
      content: `<h2>iPhone 17 Air — Everything We Know</h2><p>Apple is set to redefine smartphone design with the iPhone 17 Air. At just 5.5mm thick, it will be the thinnest iPhone ever made. Despite the slim profile, Apple has packed in the A19 chip, 8GB RAM, and a 48MP main camera with 5x periscope zoom.</p><h3>Expected Specifications</h3><table><tr><th>Feature</th><th>Spec</th></tr><tr><td>Thickness</td><td>5.5mm</td></tr><tr><td>Chip</td><td>A19 (3nm)</td></tr><tr><td>Display</td><td>6.6" OLED, 120Hz</td></tr><tr><td>Camera</td><td>48MP + 5x Periscope</td></tr><tr><td>Battery</td><td>3,500 mAh</td></tr><tr><td>Price (Expected)</td><td>$1,099 / ₹94,999</td></tr></table>`,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      publishedAt: new Date().toISOString(),
      source: { name: "Tech Radar", url: "#" },
      url: "#",
    },
    {
      title: "NVIDIA RTX 5090 Review: The AI-Powered Graphics Beast",
      description: "NVIDIA's RTX 5090 brings 32GB GDDR7, Blackwell architecture, and real-time AI rendering. We benchmark it across 50 games and creative workloads.",
      content: `<h2>RTX 5090: A New Era of Graphics</h2><p>The RTX 5090 isn't just a GPU — it's an AI rendering engine. With 21,760 CUDA cores, 32GB of GDDR7 memory, and NVIDIA's new Blackwell architecture, it delivers up to 2x the performance of the RTX 4090 in ray-traced workloads.</p>`,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: "Tom's Hardware", url: "#" },
      url: "#",
    },
    {
      title: "Google Gemini 2.5 Pro: The Most Capable AI Model Yet",
      description: "Google releases Gemini 2.5 Pro with a 1M token context window, native code execution, and multimodal reasoning that rivals human experts.",
      content: `<h2>Gemini 2.5 Pro Changes the AI Game</h2><p>Google's latest AI model, Gemini 2.5 Pro, sets new benchmarks across coding, math, and reasoning. With a 1 million token context window and native code execution, it can analyze entire codebases and generate production-ready applications.</p>`,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: "The Verge", url: "#" },
      url: "#",
    },
    {
      title: "Samsung Galaxy S26 Ultra: First Look at the 200MP Beast",
      description: "Samsung's next flagship leaks reveal a 200MP camera, Snapdragon 8 Elite Gen 2, titanium frame, and a stunning under-display selfie camera.",
      content: `<h2>Galaxy S26 Ultra: Samsung's Most Ambitious Phone</h2><p>Leaked renders and specs point to an ambitious Galaxy S26 Ultra with an under-display front camera, 200MP main shooter with variable aperture, and a new Snapdragon 8 Elite Gen 2 chip promising 40% better AI performance.</p>`,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: "GSM Arena", url: "#" },
      url: "#",
    },
    {
      title: "MacBook Pro M5 Max: Apple Silicon Reaches New Heights",
      description: "Apple's M5 Max chip brings 16 performance cores, 40 GPU cores, and 128GB unified memory. The new MacBook Pro is a desktop replacement that fits in your bag.",
      content: `<h2>M5 Max: Power Without Compromise</h2><p>The M5 Max is Apple's most powerful laptop chip ever. With 16 performance cores, 4 efficiency cores, 40 GPU cores, and support for 128GB unified memory, it outperforms many desktop workstations in multi-threaded workloads.</p>`,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: "Apple Insider", url: "#" },
      url: "#",
    },
  ],
};

export async function fetchNews(category = "auto", query = "") {
  const searchQuery = query || (category === "auto" ? "cars automobiles India" : "technology gadgets India");

  try {
    if (API_KEY === "demo") throw new Error("Using fallback");

    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}&lang=en&country=in&max=10&apikey=${API_KEY}`
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.articles || [];
  } catch {
    // Return rich fallback articles
    return FALLBACK_ARTICLES[category] || FALLBACK_ARTICLES.auto;
  }
}

export async function fetchTopHeadlines(category = "general") {
  try {
    if (API_KEY === "demo") throw new Error("Using fallback");

    const res = await fetch(
      `${BASE_URL}/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${API_KEY}`
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.articles || [];
  } catch {
    return [...FALLBACK_ARTICLES.auto.slice(0, 2), ...FALLBACK_ARTICLES.tech.slice(0, 2)];
  }
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export { FALLBACK_ARTICLES };
