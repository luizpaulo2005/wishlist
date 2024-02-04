import { Item } from "@/types/Item";

export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    items: Item[];

    createdAt: string;
    updatedAt: string;
}