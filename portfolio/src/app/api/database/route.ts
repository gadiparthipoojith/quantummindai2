import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });

    const contactMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });

    const projects = await prisma.project.findMany({
      orderBy: { id: "desc" },
      include: { client: true }
    });

    const loginLogs = await prisma.loginLog.findMany({
      orderBy: { loginAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        users,
        contactMessages,
        projects,
        loginLogs
      }
    });
  } catch (error) {
    console.error("Error fetching database view:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
