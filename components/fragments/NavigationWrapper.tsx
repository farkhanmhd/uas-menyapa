import React from "react";
import Navigation from "./Navigation";
import { checkRole } from "@/app/lib";

type Props = {
  user: any;
};

const NavigationWrapper = async ({ user }: Props) => {
  const role = user ? await checkRole() : "customer";
  return <Navigation user={user} role={role} />;
};

export default NavigationWrapper;
