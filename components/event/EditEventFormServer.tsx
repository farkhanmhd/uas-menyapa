import React from "react";
import { EditEventFormClient } from "./EditEventFormClient";
import type { EventFormData, Question } from "./EventForm";
import { getEditEventData } from "@/app/lib/events";

export default async function EditEventFormServer({ id }: { id: string }) {
  const json = await getEditEventData(id);
  const initialData: EventFormData = json.data;
  const initialQuestions: Question[] = json.questions;

  return (
    <EditEventFormClient
      initialData={initialData}
      initialQuestions={initialQuestions}
    />
  );
}
