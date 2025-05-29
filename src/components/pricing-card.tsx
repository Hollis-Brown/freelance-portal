"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { supabase } from "../../supabase/supabase";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <Card
      className={`w-[350px] relative overflow-hidden ${item.popular ? "border-2 border-blue-400 shadow-xl scale-105" : "border border-[#30363D]"} bg-[#21262D] text-[#C9D1D9]`}
    >
      {item.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 opacity-30" />
      )}
      <CardHeader className="relative">
        {item.popular && (
          <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit mb-4 shadow-lg shadow-blue-500/20">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight text-[#C9D1D9]">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-bold text-[#C9D1D9]">
            ${item?.amount / 100}
          </span>
          <span className="text-[#8B949E]">/{item?.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="relative">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none shadow-lg hover:shadow-blue-500/20 transition-all`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
