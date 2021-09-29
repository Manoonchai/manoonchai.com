import { FC } from 'react';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const AppTemplate: FC = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
};

export default AppTemplate;
