import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectOption } from "@/types";
import { MapItems } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function RadioInput(props: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium leading-none text-foreground">
        {props.label}
      </legend>
      <RadioGroup
        className="flex flex-wrap gap-2"
        value={props.value}
        onValueChange={props.onChange}
        id={props.id}
        name={props.name}
      >
        <MapItems
          of={props.options}
          render={(option, index) => (
            <div
              key={index}
              className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="after:absolute after:inset-0"
                />
                <Label htmlFor={option.value} className="font-normal">
                  {option.label}
                </Label>
              </div>
            </div>
          )}
        />
      </RadioGroup>
    </fieldset>
  );
}
