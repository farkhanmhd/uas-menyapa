"use client";

import React, { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "@/hooks/use-toast";
import { createEventAction } from "@/app/lib/actions/events";
import { EventForm } from "@/components/event/EventForm";

// Define types matching the ones in EventForm component
export type EventFormData = {
  title: string;
  description: string;
  venue: string;
  city: string;
  startTime: string;
  endTime: string;
  gmapUrl: string;
  whatsappGroupUrl: string;
  posterImage: File | string | null;
  ticketDesignImage: File | string | null;
  certificateImage: File | string | null;
  regularPrice: number | string;
  vipPrice: number | string;
  regularAvailability: number | string;
  vipAvailability: number | string;
};

export type Question = {
  question: string;
  answer: string;
};

const defaultData: EventFormData = {
  title: "",
  description: "",
  venue: "",
  city: "",
  startTime: "",
  endTime: "",
  gmapUrl: "",
  whatsappGroupUrl: "",
  posterImage: null,
  ticketDesignImage: null,
  certificateImage: null,
  regularPrice: 1,
  vipPrice: 1,
  regularAvailability: 1,
  vipAvailability: 1,
};

const defaultQuestions: Question[] = [{ question: "", answer: "" }];

export default function CreateEventFormPage() {
  // All state is managed here:
  const [data, setData] = useState<EventFormData>(defaultData);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const { push } = useTransitionRouter();

  // Standard text input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Number input handler – accepts only digits; defaults to "1" if empty.
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*$/.test(value)) {
      setData((prev) => ({ ...prev, [name]: value === "" ? "1" : value }));
    }
  };

  // Handler for image uploads
  const handleImageUpload = (name: string, file: File | null) => {
    setData((prev) => ({ ...prev, [name]: file }));
  };

  // Handler for question changes
  const handleQuestionChange = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const { execute, isPending, result } = useAction(
    async (formData) => {
      // Prepare final input using state
      const input: EventFormData = {
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

      return createEventAction(inputtedData as any);
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

  // Extract validation errors from the result (if any)
  const errors = {
    titleError: result?.validationErrors?.title?._errors?.join(", "),
    descriptionError:
      result?.validationErrors?.description?._errors?.join(", "),
    venueError: result?.validationErrors?.venue?._errors?.join(", "),
    cityError: result?.validationErrors?.city?._errors?.join(", "),
    startTimeError: result?.validationErrors?.startTime?._errors?.join(", "),
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
  };

  // Pass state and handlers as props to the reusable EventForm component
  return (
    <EventForm
      data={data}
      handleInputChange={handleInputChange}
      handleNumberInputChange={handleNumberInputChange}
      handleImageUpload={handleImageUpload}
      execute={execute}
      isPending={isPending}
      errors={errors}
      questions={questions}
      setQuestions={setQuestions}
      handleQuestionChange={handleQuestionChange}
    />
  );
}
