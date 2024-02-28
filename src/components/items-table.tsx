"use client";
import { ChangeItem } from "@/components/change-item-dialog";
import { DeleteItem } from "@/components/delete-item-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getItems } from "@/data/items";
import { TextFormatted } from "@/lib/text-formatted";
import { Item } from "@/types/Item";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { ChangeItemState } from "./change-item-state-dialog";
import { useEffect } from "react";
import { toast } from "sonner";

const ItemsTable = () => {
  const [name] = useQueryState("name");
  const [price] = useQueryState("price");
  const [date] = useQueryState("date");
  const [status] = useQueryState("status");

  const { data } = useQuery({
    queryKey: ["items", name, price, date, status],
    queryFn: () =>
      getItems({
        name,
        price,
        date,
        // @ts-ignore
        status,
      }),
  });

  useEffect(() => {
    setTimeout(() => {
      toast.info("Clique no nome do item para ver mais detalhes.", {
        position: "top-center",
      });
    }, 3000);
  }, []);

  if (data?.length === 0) {
    return (
      <span className="flex items-center justify-center text-center">
        Sua lista está vazia. Clique no botão + Novo Item para criar um novo
        item.
      </span>
    );
  }

  return (
    <div className="border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow className="text-nowrap">
            <TableHead>Status</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Valor à Vista</TableHead>
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
                <TableCell className="flex items-center justify-center">
                  <ChangeItemState item={item} />
                </TableCell>
                <TableCell>
                  <Link href={`/${item.id}`}>
                    <TextFormatted text={item.name} />
                  </Link>
                </TableCell>
                <TableCell>
                  {item.grossPrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <TextFormatted
                    text={item.description ? item.description : "Sem descrição"}
                    length={20}
                  />
                </TableCell>
                <TableCell>
                  {dayjs(item.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <DeleteItem item={item} />
                  <ChangeItem item={item} />
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
