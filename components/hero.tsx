export default function Hero() {
  return (
    <section className="text-center py-20 mx-16">
      <h1 className="text-6xl font-bold sm:text-8xl">มนูญชัย</h1>
      <p className="text-2xl text-gray-500 my-8">
        Praesent dui mus porta mollis hendrerit et quis diam torquent, iaculis
        cubilia leo sapien aptent imperdiet sollicitudin primis vivamus euismod,
        mattis ipsum sagittis himenaeos scelerisque ante cras dapibus. Urna
        natoque faucibus sit lacus nulla tortor sapien cras quam, fusce dui
        vulputate cum consequat ridiculus ultricies at proin dictumst, tincidunt
        massa habitant feugiat cursus bibendum nostra eget. Nam elit per
        condimentum nisi justo.
      </p>
      <div className="mt-12">
        <a
          href="#"
          className="border-2 border-gray-500 bg-gray-500 text-white text-xl px-8 py-4 mx-2 rounded hover:bg-gray-700 transition duration-200 ease-in-out delay-600"
        >
          ดูรายละเอียด
        </a>
        <a
          href="#"
          className="border-2 border-gray-500 bordered text-xl px-8 py-4 mx-2 rounded hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out delay-600"
        >
          ดาวน์โหลด
        </a>
        <a
          href="https://manoontype.web.app"
          className="text-gray-700 text-xl px-2 py-4 mx-2 hover:text-white transition duration-200 ease-in-out delay-600"
          target="_blank"
          rel="noreferrer"
        >
          ทดลองพิมพ์
        </a>
      </div>
    </section>
  );
}
