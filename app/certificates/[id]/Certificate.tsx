"use client";

import { useTransitionRouter } from "next-view-transitions";

import CertificateDownloader from "./certificate-downloader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserIcon, ArrowLeftIcon } from "lucide-react";
import { CertificateData } from "@/types";

export default function Certificate({
  certificate,
}: {
  certificate: CertificateData;
}) {
  const { back } = useTransitionRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" size="sm" className="mb-4" onClick={back}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          {certificate.eventTitle} Certificate
        </h1>
        <p className="uppercase text-gray-600">ID: {certificate.id}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              {certificate.name}&apos;s Certificate
            </CardTitle>
            <Badge variant="secondary" className="text-sm">
              Issued
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6 aspect-[3507/2480] w-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={certificate.certificateImage}
              alt={`${certificate.eventTitle} Certificate for ${certificate.name}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain"
            />
            <div className="absolute inset-0 flex">
              <div
                className="ml-[2.3%] w-[39%] pt-[20.8%] text-center font-serif text-[clamp(4px,2vw,16px)] sm:pt-[20.6%] md:pt-[21%] md:text-[clamp(5px,3vw,16px)] lg:text-[clamp(16px,2vw,32px)] xl:pt-[20.8%]"
                style={{
                  color: "#000000",
                }}
              >
                {certificate.name}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Recipient: {certificate.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Issued: {certificate.createdAt || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <CertificateDownloader
          certificateId={certificate.id}
          certificateName={certificate.name}
          certificateImage={certificate.certificateImage}
        />
      </div>
    </div>
  );
}
