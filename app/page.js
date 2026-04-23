import Link from "next/link";
export default function Home() {
  return (
    <div className="px-4 w-full">
      <div className="flex md:flex-row flex-col justify-around items-center min-h-[83vh]">
        <div className="font-bold text-3xl">
          <p className="flex items-center gap-2 justify-center">Buy me a Chai <span><img src="/tea.gif" width={60} alt="" /></span></p>
          <p className="text-center">A funding platform for creators...</p>
        </div>
        <div className="text-center flex gap-4">
          <Link href="/login">
            <button>Start Now</button>
          </Link>
          <Link href="/about">
            <button>Read More...</button>
          </Link>
          <a href="https://www.instagram.com/Ak76024/" target="_blank" rel="noopener noreferrer">
            <button>Created By Ak76024</button>
          </a>
        </div>
      </div>
    </div>
  );
}