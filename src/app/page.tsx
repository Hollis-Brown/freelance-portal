import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  FileText,
  Clock,
  MessageSquare,
  CreditCard,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9]">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-[#161B22] border-t border-[#30363D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#C9D1D9]">
              Client Portal Features
            </h2>
            <p className="text-[#8B949E] max-w-2xl mx-auto">
              Everything you need to manage client projects with a sleek, modern
              interface inspired by Next.js documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "File Sharing",
                description:
                  "Multiple file upload/download with monospace display of filename, size, and date",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Status Tracker",
                description:
                  "Color-coded badges showing project progress from Not Started to Completed",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Client Feedback",
                description:
                  "Dark-themed textarea with prominent glowing Approve button",
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "Payment Integration",
                description:
                  "Embedded Stripe Checkout with subtle neon glows and smooth transitions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-[#21262D] border border-[#30363D] rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#C9D1D9]">
                  {feature.title}
                </h3>
                <p className="text-[#8B949E]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#C9D1D9]">
              How It Works
            </h2>
            <p className="text-[#8B949E] max-w-2xl mx-auto">
              A simple, secure process for you and your clients
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

              {[
                {
                  number: "1",
                  title: "Create Portal",
                  description:
                    "Set up a unique client portal with a secure URL",
                },
                {
                  number: "2",
                  title: "Share Access",
                  description:
                    "Send the link to your client - no login required",
                },
                {
                  number: "3",
                  title: "Collaborate",
                  description:
                    "Exchange files, updates, and get paid seamlessly",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#C9D1D9]">
                    {step.title}
                  </h3>
                  <p className="text-[#8B949E]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#161B22] to-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                100%
              </div>
              <div className="text-[#8B949E]">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                3x
              </div>
              <div className="text-[#8B949E]">Faster Approvals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                24/7
              </div>
              <div className="text-[#8B949E]">Secure Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-24 bg-[#161B22] border-t border-[#30363D]"
        id="pricing"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#C9D1D9]">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[#8B949E] max-w-2xl mx-auto">
              Choose the perfect plan for your freelance business. No hidden
              fees.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0D1117] border-t border-[#30363D]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#C9D1D9]">
            Ready to Streamline Your Client Work?
          </h2>
          <p className="text-[#8B949E] mb-8 max-w-2xl mx-auto">
            Create your first client portal in minutes and transform your
            freelance business.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-blue-500/20 text-lg font-medium"
          >
            Create Client Portal
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
