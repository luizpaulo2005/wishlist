"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const itemsFiltersSchema = z.object({
  name: z.string(),
});

type ItemsFiltersProps = z.infer<typeof itemsFiltersSchema>;

const ItemsFilters = () => {
  const [name, setName] = useQueryState("name");

  const { register, handleSubmit } = useForm<ItemsFiltersProps>({
    resolver: zodResolver(itemsFiltersSchema),
    values: {
      name: name ?? "",
    },
  });

  const filterItems = ({ name }: ItemsFiltersProps) => {
    setName(name);
  };

  return (
    <form
      onSubmit={handleSubmit(filterItems)}
      className="border rounded-md px-2 py-1 h-full max-h-10 flex items-center"
    >
      <div className="flex items-center gap-1">
        <input
          className="bg-transparent outline-none flex-1 border-none"
          type="text"
          placeholder="Filtrar por nome"
          {...register("name")}
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="size-5" />
        </Button>
      </div>
    </form>
  );
};

export { ItemsFilters };
