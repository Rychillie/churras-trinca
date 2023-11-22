"use server";

import { prisma } from "@/lib";
import { Event } from "@prisma/client";

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
  });
}

export async function createEvent({
  name,
  description,
  slug,
  creatorId,
}: Event) {
  return await prisma.event.create({
    data: {
      name: name,
      slug: slug,
      description: description,
      creatorId: creatorId,
      status: "draft",
    },
  });
}

export async function getEvent({ slug }: { slug: Event["slug"] }) {
  return await prisma.event.findUnique({
    where: {
      slug,
    },
    include: {
      creator: true,
      invites: true,
    },
  });
}
