import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const User = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <div>User</div>;
};

export default User;
