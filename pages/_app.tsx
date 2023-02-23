import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FlashQ - The fastest way to study.</title>
        <meta
          name="description"
          content="FlashQ is the fastest way to study and prepare yourself for exams. It uses AI to generate flashcards or quizzes from your notes. FlashQ saves you from the hassle of retyping your notes into studyable questions. "
        />
        <link rel="icon" href="/FlashQ.ico" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
