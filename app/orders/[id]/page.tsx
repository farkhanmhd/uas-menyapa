import { Suspense } from "react";
import { OrderDetailWrapper } from "./OrderDetailWrapper";
import { SkeletonOrderDetail } from "./SkeletonOrderDetail";
import { randomUUID } from "crypto";
import { checkSession } from "@/app/lib";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await checkSession();
  const { id } = await params;
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonOrderDetail />} key={randomUUID()}>
        <OrderDetailWrapper id={id} />
      </Suspense>
    </div>
  );
}
