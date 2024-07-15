"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/navbar/user-avatar";
import { ToggleThemeButton } from "@/components/navbar/change-theme-dropdown";
import { LogOut, User as UserIcon } from "lucide-react";

const User = () => {
  const { data } = useSession();

  if (data && data.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>
            <UserAvatar user={data.user} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled
            className="flex items-center gap-1 max-w-40 truncate"
          >
            <UserIcon className="size-4 shrink-0" />
            {data?.user?.name}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ToggleThemeButton />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="size-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export { User };
