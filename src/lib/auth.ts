/**
 * Auth helpers — getUser (nullable) and requireUser (redirects if not authed)
 */
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Returns the current user or null. Safe to call anywhere. */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/** Returns the current user or redirects to /login. Use in protected routes. */
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
