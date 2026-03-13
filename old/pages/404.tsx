import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <div className="h-screen w-screen bg-white flex justify-center content-center flex-wrap">
        <h1 className="text-black error-text text-9xl	">
          404{' '}
          <Link href="/">
            <Image
              src="/manoonchai.png"
              alt="manoonchai"
              width={50}
              height={50}
            />
          </Link>
          <p className="text-6xl">
            ไม่พบหน้านี้
            <br />
            <Link href="/">
              <a className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded text-xl place-self-center">
                กลับหน้าหลัก
              </a>
            </Link>
          </p>
        </h1>
      </div>
    </div>
  );
}
