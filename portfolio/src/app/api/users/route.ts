import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, passcode } = body;

    if (!name || !role || !passcode) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Check if passcode is unique
    const existing = await prisma.user.findUnique({
      where: { passcode: passcode.toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ error: "Passcode already exists. Please choose a different one." }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        role,
        passcode: passcode.toLowerCase(),
      }
    });

    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID." }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.code === 'P2003') {
       return NextResponse.json({ error: "Cannot delete user. They have associated projects." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
