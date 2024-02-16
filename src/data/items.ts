import { Item } from "@/types/Item";
import axios from "axios";
import dayjs from "dayjs";

type Status = "yes" | "no" | "all";

interface GetItemsFilters {
  name: string | null;
  price: string | null;
  date: string | null;
  status: Status | null;
}

const getItems = async ({ name, price, date, status }: GetItemsFilters) => {
  let items: Item[] | undefined;

  await axios
    .get("/api/item")
    .then((res) => {
      items = res.data;
    })
    .catch((err) => {
      return;
    });

  if (items) {
    if (name) {
      items = items.filter((item: Item) => item.name.includes(name));
    }

    if (price) {
      items = items.filter((item: Item) =>
        JSON.stringify(item.price).includes(price)
      );
    }

    if (date) {
      items = items.filter((item: Item) =>
        dayjs(item.createdAt).format("DD/MM/YYYY").includes(date)
      );
    }

    if (status) {
      if (status === "yes") {
        items = items.filter((item: Item) => item.status);
      } else if (status === "no") {
        items = items.filter((item: Item) => !item.status);
      } else if (status === "all") {
        return items;
      }
    }

    return items;
  }
};

export { getItems };
