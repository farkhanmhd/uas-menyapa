import React from "react";
import CreateEventFormPage from "./CreateEventForm";
import { checkSession, checkRole } from "@/app/lib";
import { redirect } from "next/navigation";

const CreateEventPage = async () => {
  await checkSession();
  const role = await checkRole();

  if (role === "customer") redirect("/");
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Event</h1>
      <CreateEventFormPage />
    </div>
  );
};

export default CreateEventPage;
