import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Download: FC = () => {
  const variantList = '<variantList>';

  const example = [
    `
    <layout>
    <configItem>
      <name>th</name>
      <!-- Keyboard indicator for Thai layouts -->
      <shortDescription>th</shortDescription>
      <description>Thai</description>
      <languageList>
        <iso639Id>tha</iso639Id>
      </languageList>
    </configItem>
    <variantList>
      <variant>
        <configItem>
          <name>tis</name>
          <description>Thai (TIS-820.2538)</description>
        </configItem>
      </variant>
      <variant>
        <configItem>
          <name>pat</name>
          <description>Thai (Pattachote)</description>
        </configItem>
      </variant>
    </variantList>
  </layout>
  `,
  ];
  const example2 = [
    `
    <variant>
    <configItem>
      <name>ThaiMnc</name>
      <description>Thai (Manoonchai v1.0)</description>
    </configItem>
  </variant>
    `,
  ];
  const example3 = [
    `
    tis             th: Thai (TIS-820.2538)
    pat             th: Thai (Pattachote)
    `,
  ];
  const example4 = [
    `
    ThaiMnc         th: Thai (Manoonchai v1.0)
    `,
  ];
  return (
    <section id="download" className="text-center py-20 mx-16">
      <h2 className="text-3xl font-bold sm:text-6xl">ดาวน์โหลด</h2>
      <div className="flex flex-wrap mt-8">
        <div className="shadow-lg mx-auto w-64">
          <a
            href="https://github.com/Manoonchai/Manoonchai/releases/download/v1.0/Manoonchai.keylayout"
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-8 my-auto">
              <h3 className="text-2xl font-semibold text-gray-800">macOS</h3>
              <p className="mt-2 w-16 mx-auto">
                <FontAwesomeIcon icon={faApple} />
              </p>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto w-64">
          <a
            href="https://github.com/Manoonchai/Manoonchai/releases/download/v1.0/Manoonchai.zip"
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-8 my-auto">
              <h3 className="text-2xl font-semibold text-gray-800">Windows</h3>
              <p className="mt-2 w-16 mx-auto">
                <FontAwesomeIcon icon={faWindows} className="mt-4" />
              </p>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto w-64">
          <a
            href="https://github.com/Manoonchai/Manoonchai/releases/download/v1.0/Manoonchai_xkb"
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-8 my-auto">
              <h3 className="text-2xl font-semibold text-gray-800">XKB</h3>
              <p className="mt-2 w-16 mx-auto">
                <div className="relative" style={{ height: '100px' }}>
                  <Image
                    src="/X11.svg"
                    alt="X11Logo"
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </div>
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ macOS</h3>
        <ul className="list-disc pl-4">
          <li>
            เปิด <code>Finder</code>
          </li>
          <li>
            เลือกเมนู <code>Go &rarr; Go to Folder...</code>
          </li>
          <li>
            ใส่ <code>/Library/Keyboard Layouts</code> แล้วคลิก <code>Go</code>
          </li>
          <li>
            วางไฟล์ <code>Manoonchai.keylayout</code>
          </li>
          <li>Log out หรือ Restart</li>
          <li>
            เปิด System Preferences &rarr; Keyboard &rarr; Input Sources &rarr;{' '}
            <code>+</code>
          </li>
          <li>
            เลือก <code>Others</code> หรือค้นหาว่า <code>Manoonchai</code>{' '}
            แล้วทำการ Add เพื่อเริ่มใช้งานแป้นพิมพ์มนูญชัย
          </li>
        </ul>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ Windows</h3>
        <ul className="list-disc pl-4">
          <li>
            Unzip ไฟล์ <code>Manoonchai.zip</code>
          </li>
          <li>
            เปิดไฟล์ <code>setup.exe</code> เพื่อติดตั้ง
          </li>
          <li>Sign out หรือ Restart เพื่อเริ่มใช้งานแป้นพิมพ์มนูญชัย</li>
        </ul>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ Linux</h3>
        <h6 className="text-xl">
          แบบ setxkbmap, สำหรับเซสชัน X ปัจจุบันเท่านั้น
        </h6>
        <ul className="list-disc pl-4">
          <li>
            <code className="block overflow-scroll">
              wget
              https://github.com/hiohlan/kiimo/raw/main/output/Manoonchai/Manoonchai_xkb
              --output-document=Manoonchai_xkb
            </code>
          </li>
          <li>
            <code>cp ./Manoonchai_xkb /usr/share/X11/xkb/symbols/</code>
          </li>
          <li>
            <code>xkbcomp Manoonchai_xkb</code> เพื่อ check syntex error
            ถ้าไม่มี output คืออาจจะไม่มี error
          </li>
          <li>
            <code>
              setxkbmap -layout &apos;us,Manoonchai_xkb&apos; -option
              &apos;grp:caps_toggle&apos;
            </code>{' '}
            เพื่อตั้งคียบอร์ดเป็น us-qwerty กับ Manoonchai,
            เปลี่ยนเลย์เอาต์โดยการกด CAPS
          </li>
        </ul>
        <h6 className="text-xl mt-2">
          แบบลงเป็นvariantส่วนหนึ่งของkeyboardภาษาไทยที่มีอยู่เดิม
        </h6>
        <ul className="list-disc pl-4">
          <li>
            คัดลอก text ที่อยู่ใน <code>Manoonchai_xkb</code> ทั้งหมด.
            (อย่าลืมตรวจด้วยเป็น UTF-8 without{' '}
            <Link href="https://en.wikipedia.org/wiki/Byte_order_mark">
              <a className="underline" target="_blank">
                BOM
              </a>
            </Link>{' '}
            ไหม, ถ้ามี BOM ให้กำจัดออก. )
          </li>
          <li>
            root แก้ไขไฟล์{' '}
            <code className="block overflow-scroll">
              /usr/share/X11/xkb/symbols/th
            </code>
          </li>
          <li>วาง text ที่คัดลอกมา, ไว้ด้านล่างสุดของไฟล์, แล้วบันทึก.</li>
          <li>
            root แก้ไขไฟล์{' '}
            <code className="block overflow-scroll">
              /usr/share/X11/xkb/rules/evdev.xml
            </code>
          </li>
          <li>
            มองหา (อาจจะมีจุดแตกต่างกัน)
            <br />
            <textarea
              name=""
              id=""
              value={example}
              rows={4}
              className="sm:h-80 w-full sm:w-96"
            ></textarea>
          </li>
          <li>
            เพิ่ม text ข้างล่าง ลงในแท็ก <code>{variantList}</code> แล้วบันทึก
            <br />
            <textarea
              name=""
              id=""
              value={example2}
              rows={4}
              className="sm:h-40 w-full sm:w-96"
            ></textarea>
          </li>
          <li>
            ทำข้อ 5-6 เช่นเดียวกับ ไฟล์{' '}
            <code className="block overflow-scroll">
              /usr/share/X11/xkb/rules/base.xml
            </code>
          </li>
          <li>
            root แก้ไขไฟล์{' '}
            <code className="block overflow-scroll">
              /usr/share/X11/xkb/rules/base.lst
            </code>
          </li>
          <li>
            มองหา
            <br />
            <textarea
              name=""
              id=""
              value={example3}
              rows={4}
              className="sm:h-20 w-full sm:w-96"
            ></textarea>
          </li>
          <li>
            เพิ่ม text ข้างล่าง ไว้ใต้ <code>pat th: Thai (Pattachote)</code>{' '}
            แล้วบันทึก
            <br />
            <textarea
              name=""
              id=""
              value={example4}
              className="sm:h-10 w-full sm:w-96"
              rows={4}
            ></textarea>
          </li>
          <li>
            logout จาก X, หรือ restart. (ถ้าUbuntu ลองล้าง xkb cache ด้วย, โดย{' '}
            <code>sudo dpkg-reconfigure xkb-data</code>)
          </li>
          <li>
            ไปที่ Keyboard setting, มองหา/เพิ่ม{' '}
            <code>Thai (Manoonchai v1.0)</code>. (แตกต่างกันตาม distro
            ที่ท่านใช้.)
          </li>
          <li>เริ่มใช้งานแป้นมนูญชัย</li>
        </ul>
        <p>(หากอัปเดต Kernel, แล้วแป้นพิมพ์หาย, ให้ซ้ำขั้นตอนทั้งหมดใหม่)</p>
        <p className="mt-10">
          Linux installation source from{' '}
          <Link href="https://github.com/hiohlan">
            <a target="_blank" className="underline">
              hiohlan
            </a>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Download;
