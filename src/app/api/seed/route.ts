import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  return NextResponse.json({ success: false, message: "Seeding is disabled for safety." }, { status: 403 });
}
