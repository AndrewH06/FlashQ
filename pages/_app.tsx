import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>FlashQ - The fastest way to study.</title>
        <meta
          name="description"
          content="FlashQ is the fastest way to study and prepare yourself for exams. It uses AI to generate flashcards or quizzes from your notes. FlashQ saves you from the hassle of retyping your notes into studyable questions. "
        />
        <meta property="og:image" content="https://media.licdn.com/dms/image/D562DAQHAatPMs69oGw/profile-treasury-image-shrink_800_800/0/1694417511732?e=1715212800&v=beta&t=5qlhZrgrRSgCkuzwmVG_rNaHdBCFo_8sX4Z3SQ6SlJs" />
        <link rel="icon" href="/FlashQ.ico" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3631154381338622"
          crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Component {...pageProps} />
    </>
  );
}
