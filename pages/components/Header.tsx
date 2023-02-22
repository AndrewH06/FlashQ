import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { TiFlash } from "react-icons/ti";

const Header = () => {
  return (
    <header className="flex flex-col items-center px-4 md:px-20 bg-white py-6 drop-shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <Link href="/">
          <h1 className="flex gap-[0.15rem] justify-center text-3xl font-bold">
            <TiFlash className="text-yellow-400 text-4xl" />
            FlashQ
          </h1>
        </Link>
        <div className="flex gap-4 text-xl text-gray-700">
          <Link href="/">
            <FaTiktok />
          </Link>
          <Link href="/">
            <GrInstagram />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
