import { Item } from "@/types/Item";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ChangeItemStateProps {
  item: Item;
}

const ChangeItemStateSchema = z.object({
  shippingCost: z.coerce.number(),
});

type ChangeItemState = z.infer<typeof ChangeItemStateSchema>;

const ChangeItemState = (props: ChangeItemStateProps) => {
  const { item } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeItemState>({
    resolver: zodResolver(ChangeItemStateSchema),
    values: {
      shippingCost: item.shippingCost ?? 0,
    },
  });

  const handleChangeItemStatus = async (data: ChangeItemState) => {
    const { shippingCost } = data;

    toast.loading("Alterando status do item");

    await axios
      .patch(`/api/item/${item.id}`, { shippingCost })
      .then(() => {
        toast.success("Item atualizado com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error("Erro ao atualizar item");
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          data-checked={item.status}
          className="data-[checked=true]:!bg-green-700"
        >
          {item.status ? <Check /> : <X />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja {item.status && "des"}marcar como comprado?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(handleChangeItemStatus)} className="space-y-4">
          <div className={`${item.status && "hidden"} flex flex-col gap-2`}>
            <Label className={errors.shippingCost && "text-red-500"}>
              Frete
            </Label>
            <Input
              className="col-span-3"
              type="number"
              step={1}
              {...register("shippingCost")}
            />
            {errors.shippingCost && (
              <span className="text-red-500">
                {errors.shippingCost.message}
              </span>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ChangeItemState };
