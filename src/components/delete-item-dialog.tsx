"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Item } from "@/types/Item";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface DeleteItemProps {
  item: Item;
}

const DeleteItem = (props: DeleteItemProps) => {
  const { item } = props;
  const { data: user } = useSession();
  const isOwner = user?.user?.email === item.user.email;

  const handleDelete = async (id: Item["id"]) => {
    toast.loading("Apagando item");

    await axios
      .delete(`/api/item/${item.id}`)
      .then(() => {
        toast.success("Item excluído com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        toast.error("Erro ao apagar item");
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          size="icon"
          className="transition-colors bg-red-700 hover:bg-red-500"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar item</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja apagar esse item?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(item.id)}
            className="!bg-red-500 !text-white"
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteItem };
