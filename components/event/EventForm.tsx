"use client";

import React from "react";
import { useTransitionRouter } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageUploadDropzone from "@/components/fragments/image-upload";
import { Label } from "react-aria-components";
import { cn } from "@/lib/utils";

// Extend types to include questions
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

export type EventFormProps = {
  data: EventFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (name: string, file: File | null) => void;
  execute: (formData: FormData) => void;
  isPending: boolean;
  errors: {
    titleError?: string;
    descriptionError?: string;
    venueError?: string;
    cityError?: string;
    startTimeError?: string;
    endTimeError?: string;
    gmapUrlError?: string;
    whatsappGroupUrlError?: string;
    regularPriceError?: string;
    vipPriceError?: string;
    regularAvailabilityError?: string;
    vipAvailabilityError?: string;
  };
  // New props for questions
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  handleQuestionChange: (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => void;
};

export function EventForm({
  data,
  handleInputChange,
  handleNumberInputChange,
  handleImageUpload,
  execute,
  isPending,
  errors,
  questions,
  setQuestions,
  handleQuestionChange,
}: EventFormProps) {
  const { back } = useTransitionRouter();

  const handleCancel = () => back();

  return (
    <form action={execute} className="mb-6 space-y-8">
      {/* Title Field */}
      <Card>
        <CardTitle className="px-6 pt-6 text-2xl">Event Title</CardTitle>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Input
              name="title"
              id="title"
              value={data.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              className={cn("placeholder:text-sm", {
                "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                  errors.titleError,
              })}
            />
            {errors.titleError && (
              <p className="text-xs text-destructive">{errors.titleError}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Image Uploads */}
      <Card>
        <CardTitle className="px-6 pt-6 text-2xl">Images</CardTitle>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label
                htmlFor="posterImage"
                className="text-sm font-medium text-foreground"
              >
                Poster Image
              </Label>
              <ImageUploadDropzone
                label="Poster Image"
                image={data.posterImage as any}
                setImage={(file) => handleImageUpload("posterImage", file)}
                id="posterImage"
                hideLabel
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ticketDesignImage"
                className="text-sm font-medium text-foreground"
              >
                Ticket Design Image
              </Label>
              <ImageUploadDropzone
                label="Ticket Design Image"
                image={data.ticketDesignImage as any}
                setImage={(file) =>
                  handleImageUpload("ticketDesignImage", file)
                }
                id="ticketDesignImage"
                hideLabel
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="certificateImage"
                className="text-sm font-medium text-foreground"
              >
                Certificate Image
              </Label>
              <ImageUploadDropzone
                label="Certificate Image"
                image={data.certificateImage as any}
                setImage={(file) => handleImageUpload("certificateImage", file)}
                id="certificateImage"
                hideLabel
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardTitle className="px-6 pt-6 text-2xl">Event Description</CardTitle>
        <CardContent className="space-y-2 pt-6">
          <Textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleInputChange}
            className={cn("placeholder:text-sm", {
              "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                errors.descriptionError,
            })}
            rows={20}
          />
          {errors.descriptionError && (
            <p className="text-xs text-destructive">
              {errors.descriptionError}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Venue, City, Times, URLs */}
        <Card>
          <CardTitle className="px-6 pt-6 text-2xl">Event Details</CardTitle>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="venue"
                  className="text-sm font-medium text-foreground"
                >
                  Venue
                </Label>
                <Input
                  name="venue"
                  id="venue"
                  value={data.venue}
                  onChange={handleInputChange}
                  placeholder="Enter venue"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.venueError,
                  })}
                />
                {errors.venueError && (
                  <p className="text-xs text-destructive">
                    {errors.venueError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-foreground"
                >
                  City
                </Label>
                <Input
                  name="city"
                  id="city"
                  value={data.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.cityError,
                  })}
                />
                {errors.cityError && (
                  <p className="text-xs text-destructive">{errors.cityError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="startTime"
                  className="text-sm font-medium text-foreground"
                >
                  Start Time
                </Label>
                <Input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={data.startTime}
                  onChange={handleInputChange}
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.startTimeError,
                  })}
                />
                {errors.startTimeError && (
                  <p className="text-xs text-destructive">
                    {errors.startTimeError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="endTime"
                  className="text-sm font-medium text-foreground"
                >
                  End Time
                </Label>
                <Input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={data.endTime}
                  onChange={handleInputChange}
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.endTimeError,
                  })}
                />
                {errors.endTimeError && (
                  <p className="text-xs text-destructive">
                    {errors.endTimeError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="gmapUrl"
                  className="text-sm font-medium text-foreground"
                >
                  Google Maps URL
                </Label>
                <Input
                  name="gmapUrl"
                  id="gmapUrl"
                  value={data.gmapUrl}
                  onChange={handleInputChange}
                  placeholder="Enter Google Maps URL"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.gmapUrlError,
                  })}
                />
                {errors.gmapUrlError && (
                  <p className="text-xs text-destructive">
                    {errors.gmapUrlError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="whatsappGroupUrl"
                  className="text-sm font-medium text-foreground"
                >
                  WhatsApp Group URL
                </Label>
                <Input
                  name="whatsappGroupUrl"
                  id="whatsappGroupUrl"
                  value={data.whatsappGroupUrl}
                  onChange={handleInputChange}
                  placeholder="Enter WhatsApp Group URL"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.whatsappGroupUrlError,
                  })}
                />
                {errors.whatsappGroupUrlError && (
                  <p className="text-xs text-destructive">
                    {errors.whatsappGroupUrlError}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Availability */}
        <Card>
          <CardTitle className="px-6 pt-6 text-2xl">
            Pricing and Availability
          </CardTitle>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="regularPrice"
                  className="text-sm font-medium text-foreground"
                >
                  Regular Price
                </Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  name="regularPrice"
                  id="regularPrice"
                  value={data.regularPrice}
                  onChange={handleNumberInputChange}
                  placeholder="Enter regular price"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.regularPriceError,
                  })}
                />
                {errors.regularPriceError && (
                  <p className="text-xs text-destructive">
                    {errors.regularPriceError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="vipPrice"
                  className="text-sm font-medium text-foreground"
                >
                  VIP Price
                </Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  name="vipPrice"
                  id="vipPrice"
                  value={data.vipPrice}
                  onChange={handleNumberInputChange}
                  placeholder="Enter VIP price"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      errors.vipPriceError,
                  })}
                />
                {errors.vipPriceError && (
                  <p className="text-xs text-destructive">
                    {errors.vipPriceError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="regularAvailability"
                  className="text-sm font-medium text-foreground"
                >
                  Regular Ticket Availability
                </Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  name="regularAvailability"
                  id="regularAvailability"
                  value={data.regularAvailability}
                  onChange={handleNumberInputChange}
                  placeholder="Enter regular ticket availability"
                  className={cn("placeholder:text-sm", {
                    "focus-visible/ring-destructive/20 border-destructive/80 text-destructive focus-visible:border-destructive/80":
                      errors.regularAvailabilityError,
                  })}
                />
                {errors.regularAvailabilityError && (
                  <p className="text-xs text-destructive">
                    {errors.regularAvailabilityError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="vipAvailability"
                  className="text-sm font-medium text-foreground"
                >
                  VIP Ticket Availability
                </Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  name="vipAvailability"
                  id="vipAvailability"
                  value={data.vipAvailability}
                  onChange={handleNumberInputChange}
                  placeholder="Enter VIP ticket availability"
                  className={cn("placeholder:text-sm", {
                    "focus-visible/ring-destructive/20 border-destructive/80 text-destructive focus-visible:border-destructive/80":
                      errors.vipAvailabilityError,
                  })}
                />
                {errors.vipAvailabilityError && (
                  <p className="text-xs text-destructive">
                    {errors.vipAvailabilityError}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions Section */}
      <Card>
        <CardTitle className="px-6 pt-6 text-2xl">
          <h3>Event Questions and Answers</h3>
        </CardTitle>
        <CardContent className="pt-6">
          {/*
            Render each question with its respective input fields.
            For each question, allow editing the question and answer.
          */}
          {questions.map((q, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor={`question-${index}`}
                  className="text-sm font-medium text-foreground"
                >
                  Question {index + 1}
                </Label>
                <Input
                  id={`question-${index}`}
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  className="placeholder:text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`answer-${index}`}
                  className="text-sm font-medium text-foreground"
                >
                  Answer {index + 1}
                </Label>
                <Textarea
                  id={`answer-${index}`}
                  value={q.answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "answer", e.target.value)
                  }
                  className="placeholder:text-sm"
                />
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    setTimeout(() => {
                      // Remove question from array
                      const newQuestions = [...questions];
                      newQuestions.splice(index, 1);
                      // Using onChange handler from parent
                      handleQuestionChange(index, "question", "");
                      setQuestions(newQuestions);
                    }, 0)
                  }
                >
                  Remove Question
                </Button>
              )}
            </div>
          ))}
          {questions.length < 5 && (
            <Button
              type="button"
              className="mt-4"
              onClick={() =>
                setQuestions([...questions, { question: "", answer: "" }])
              }
            >
              Add Question
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex w-full justify-between">
        <Button
          className="max-w-max"
          variant="secondary"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="max-w-max" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
