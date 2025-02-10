"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { useTransitionRouter } from "next-view-transitions";
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

  const { execute, isPending } = useAction(
    async (formData) => {
      const data = {
        whatsapp: `+62${formData.get("whatsapp")}`,
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
        console.log(actionResult);
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
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Nama Lengkap"
                className="placeholder:text-sm"
                autoComplete="off"
                defaultValue={props.name || ""}
                name="name"
              />
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
            <PhoneInput
              label="Nomor Whatsapp"
              id="whatsapp"
              value={whatsapp}
              onChange={setWhatsapp}
            />
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
              onChange={setDob}
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
                label="Jenis Kelamin"
                id="gender"
                name="gender"
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
    </>
  );
};

export default AccountForm;
