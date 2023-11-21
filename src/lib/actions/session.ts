import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getUser({ session }: { session: Session | null }) {
  if (!session || !session.user.email) return null;

  return await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
}
