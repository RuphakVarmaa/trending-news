import { useEffect, useRef } from "react";

// Google AdSense component — replace data-ad-client and data-ad-slot with your real values
export default function AdUnit({ slot = "1234567890", format = "auto", layout = "", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {}
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <div className="text-center text-xs text-gray-400 mb-1">Advertisement</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4057351734298519"
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
      {/* Placeholder shown during development */}
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400 text-sm">
        <p className="font-semibold">Google AdSense Ad Unit</p>
        <p>Slot: {slot} | Format: {format}</p>
        <p className="text-xs mt-1">Replace ca-pub-XXXX in index.html with your publisher ID</p>
      </div>
    </div>
  );
}

// In-article ad
export function InArticleAd() {
  return <AdUnit slot="2345678901" format="fluid" layout="in-article" className="my-8" />;
}

// Sidebar ad
export function SidebarAd() {
  return <AdUnit slot="3456789012" format="rectangle" className="sticky top-24" />;
}
