import { Link } from "next-view-transitions";
import { PiTiktokLogo, PiInstagramLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-green border-t">
      <div className="container mx-auto py-8">
        <div className="px-4">
          <div className="mx-auto grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:justify-items-start lg:grid-cols-4 lg:justify-items-center">
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="text-green-foreground mb-4 text-lg font-semibold">
                Contact
              </h3>
              <p className="text-green-foreground text-sm">
                Email: info@uasmenyapa.com
                <br />
                Phone: (123) 456-7890
              </p>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="text-green-foreground mb-4 text-lg font-semibold">
                About Us
              </h3>
              <Link
                href="/about"
                className="text-green-foreground text-sm hover:text-primary"
              >
                Learn more
              </Link>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="text-green-foreground mb-4 text-lg font-semibold">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-green-foreground text-sm hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-green-foreground text-sm hover:text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="text-green-foreground mb-4 text-lg font-semibold">
                Social
              </h3>
              <div className="flex justify-center space-x-4 sm:justify-start">
                <a
                  href="#"
                  className="text-green-foreground hover:text-primary"
                >
                  <PiInstagramLogo className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-green-foreground hover:text-primary"
                >
                  <PiTiktokLogo className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8">
          <p className="text-green-foreground text-center text-xs">
            &copy; {new Date().getFullYear()} UAS Menyapa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
