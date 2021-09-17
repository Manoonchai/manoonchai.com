import React from 'react';
import Head from 'next/head';

import Nav from '../components/nav';
import Question from '../components/question';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div >
      <Head>
        <title>แป้นพิมพ์มนูญชัย</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="แป้นพิมพ์ภาษาไทยทางเลือกใหม่ พิมพ์ง่ายกว่าแป้นพิมพ์เกษมณีถึง 45%"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <section className="text-center py-20 mx-16">
        <h1 className="text-3xl font-bold sm:text-6xl">คำถามที่พบบ่อย</h1>

        <div className="text-left">
          <Question
            question="หลักการของการสร้างแป้นพิมพ์มนูญชัยคืออะไร?"
            answer="" />
          <a className="text-gray-600 underline" href="https://narze.medium.com/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2-manoonchai-1-%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B9%88-layout-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2-8088ca83b1c3" target="_blank" rel="noreferrer">
            อ่านได้จากบทความ มี 3 ตอนด้วยกัน
          </a>

          <Question
            question="แป้นพิมพ์นี้จะมาแทนแป้นพิมพ์เกษมณีในอนาคตหรือไม่?"
            answer="แป้นพิมพ์มนูญชัยเป็นเพียงแป้นพิมพ์ทางเลือกเท่านั้น" />
          <Question
            question="มีแป้นพิมพ์มนูญชัยบนสมาร์ตโฟนหรือไม่?"
            answer="ณ ตอนนี้ยังไม่มีแอปแป้นพิมพ์มนูญชัยบนสมาร์ตโฟน เนื่องจากแป้นพิมพ์นี้ตั้งใจสร้างมาเพื่อแก้ปัญหาในการพิมพ์ด้วยแป้นพิมพ์สำหรับคอมพิวเตอร์เท่านั้น แต่ถ้าหากมีผู้สนใจ สามารถนำตัวแป้นพิมพ์ไปดัดแปลงเป็นแอปบนสมาร์ทโฟนได้ โดยไม่มีค่าใช้จ่าย" />
          <Question
            question="ก ไก่อยู่ตรงไหน?"
            answer="นิ้วกลางมือขวาแถวบน (ตัว I)" />
          <Question
            question="เลขไทยหายไปไหน?"
            answer="ใน AltGr Layer ซึ่งสามารถเข้าถึงได้โดยการกด Alt ด้านขวา หรือ Ctrl + Alt ด้านซ้าย โดยตำแหน่งจะอยู่ตรงกับตัวเลขอารบิกทุกๆ ตัว" />
          <Question
            question="ฃ ฃวด, ฅ ฅน อยู่ที่ไหน?"
            answer="อยู่ใน AltGr Layer ซึ่งสามารถเข้าถึงได้โดยการกด Alt ด้านขวา หรือ Ctrl + Alt ด้านซ้าย โดยตำแหน่งจะอยู่ตรงกับตัว ข ไข่ และ ค ควาย เพื่อให้จำง่าย" />
          <Question
            question="จุลภาค มหัพภาค ยัติภังค์ ทับ อยู่ที่ไหน?"
            answer="อยู่ใน AltGr Layer เช่นกัน" />
          <Question
            question="ฝึกพิมพ์มนูญชัยแล้วจะกลับไปพิมพ์บนสมาร์ทโฟนที่เป็นเกษมณีได้มั้ย?"
            answer="สามารถทำได้ เพราะการพิมพ์บนแป้นพิมพ์สมาร์ทโฟนจะใช้เพียง 1-2 นิ้ว ซึ่งต่างจากการพิมพ์บนแป้นพิมพ์สำหรับคอมพิวเตอร์ ที่ต้องใช้นิ้ว 8-10 นิ้ว ในการพิมพ์สัมผัส กล่าวคือ สามารถพิมพ์ด้วยแป้นมนูญชัยบนคอมพิวเตอร์ พร้อมกันกับการใช้แป้นเกษมณีบนสมาร์ทโฟนได้" />
          <Question
            question="ใช้เวลาฝึกพิมพ์สัมผัสนานหรือไม่?"
            answer="ใช้เวลาประมาณ 2 อาทิตย์ถึง 2 เดือน แล้วแต่บุคคล" />
          <Question
            question="ฝึกพิมพ์มนูญชัยอย่างไร?"
            answer="สามารถฝึกได้ที่เว็บ Manoontype หรือพิมพ์รูปแป้นพิมพ์ในกระดาษแล้วติดไว้ใต้จอคอมพิวเตอร์ หรือเปิดโปรแกรม On-Screen Keyboard และฝึกพิมพ์" />
          <div>
            <a className="text-gray-600 underline" href="https://narze.medium.com/manoonchai-layout-%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A-manoontype-%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B9%86-5a4937856f78" target="_blank" rel="noreferrer">
              อ่านวิธีใช้เว็บ Manoontype ในการฝึกแป้นพิมพ์มนูญชัย
            </a>
          </div>
          <div>
            <a className="text-gray-600 underline" href="/Manoonchai-print.pdf" target="_blank" rel="noreferrer">
              รูปแป้นพิมพ์มนูญชัย สำหรับฝึกพิมพ์
            </a>
          </div>
          <Question
            question="ถ้าเคยชินกับการพิมพ์ด้วยแป้นเกษมณีแล้ว สามารถฝึกพิมพ์แป้นมนูญชัยได้หรือไม่?"
            answer="ได้ แต่เมื่อปรับเปลี่ยนการพิมพ์แล้ว คนส่วนมากจะพิมพ์แป้นพิมพ์เดิมได้ช้าลง แต่จะยังจำตำแหน่งได้อยู่" />
          <Question
            question="จะทำสติ๊กเกอร์แปะบนคีย์บอร์ด หรือคีย์บอร์ดที่เป็นแป้นพิมพ์มนูญชัยหรือไม่?"
            answer="ไม่มีแผนที่จะทำ เพราะผู้พัฒนาต้องการส่งเสริมการฝึกพิมพ์ด้วยวิธีพิมพ์สัมผัส แต่หากต้องการทำด้วยตัวเอง สามารถทำได้" />
          <div>
            <h2 className="text-2xl font-bold my-4">ต้องมาเรียนใหม่ จำใหม่อีกแล้วหรือ?</h2>
            <p className="text-gray-400">
              สบายใจได้! คุณยังสามารถใช้แป้นพิมพ์เดิมได้อยู่ หากคุณพบว่าแป้นพิมพ์ของคุณกลายร่างเป็นแป้นพิมพ์มนูญชัยโดยไม่ทราบสาเหตุ โปรดติดต่อเราโดยด่วนได้<a className="underline text-gray-600" href="https://bit.ly/3kjtSYL">ที่นี่</a>
            </p>
          </div>
          <div className="mt-8">
            <a className="underline text-gray-600" href="https://discord.gg/aNbFWTmuHU" target="_blank" rel="noreferrer">หากมีข้อสงสัยเพิ่มเติม สามารถเข้ามาถามในคอมมูนิตี้ Discord ได้</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
