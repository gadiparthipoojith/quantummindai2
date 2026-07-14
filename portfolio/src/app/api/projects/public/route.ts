import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        progress: 100
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        projectName: true,
        clientName: true,
        progress: true,
        roadmap: true
      }
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching public projects:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
