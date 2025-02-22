import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PiTiktokLogoBold, PiInstagramLogoBold } from "react-icons/pi";
import Image from "next/image";

export default function Jumbotron() {
  return (
    <div className="relative mb-12">
      <Image
        src="/images/jumbo.jpg"
        alt="Event crowd"
        width={1600}
        height={900}
        priority
        className="w-full object-contain"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex space-x-2">
          <a
            href="https://www.instagram.com/uasmenyapa?igsh=MWFncGR0NzVka3o0Nw=="
            target="_blank"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <PiInstagramLogoBold />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@uasmenyapa?_t=ZS-8u5nhl1zlFY&_r=1"
            target="_blank"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <PiTiktokLogoBold />
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </div>
  );
}
