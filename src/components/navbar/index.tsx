"use client";
import { User } from "@/components/navbar/user";
import { ShoppingBag } from "lucide-react";
const Navbar = () => {
  return (
    <div className="flex py-2 max-w-3xl pl-px mx-auto justify-between">
      <div className="flex items-center gap-2">
        <ShoppingBag className="size-5 text-zinc-100" />
        <span className="font-semibold">Wishlist</span>
      </div>
      <User />
    </div>
  );
};

export { Navbar };
