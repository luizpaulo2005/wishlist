"use client";
import Link from "next/link";
import { User } from "./user";
import { useMediaQuery } from "@/lib/use-media-query";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="w-full flex justify-around items-center py-3">
      <Link
        href="/"
        className={`${isDesktop ? "text-3xl" : "text-xl"} font-semibold`}
      >
        Lista de Desejos
      </Link>
      <User />
    </div>
  );
};

export { Navbar };
