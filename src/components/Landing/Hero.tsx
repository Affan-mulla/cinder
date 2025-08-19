'use client';
import { Button } from "@/components/ui/button";
import { Play, Video, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-36 pb-24 px-4 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10 max-w-lg"
          >
            <div className="space-y-5">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-heading">
                Create High-Quality
                <span className="gradient-text block">Video Sessions</span>
                That Matter
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-body">
                Invite anyone to join crystal-clear video calls with local
                recording. Get high-resolution videos instantly and host them
                with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="text-white">
                <Play className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform font-body" />
                Start Recording
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  HD Recording
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Multi-participant
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={"/hero-video-call.jpg"}
                alt="Cinder video call interface"
                width={400}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-5 -right-5 bg-primary text-white font-heading px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              🔴 Recording
            </motion.div>

            <div className="absolute -bottom-5 -left-5 bg-card border border-border font-heading px-4 py-2 rounded-full text-sm shadow-lg backdrop-blur-sm">
              💎 4K Quality
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
