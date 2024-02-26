"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";

const createItemSchema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  description: z.string().optional(),
  url: z.string().optional(),
  grossPrice: z.coerce.number(),
  netPrice: z.coerce.number().optional(),
  installments: z.coerce.number(),
});

type CreateItemProps = z.infer<typeof createItemSchema>;

type Status = "idle" | "sending" | "error" | "success";

const statusMessages = {
  idle: "Adicionar",
  sending: "Adicionando...",
  error: "Erro ao adicionar",
  success: "Adicionado com sucesso",
};

const CreateItemDialog = () => {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemProps>({
    resolver: zodResolver(createItemSchema),
  });

  const handleCreateItem = async (data: CreateItemProps) => {
    setStatus("sending");
    toast("Adicionando item...");

    await axios
      .post("/api/item", data)
      .then(() => {
        setStatus("success");
        toast.success("Item adicionado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        setStatus("error");
        toast.error("Erro ao adicionar item");
      })
      .finally(() => {
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="size-4" />
          Novo Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Item</DialogTitle>
          <DialogDescription>
            Adicione um novo item a sua lista de desejos
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateItem)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label className={errors.name && "text-red-500"}>Nome</Label>
            <Input className="col-span-3" {...register("name")} />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.description && "text-red-500"}>
              Descrição
            </Label>
            <Input className="col-span-3" {...register("description")} />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.url && "text-red-500"}>URL</Label>
            <Input className="col-span-3" {...register("url")} />
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.grossPrice && "text-red-500"}>Preço à Vista</Label>
            <Input className="col-span-3" type="number" step={0.01} {...register("grossPrice")} />
            {errors.grossPrice && (
              <span className="text-red-500">{errors.grossPrice.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.netPrice && "text-red-500"}>Preço à Prazo</Label>
            <Input className="col-span-3" type="number" step={0.01} {...register("netPrice")} />
            {errors.netPrice && (
              <span className="text-red-500">{errors.netPrice.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className={errors.installments && "text-red-500"}>Parcelas</Label>
            <Input className="col-span-3" type="number" step={1} {...register("installments")} />
            <span className="text-muted">Insira a quantidade máxima de parcelas sem juros</span>
            {errors.installments && (
              <span className="text-red-500">{errors.installments.message}</span>
            )}
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

export { CreateItemDialog };
