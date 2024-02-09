"use client";
import { getItems } from "@/data/items";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Item } from "@/types/Item";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { PenLine, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import axios from "axios";

const ItemsTable = () => {
  const { status, data: user } = useSession();
  const [name] = useQueryState("name");
  const [price] = useQueryState("price");
  const [date] = useQueryState("date");

  const { data } = useQuery({
    queryKey: ["items", name, price, date],
    queryFn: () =>
      getItems({
        name,
        price,
        date,
      }),
  });

  const handleChangeItemStatus = async (id: Item["id"]) => {
    toast.loading("Alterando status do item");

    await axios
      .patch(`/api/item/${id}`)
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
    <div className="border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Adicionado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead className="text-center">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: Item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {item.description ? item.description : "Sem descrição"}
                </TableCell>
                <TableCell>
                  {dayjs(item.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <Checkbox
                    onClick={() => handleChangeItemStatus(item.id)}
                    checked={item.status}
                    className="p-[17px] -mt-1 border-none dark:bg-secondary"
                  />
                  <Button variant="destructive" size="icon">
                    <Trash2 className="size-4" />
                  </Button>
                  <Button className="!bg-blue-700" size="icon">
                    <PenLine className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export { ItemsTable };
