import { Link } from "next-view-transitions";
import { PiTiktokLogo, PiInstagramLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="mb-14 border-t bg-green md:mb-0">
      <div className="container mx-auto py-8">
        <div className="px-4">
          <div className="mx-auto grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:justify-items-start lg:grid-cols-4 lg:justify-items-center">
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="mb-4 text-lg font-semibold text-green-foreground">
                Contact
              </h3>
              <p className="flex flex-col gap-y-2 text-sm text-green-foreground">
                <span>Email: uasmenyapa@gmail.com</span>
                <span>
                  Phone:{" "}
                  <a
                    href="tel:+62895330823800"
                    className="text-blue-500 hover:underline"
                  >
                    +62 895‑3308‑23800
                  </a>
                </span>
                <span>
                  WhatsApp Admin 1 :{" "}
                  <a
                    href="https://wa.me/+62895330823800"
                    className="text-blue-500 hover:underline"
                  >
                    +62 895-3308-23800
                  </a>
                </span>
                <span>
                  WhatsApp Admin 2 :{" "}
                  <a
                    href="https://wa.me/+62895601792191"
                    className="text-blue-500 hover:underline"
                  >
                    +62 895-6017-92191
                  </a>
                </span>
              </p>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="mb-4 text-lg font-semibold text-green-foreground">
                About Us
              </h3>
              <Link
                href="/about"
                className="text-sm text-green-foreground hover:text-primary"
              >
                Learn more
              </Link>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="mb-4 text-lg font-semibold text-green-foreground">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-green-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-green-foreground hover:text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center md:px-32 md:text-start lg:px-0">
              <h3 className="mb-4 text-lg font-semibold text-green-foreground">
                Social
              </h3>
              <div className="flex justify-center space-x-4 sm:justify-start">
                <a
                  href="https://www.instagram.com/uasmenyapa?igsh=MWFncGR0NzVka3o0Nw=="
                  className="text-green-foreground hover:text-primary"
                  target="_blank"
                >
                  <PiInstagramLogo className="h-6 w-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@uasmenyapa?_t=ZS-8u5nhl1zlFY&_r=1"
                  className="text-green-foreground hover:text-primary"
                  target="_blank"
                >
                  <PiTiktokLogo className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8">
          <p className="text-center text-sm text-green-foreground">
            &copy; {new Date().getFullYear()} UAS Menyapa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
