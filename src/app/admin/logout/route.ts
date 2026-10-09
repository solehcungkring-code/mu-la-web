import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl, 303);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl, 303);
}
