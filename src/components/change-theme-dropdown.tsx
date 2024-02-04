"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuItem>Alterar Tema</DropdownMenuItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          data-thisTheme={theme === "light"}
          className="data-[thisTheme=true]:font-semibold"
          onClick={() => setTheme("light")}
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          data-thisTheme={theme === "dark"}
          className="data-[thisTheme=true]:font-semibold"
          onClick={() => setTheme("dark")}
        >
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          data-thisTheme={theme === "system"}
          className="data-[thisTheme=true]:font-semibold"
          onClick={() => setTheme("system")}
        >
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ToggleThemeButton };
