import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "../Theme/ThemeToggle";
import { redirect } from "next/navigation";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Image src="/Cinder.svg" alt="logo" width={32} height={32} />
          </div>
          <span className="text-2xl font-bold gradient-text font-heading">Cinder</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button className="hero-button text-white" onClick={() => redirect("/dashboard")}>
            Get Started
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;