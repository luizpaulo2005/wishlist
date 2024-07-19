import { CircleCheck, CircleDashed } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

interface ToggleItemStatusProps {
  id: string;
  status: boolean;
  fetchItems: () => void;
}

const ToggleItemStatus = ({
  id,
  status,
  fetchItems,
}: ToggleItemStatusProps) => {
  const toggleItemStauts = async () => {
    toast.loading("Atualizando item...");

    await axios
      .patch(`/api/item/${id}`)
      .then(() => {
        toast.success("Item atualizado com sucesso!");
        setTimeout(() => {
          fetchItems();
        }, 2000);
      })
      .catch((err) => {
        toast.error(`${err.response.status}: ${err.response.data.message}`);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          {status ? (
            <CircleCheck className="text-lime-400" />
          ) : (
            <CircleDashed />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja marcar este item como {status && "não comprado"}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => toggleItemStauts()}>
              Sim
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ToggleItemStatus };
