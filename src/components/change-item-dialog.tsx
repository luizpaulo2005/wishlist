import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ChangeItem = () => {
  return (
    <Button
      onClick={() => toast.info("Ainda não implementado")}
      className="transition-colors bg-blue-700 hover:bg-blue-500"
      size="icon"
    >
      <PenLine />
    </Button>
  );
};

export { ChangeItem };
