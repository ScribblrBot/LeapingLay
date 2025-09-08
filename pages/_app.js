// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/5c753379-3cb1-4c2a-bf4b-2310f8c89d6e.png" />
        <title>LeapingLay - Profile</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
