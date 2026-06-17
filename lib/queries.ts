import { prisma } from "@/lib/db";

export async function getPackages() {
  return prisma.servicePackage.findMany({
    orderBy: [{ highlight: "desc" }, { priceCny: "asc" }]
  });
}

export async function getPrimaryOrder() {
  return prisma.order.findFirst({
    orderBy: { updatedAt: "desc" },
    include: {
      servicePackage: true,
      merchantProfile: true,
      taskSpec: true,
      operatorTask: {
        include: { checklist: true }
      },
      hostedSite: true
    }
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      servicePackage: true,
      merchantProfile: true,
      taskSpec: true,
      operatorTask: {
        include: { checklist: true }
      },
      hostedSite: true
    }
  });
}

export async function getSiteById(id: string) {
  return prisma.hostedSite.findUnique({
    where: { id },
    include: {
      merchantProfile: true,
      order: {
        include: { servicePackage: true }
      }
    }
  });
}

export async function getSiteBySlug(slug: string) {
  return prisma.hostedSite.findUnique({
    where: { slug },
    include: {
      merchantProfile: true,
      order: {
        include: { servicePackage: true }
      }
    }
  });
}

export async function getOperatorTasks() {
  return prisma.operatorTask.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      checklist: true,
      operatorUser: true,
      order: {
        include: {
          servicePackage: true,
          merchantProfile: true,
          taskSpec: true,
          hostedSite: true
        }
      }
    }
  });
}
