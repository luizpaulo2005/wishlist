import { Item } from "@/types/Item";
import axios from "axios";
import dayjs from "dayjs";

interface GetItemsFilters {
  name: string | null;
  price: string | null;
  date: string | null;
}

const getItems = async ({ name, price, date }: GetItemsFilters) => {
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

    return items;
  }
};

export { getItems };