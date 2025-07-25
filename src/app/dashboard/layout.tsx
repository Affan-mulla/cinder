"use client";
import Sidebar from "./sidebar";
import useUserStore from "@/store/store";
import { useEffect, useState } from "react";
import StoreLoader from "@/components/Loader/StoreLoader";
import axios from "axios";
import MobileNav from "@/components/ui/myComponents/SidebarMob";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setUser = useUserStore((s) => s.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await axios.get("/api/get-user");

        const user = result?.data?.data;

        if (result?.status === 200 && user) {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
            slug: user.slug,
            session_id: "",
            studio_id: user.studioId,
            studio_name: user.studio_name,
          });
        }
      } catch (err: any) {
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  return isLoading ? (
    <StoreLoader />
  ) : (
    <>
      <div className="flex bg-background from-foreground min-h-screen">
        <Sidebar />
        <div className="flex-1 max-h-screen overflow-scroll scroll-smooth pb-16 md:pb-0">
          {children}
        </div>
      </div>
      <MobileNav />
    </>
  );
}
