"use server";

import { prisma } from "@/lib";

export default async function getEvents() {
  return await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
  });
}
