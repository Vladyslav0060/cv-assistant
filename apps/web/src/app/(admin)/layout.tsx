import { redirect } from "next/navigation";
import { getMeServer } from "@/lib/auth/getMeServer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("admin layout log");
  const me = await getMeServer();
  if (!me) redirect("/login");
  if (me.role !== "admin") redirect("/403"); // или "/"
  return <>{children}</>;
}
