"use client";

import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  message: string;
  icon: LucideIcon;
};

export default function ErrorComponent({ title, message, icon }: Props) {
  const { refresh } = useRouter();
  return (
    <OverviewCard title={title} icon={icon}>
      <p className="mb-2 text-center">{message}</p>
      <div className="flex w-full justify-center">
        <Button onClick={refresh} className="mx-auto">
          Try again
        </Button>
      </div>
    </OverviewCard>
  );
}
