export default function Nav() {
  return (
    <nav className="bg-gray-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <span className="mx-2 text-md sm:text-2xl">
              <a href="#">แป้นพิมพ์มนูญชัย</a>
            </span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="mx-2 text-sm sm:text-md">
              <a href="#download">ดาวน์โหลด</a>
            </span>
            <span className="mx-2 text-sm sm:text-md">
              <a href="https://discord.gg/aNbFWTmuHU" target="_blank">Discord</a>
            </span>
            {/* <span className="mx-2 text-nm">
              <a href="#">EN</a>
            </span> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
