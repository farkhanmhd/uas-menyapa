import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PhoneInput(props: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (value.length > 0 && !/^\d+$/.test(value)) ||
      (value.length === 1 && value === "0")
    ) {
      return;
    }
    props.onChange(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{props.label}</Label>
      <div className="relative">
        <Input
          id={props.id}
          className="peer ml-1 ps-9 [direction:inherit] placeholder:text-sm"
          placeholder="81234567890"
          inputMode="numeric"
          value={props.value}
          onChange={handleChange}
          name={props.id}
          autoComplete="off"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          +62
        </div>
      </div>
    </div>
  );
}
