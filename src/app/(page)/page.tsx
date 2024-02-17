"use client";

import { CreateItemDialog } from "@/components/create-item-dialog";
import { ItemsFiltersDesktop } from "@/components/items-filters-desktop";
import { ItemsFiltersMobile } from "@/components/items-filters-mobile";
import { ItemsTable } from "@/components/items-table";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/use-media-query";
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { status } = useSession();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {status === "unauthenticated" ? (
        <div className="flex items-center justify-center">
          <Button variant="link" onClick={() => signIn("google")}>
            Clique aqui para entrar e poder criar e gerenciar seus itens.
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            {isDesktop ? <ItemsFiltersDesktop /> : <ItemsFiltersMobile />}
            <CreateItemDialog />
          </div>

          <ItemsTable />
        </>
      )}
    </div>
  );
};

export default Page;
