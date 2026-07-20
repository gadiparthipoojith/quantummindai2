import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode) {
      return NextResponse.json(
        { error: "Passcode is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { passcode: passcode.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid passcode." },
        { status: 401 }
      );
    }

    // Fire-and-forget: create login log asynchronously so it doesn't block the HTTP response
    prisma.loginLog.create({
      data: {
        userId: user.id,
        userName: user.name,
      }
    }).catch((err) => {
      console.error("Error creating login log asynchronously:", err);
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        clientAlias: user.clientAlias,
      },
    });
  } catch (error) {
    console.error("Error authenticating:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
