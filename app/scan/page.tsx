import { redirect } from "next/navigation";
import { checkSession, checkAdminOrSuperAdmin } from "../lib";
import ScanContent from "@/components/fragments/ScanContent";

const ScanPage = async () => {
  await checkSession();
  const isAdminOrSuperAdmin = await checkAdminOrSuperAdmin();

  if (!isAdminOrSuperAdmin) {
    redirect("/");
  }

  return (
    <div className="container mx-auto flex h-[calc(100dvh-80px)] items-center justify-center px-4">
      <ScanContent />
    </div>
  );
};

export default ScanPage;
