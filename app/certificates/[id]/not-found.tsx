import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Certificate Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          The certificate you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
