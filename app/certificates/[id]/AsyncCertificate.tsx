import React from "react";
import { getCertificateData } from "@/app/lib/certificates";
import Certificate from "./Certificate";

const AsyncCertificate = async ({ id }: { id: string }) => {
  const certificate = await getCertificateData(id);
  return <Certificate certificate={certificate} />;
};

export default AsyncCertificate;
