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
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TailSpin } from "react-loader-spinner";

interface DeleteItemDialogProps {
  id: string;
  fetchItems: () => void;
}

const DeleteItemDialog = ({ id, fetchItems }: DeleteItemDialogProps) => {
  const deleteItem = async () => {
    toast("Apagando item...", { icon: <TailSpin width={20} /> });

    await axios
      .delete(`/api/item/${id}`)
      .then(() => {
        toast.success("Item apagado com sucesso!");
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
        <button className="p-2 rounded-lg transition-colors hover:bg-red-800">
          <Trash2 className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir esse item?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => deleteItem()}>
              Excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteItemDialog };
