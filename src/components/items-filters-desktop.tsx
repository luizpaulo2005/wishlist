"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const itemsFiltersSchema = z.object({
  name: z.string(),
  price: z.string(),
  date: z.string(),
  status: z.string(),
});

type ItemsFiltersSchema = z.infer<typeof itemsFiltersSchema>;

const ItemsFiltersDesktop = () => {
  const [name, setName] = useQueryState("name");
  const [price, setPrice] = useQueryState("price");
  const [date, setDate] = useQueryState("date");
  const [status, setStatus] = useQueryState("status");;

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
    <form
      onSubmit={handleSubmit(handleFilterItem)}
      className="flex items-center gap-2"
    >
      <Input {...register("name")} placeholder="Nome" />
      <Input {...register("price")} placeholder="Preço" />
      <Input {...register("date")} placeholder="Criado em (DD/MM/YYYY)" />
      <Controller
      control={control}
      name="status"
      render={({ field: { onChange, value }}) => {
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="disabled" disabled>Selecione o status</SelectItem>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="yes">Comprados</SelectItem>
              <SelectItem value="no">Não comprados</SelectItem>
            </SelectContent>
          </Select>
        )
      }}
      />
      <Button className="flex items-center gap-2">
        <Search className="size-4" />
        Filtrar resultados
      </Button>
    </form>
  );
};

export { ItemsFiltersDesktop };
