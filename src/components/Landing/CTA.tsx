import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Ready to get started?</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">
              Start Creating Professional
              <span className="gradient-text block">Video Content Today</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              Join thousands of creators who trust Cinder for their video recording needs. 
              No credit card required.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
            <Button className="hero-button text-white text-lg px-10 py-6">
              Start Recording Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-lg">
              Schedule Demo
            </Button>
          </div>
          
          <div className="pt-8 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              ✨ Free trial • 🚀 No setup required • 🔒 Privacy focused
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;