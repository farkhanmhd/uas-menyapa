"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PiMoonStars, PiSun } from "react-icons/pi";
import { useId } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const id = useId();
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle switch"
      />
      <Label htmlFor={id} className="text-green-foreground">
        <span className="sr-only">Toggle switch</span>
        {theme === "light" ? (
          <PiSun size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <PiMoonStars size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </Label>
    </div>
  );
}
