import { Button } from "@/components/ui/button";
import { PiTiktokLogoBold, PiInstagramLogoBold } from "react-icons/pi";

export default function Jumbotron() {
  return (
    <div className="relative mb-12">
      <img
        src="/images/jumbo.jpg"
        alt="Event crowd"
        width={1600}
        height={900}
        className="w-full object-contain"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex space-x-2">
          <Button size="lg">
            <PiInstagramLogoBold />
            <span>Instagram</span>
          </Button>
          <Button size="lg">
            <PiTiktokLogoBold />
            <span>TikTok</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
