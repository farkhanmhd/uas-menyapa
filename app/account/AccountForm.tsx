"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { useTransitionRouter } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/fragments/PhoneInput";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/fragments/DatePicker";
import RadioInput from "@/components/fragments/RadioInput";
import { SelectOption } from "@/types";
import { ChevronLeft } from "lucide-react";
import { DateValue } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { format } from "date-fns";
import { updateAccountAction } from "../lib/actions/account";
import { toast } from "@/hooks/use-toast";
import LogOutDialog from "@/components/fragments/LogoutDialog";

const genderOpts: SelectOption[] = [
  {
    label: "Pria",
    value: "male",
  },
  {
    label: "Wanita",
    value: "female",
  },
];

const marriageStatusOpts: SelectOption[] = [
  {
    label: "Menikah",
    value: "married",
  },
  {
    label: "Belum Menikah",
    value: "unmarried",
  },
];

type Props = {
  whatsapp?: string;
  name?: string;
  email?: string;
  address: string;
  dateOfBirth: Date;
  gender: string;
  marriageStatus: string;
};

const AccountForm = (props: Props) => {
  const { back } = useTransitionRouter();
  const [name, setName] = useState<string>(props.name || "");
  const [whatsapp, setWhatsapp] = useState<string>(props.whatsapp || "");
  const [gender, setGender] = useState<"male" | "female">(
    (props.gender as "male" | "female") || genderOpts[0].value,
  );
  const [marriage, setMarriage] = useState<"married" | "unmarried">(
    (props.marriageStatus as "married" | "unmarried") ||
      marriageStatusOpts[0].value,
  );
  const [dob, setDob] = useState<DateValue>(
    parseDate(format(props.dateOfBirth, "yyyy-MM-dd")) || new Date(),
  );

  const { execute, isPending, result } = useAction(
    async (formData) => {
      const data = {
        whatsapp: formData.get("whatsapp"),
        name: formData.get("name") as string,
        address: formData.get("address") as string,
        dateOfBirth: new Date(dob.toString()),
        gender,
        marriageStatus: marriage,
      };

      return updateAccountAction(data);
    },
    {
      onSettled: (actionResult) => {
        if (actionResult?.result?.data) {
          const { message } = actionResult?.result?.data;

          toast({
            title:
              message !== "Account updated successfully" ? "Failed" : "Success",
            description: message,
            variant:
              message !== "Account updated successfully"
                ? "destructive"
                : "default",
          });
        }
      },
    },
  );

  const whatsappError = result?.validationErrors?.whatsapp?._errors?.join();
  const nameError = result?.validationErrors?.name?._errors?.join();

  return (
    <>
      <div className="mx-6 flex items-center gap-x-2 sm:mx-0 sm:mb-6">
        <Button onClick={back} size="icon" variant="ghost">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Account</h1>
      </div>
      <Card className="border-0 shadow-none sm:border">
        <CardHeader>
          <CardDescription>
            Data diri Anda akan digunakan untuk melakukan pembayaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={execute} className="flex flex-col gap-y-6">
            <div className="space-y-2">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Nama Lengkap"
                  className={cn("placeholder:text-sm", {
                    "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                      nameError,
                  })}
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
                {nameError && (
                  <span
                    className="mt-2 block text-sm text-destructive"
                    aria-live="polite"
                  >
                    {nameError}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                disabled
                defaultValue={props.email || ""}
                className="placeholder:text-sm"
              />
            </div>
            <div>
              <PhoneInput
                label="Nomor Whatsapp"
                id="whatsapp"
                value={whatsapp}
                onChange={setWhatsapp}
                className={cn({
                  "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                    whatsappError,
                })}
              />
              {whatsappError && (
                <span
                  className="mt-2 block text-sm text-destructive"
                  aria-live="polite"
                >
                  {whatsappError}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                placeholder="Jalan Jendral Sudirman No. 1 Medan"
                className="placeholder:text-sm"
                autoComplete="off"
                defaultValue={props.address}
                name="address"
              />
            </div>
            <DatePicker
              label="Tanggal Lahir"
              id="date-of-birth"
              date={dob}
              onChange={(date: DateValue | null) => setDob(date as DateValue)}
            />
            <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
              <RadioInput
                options={genderOpts}
                label="Jenis Kelamin"
                id="gender"
                name="gender"
                value={gender}
                onChange={setGender as (value: string) => void}
              />
              <RadioInput
                options={marriageStatusOpts}
                label="Status Pernikahan"
                id="marriage-status"
                name="marriage-status"
                value={marriage}
                onChange={setMarriage as (value: string) => void}
              />
            </div>
            <CardFooter className="mt-3 flex justify-end">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full sm:w-auto"
              >
                Simpan
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <div className="px-4 md:px-0">
        <LogOutDialog>
          <Button variant="secondary" className="mt-6 w-full">
            Logout
          </Button>
        </LogOutDialog>
      </div>
    </>
  );
};

export default AccountForm;
