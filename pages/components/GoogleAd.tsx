import { useEffect } from "react";

export default function GoogleAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div
      className="max-w-[728px] max-h-[90px]"
      aria-hidden={true}
      style={{ overflow: "hidden", minWidth: "300px", minHeight: "250px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
      />
    </div>
  );
}
