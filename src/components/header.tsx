import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/blogLogo.png";
import Button from "./logoutButton";

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={Logo}
              alt="Blog App Logo"
              width={50}
              height={50}
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center">
            <Link href="/blog/create" passHref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
                Create Blog
              </button>
            </Link>
            <Button />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
