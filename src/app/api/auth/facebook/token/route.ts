import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(request: Request) {
  try {
    const { facebook_id } = await request.json();

    if (!facebook_id) {
      return NextResponse.json(
        { message: "facebook_id is required" },
        { status: 400 }
      );
    }

    const user = await prisma.facebookUser.findUnique({
      where: { facebook_id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, facebookId: user.facebook_id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { message: "Failed to generate token" },
      { status: 500 }
    );
  }
}
