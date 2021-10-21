import React from 'react';
import { NextPage } from 'next';

import Download from 'components/Download';

const DownloadPage: NextPage = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <Download />
    </div>
  );
};

export default DownloadPage;
