import { useEffect } from 'react';
import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import AppTemplate from 'components/templates/AppTemplate';

import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const isNotProd = process.env.NODE_ENV !== `production`;

    // เพื่มคลาส 'debug-screens' ใน body เมื่ออยู่ใน env ที่ไม่ใช่ production
    document.body.classList.toggle(`debug-screens`, isNotProd);
  }, []);
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <DefaultSeo
        defaultTitle="แป้นพิมพ์มนูญชัย"
        titleTemplate="%s | แป้นพิมพ์มนูญชัย"
        description="แป้นพิมพ์ภาษาไทยทางเลือกใหม่ พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%"
      />

      <AppTemplate>
        <Component {...pageProps} />
      </AppTemplate>
    </>
  );
};

export default MyApp;
