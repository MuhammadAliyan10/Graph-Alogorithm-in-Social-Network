import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { validateRequest } from "@/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(request: Request) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { facebook_id, name, email } = body;

    if (!facebook_id) {
      return NextResponse.json(
        { message: "facebook_id is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: loggedInUser.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If the user does not already have a providerId set to the facebook_id, update it
    if (user.providerId !== facebook_id) {
      await prisma.user.update({
        where: { id: loggedInUser.id },
        data: {
          providerId: facebook_id,
        },
      });
    }

    let facebookUser = await prisma.facebookUser.findUnique({
      where: { facebook_id },
    });

    if (!facebookUser) {
      facebookUser = await prisma.facebookUser.create({
        data: {
          facebook_id,
          name: name || "Unknown User",
          email: email || null,
          userId: loggedInUser.id,
        },
      });
    }

    // Step 4: Generate a JWT token for the user
    const token = jwt.sign(
      { userId: loggedInUser.id, facebookId: facebookUser.facebook_id }, // Payload for the token
      JWT_SECRET, // The secret key to sign the token
      { expiresIn: "1h" } // Set the token expiration time to 1 hour
    );

    // Step 5: Return the token in the response
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating token:", error.message);
    } else {
      console.error("Unknown error:", error);
    }

    return NextResponse.json(
      {
        message: "Failed to generate token",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
