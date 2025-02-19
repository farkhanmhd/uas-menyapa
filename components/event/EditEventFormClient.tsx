"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { editEventAction } from "@/app/lib/actions/events";
import { EventForm } from "./EventForm";
import type { EventFormData, Question } from "./EventForm";
import { toast } from "@/hooks/use-toast";
import { useTransitionRouter } from "next-view-transitions";

export type EditEventFormClientProps = {
  initialData: EventFormData;
  initialQuestions: Question[];
};

export function EditEventFormClient({
  initialData,
  initialQuestions,
}: EditEventFormClientProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const { push } = useTransitionRouter();
  const params = useParams();
  const id = params.id as string;

  // Handlers (unchanged)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value === "" ? "1" : value }));
  };

  const handleImageUpload = (name: string, file: File | null) => {
    setData((prev) => ({ ...prev, [name]: file }));
  };

  const handleQuestionChange = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Use the editEventAction via useAction hook
  const { execute, isPending, result } = useAction(
    async (formData) => {
      // Prepare final input using state
      const input = {
        id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        venue: formData.get("venue") as string,
        city: formData.get("city") as string,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
        gmapUrl: formData.get("gmapUrl") as string,
        whatsappGroupUrl: formData.get("whatsappGroupUrl") as string,
        posterImage: data.posterImage,
        ticketDesignImage: data.ticketDesignImage,
        certificateImage: data.certificateImage,
        regularPrice: Number(formData.get("regularPrice")),
        vipPrice: Number(formData.get("vipPrice")),
        regularAvailability: Number(formData.get("regularAvailability")),
        vipAvailability: Number(formData.get("vipAvailability")),
      };

      const inputtedData = { ...input, questions };

      return editEventAction(inputtedData as any);
    },
    {
      onSettled: (actionResult) => {
        toast({
          title:
            actionResult?.result?.data?.status === "success"
              ? "Success"
              : "Failed",
          description: actionResult?.result?.data?.message,
          variant:
            actionResult?.result?.data?.status === "success"
              ? "default"
              : "destructive",
        });
        if (actionResult?.result?.data?.status === "success") {
          push("/events");
        }
      },
    },
  );

  return (
    <EventForm
      data={data}
      handleInputChange={handleInputChange}
      handleNumberInputChange={handleNumberInputChange}
      handleImageUpload={handleImageUpload}
      // Pass the edit action to execute on submit.
      execute={execute}
      isPending={isPending}
      errors={{
        titleError: result?.validationErrors?.title?._errors?.join(", "),
        descriptionError:
          result?.validationErrors?.description?._errors?.join(", "),
        venueError: result?.validationErrors?.venue?._errors?.join(", "),
        cityError: result?.validationErrors?.city?._errors?.join(", "),
        startTimeError:
          result?.validationErrors?.startTime?._errors?.join(", "),
        endTimeError: result?.validationErrors?.endTime?._errors?.join(", "),
        gmapUrlError: result?.validationErrors?.gmapUrl?._errors?.join(", "),
        whatsappGroupUrlError:
          result?.validationErrors?.whatsappGroupUrl?._errors?.join(", "),
        regularPriceError:
          result?.validationErrors?.regularPrice?._errors?.join(", "),
        vipPriceError: result?.validationErrors?.vipPrice?._errors?.join(", "),
        regularAvailabilityError:
          result?.validationErrors?.regularAvailability?._errors?.join(", "),
        vipAvailabilityError:
          result?.validationErrors?.vipAvailability?._errors?.join(", "),
      }}
      questions={questions}
      setQuestions={setQuestions}
      handleQuestionChange={handleQuestionChange}
    />
  );
}
