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
} from "@/components/ui/table";
import { Item } from "@/types/Item";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { DeleteItem } from "@/components/delete-item-dialog";
import Link from "next/link";
import { ChangeItem } from "@/components/change-item-dialog";
import { TextFormatted } from "@/lib/text-formatted";

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
            <TableHead>Status</TableHead>
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
                <TableCell className="flex items-center justify-center">
                  <Button
                    size="icon"
                    data-checked={item.status}
                    onClick={() => handleChangeItemStatus(item.id)}
                    className="data-[checked=true]:!bg-green-700"
                  >
                    {item.status ? <Check /> : <X />}
                  </Button>
                </TableCell>
                <TableCell>
                  <Link href={item.url} target="_blank">
                    <TextFormatted text={item.name} />
                  </Link>
                </TableCell>
                <TableCell>
                  {item.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <TextFormatted text={item.description ? item.description : "Sem descrição"} length={20}/>
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
