import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";

type Props<T> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T; disabled?: boolean }[];
  disabled?: boolean;
};

export default function RadioVariant<T extends string>({ ...props }: Props<T>) {
  const id = useId();

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium leading-none text-foreground">
        {props.label}
      </legend>
      <RadioGroup
        className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2"
        defaultValue={props.options[0].value}
        value={props.value}
        onValueChange={props.onChange}
        disabled={props.disabled}
      >
        {props.options.map(
          (item: { label: string; value: T; disabled?: boolean }) => (
            <label
              key={`${id}-${item.value}`}
              className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
            >
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                className="sr-only after:absolute after:inset-0"
                disabled={item.disabled}
              />
              <p className="text-sm font-medium leading-none text-foreground">
                {item.label}
              </p>
            </label>
          ),
        )}
      </RadioGroup>
    </fieldset>
  );
}
