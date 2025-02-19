import { Purchases } from "@/types";
import { headers } from "next/headers";

export const getPurchases = async (): Promise<Purchases[]> => {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const response = await fetch(`${process.env.BASE_URL}/api/purchases`, {
    cache: "force-cache",
    headers: {
      cookie: cookie ?? "",
    },
  });

  const { data: purchases } = await response.json();

  return purchases;
};
