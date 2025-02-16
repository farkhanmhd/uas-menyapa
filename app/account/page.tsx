import React, { Suspense } from "react";
import { checkSession } from "../lib";
import { AccountFormSkeleton } from "./AccountFormSkeleton";
import { AsyncAccountForm } from "./AsyncAccountForm";

const AccountPage = async () => {
  await checkSession();

  return (
    <div className="container mx-auto max-w-xl">
      <Suspense fallback={<AccountFormSkeleton />}>
        <AsyncAccountForm />
      </Suspense>
    </div>
  );
};

export default AccountPage;
