import { redirect } from "next/navigation";
import { getMeServer } from "@/lib/auth/getMeServer";
import { CurrentUserProvider } from "@/hooks/auth/current-user";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMeServer();
  if (!me) redirect("/login");

  return <CurrentUserProvider value={me}>{children}</CurrentUserProvider>;
}
