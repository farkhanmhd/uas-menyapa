import { atom } from "jotai";
import { CheckoutData } from "@/types";

export const checkoutAtom = atom<CheckoutData | null>(null);
