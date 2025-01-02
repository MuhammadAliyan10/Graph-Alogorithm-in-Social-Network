import { NextResponse } from "next/server";
import { getFacebookTokenExpiry } from "@/utils/facebook";
import { validateRequest } from "@/auth"; // Your authentication logic

export async function POST(request: Request) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is required" },
        { status: 400 }
      );
    }

    const { isValid, expiresAt } = await getFacebookTokenExpiry(accessToken);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid Facebook access token" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Token is valid",
        expiresAt: expiresAt.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      { message: "Error validating token", error: (error as Error).message },
      { status: 500 }
    );
  }
}
