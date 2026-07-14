import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    let projects = [];

    // Admins see all projects, clients see their own
    if (user.role === "admin") {
      projects = await prisma.project.findMany();
    } else {
      projects = await prisma.project.findMany({
        where: { clientId: user.id },
      });
    }

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientId, projectName, clientName, budget, timeline, progress, roadmap, documents } = body;

    if (!clientId || !projectName) {
      return NextResponse.json({ error: "Client ID and Project Name are required." }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        clientId,
        clientName: clientName || "Unknown Client",
        projectName,
        budget: budget || "TBD",
        timeline: timeline || "TBD",
        progress: progress || 0,
        roadmap: roadmap || "[]",
        documents: documents || "[]",
      }
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, progress, roadmap } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(progress !== undefined && { progress }),
        ...(roadmap && { roadmap })
      }
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
