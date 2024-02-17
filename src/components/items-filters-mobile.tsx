"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

interface ItemsFiltersProps {
  hasItems: boolean;
}

const itemsFiltersSchema = z.object({
  name: z.string(),
  price: z.string(),
  date: z.string(),
  status: z.string(),
});

type ItemsFiltersSchema = z.infer<typeof itemsFiltersSchema>;

const ItemsFiltersMobile = (props: ItemsFiltersProps) => {
  const { hasItems } = props;

  const [name, setName] = useQueryState("name");
  const [price, setPrice] = useQueryState("price");
  const [date, setDate] = useQueryState("date");
  const [status, setStatus] = useQueryState("status");

  const { register, handleSubmit, control } = useForm<ItemsFiltersSchema>({
    resolver: zodResolver(itemsFiltersSchema),
    values: {
      name: name ?? "",
      price: price ?? "",
      date: date ?? "",
      status: status ?? "",
    },
  });

  const handleFilterItem = (data: ItemsFiltersSchema) => {
    if (data.name) {
      setName(data.name);
    } else {
      setName(null);
    }

    if (data.price) {
      setPrice(data.price);
    } else {
      setPrice(null);
    }

    if (data.date) {
      setDate(data.date);
    } else {
      setDate(null);
    }

    if (data.status) {
      setStatus(data.status);
    } else {
      setStatus("all");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button disabled={!hasItems} className="flex items-center gap-2">
          <Search className="size-4" />
          Filtrar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-4 sm:px-0">
          <DrawerHeader>
            <DrawerTitle>Filtrar itens</DrawerTitle>
          </DrawerHeader>
          <form
            onSubmit={handleSubmit(handleFilterItem)}
            className="flex flex-col items-center gap-2"
          >
            <Input {...register("name")} placeholder="Nome" />
            <Input {...register("price")} placeholder="Preço" />
            <Input {...register("date")} placeholder="Criado em (DD/MM/YYYY)" />
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => {
                return (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="disabled" disabled>
                        Selecione o status
                      </SelectItem>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="yes">Comprados</SelectItem>
                      <SelectItem value="no">Não comprados</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="flex items-center gap-2" type="submit">
                  <Search className="size-4" />
                  Filtrar resultados
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { ItemsFiltersMobile };
