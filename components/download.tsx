import { faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function Download() {
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
              <div className="relative" style={{ height: "100px" }}>
               <Image
                src="/X11.svg"
                alt="X11Logo"
                layout={"fill"}
                objectFit={"contain"}
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
        <h3 className="text-3xl font-bold my-4">รูปแป้นพิมพ์มนูญชัย สำหรับฝึกพิมพ์</h3>

        <div className="">
          <a className="flex flex-col justify-center text-gray-600 underline" href="/Manoonchai-print.pdf" target="_blank" rel="noreferrer">
            <div className="w-full relative" style={{ height: "320px" }}>
              <Image
                src="/manoonchai-print.png"
                alt="แป้นพิมพ์มนูญชัย"
                layout={"fill"}
                objectFit={"contain"}
              />
            </div>
            <p className="text-center">ดาวน์โหลดไฟล์ PDF</p>
          </a>
        </div>
      </div>
    </section>
  );
}
