import { AlertCircle } from "lucide-react";

type EmptyProps = {
  title: string;
  description: string;
};

export function Empty({ title, description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-10">
      <AlertCircle className="h-12 w-12 text-gray-400" />
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
