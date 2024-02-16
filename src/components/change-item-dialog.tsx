"use client";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { Item } from "@/types/Item";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

const updateItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  price: z.number(),
});

type UpdateItemProps = z.infer<typeof updateItemSchema>;

type Status = "idle" | "sending" | "error" | "success";

const statusMessages = {
  idle: "Editar",
  sending: "Editando...",
  error: "Erro ao editar",
  success: "Editado com sucesso",
};

interface ChangeItemProps {
  item: Item;
}

const ChangeItem = (props: ChangeItemProps) => {
  const { item } = props;
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateItemProps>({
    resolver: zodResolver(updateItemSchema),
    values: {
      name: item.name ?? "",
      description: item.description ?? "",
      url: item.url ?? "",
      price: item.price ?? 0,
    },
  });

  const handleCreateItem = async (data: UpdateItemProps) => {
    setStatus("sending");
    toast("Atualizando item...");

    await axios
      .put(`/api/item/${item.id}`, data)
      .then(() => {
        setStatus("success");
        toast.success("Item atualizado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setStatus("error");
        toast.error("Erro ao atualizar item");
      })
      .finally(() => {
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      });
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button
          className="transition-colors bg-blue-700 hover:bg-blue-500"
          size="icon"
        >
          <PenLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Editar Item</DialogHeader>
        <DialogDescription>
          Atualize um item da sua lista de desejos
        </DialogDescription>
        <form onSubmit={handleSubmit(handleCreateItem)} className="space-y-6 max-w-sm w-full mx-auto">
          <div className="flex flex-col gap-2">
            <Label className={errors.name && "text-red-500"}>Nome</Label>
            <Input className="col-span-3" {...register("name")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.description && "text-red-500"}>
              Descrição
            </Label>
            <Input className="col-span-3" {...register("description")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.url && "text-red-500"}>URL</Label>
            <Input className="col-span-3" {...register("url")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.price && "text-red-500"}>Preço</Label>
            <Input
              className="col-span-3"
              type="number"
              step={0.01}
              {...register("price")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={status !== "idle"}
              data-error={status === "error"}
              data-success={status === "success"}
              data-sending={status === "sending"}
              className="transition-colors data-[success==true]:!bg-green-500 data-[error==true]:!bg-red-500 data-[sending==true]:!bg-gray-500 flex items-center gap-2"
              type="submit"
            >
              {status === "sending" && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {statusMessages[status]}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { ChangeItem };
