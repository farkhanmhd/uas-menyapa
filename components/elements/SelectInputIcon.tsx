import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId } from "react";
import { SelectOption } from "@/types";
import { MapItems } from "@/lib/utils";

export interface SelectOptionWithIcon extends SelectOption {
  icon: React.ReactNode;
}

type Props = {
  options: SelectOptionWithIcon[];
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SelectInputIcon({
  options,
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  const id = useId();
  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-[100] [&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <MapItems
            of={options}
            render={(option, index) => (
              <SelectItem key={index} value={option.value}>
                <div>{option.icon}</div>
                <span className="flex-grow truncate text-center font-semibold">
                  {option.label}
                </span>
              </SelectItem>
            )}
          />
        </SelectContent>
      </Select>
    </div>
  );
}
