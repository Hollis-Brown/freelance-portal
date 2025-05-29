import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1117] border-t border-[#30363D]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-[#C9D1D9] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-[#8B949E] hover:text-blue-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[#8B949E] hover:text-blue-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-[#8B949E] hover:text-blue-400"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-[#C9D1D9] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-[#C9D1D9] mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-[#C9D1D9] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B949E] hover:text-blue-400">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#30363D]">
          <div className="text-[#8B949E] mb-4 md:mb-0">
            © {currentYear} Freelance Portal. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-[#8B949E] hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-[#8B949E] hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-[#8B949E] hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
