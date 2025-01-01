import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const facebook_id = searchParams.get("facebook_id");

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

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching Facebook user data:", error);
    return NextResponse.json(
      { message: "Failed to get user data" },
      { status: 500 }
    );
  }
}
