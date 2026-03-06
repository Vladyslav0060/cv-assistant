import { redirect } from "next/navigation";
import { getMeServer } from "@/lib/auth/getMeServer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMeServer();
  if (!me) redirect("/login");

  return <>{children}</>;
}
