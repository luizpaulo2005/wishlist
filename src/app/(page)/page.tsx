"use client";

import { CreateItemDialog } from "@/components/create-item-dialog";
import { ItemsFiltersDesktop } from "@/components/items-filters-desktop";
import { ItemsFiltersMobile } from "@/components/items-filters-mobile";
import { ItemsTable } from "@/components/items-table";
import { useMediaQuery } from "@/lib/use-media-query";

const Page = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-2">
        {isDesktop ? <ItemsFiltersDesktop /> : <ItemsFiltersMobile />}
        <CreateItemDialog />
      </div>

      <ItemsTable />
    </div>
  );
};

export default Page;
