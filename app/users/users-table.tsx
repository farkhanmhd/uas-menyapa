import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUsers } from "../lib/users";

export const UsersTable = async () => {
  const users = await getUsers();

  return <DataTable columns={columns} data={users} />;
};
