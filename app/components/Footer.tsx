import { Link } from "next-view-transitions";
import { PiTiktokLogo, PiInstagramLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <p className='text-sm text-muted-foreground'>
              Email: info@uasmenyapa.com
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>About Us</h3>
            <Link href='/about' className='text-sm text-muted-foreground hover:text-primary'>
              Learn more
            </Link>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/privacy-policy' className='text-sm text-muted-foreground hover:text-primary'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/terms-and-conditions' className='text-sm text-muted-foreground hover:text-primary'>
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Social</h3>
            <div className='flex space-x-4'>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <PiInstagramLogo className='w-6 h-6' />
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <PiTiktokLogo className='w-6 h-6' />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t '>
          <p className='text-center text-xs text-muted-foreground'>&copy; {new Date().getFullYear()} UAS Menyapa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
