export default function Articles() {
  return (
    <section className="text-center py-20 mx-16">
      <h1 className="text-3xl font-bold sm:text-6xl">บทความ</h1>

      <div className="flex mt-8">
        <div className="shadow-lg mx-auto max-w-sm ">
          <a href="https://medium.com/@narze" target="_blank" rel="noreferrer">
            <img
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            />
            <div className="p-7 my-auto pb-10 ">
              <h1 className="text-2xl font-semibold text-gray-800">
                บันทึกการสร้างแป้นพิมพ์ไทย Manoonchai (1) : หนทางสู่ Layout
                ที่ดีกว่า
              </h1>
              <p className="text-base text-gray-400 mt-2"></p>
            </div>
          </a>
        </div>
        <div className="shadow-lg mx-auto max-w-sm ">
          <a href="https://medium.com/@narze" target="_blank" rel="noreferrer">
            <img
              className="w-full h-auto"
              src="https://place-hold.it/300x150?text=Placeholder&fontsize=23"
              alt=""
            />
            <div className="p-7 my-auto pb-10 ">
              <h1 className="text-2xl font-semibold text-gray-800">
                บันทึกการสร้างแป้นพิมพ์ไทย Manoonchai (2) : สร้าง Typing Effort
                Model เพื่อให้คะแนนความ “พิมพ์ง่าย”
              </h1>
              <p className="text-base text-gray-400 mt-2"></p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
