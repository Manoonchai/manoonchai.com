import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faApple, faWindows, faChrome, faAndroid } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Download: FC = () => {
  const installThaiMncBash = [
    `\
#!/bin/bash
set -e
if [[ "$EUID" -ne 0 ]]; then echo "Please run as root."; exit 1; fi
echo 'Installing Manoonchai...'
cp /usr/share/X11/xkb/symbols/th /usr/share/X11/xkb/symbols/th.bak
cp /usr/share/X11/xkb/rules/evdev.xml /usr/share/X11/xkb/rules/evdev.xml.bak
cp /usr/share/X11/xkb/rules/base.xml /usr/share/X11/xkb/rules/base.xml.bak
cp /usr/share/X11/xkb/rules/evdev.lst /usr/share/X11/xkb/rules/evdev.lst.bak
cp /usr/share/X11/xkb/rules/base.lst /usr/share/X11/xkb/rules/base.lst.bak && echo "Backups created."
sed '1s/^\\xEF\\xBB\\xBF//' Manoonchai_xkb | if ! grep -q "xkb_symbols \\"ThaiMnc\\"" /usr/share/X11/xkb/symbols/th; then sudo tee -a /usr/share/X11/xkb/symbols/th && echo "Manoonchai layout added to /usr/share/X11/xkb/symbols/th."; else echo "Manoonchai layout already exists in /usr/share/X11/xkb/symbols/th."; fi
for f in /usr/share/X11/xkb/rules/evdev.xml /usr/share/X11/xkb/rules/base.xml; do if ! grep -q '<name>ThaiMnc</name>' "$f"; then sed -i '/<name>th<\\/name>/,/<\\/variantList>/ {
        /<variantList>/a\\
        <variant>\\
            <configItem>\\
                <name>ThaiMnc</name>\\
                <description>Thai (Manoonchai v1.0)</description>\\
            </configItem>\\
        </variant>
        }' "$f" && echo  "Manoonchai layout added to $f..." ; else echo "Manoonchai layout already exists in $f."; fi; done
for f in /usr/share/X11/xkb/rules/evdev.lst /usr/share/X11/xkb/rules/base.lst; do if ! grep -q 'ThaiMnc' "$f"; then sed -i '/pat             th: Thai (Pattachote)/a\\  ThaiMnc         th: Thai (Manoonchai v1.0)' "$f" && echo "Manoonchai layout layout added to $f."; else echo "Manoonchai layout already exists in $f."; fi; done
if [ -f /etc/debian_version ]; then dpkg-reconfigure xkb-data && echo "Debian system detected, xkb-data reconfigured."; fi
echo -e "\\033[41;37mMa\\033[0m\\033[47;31mno\\033[0m\\033[44;37mon\\033[0m\\033[47;31mch\\033[0m\\033[41;37mai\\033[0m layout installed.
Select it under Thai layout or restart X session to apply the changes for sure :)."
\
`,
  ];
  return (
    <section id="download" className="text-center py-20 mx-6 md:mx-16">
      <h2 className="text-3xl font-bold sm:text-6xl">ดาวน์โหลด</h2>
      <div className="flex flex-wrap mt-8 gap-8 justify-evenly">
        <div className="shadow-lg w-64">
          <a
            href="https://github.com/Manoonchai/Manoonchai/releases/download/v1.0/Manoonchai.bundle.zip"
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
        <div className="shadow-lg w-64">
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
        <div className="shadow-lg w-64">
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
        <div className="shadow-lg w-64">
          <a
            href="https://github.com/Manoonchai/kiimo"
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-8 my-auto">
              <h3 className="text-2xl font-semibold text-gray-800">Et Cetera</h3>
              <p className="mt-6  w-20 mx-auto flex justify-between gap-3">
                <FontAwesomeIcon icon={faChrome} className="mt-2" />
                <FontAwesomeIcon icon={faAndroid} className="mt-2" />
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ macOS</h3>
        <ul className="list-disc pl-4">
          <li>
            Unzip ไฟล์ <code>Manoonchai.bundle.zip</code>
          </li>
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
            วางไฟล์ <code>Manoonchai.bundle</code>
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

      <div className={"mt-8 text-left"}>
        <h3 className="text-3xl font-bold my-4">วิธีติดตั้งสำหรับ Linux</h3>
        <ol className="list-decimal ml-1">
          <li><h4 className="text-2xl">ดาวน์โหลดไฟล์เลย์เอาต์กันก่อน</h4>
            <div className="bg-gray-50 text-gray-950 font-mono p-4 rounded overflow-x-auto border-solid border border-gray">
              <code className={`block overflow-auto`}>
                wget https://github.com/hiohlan/kiimo/raw/main/output/Manoonchai/Manoonchai_xkb --output-document=Manoonchai_xkb
              </code>
            </div>
          </li>
          <li className="mt-5"><h4 className="text-2xl">ติดตั้งโลด!</h4>
            <p className="font-light">มีแบบอย่าง 3 แบบให้ท่านเลือก</p>
            <ul className="list-disc pl-2">
              <li className="mt-4">
                <h4 className="text-xl">แบบ setxkbmap, สำหรับเซสชัน X ปัจจุบันเท่านั้น</h4>
                <p className="font-light">เหมาะสำหรับผู้ที่ไม่เข้าถึงสิทธิ Super User หรือไม่อยากไปยุ่งอะไรกับไฟล์ระบบ</p>
                <div>
                  <ol className="list-decimal pl-4">
                    <li className="mt-4">ติดตั้งลงในโฟลเดอร์ผู้ใช้
                      <div className="bg-gray-50 text-gray-950 font-mono p-4 rounded overflow-x-auto border-solid border border-gray">
                        <code className={`block overflow-auto`}>
                          mkdir -p $HOME/.xkb/symbols;<br />
                          sed '1s/^\xEF\xBB\xBF//' Manoonchai_xkb &gt; $HOME/.xkb/symbols/Manoonchai_xkb;
                        </code>
                      </div>
                    </li>
                    <li className="mt-4">เรียกใช้เลย์เอาต์
                      <p className="font-light">US-QWERTY คู่กับมนูญชัย โดยสามารถสลับเลย์เอาต์ได้ด้วยการกดปุ่ม CAPS LOCK</p>
                      <div className="bg-gray-50 text-gray-950 font-mono p-4 rounded overflow-x-auto border-solid border border-gray">
                        <code className={`block overflow-auto`}>
                          setxkbmap -layout 'us,Manoonchai_xkb' -option 'grp:caps_toggle' -print | xkbcomp -I"$HOME/.xkb" - $DISPLAY
                        </code>
                      </div>
                      <p className="mt-4 font-light">หากคอมของท่านไม่ล้างไฟล์หลังออกจากระบบ คำสั่งเดียวกันนี้สามารถใช้ได้ในเซสชันถัดไปทันทีโดยไม่ต้องติดตั้งใหม่ และสามารถเพิ่มใน <code className="bg-gray-200 text-black font-mono p-1 rounded">~/.xprofile</code> หรือ <code className="bg-gray-200 text-black font-mono p-1 rounded">~/.xinitrc</code> <i>(ขึ้นกับระบบของท่าน)</i> เพื่อให้เรียกใช้เลย์เอาต์เองเมื่อเข้าสู่ระบบได้ทันที </p>
                    </li>
                  </ol>
                </div>
              </li>
              <li className="mt-4">
                <h4 className="text-xl">แบบลงเป็น Variant ส่วนหนึ่งของแป้นพิมพ์ภาษาไทยที่มีอยู่เดิม</h4>
                <p className="font-light">เหมาะสำหรับผู้ที่มีสิทธิ์ Super User และต้องการรักษาแป้นพิมพ์ภาษาไทยอันเดิมไว้ เพื่อใช้งานร่วมกับแป้นพิมพ์ใหม่</p>
                <ol className="list-decimal pl-4">
                  <li className="mt-4">คัดลอกโค้ดด้านล่างนี้ เก็บเป็นไฟล์ <code className="bg-gray-200 text-black font-mono p-1 rounded">installmanoonchai.sh</code> ไว้อยู่ใน directory เดียวกับไฟล์เลย์เอาต์ที่ดาวน์โหลดมา
                    <br />
                    <textarea
                      name=""
                      id=""
                      value={installThaiMncBash}
                      rows={10}
                      className="bg-gray-50 text-gray-950 font-mono p-4 rounded border-solid border border-gray sm:h-80 w-full"
                    ></textarea>
                  </li>
                  <li className="mt-4">แปลงให้เป็นไฟล์รันได้
                    <div className="bg-gray-50 text-gray-950 font-mono p-4 rounded overflow-x-auto border-solid border border-gray">
                      <code className={`block overflow-auto`}>
                        chmod +x installmanoonchai.sh
                      </code>
                    </div>
                  </li>
                  <li className="mt-4">ติดตั้งแป้นพิมพ์
                    <div className="bg-gray-50 text-gray-950 font-mono p-4 rounded overflow-x-auto border-solid border border-gray">
                      <code className={`block overflow-auto`}>
                        sudo installmanoonchai.sh
                      </code>
                    </div>
                  </li>
                  <li className="mt-4">เพื่อความมั่นใจ ควร logout จาก X, หรือ restart ด้วยก็ดี</li>
                  <li className="mt-4">
                    ไปที่ Keyboard setting, มองหา/เพิ่ม <code className="bg-gray-200 text-black font-mono p-1 rounded">Thai (Manoonchai v1.0)</code>. <i className="font-light">(แตกต่างกันตาม desktop environment ที่ท่านใช้)</i>
                  </li>
                </ol>
                <p className="font-light mt-4">(หากอัปเดต Kernel, แล้วแป้นพิมพ์หาย, ให้ซ้ำขั้นตอนทั้งหมดใหม่)</p>
              </li>
              <li className="mt-4"><h4 className="text-xl ">แบบ<span className="text-red-600">ไทย</span>จง<span className="text-blue-600">เจริญ</span></h4>
                <ol className="list-decimal pl-4">
                  <li className="mt-4">เปิดไฟล์ <code className="bg-gray-200 text-black font-mono p-1 rounded">Manoonchai_xkb</code> ที่โหลดมา</li>
                  <li className="mt-4">คัดลอกทุกอย่างที่ขึ้นต้นด้วย <code className="bg-gray-200 text-black font-mono p-1 rounded">key &lt;XXX&gt; </code> รวมถึง <code className="bg-gray-200 text-black font-mono p-1 rounded">include "level3(ralt_switch)"</code></li>
                  <li className="mt-4">เปิดไฟล์ <code className="bg-gray-200 text-black font-mono p-1 rounded">/usr/share/X11/xkb/symbols/th</code></li>
                  <li className="mt-4">ใน <code className="bg-gray-200 text-black font-mono p-1 rounded">xkb_symbols "basic" {`{...}`}</code> ลบทุกอย่างที่ขึ้นต้นด้วย <code className="bg-gray-200 text-black font-mono p-1 rounded">key &lt;XXX&gt; </code> </li>
                  <li className="mt-4">นำของจากข้อ 2 วางลงไปใน <code className="bg-gray-200 text-black font-mono p-1 rounded">xkb_symbols "basic" {`{...}`}</code> นั้น</li>
                  <li className="mt-4">บันทึกไฟล์แล้วออก</li>
                  <li className="mt-4">logout จาก X, หรือ restart. หรือถ้าใช้ Debian-based <span className="font-light">(อาทิ Ubuntu, Linux Mint)</span> ล้าง xkb cache ด้วย, โดย <code className="bg-gray-200 text-black font-mono p-1 rounded">sudo dpkg-reconfigure xkb-data</code></li>
                  <li className="mt-4">แป้นพิมพ์ของท่านกลายร่างเป็นแป้นพิมพ์มนูญชัย</li>
                </ol>
                <p className="font-light mt-4">(หากอัปเดต Kernel, แล้วแป้นพิมพ์หาย, ให้ซ้ำขั้นตอนทั้งหมดใหม่)</p>
              </li>
            </ul>
          </li>
        </ol>
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
