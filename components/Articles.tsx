import { FC } from 'react';
// import Image from 'next/image';

const Article: FC = () => {
  return (
    <section className="text-center py-20 mx-16">
      <h2 className="text-3xl font-bold sm:text-6xl">บทความ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
        <div className="shadow-lg mx-auto max-w-sm">
          <a
            href="https://narze.medium.com/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2-manoonchai-1-%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B9%88-layout-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2-8088ca83b1c3"
            target="_blank"
            rel="noreferrer"
          >
            {/* <Image
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            /> */}
            <div className="p-7">
              <h3 className="md:h-32 md:text-xl text-gray-800 flex flex-col justify-center underline">
                บันทึกการสร้างแป้นพิมพ์ไทย Manoonchai (1) : หนทางสู่ Layout
                ที่ดีกว่า
              </h3>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto max-w-sm">
          <a
            href="https://narze.medium.com/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2-manoonchai-2-%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-typing-effort-model-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%B0%E0%B9%81%E0%B8%99%E0%B8%99%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1-%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2-ed729b67d52"
            target="_blank"
            rel="noreferrer"
          >
            {/* <Image
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            /> */}
            <div className="p-7">
              <h3 className="md:h-32 md:text-xl h-full text-md text-gray-800 flex flex-col justify-center underline">
                บันทึกการสร้างแป้นพิมพ์ไทย Manoonchai (2) : สร้าง Typing Effort
                Model เพื่อให้คะแนนความ “พิมพ์ง่าย”
              </h3>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto max-w-sm">
          <a
            href="https://narze.medium.com/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2-manoonchai-3-%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B9%8C%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C-manoonchai-%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%A1%E0%B8%93%E0%B8%B5-%E0%B8%9B%E0%B8%B1%E0%B8%95%E0%B8%95%E0%B9%82%E0%B8%8A%E0%B8%95%E0%B8%B4-e4d9bd82f2ea"
            target="_blank"
            rel="noreferrer"
          >
            {/* <Image
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            /> */}
            <div className="p-7">
              <h3 className="md:h-32 md:text-xl text-gray-800 flex flex-col justify-center underline">
                บันทึกการสร้างแป้นพิมพ์ไทย Manoonchai (3) : วิเคราะห์แป้นพิมพ์
                Manoonchai เทียบกับเกษมณี,ปัตตโชติ และเปิดตัวเว็บ Manoonchai.com
              </h3>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto max-w-sm">
          <a
            href="https://narze.medium.com/manoonchai-layout-วิธีใช้งานเว็บ-manoontype-แบบสั้นๆ-5a4937856f78"
            target="_blank"
            rel="noreferrer"
          >
            {/* <Image
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            /> */}
            <div className="p-7">
              <h3 className="md:h-32 md:text-xl text-gray-800 flex flex-col justify-center underline">
                วิธีใช้งานเว็บ Manoontype แบบสั้นๆ
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Article;
