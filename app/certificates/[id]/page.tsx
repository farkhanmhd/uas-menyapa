import { Suspense } from "react";
import AsyncCertificate from "./AsyncCertificate";
import CertificateSkeleton from "./skeleton";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<CertificateSkeleton />}>
      <AsyncCertificate id={id} />
    </Suspense>
  );
}
