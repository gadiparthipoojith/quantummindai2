import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, passcode } = body;

    if (!name || !passcode) {
      return NextResponse.json(
        { error: "Name and passcode are required." },
        { status: 400 }
      );
    }

    const cleanPasscode = passcode.trim().toLowerCase();

    // Check if passcode is already taken
    const existingUser = await prisma.user.findUnique({
      where: { passcode: cleanPasscode },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This passcode is already taken. Please choose another." },
        { status: 409 }
      );
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        passcode: cleanPasscode,
        role: "client", // Default role for signups
        clientAlias: name.trim().toLowerCase().replace(/[^a-z0-9]/g, '_'),
      },
    });

    // Log the creation/login
    await prisma.loginLog.create({
      data: {
        userId: newUser.id,
        userName: newUser.name,
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        role: newUser.role,
        name: newUser.name,
        clientAlias: newUser.clientAlias,
      },
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
