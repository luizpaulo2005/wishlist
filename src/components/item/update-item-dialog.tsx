"use client";

import { UpdateItemForm } from "@/components/item/update-item-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";
import { useState } from "react";

interface UpdateItemDialogProps {
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
  fetchItems: () => void;
}

const UpdateItemDialog = ({ item, fetchItems }: UpdateItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pen className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Item</DialogTitle>
        </DialogHeader>
        <UpdateItemForm
          item={item}
          fetchItems={fetchItems}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export { UpdateItemDialog };