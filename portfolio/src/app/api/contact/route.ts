import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        company: company || null,
        budget: budget || null,
        message,
      },
    });

    try {
      // Send the email using Resend
      const { data, error } = await resend.emails.send({
        from: `Quantum Mind AI Innovations <info@qmai.in>`,
        to: "qmaiinovations@gmail.com",
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h2>New Project Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Budget:</strong> ${budget || "N/A"}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
      
      if (error) {
        console.error("Resend API error:", error);
      }
    } catch (emailError) {
      console.error("Failed to send email notification, but saved to DB:", emailError);
      // We don't fail the whole request if the email fails, since it's saved in the DB
    }

    return NextResponse.json({ success: true, contactMessage });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit message." },
      { status: 500 }
    );
  }
}
