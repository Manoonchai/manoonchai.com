import { FC } from 'react';
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from 'react-share';

const Share: FC = () => {
  return (
    <div className="bg-white text-center mb-20 mx-16">
      <div className="mt-8 text-left text-3xl">Share</div>
      <p className="mt-8 text-left">
        <span>
          <FacebookShareButton
            url="https://manoonchai.com/"
            quote={`Manoonchai แป้นพิมพ์ภาษาไทยทางเลือกใหม่ พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%`}
          >
            <FacebookIcon size={46} />
          </FacebookShareButton>
        </span>
        <span>
          <TwitterShareButton
            url="https://manoonchai.com/"
            title={`Manoonchai แป้นพิมพ์ภาษาไทยทางเลือกใหม่ พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%`}
          >
            <TwitterIcon size={46} />
          </TwitterShareButton>
        </span>
        <span>
          <LineShareButton url="https://manoonchai.com/">
            <LineIcon size={46} />
          </LineShareButton>
        </span>
      </p>
    </div>
  );
};

export default Share;
