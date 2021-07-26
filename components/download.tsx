import { faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Download() {
  return (
    <section id="download" className="text-center py-20 mx-16">
      <h2 className="text-3xl font-bold sm:text-6xl">ดาวน์โหลด</h2>
      <div className="flex mt-8">
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
            ใส่ <code>~/Library/Keyboard Layouts</code> แล้วคลิก <code>Go</code>
          </li>
          <li>
            วางไฟล์ <code>Manoonchai.keylayout</code>
          </li>
          <li>Log out หรือ Restart เพื่อเริ่มใช้งานแป้นพิมพ์มนูญชัย</li>
        </ul>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ Windows</h3>
        <ul className="list-disc pl-4">
          <li>
            Unzip ไฟล์ <code>Manoonchai.zip</code>
          </li>
          <li>
            เปิดไฟล์ <code>setup</code> เพื่อติดตั้ง
          </li>
          <li>Sign out หรือ Restart เพื่อเริ่มใช้งานแป้นพิมพ์มนูญชัย</li>
        </ul>
      </div>
    </section>
  );
}
