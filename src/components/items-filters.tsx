"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const itemsFiltersSchema = z.object({
  name: z.string(),
  price: z.string(),
  date: z.string(),
  status: z.boolean(),
});

type ItemsFiltersSchema = z.infer<typeof itemsFiltersSchema>;

const ItemsFilters = () => {
  const [name, setName] = useQueryState("name");
  const [price, setPrice] = useQueryState("price");
  const [date, setDate] = useQueryState("date");
  const [status, setStatus] = useQueryState("status");
  const statusValue = status === "true" ? true : false;

  const { register, handleSubmit, control } = useForm<ItemsFiltersSchema>({
    resolver: zodResolver(itemsFiltersSchema),
    values: {
      name: name ?? "",
      price: price ?? "",
      date: date ?? "",
      status: statusValue ?? "",
    },
  });

  const handleFilterItem = (data: ItemsFiltersSchema) => {
    console.log(data);

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
      setStatus("true");
    } else {
      setStatus("false");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFilterItem)}
      className="flex items-center gap-2"
    >
      <Input {...register("name")} placeholder="Nome" />
      <Input {...register("price")} placeholder="Preço" />
      <Input {...register("date")} placeholder="Criado em (DD/MM/YYYY)" />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Button className="flex items-center gap-2" type="button" variant="outline">
            Apenas Comprados
            <Checkbox checked={value} onCheckedChange={onChange} />
          </Button>
        )}
      />
      <Button>
        <Search className="size-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  );
};

export { ItemsFilters };
