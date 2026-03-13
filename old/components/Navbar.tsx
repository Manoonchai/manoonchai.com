import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {
  return (
    <nav className="bg-gray-300 absolute w-full left-0 top-0">
      <div className="container mx-auto px-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
            <span className="mx-2 leading-3">
              <Link href="/">
                <a>
                  <Image
                    src="/manoonchai.png"
                    alt="manoonchai"
                    height={50}
                    width={50}
                  />
                </a>
              </Link>
            </span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="mx-2 text-sm sm:text-md">
              <Link href="/download">
                <a>ดาวน์โหลด</a>
              </Link>
            </span>
            <span className="mx-2 text-sm sm:text-md">
              <Link href="/faq">
                <a>คำถามที่พบบ่อย</a>
              </Link>
            </span>
            <span className="mx-2 text-sm sm:text-md">
              <a
                href="https://discord.gg/aNbFWTmuHU"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
