import { User } from "lucide-react";
import Image from "next/image";
import MessageIcon from "../icon/MessageIcon";
import PlusIcon from "../icon/PlusIcon";
import AdIcon from "../icon/AdIcon";
import { Button } from "../ui/button";
import BellIcon from "../icon/BellIcon";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-1">
            <Image alt="logo" src="/logo.png" width={90} height={100} />
          </Link>

          <div className="w-[562px] mx-4 relative left-16">
            <SearchBar />
          </div>
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              className="w-10 h-10 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AdIcon />
            </Button>
            <Button
              variant={"ghost"}
              className="w-10 h-10 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MessageIcon />
            </Button>

            <Button
              variant={"ghost"}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <PlusIcon />
              <span>Create</span>
            </Button>

            <Button
              variant={"ghost"}
              className="relative p-2 mr-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Button
              variant={"ghost"}
              className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center hover:ring-2 hover:ring-gray-300 transition-all"
            >
              <User size={18} className="text-white" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
