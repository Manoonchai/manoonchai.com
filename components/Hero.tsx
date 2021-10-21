import { FC } from 'react';
import Link from 'next/link';

const Hero: FC = () => {
  return (
    <section className="text-center py-10 mx-16 mt-16">
      <h1 className="text-5xl font-bold sm:text-8xl">มนูญชัย</h1>
      <p className="text-2xl text-gray-500 my-8">
        แป้นพิมพ์ภาษาไทยทางเลือกใหม่
        สร้างจากปัญญาประดิษฐ์และฐานข้อมูลขนาดใหญ่ของการพิมพ์ภาษาไทยในยุคปัจจุบัน
        พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%
      </p>

      <div className="mt-12 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Link href="/download">
          <a
            className="border-2 border-gray-500 bg-gray-500 text-white text-xl px-8 py-4 mx-2 rounded hover:bg-gray-700 transition duration-200 ease-in-out delay-600"
          >
            ดาวน์โหลด
          </a>
          </Link>
          <a
            href="https://manoontype.web.app"
            className="border-2 border-gray-500 bordered text-xl px-8 py-4 mx-2 rounded hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out delay-600"
            target="_blank"
            rel="noreferrer"
          >
            ทดลองพิมพ์
          </a>
          <a
            href="https://discord.gg/aNbFWTmuHU"
            className="border-2 border-indigo-500 bg-indigo-500 text-xl px-4 py-4 mx-0 rounded hover:bg-indigo-700 hover:bg-indigo-700 text-white transition duration-200 ease-in-out delay-600"
            target="_blank"
            rel="noreferrer"
          >
            เข้าคอมมูนิตี้ Discord
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
