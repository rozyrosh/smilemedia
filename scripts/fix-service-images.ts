import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fixes = [
  {
    num: "04",
    imageUrl: "/assets/images/samples/Urban Pose with Fire Hydrant.png",
  },
  {
    num: "05",
    imageUrl: "/assets/images/samples/lap.png",
  },
  {
    num: "06",
    imageUrl: "/assets/images/samples/Modern Watch Display.png",
  },
];

async function main() {
  for (const fix of fixes) {
    const result = await prisma.service.updateMany({
      where: { num: fix.num },
      data: { imageUrl: fix.imageUrl },
    });
    console.log(`Updated service ${fix.num}: ${result.count} row(s)`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
