import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import Hero from 'components/Hero';
import Features from 'components/Features';
import Articles from 'components/Articles';
import Practice from 'components/Practice';
import Share from 'components/Share';

const HomePage: NextPage = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <Hero />

      <span className="flex justify-center p-4">
        <Image
          src="/manoonchai-layout.png"
          alt="แป้นพิมพ์มนูญชัย"
          width={850}
          height={320}
        />
      </span>

      <Features />

      <Articles />

      <Practice />

      <Share />
    </div>
  );
};

export default HomePage;
