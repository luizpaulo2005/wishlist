import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogClose, DialogFooter } from "../ui/dialog";

const updateItemSchema = z.object({
    name: z.string().nonempty("O nome do item não pode ser vazio"),
    description: z.string(),
    url: z
      .string()
      .optional()
      .or(z.string().url("O link do item deve ser uma URL válida")),
    value: z.coerce
      .number({ message: "Insira um número válido" })
      .positive("O preço do item deve ser maior que zero"),
  status: z.boolean(),
});

type UpdateItemForm = z.infer<typeof updateItemSchema>;

interface UpdateItemFormProps {
  fetchItems: () => void;
  setIsOpen: (isOpen: boolean) => void;
  item: {
    id: string;
    name: string;
    value: number;
    description: string;
    url: string;
    status: boolean;
  };
}

const UpdateItemForm = ({ item, fetchItems, setIsOpen }: UpdateItemFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateItemForm>({
    resolver: zodResolver(updateItemSchema),
    values: {
        name: item.name ?? "",
        description: item.description ?? "",
        url: item.url ?? "",
        value: item.value ?? 0,
        status: item.status ?? false,
    }
  });

  const updateItem = async ({
    name,
    description,
    url,
    value,
    status
  }: UpdateItemForm) => {
    toast.loading("Atualizando item...");
    setIsSubmitting(true);

    await axios
      .put(`/api/item/${item.id}` , {
        name,
        description,
        url,
        value,
        status
      })
      .then(() => {
        toast.success("Item atualizado com sucesso");
        setTimeout(() => {
          fetchItems();
          setIsOpen(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error(`${err.response.status}: ${err.response.data.message}`);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit(updateItem)} className="space-y-2">
      <div className="space-y-1">
        <label>Nome</label>
        <Input {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="space-y-1">
        <label>Descrição</label>
        <Input {...register("description")} />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="space-y-1">
        <label>Link</label>
        <Input {...register("url")} />
        {errors.url && (
          <span className="text-red-500">{errors.url.message}</span>
        )}
      </div>
      <div className="space-y-1">
        <label>Preço</label>
        <Input type="number" step={0.01} {...register("value")} />
        {errors.value && (
          <span className="text-red-500">{errors.value.message}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label>Comprado</label>
        <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange } }) => {
            return <Checkbox checked={value} onCheckedChange={onChange} />
        }}
        />
        {errors.value && (
          <span className="text-red-500">{errors.value.message}</span>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button size="default" variant="outline">
            Fechar
          </Button>
        </DialogClose>
        <Button
          disabled={isSubmitting}
          size="default"
          type="submit"
          variant="secondary"
        >
          Atualizar
        </Button>
      </DialogFooter>
    </form>
  );
};

export { UpdateItemForm };
