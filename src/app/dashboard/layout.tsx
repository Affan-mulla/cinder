"use client";
import Sidebar from "./sidebar";
import useUserStore from "@/store/store";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/actions/getUserDetails";
import StoreLoader from "@/components/Loader/StoreLoader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setUser = useUserStore((s) => s.setUser)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getUserDetails();
        const user = result?.data?.[0];
        if (result?.status === 200 && user) {
          setUser(user);
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
      <div className="flex bg-neutral-900">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
