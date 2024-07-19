import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ItemInfoPopoverProps {
    description: string;
    createdAt: string;
    updatedAt: string;
    status: boolean;
}

const ItemInfoPopover = ({ description, createdAt, updatedAt, status }: ItemInfoPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
              <ChevronDown className="size-5" />
            </PopoverTrigger>
            <PopoverContent className="text-xs text-zinc-500 space-y-2">
              <p>{!description && "Sem"} Descrição: {description && description}</p>
              <p>
                Adicionado {`${dayjs(createdAt).fromNow()} (${dayjs(createdAt).format("DD/MM/YYYY")})`}
              </p>
              <p>
                Atualizado {`${dayjs(updatedAt).fromNow()} (${dayjs(updatedAt).format("DD/MM/YYYY")})`}
              </p>
              <p>Status: {status ? "Comprado" : "Não comprado"}</p>
            </PopoverContent>
          </Popover>
    )
}

export { ItemInfoPopover }