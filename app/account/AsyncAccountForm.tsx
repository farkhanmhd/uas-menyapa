import AccountForm from "./AccountForm";
import { getAccount } from "../lib/account";

export const AsyncAccountForm = async () => {
  const user = await getAccount();

  return (
    <AccountForm
      whatsapp={user.whatsapp?.slice(3, user.whatsapp.length) ?? ""}
      name={user.name ?? ""}
      address={user.address ?? ""}
      gender={user.gender ?? ""}
      marriageStatus={user.marriageStatus ?? ""}
      email={user.email ?? ""}
      dateOfBirth={user.dateOfBirth ?? new Date()}
    />
  );
};
