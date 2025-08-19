import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 3 recording sessions per month",
        "720p HD recording quality",
        "Up to 2 participants per session",
        "5GB cloud storage",
        "Basic sharing options",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
      variant: "outline" as const,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for professionals and small teams",
      features: [
        "Unlimited recording sessions",
        "4K Ultra HD recording quality",
        "Up to 10 participants per session",
        "100GB cloud storage",
        "Advanced sharing & collaboration",
        "Custom branding options",
        "Priority email & chat support",
        "Advanced analytics",
      ],
      cta: "Start Free Trial",
      popular: true,
      variant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Unlimited participants",
        "Unlimited cloud storage",
        "White-label solutions",
        "Advanced security & compliance",
        "API access & integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom feature development",
      ],
      cta: "Contact Sales",
      popular: false,
      variant: "outline" as const,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Recording Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between relative feature-card hover:scale-105 transition-transform duration-300 ${
                plan.popular ? "ring-2 ring-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-[#ff80b5] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gradient-text">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                  >
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  variant={plan.variant}
                  size="lg"
                  className={`w-full  ${
                    plan.popular ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include our core features and 30-day money-back guarantee
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
