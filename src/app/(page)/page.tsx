"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { LoginModal } from "@/components/login-modal";

const Page = () => {
  const [items, setItems] = useState<[] | undefined>([]);
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
    return <h1>Nenhum item na lista</h1>;
  }

  return (
    <div>
      <h1>
        {items?.map((item) => {
          // @ts-ignore
          return <p key={item}>{item.name}</p>;
        })}
      </h1>
      ;
    </div>
  );
};

export default Page;
