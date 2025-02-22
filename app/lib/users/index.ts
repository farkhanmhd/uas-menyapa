import type { SelectUser } from "@/db/schema/authentication";
import { headers } from "next/headers";

export const getUsers = async (): Promise<SelectUser[]> => {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const response = await fetch(`${process.env.BASE_URL}/api/users`, {
    cache: "force-cache",
    headers: {
      cookie: cookie ?? "",
    },
  });

  const { data } = await response.json();

  return data;
};
