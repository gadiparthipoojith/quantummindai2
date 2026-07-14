import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: {
          not: "admin"
        }
      },
      select: {
        id: true,
        name: true,
        clientAlias: true,
        role: true
      }
    });

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
