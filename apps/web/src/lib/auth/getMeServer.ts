import "server-only";
import { cookies } from "next/headers";

export async function getMeServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new Error(`Auth check failed: ${res.status}`);

  return res.json();
}
