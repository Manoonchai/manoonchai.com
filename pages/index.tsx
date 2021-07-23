import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import Nav from '../components/nav';
import Hero from '../components/hero';
import Features from '../components/features';
import Articles from '../components/articles';
import Download from '../components/download';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>แป้นพิมพ์มนูญชัย</title>
        <meta
          name="description"
          content="แป้นพิมพ์ภาษาไทยยุคใหม่ พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Hero />

      <span className="flex justify-center">
        <Image
          src="/manoonchai-layout.png"
          alt="แป้นพิมพ์มนูญชัย"
          width={850}
          height={320}
        />
      </span>

      <Features />

      <Articles />

      <Download />

      <Footer />

      {/*
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>
              Find in-depth information about Next.js features and
              API.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>
              Learn about Next.js in an interactive course with
              quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>
              Discover and deploy boilerplate example Next.js
              projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL
              with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
