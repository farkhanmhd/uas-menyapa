import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const OverviewCard = ({ title, icon: Icon, children }: Props) => {
  return (
    <Card className="p-6">
      <CardHeader className="mb-4 flex flex-row items-center justify-between p-0 text-muted-foreground">
        <span>{title}</span>
        {Icon && <Icon className="h-6 w-6" />}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
};

export const OverviewCardSkeleton = () => {
  return (
    <Card className="p-6">
      <CardHeader className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4" />
      </CardContent>
    </Card>
  );
};
