"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ToggleThemeButton } from "@/components/change-theme-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const User = () => {
  const { data, status } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            {/* @ts-ignore */}
            <AvatarImage src={data?.user?.image} alt={data?.user?.name} />
            {/* @ts-ignore */}
            <AvatarFallback>{data?.user.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>{data?.user?.name}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <ToggleThemeButton />
          <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export { User };
