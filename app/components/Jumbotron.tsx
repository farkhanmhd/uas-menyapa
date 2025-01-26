import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PiTiktokLogo, PiInstagramLogo } from "react-icons/pi";

export default function Jumbotron() {
  return (
    <div className='relative h-[500px] mb-12'>
      <Image src='/jumbotron-image.jpg' alt='Event crowd' fill style={{ objectFit: "cover" }} priority />
      <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center'>
        <h1 className='text-4xl md:text-6xl text-white font-bold mb-4'>Discover Amazing Events</h1>
        <p className='text-xl md:text-2xl text-white mb-8'>Book your tickets now and create unforgettable memories</p>
        <div className='flex space-x-4'>
          <Button variant='outline' size='lg'>
            <PiInstagramLogo className='mr-2' /> Instagram
          </Button>
          <Button variant='outline' size='lg'>
            <PiTiktokLogo className='mr-2' /> TikTok
          </Button>
        </div>
      </div>
    </div>
  );
}
