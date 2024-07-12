"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span>
          <DropdownMenuItem className="flex items-center gap-2">
            {theme === "light" && <Sun className="size-4" />}
            {theme === "dark" && <Moon className="size-4" />}
            {theme === "system" && <LaptopMinimal className="size-4" />}
            Alterar Tema
          </DropdownMenuItem>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 justify-between"
        >
          Claro
          <Sun className="size-4" />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 justify-between"
        >
          Escuro
          <Moon className="size-4" />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 justify-between"
        >
          Sistema
          <LaptopMinimal className="size-4" />
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ToggleThemeButton };
