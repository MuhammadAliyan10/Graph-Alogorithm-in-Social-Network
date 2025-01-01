import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      facebook_id,
      name,
      first_name,
      last_name,
      email,
      gender,
      birthday,
      location,
      hometown,
      profile_picture,
      link,
      cover,
      about,
      relationship_status,
      work,
      education,
      posts,
      likes,
      friends,
    } = body;

    // Check if user exists
    const existingUser = await prisma.facebookUser.findUnique({
      where: { facebook_id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create new Facebook user
    const newUser = await prisma.facebookUser.create({
      data: {
        facebook_id,
        name,
        first_name,
        last_name,
        email,
        gender,
        birthday,
        location,
        hometown,
        profile_picture,
        link,
        cover,
        about,
        relationship_status,
        work,
        education,
        posts,
        likes,
        friends,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error saving Facebook user data:", error);
    return NextResponse.json(
      { message: "Failed to add user data" },
      { status: 500 }
    );
  }
}
