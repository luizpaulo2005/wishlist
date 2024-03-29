import { User } from "@/types/User";

export interface Item {
  id: string;
  name: string;
  description: string;
  url: string;
  grossPrice: number;
  netPrice: number;
  installments: number;
  shippingCost: number;
  userId: User["id"];

  user: User;

  status: boolean;
  createdAt: string;
  updatedAt: string;
}
