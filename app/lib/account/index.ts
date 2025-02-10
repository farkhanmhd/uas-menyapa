import { InsertUser, SelectUser } from "@/db/schema/authentication";
import { headers } from "next/headers";

export const getAccount = async (): Promise<SelectUser> => {
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const response = await fetch(`${process.env.BASE_URL}/api/account`, {
    method: "GET",
    cache: "force-cache",
    headers: {
      cookie: cookie ?? "",
    },
  });

  const { data } = await response.json();

  return data;
};

export const updateAccount = async (data: InsertUser) => {
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const response = await fetch(`${process.env.BASE_URL}/api/account`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      cookie: cookie ?? "",
    },
  });

  return response.json();
};
