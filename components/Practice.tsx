import { FC } from 'react';
import Image from 'next/image';

const Practice: FC = () => {
  return (
    <div className="mt-8 text-left py-20 mx-16">
    <h3 className="text-3xl font-bold my-4">
      รูปแป้นพิมพ์มนูญชัย สำหรับฝึกพิมพ์
    </h3>

    <div className="">
      <a
        className="flex flex-col justify-center text-gray-600 underline"
        href="/Manoonchai-print.pdf"
        target="_blank"
        rel="noreferrer"
        download
      >
        <div className="w-full relative" style={{ height: '320px' }}>
          <Image
            src="/manoonchai-print.png"
            alt="แป้นพิมพ์มนูญชัย"
            layout={'fill'}
            objectFit={'contain'}
          />
        </div>
        <p className="text-center">ดาวน์โหลดไฟล์ PDF</p>
      </a>
    </div>
  </div>
  );
};

export default Practice;
