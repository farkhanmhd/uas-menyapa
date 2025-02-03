import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { checkoutAtom } from "@/store";

export const useCheckout = () => {
  const [checkout, setCheckout] = useAtom(checkoutAtom);

  return { checkout, setCheckout };
};

export function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
