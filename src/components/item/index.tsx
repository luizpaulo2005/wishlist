import { DeleteItemDialog } from "@/components/item/delete-item-dialog";
import { ItemInfoPopover } from "@/components/item/item-info-popover";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pen } from "lucide-react";
import { ToggleItemStatus } from "./toggle-item-status";
import { UpdateItemDialog } from "./update-item-dialog";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface ItemProps {
  fetchItems: () => void;
  item: {
    id: string;
    name: string;
    value: number;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    status: boolean;
  };
}

const Item = ({ fetchItems, item }: ItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2 p-2 w-full max-w-full border rounded-lg">
      <div className="flex items-center gap-2">
        <ToggleItemStatus id={item.id} status={item.status} />
        <div className="flex items-center gap-2">
          <ItemInfoPopover
            description={item.description}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            status={item.status}
          />
          {item && item.url ? (
            <a href={item.url} target="_blank" className="hover:underline">
              {item.name}
            </a>
          ) : (
            item.name
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {item.value.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        <div className="w-px h-6 bg-zinc-800" />
        <div className="flex items-center gap-2">
          <UpdateItemDialog item={item} fetchItems={fetchItems} />
          <DeleteItemDialog id={item.id} fetchItems={fetchItems} />
        </div>
      </div>
    </div>
  );
};

export { Item };
