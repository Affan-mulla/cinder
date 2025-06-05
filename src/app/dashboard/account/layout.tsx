export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex bg-neutral-900">{children}</div>
    </>
  );
}
