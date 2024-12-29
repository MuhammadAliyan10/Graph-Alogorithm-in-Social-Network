import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./lib/prisma";
import { cache } from "react";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      email: databaseUserAttributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
      email: string;
      username: string;
    };
  }
}

interface ExtendedSession {
  id: string;
  expiresAt: string;
  fresh: boolean;
  userId: string;
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  email: string;
}

export const validateRequest = cache(
  async (): Promise<{
    user: DatabaseUserAttributes | null;
    session: ExtendedSession | null;
  }> => {
    const sessionCookieName = lucia.sessionCookieName;
    const sessionId = (await cookies()).get(sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    try {
      const result = await lucia.validateSession(sessionId);

      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        const cookieStore = await cookies();
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        const cookieStore = await cookies();
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      // Construct the user and session objects
      const user = result.user
        ? {
            id: result.user.id,
            email: result.user.email,
            username: result.user.username,
          }
        : null;

      const session = result.session
        ? {
            id: result.session.id,
            expiresAt: result.session.expiresAt.toISOString(),
            fresh: result.session.fresh,
            userId: result.session.userId,
          }
        : null;

      return { user, session };
    } catch (error) {
      console.error("Error validating session:", error);
      return { user: null, session: null };
    }
  }
);

export const logout = async (): Promise<void> => {
  try {
    const sessionCookieName = lucia.sessionCookieName;
    const cookieStore = cookies();
    const sessionId = (await cookieStore).get(sessionCookieName)?.value ?? null;

    if (!sessionId) {
      console.log("No session found to invalidate.");
      return;
    }
    await lucia.invalidateSession(sessionId);

    const blankSessionCookie = lucia.createBlankSessionCookie();
    (await cookieStore).set(
      blankSessionCookie.name,
      blankSessionCookie.value,
      blankSessionCookie.attributes
    );

    redirect("/login");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
