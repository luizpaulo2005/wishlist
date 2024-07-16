"use client"

import { CreateItemForm } from "@/components/item/create-item-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreateItemDialogProps {
  fetchItems: () => void;
}

const CreateItemDialog = ({ fetchItems }: CreateItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="py-2 flex items-center gap-2">
          <Plus className="size-5" />
          Adicionar Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Item</DialogTitle>
        </DialogHeader>
        <CreateItemForm fetchItems={fetchItems} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export { CreateItemDialog };
