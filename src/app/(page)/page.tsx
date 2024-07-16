"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { LoginModal } from "@/components/login-modal";
import { Item } from "@/components/item/index";
import { NoItems } from "@/components/item/no-items";
import { CreateItemDialog } from "@/components/item/create-item-dialog";
import { ItemsFilters } from "@/components/item/items-filters";

interface ItemProps {
  id: string;
  name: string;
  value: number;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

const Page = () => {
  const [items, setItems] = useState<ItemProps[] | undefined>([]);
  const { status } = useSession();

  const fetchItems = async () => {
    await axios
      .get("/api/item")
      .then((res) => setItems(res.data))
      .catch((err) =>
        toast.error(`${err.response.status}: ${err.response.data.message}`)
      );
  };
  useEffect(() => {
    fetchItems();
  }, []);

  if (status === "unauthenticated") {
    return <LoginModal />;
  }

  if (!items) {
    toast.error("Erro ao carregar os itens da lista de desejos.");
  }

  if (items?.length === 0) {
    return <NoItems />;
  }

  return (
    <div className="max-w-3xl mt-2 space-y-2 mx-auto">
      <div className="flex items-center justify-between">
        <ItemsFilters />
        <CreateItemDialog />
      </div>
      <div className="flex flex-col gap-2 items-center">
        {items?.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Page;
