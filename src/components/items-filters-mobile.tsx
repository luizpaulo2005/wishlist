import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ItemsFiltersMobile = () => {
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => toast.info("Ainda não implementado")}
    >
      <Search className="size-4" />
      Filtrar
    </Button>
  );
};

export { ItemsFiltersMobile };
