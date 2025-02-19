import React, { Suspense } from "react";
import EditEventFormServer from "@/components/event/EditEventFormServer";
import EditEventFormSkeleton from "@/components/event/EditEventFormSkeleton";
import { checkSession, checkRole } from "@/app/lib";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: PageProps) {
  await checkSession();
  const role = await checkRole();

  if (role === "customer") redirect("/");

  const { id } = await params;
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Edit Event</h1>
      <Suspense fallback={<EditEventFormSkeleton />}>
        <EditEventFormServer id={id} />
      </Suspense>
    </div>
  );
}
