import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { EVENT_DEFAULTS } from "../src/lib/event-defaults";

const prisma = new PrismaClient();

function slug(input: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  return input
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  console.log("🌱  Seeding NEVA BUILD database…");

  // --- EventSettings (singleton) ---
  await prisma.eventSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      titleRu: EVENT_DEFAULTS.titleRu,
      titleEn: EVENT_DEFAULTS.titleEn,
      dateStart: new Date(EVENT_DEFAULTS.dateStart),
      dateEnd: new Date(EVENT_DEFAULTS.dateEnd),
      venueRu: EVENT_DEFAULTS.venueRu,
      venueEn: EVENT_DEFAULTS.venueEn,
      cityRu: EVENT_DEFAULTS.cityRu,
      cityEn: EVENT_DEFAULTS.cityEn,
      phone: EVENT_DEFAULTS.phone,
      email: EVENT_DEFAULTS.email,
      addressRu: EVENT_DEFAULTS.addressRu,
      addressEn: EVENT_DEFAULTS.addressEn,
      visitorCount: EVENT_DEFAULTS.visitorCount,
      exhibitorCount: EVENT_DEFAULTS.exhibitorCount,
      areaSize: EVENT_DEFAULTS.areaSize,
      programEventsCount: EVENT_DEFAULTS.programEventsCount,
      programDays: EVENT_DEFAULTS.programDays,
      seoTitleRu: EVENT_DEFAULTS.seoTitleRu,
      seoTitleEn: EVENT_DEFAULTS.seoTitleEn,
      seoDescriptionRu: EVENT_DEFAULTS.seoDescriptionRu,
      seoDescriptionEn: EVENT_DEFAULTS.seoDescriptionEn,
      organizerRu: EVENT_DEFAULTS.organizerRu,
      organizerEn: EVENT_DEFAULTS.organizerEn,
      social: EVENT_DEFAULTS.social,
      domains: [...EVENT_DEFAULTS.domains],
    },
  });

  // --- Admin user ---
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nevabuildexpo.ru";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: Role.SUPER_ADMIN, isActive: true },
    create: {
      email: adminEmail,
      name: process.env.ADMIN_NAME ?? "Администратор",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`   👤 admin: ${adminEmail} / ${adminPassword}`);

  // --- Категории участников (12 разделов выставки) ---
  const categories = [
    {
      slug: "construction-materials",
      ru: "Строительные материалы",
      en: "Building materials",
      icon: "BrickWall",
    },
    {
      slug: "finishing-materials",
      ru: "Отделочные материалы",
      en: "Finishing materials",
      icon: "PaintRoller",
    },
    { slug: "windows-facades", ru: "Окна и фасады", en: "Windows & facades", icon: "AppWindow" },
    { slug: "engineering", ru: "Инженерные системы", en: "Engineering systems", icon: "Cable" },
    { slug: "roofing", ru: "Кровля и изоляция", en: "Roofing & insulation", icon: "HardHat" },
    { slug: "tools", ru: "Инструменты и оборудование", en: "Tools & equipment", icon: "Hammer" },
    {
      slug: "architecture",
      ru: "Проектирование и архитектура",
      en: "Design & architecture",
      icon: "DraftingCompass",
    },
    {
      slug: "smart-home",
      ru: "Умный дом и автоматизация",
      en: "Smart home & automation",
      icon: "Cpu",
    },
    { slug: "interior", ru: "Интерьерные решения", en: "Interior solutions", icon: "Sofa" },
    {
      slug: "furniture",
      ru: "Мебель и предметный дизайн",
      en: "Furniture & product design",
      icon: "Armchair",
    },
    { slug: "lighting", ru: "Свет", en: "Lighting", icon: "Lightbulb" },
    { slug: "decor", ru: "Декор", en: "Decor", icon: "Sparkles" },
  ];

  const categoryIds: Record<string, string> = {};
  for (const [i, c] of categories.entries()) {
    const cat = await prisma.exhibitorCategory.upsert({
      where: { slug: c.slug },
      update: { titleRu: c.ru, titleEn: c.en, icon: c.icon, sortOrder: i },
      create: { slug: c.slug, titleRu: c.ru, titleEn: c.en, icon: c.icon, sortOrder: i },
    });
    categoryIds[c.slug] = cat.id;
  }

  // --- Демо-участники ---
  const exhibitors = [
    {
      name: "Knauf",
      cat: "construction-materials",
      status: "SPONSOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Санкт-Петербург",
      booth: "A-101",
      featured: true,
    },
    {
      name: "Rockwool",
      cat: "roofing",
      status: "PARTNER",
      countryRu: "Дания",
      countryEn: "Denmark",
      cityRu: "Москва",
      booth: "B-204",
      featured: true,
    },
    {
      name: "Rehau",
      cat: "windows-facades",
      status: "EXHIBITOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Москва",
      booth: "C-310",
      featured: true,
    },
    {
      name: "Технониколь",
      cat: "roofing",
      status: "SPONSOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Рязань",
      booth: "A-118",
      featured: true,
    },
    {
      name: "Alutech",
      cat: "windows-facades",
      status: "EXHIBITOR",
      countryRu: "Беларусь",
      countryEn: "Belarus",
      cityRu: "Минск",
      booth: "C-205",
      featured: false,
    },
    {
      name: "Weber",
      cat: "finishing-materials",
      status: "EXHIBITOR",
      countryRu: "Франция",
      countryEn: "France",
      cityRu: "Санкт-Петербург",
      booth: "D-410",
      featured: false,
    },
    {
      name: "Daikin",
      cat: "engineering",
      status: "PARTNER",
      countryRu: "Япония",
      countryEn: "Japan",
      cityRu: "Москва",
      booth: "E-150",
      featured: true,
    },
    {
      name: "Grohe",
      cat: "interior",
      status: "EXHIBITOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Москва",
      booth: "F-220",
      featured: false,
    },
    {
      name: "Систематика",
      cat: "smart-home",
      status: "EXHIBITOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Санкт-Петербург",
      booth: "G-330",
      featured: false,
    },
    {
      name: "ПетроСвет",
      cat: "lighting",
      status: "EXHIBITOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Санкт-Петербург",
      booth: "H-115",
      featured: false,
    },
  ] as const;

  for (const [i, e] of exhibitors.entries()) {
    const s = slug(e.name);
    const created = await prisma.exhibitor.upsert({
      where: { slug: s },
      update: {},
      create: {
        slug: s,
        name: e.name,
        status: e.status as never,
        countryRu: e.countryRu,
        countryEn: e.countryEn,
        cityRu: e.cityRu,
        cityEn: e.cityRu,
        boothNumber: e.booth,
        isFeatured: e.featured,
        isPublished: true,
        sortOrder: i,
        website: "https://example.com",
        descriptionRu: `${e.name} — один из ведущих участников NEVA BUILD. Демонстрирует материалы, технологии и решения для строительной и интерьерной отрасли.`,
        descriptionEn: `${e.name} is one of the leading NEVA BUILD exhibitors, showcasing materials, technologies and solutions for the building and interior industry.`,
      },
    });
    await prisma.exhibitorCategoryRelation.upsert({
      where: {
        exhibitorId_categoryId: { exhibitorId: created.id, categoryId: categoryIds[e.cat] },
      },
      update: {},
      create: { exhibitorId: created.id, categoryId: categoryIds[e.cat] },
    });
  }

  // --- Партнёры / амбассадоры ---
  const partners = [
    {
      name: "Анна Соколова",
      type: "AMBASSADOR",
      roleRu: "Архитектор",
      roleEn: "Architect",
      company: "СА «Студия 44»",
    },
    {
      name: "Дмитрий Орлов",
      type: "AMBASSADOR",
      roleRu: "Дизайнер интерьеров",
      roleEn: "Interior designer",
      company: "Orlov Design",
    },
    {
      name: "Мария Лебедева",
      type: "AMBASSADOR",
      roleRu: "Девелопер",
      roleEn: "Developer",
      company: "Северный проект",
    },
    {
      name: "Сбербанк",
      type: "SPONSOR",
      roleRu: "Генеральный партнёр",
      roleEn: "General partner",
      company: "",
    },
    {
      name: "Деловой Петербург",
      type: "PARTNER",
      roleRu: "Информационный партнёр",
      roleEn: "Media partner",
      company: "",
    },
  ] as const;

  for (const [i, p] of partners.entries()) {
    await prisma.partner
      .create({
        data: {
          name: p.name,
          type: p.type as never,
          roleRu: p.roleRu,
          roleEn: p.roleEn,
          descriptionRu: p.company || undefined,
          descriptionEn: p.company || undefined,
          sortOrder: i,
          isActive: true,
        },
      })
      .catch(() => {});
  }

  // --- Типы билетов ---
  const tickets = [
    {
      slug: "visitor-pass",
      titleRu: "Visitor Pass",
      titleEn: "Visitor Pass",
      price: 500,
      order: 0,
      descRu: "Базовый билет на один день выставки.",
      descEn: "Basic one-day exhibition pass.",
      benRu: ["Вход на выставку (1 день)", "Доступ к экспозиции", "Карта выставки"],
      benEn: ["Exhibition access (1 day)", "Access to the expo", "Exhibition map"],
    },
    {
      slug: "business-pass",
      titleRu: "Business Pass",
      titleEn: "Business Pass",
      price: 2500,
      order: 1,
      descRu: "Полный доступ на все три дня и к деловой программе.",
      descEn: "Full 3-day access including the business program.",
      benRu: [
        "Вход на все 3 дня",
        "Доступ к деловой программе",
        "Зона нетворкинга",
        "Бейдж участника",
      ],
      benEn: ["3-day access", "Business program access", "Networking lounge", "Attendee badge"],
    },
    {
      slug: "vip-pass",
      titleRu: "VIP Pass",
      titleEn: "VIP Pass",
      price: 9900,
      order: 2,
      descRu: "VIP-доступ со всеми привилегиями и закрытыми мероприятиями.",
      descEn: "VIP access with all privileges and closed events.",
      benRu: [
        "Вход на все 3 дня",
        "VIP-зона и кейтеринг",
        "Закрытые мероприятия",
        "Приоритетные места",
        "Персональный менеджер",
      ],
      benEn: [
        "3-day access",
        "VIP lounge & catering",
        "Closed events",
        "Priority seating",
        "Personal manager",
      ],
    },
  ];
  for (const t of tickets) {
    await prisma.ticketProduct.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        titleRu: t.titleRu,
        titleEn: t.titleEn,
        price: t.price,
        descriptionRu: t.descRu,
        descriptionEn: t.descEn,
        benefitsRu: t.benRu,
        benefitsEn: t.benEn,
        sortOrder: t.order,
        isActive: true,
      },
    });
  }

  // --- Деловая программа: 3 дня ---
  const baseDay = new Date(EVENT_DEFAULTS.dateStart);
  const dayTitles = [
    { ru: "День 1", en: "Day 1" },
    { ru: "День 2", en: "Day 2" },
    { ru: "День 3", en: "Day 3" },
  ];
  const sessionTemplates = [
    {
      titleRu: "Пленарное заседание",
      titleEn: "Plenary session",
      type: "PLENARY",
      h: 10,
      hallRu: "Зал A",
      hallEn: "Hall A",
      descRu: "Стратегия развития строительной отрасли в новых реалиях.",
      descEn: "Building industry development strategy.",
    },
    {
      titleRu: "Цифровизация в строительстве",
      titleEn: "Digitalization in construction",
      type: "LECTURE",
      h: 12,
      hallRu: "Зал B",
      hallEn: "Hall B",
      descRu: "Тренды и перспективы цифровых технологий.",
      descEn: "Trends and prospects of digital technology.",
    },
    {
      titleRu: "Устойчивое строительство",
      titleEn: "Sustainable construction",
      type: "DISCUSSION",
      h: 14,
      hallRu: "Зал A",
      hallEn: "Hall A",
      descRu: "Энергоэффективность и зелёные технологии.",
      descEn: "Energy efficiency and green technology.",
    },
    {
      titleRu: "Современные материалы отделки",
      titleEn: "Modern finishing materials",
      type: "MASTERCLASS",
      h: 16,
      hallRu: "Зал C",
      hallEn: "Hall C",
      descRu: "Мастер-класс по технологиям отделки.",
      descEn: "Masterclass on finishing technologies.",
    },
  ];

  // Спикеры
  const speakerData = [
    {
      nameRu: "Игорь Васильев",
      nameEn: "Igor Vasiliev",
      posRu: "Главный архитектор",
      posEn: "Chief architect",
      company: "СА «Студия 44»",
    },
    {
      nameRu: "Елена Морозова",
      nameEn: "Elena Morozova",
      posRu: "Эксперт по BIM",
      posEn: "BIM expert",
      company: "DigitalBuild",
    },
    {
      nameRu: "Павел Кузнецов",
      nameEn: "Pavel Kuznetsov",
      posRu: "Директор по устойчивому развитию",
      posEn: "Head of sustainability",
      company: "EcoConstruct",
    },
  ];
  const speakers = [];
  for (const sp of speakerData) {
    speakers.push(
      await prisma.speaker.create({
        data: {
          nameRu: sp.nameRu,
          nameEn: sp.nameEn,
          positionRu: sp.posRu,
          positionEn: sp.posEn,
          company: sp.company,
        },
      }),
    );
  }

  for (let d = 0; d < 3; d++) {
    const date = new Date(baseDay);
    date.setUTCDate(baseDay.getUTCDate() + d);
    const day = await prisma.programDay.create({
      data: { date, titleRu: dayTitles[d].ru, titleEn: dayTitles[d].en, sortOrder: d },
    });
    for (const [si, st] of sessionTemplates.entries()) {
      const start = new Date(date);
      start.setUTCHours(st.h, 0, 0, 0);
      const end = new Date(start);
      end.setUTCHours(st.h + 1, 30, 0, 0);
      await prisma.programSession.create({
        data: {
          slug: `${slug(st.titleEn)}-d${d + 1}`,
          dayId: day.id,
          titleRu: st.titleRu,
          titleEn: st.titleEn,
          descriptionRu: st.descRu,
          descriptionEn: st.descEn,
          startTime: start,
          endTime: end,
          hallRu: st.hallRu,
          hallEn: st.hallEn,
          type: st.type as never,
          tags: [st.type.toLowerCase()],
          speakers: { connect: [{ id: speakers[si % speakers.length].id }] },
        },
      });
    }
  }

  // --- Новости ---
  const news = [
    {
      ru: "Открыта регистрация на NEVA BUILD 2027",
      en: "Registration for NEVA BUILD 2027 is open",
      catRu: "Анонсы",
      catEn: "Announcements",
    },
    {
      ru: "Объявлены первые участники выставки",
      en: "First exhibitors announced",
      catRu: "Участники",
      catEn: "Exhibitors",
    },
    {
      ru: "Деловая программа: что вас ждёт",
      en: "Business program: what to expect",
      catRu: "Программа",
      catEn: "Program",
    },
    {
      ru: "Как добраться до КВЦ «Экспофорум»",
      en: "How to get to Expoforum",
      catRu: "Гид",
      catEn: "Guide",
    },
  ];
  for (const [i, n] of news.entries()) {
    const s = `${slug(n.en)}`;
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - i * 3);
    await prisma.news.upsert({
      where: { slug: s },
      update: {},
      create: {
        slug: s,
        titleRu: n.ru,
        titleEn: n.en,
        categoryRu: n.catRu,
        categoryEn: n.catEn,
        excerptRu: "Краткое описание новости NEVA BUILD для превью на карточке.",
        excerptEn: "A short NEVA BUILD news summary for the card preview.",
        contentRu:
          "Полный текст новости. Здесь размещается основной материал, который редактируется в админ-панели.",
        contentEn: "Full news text. The main content goes here and is editable in the admin panel.",
        status: "PUBLISHED",
        publishedAt,
      },
    });
  }

  console.log("✅  Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
