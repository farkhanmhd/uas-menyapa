import { Skeleton } from "@/components/ui/skeleton";

export default function CertificateSkeleton() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-screen-lg">
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <Skeleton className="aspect-[1.414/1] w-full" />
          <Skeleton className="mt-4 h-10 w-40" />
        </div>
      </div>
    </main>
  );
}
