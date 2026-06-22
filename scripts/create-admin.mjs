// Бутстрап для прод-контейнера: создаёт админа и строку EventSettings.
// Чистый ESM на runtime-зависимостях (@prisma/client, bcryptjs) — без tsx и src.
// Полное демо-наполнение — отдельно через `npm run db:seed` (dev/CLI).
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@nevabuildexpo.ru";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.ADMIN_NAME || "Администратор";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "SUPER_ADMIN", isActive: true },
    create: { email, name, passwordHash, role: "SUPER_ADMIN" },
  });
  console.log(`✓ admin: ${email}`);

  const existing = await prisma.eventSettings.findUnique({ where: { id: "default" } });
  if (!existing) {
    await prisma.eventSettings.create({
      data: {
        id: "default",
        titleRu: "Международная строительно-интерьерная выставка и форум",
        titleEn: "International Building & Interior Exhibition and Forum",
        dateStart: new Date("2027-04-13T00:00:00.000Z"),
        dateEnd: new Date("2027-04-15T00:00:00.000Z"),
        venueRu: "КВЦ «Экспофорум»",
        venueEn: "Expoforum",
        cityRu: "Санкт-Петербург",
        cityEn: "Saint Petersburg",
        phone: "+7 495 423 39 33",
        email: "info@neva-expo.ru",
        addressRu: "Санкт-Петербург, Петербургское шоссе, 64/1",
        addressEn: "Saint Petersburg, Peterburgskoe shosse 64/1",
        visitorCount: 15000,
        exhibitorCount: 350,
        areaSize: 20000,
        programEventsCount: 30,
        programDays: 3,
        organizerRu: "ООО «Идеалист»",
        organizerEn: "Idealist LLC",
        domains: ["nevabuildexpo.ru", "neva-build.ru", "expo-neva.ru"],
      },
    });
    console.log("✓ EventSettings created");
  } else {
    console.log("• EventSettings already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
