import { faOsi } from '@fortawesome/free-brands-svg-icons';
import {
  faEquals,
  faLaptop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const features = [
  {
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>',
    iconType: 'svg',
    title: 'สร้างจากข้อมูลขนาดใหญ่ ผ่าน Algorithm และ AI',
    description:
      'เพื่อลดความเอนเอียง (Bias) ของข้อมูล เราใช้ฐานข้อมูลจากหลายแหล่งเพื่อเฉลี่ย และสร้างแป้นพิมพ์ด้วย Algorithm โดยใช้ AI ในการประมวลผลหาแป้นพิมพ์ที่มีประสิทธิภาพมากที่สุด',
  },
  {
    icon: '123',
    iconType: 'text',
    title: 'ใช้เลขอารบิกเป็นค่าเริ่มต้น',
    description:
      'การใช้งานภาษาไทยในปัจจุบันแทบไม่มีการพิมพ์เลขไทยแล้ว เราจึงนำเลขอารบิกเป็นค่าเริ่มต้นแทน เมื่อต้องการพิมพ์ตัวเลข ผู้ใช้ไม่จำเป็นต้องสลับเป็นแป้นพิมพ์ภาษาอังกฤษอีกต่อไป (หากต้องการพิมพ์เลขไทยยังสามารถพิมพ์ด้วยการกด <code>Alt</code> ค้างเอาไว้ได้)',
  },
  {
    icon: faEquals,
    iconType: 'fontawesome',
    title: 'สมดุลย์การพิมพ์ด้วยมือซ้ายและขวา',
    description:
      'ตัวอักษรไทยบนแป้นพิมพ์เกษมณีมีความไม่สมดุลย์ โดยหนักไปทางมือขวาถึง 70% แต่แป้นพิมพ์มนูญชัยจะมีน้ำหนักโดยสัดส่วน มือซ้าย:มือขวา อยู่ที่ 47%:53%',
  },
  {
    icon: faLaptop,
    iconType: 'fontawesome',
    title: 'ไม่มีตัวอักษรไทยบนแถวตัวเลข',
    description:
      'บนแป้นพิมพ์มนูญชัย ตัวจะไม่มีตัวอักษรไทยอยู่บนแถวตัวเลข เหมาะกับการใช้กับคีย์บอร์ดแลปทอป หรือคีย์บอร์ดขนาดเล็กที่มีความนิยมมากขึ้นในปัจจุบัน',
  },
  {
    icon: faOsi,
    iconType: 'fontawesome',
    title: 'โครงการแบบ Open-Source',
    description:
      'โค้ดทั้งหมดเปิดเผยแบบ Open-Source ด้วยสัญญาอนุญาตแบบ MIT สามารถนำไปใช้ซ้ำ หรือต่อยอดเป็นแป้นพิมพ์รูปแบบอื่นๆ ได้ อีกทั้งยังเปิดโอกาสให้ผู้ที่สนใจมา Contribute ในโครงการได้ด้วย',
  },
];

export default function Features() {
  return (
    <div className="mt-10 px-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {features.map(({ title, description, icon, iconType }, idx) => (
          <div className="relative" key={idx}>
            <dt>
              {iconType == 'fontawesome' ? (
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white p-3">
                  <FontAwesomeIcon icon={icon as IconDefinition} />
                </div>
              ) : (
                <div
                  className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                  dangerouslySetInnerHTML={{ __html: icon as string }}
                ></div>
              )}
              <p className="ml-16 text-lg leading-6 text-gray-900">{title}</p>
            </dt>
            <dd
              className="mt-2 ml-16 text-base font-light text-gray-500"
              dangerouslySetInnerHTML={{ __html: description }}
            ></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
