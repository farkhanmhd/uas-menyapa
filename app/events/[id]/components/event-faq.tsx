import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapItems } from "@/lib/utils";

type Props = {
  questions: string[];
  answers: string[];
};

export default function EventFAQ({ questions, answers }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <MapItems
          of={questions}
          render={(question, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answers[index]}</AccordionContent>
            </AccordionItem>
          )}
        />
      </Accordion>
    </div>
  );
}
