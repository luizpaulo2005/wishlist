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
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

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
  const [filteredItems, setFilteredItems] = useState<ItemProps[] | undefined>([])
  const { status } = useSession();
  const [name] = useQueryState("name");
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };
  const goToPreviousPage = () => {
    setCurrentPage(page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(page + 1);
  };

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  };

  const fetchItems = async () => {
    await axios
      .get("/api/item")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) =>
        toast.error(`${err.response.status}: ${err.response.data.message}`)
      );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (name) {
      setFilteredItems(items?.filter((item) => item.name.includes(name)))
      
    } else {
      setFilteredItems(items)
    }
    setTotal(filteredItems?.length || 0)
  }, [name, items, filteredItems])

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
        {filteredItems?.slice((page - 1) * 10, page * 10).map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
      <div className="flex items-center justify-between">
        <span>
          Mostrando {filteredItems?.slice((page - 1) * 10, page * 10).length} de {total}{" "}
          itens
        </span>
        <span>
          Página {page} de {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={goToFirstPage}
            disabled={page === 1}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={goToPreviousPage}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={goToNextPage}
            disabled={page === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={goToLastPage}
            disabled={page === totalPages}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
