"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { LoginModal } from "@/components/login-modal";
import { Item } from "@/components/item/index";

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

  console.log(items)

  if (items?.length === 0) {
    return <h1>Nenhum item na lista</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col gap-2 items-center">
        {items?.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Page;
