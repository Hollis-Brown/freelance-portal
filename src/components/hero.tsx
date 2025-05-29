import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FileText,
  Clock,
  MessageSquare,
  CreditCard,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#0D1117]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] opacity-90" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-[#C9D1D9] mb-8 tracking-tight">
              Seamless{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Client Portals
              </span>{" "}
              for Freelancers
            </h1>

            <p className="text-xl text-[#8B949E] mb-12 max-w-2xl mx-auto leading-relaxed">
              Secure, unique URLs for each client project with no login
              required. Share files, track progress, and collect feedback with
              our modern dark-themed portal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-blue-500/20 text-lg font-medium"
              >
                Create Client Portal
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-[#C9D1D9] bg-[#21262D] border border-[#30363D] rounded-lg hover:bg-[#30363D] transition-colors text-lg font-medium"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-[#8B949E]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Secure file sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Visual status tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Client feedback collection</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <span>Integrated payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
