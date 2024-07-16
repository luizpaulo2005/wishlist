import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

const createItemSchema = z.object({
  name: z.string().nonempty("O nome do item não pode ser vazio"),
  description: z.string(),
  url: z.string().optional().or(z.string().url("O link do item deve ser uma URL válida")),
  value: z.coerce.number().positive("O preço do item deve ser maior que zero"),
});

type CreateItemForm = z.infer<typeof createItemSchema>;

const CreateItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemForm>({
    resolver: zodResolver(createItemSchema),
  });

  const createItem = async ({
    name,
    description,
    url,
    value,
  }: CreateItemForm) => {
    toast.loading("Cadastrando item...");

    await axios
      .post("/api/item", {
        name,
        description,
        url,
        value,
      })
      .then(() => {
        toast.success("Item cadastrado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(`${err.response.status}: ${err.response.data.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(createItem)} className="space-y-2">
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
        <Input {...register("value")} />
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
        <Button size="default" type="submit" variant="secondary">
          Cadastrar
        </Button>
      </DialogFooter>
    </form>
  );
};

export { CreateItemForm };
