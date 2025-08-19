import { Video, Users, Download, Shield, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Video,
      title: "High-Resolution Recording",
      description:
        "Capture every detail with crystal-clear 4K video recording that happens locally on your device.",
    },
    {
      icon: Users,
      title: "Easy Invitations",
      description:
        "Invite anyone with a simple link. No accounts required for participants to join your video sessions.",
    },
    {
      icon: Download,
      title: "Instant Downloads",
      description:
        "Get your high-quality recordings immediately after the session ends. No waiting, no processing delays.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your recordings stay on your device. We prioritize your privacy with local storage and secure connections.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Start recording in seconds. Our optimized platform ensures smooth performance even with multiple participants.",
    },
    {
      icon: Globe,
      title: "Share Anywhere",
      description:
        "Host and share your videos on any platform. Export in multiple formats for maximum compatibility.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-6 font-heading"
          >
            Everything You Need for
            <span className="gradient-text block">
              Professional Recording
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto font-body"
          >
            Cinder combines the simplicity of video calling with the power of
            professional recording tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl bg-card p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
