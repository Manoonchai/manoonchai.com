export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white absolute w-full left-0">
      <div className="container mx-auto px-2">
        <div className="flex flex-row space-x-8 items-center justify-between p-4">
          <a href="https://github.com/narze" target="_blank" rel="noreferrer">
            @narze
          </a>
          <a
            href="https://github.com/manoonchai/manoonchai"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
