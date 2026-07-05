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

  // --- Exhibitor categories ---
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

  // --- Exhibitors ---
  const exhibitors = [
    {
      name: "Knauf",
      cat: "construction-materials",
      status: "SPONSOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Санкт-Петербург",
      cityEn: "Saint Petersburg",
      booth: "A-101",
      featured: true,
      website: "https://knauf.ru",
      logo: "https://logo.clearbit.com/knauf.com",
      descRu:
        "Knauf — мировой лидер в производстве строительных материалов на основе гипса. Продукция компании применяется в жилом и коммерческом строительстве по всему миру. На NEVA BUILD 2027 компания представит новейшие системы сухого строительства и инновационные гипсокартонные плиты.",
      descEn:
        "Knauf is a global leader in gypsum-based building materials. The company's products are used in residential and commercial construction worldwide. At NEVA BUILD 2027, Knauf will showcase the latest dry construction systems and innovative plasterboard solutions.",
    },
    {
      name: "Rockwool",
      cat: "roofing",
      status: "PARTNER",
      countryRu: "Дания",
      countryEn: "Denmark",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "B-204",
      featured: true,
      website: "https://rockwool.ru",
      logo: "https://logo.clearbit.com/rockwool.com",
      descRu:
        "ROCKWOOL — ведущий производитель изделий из каменной ваты. Продукция компании обеспечивает тепловую и звуковую изоляцию зданий, а также огнезащиту. Экспозиция на NEVA BUILD включает системы фасадной изоляции и кровельные решения.",
      descEn:
        "ROCKWOOL is a leading manufacturer of stone wool products, providing thermal and acoustic insulation as well as fire protection for buildings. The NEVA BUILD exhibit includes facade insulation systems and roofing solutions.",
    },
    {
      name: "Rehau",
      cat: "windows-facades",
      status: "EXHIBITOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "C-310",
      featured: true,
      website: "https://rehau.com/ru-ru",
      logo: "https://logo.clearbit.com/rehau.com",
      descRu:
        "REHAU — немецкая компания, специализирующаяся на производстве оконных ПВХ-профилей, систем для водоснабжения и напольных покрытий. Продукция REHAU сочетает немецкое качество с инновационными технологиями.",
      descEn:
        "REHAU is a German company specialising in PVC window profiles, water supply systems and flooring. REHAU products combine German quality with innovative technology.",
    },
    {
      name: "Технониколь",
      cat: "roofing",
      status: "SPONSOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Рязань",
      cityEn: "Ryazan",
      booth: "A-118",
      featured: true,
      website: "https://tn.ru",
      logo: "https://logo.clearbit.com/tn.ru",
      descRu:
        "ТехноНИКОЛЬ — крупнейший российский производитель строительных материалов: кровельных, гидроизоляционных, теплоизоляционных и звукоизоляционных систем. Компания ежегодно выпускает более 100 видов продукции.",
      descEn:
        "TechnoNICOL is Russia's largest manufacturer of construction materials including roofing, waterproofing, thermal and acoustic insulation systems, producing over 100 product types annually.",
    },
    {
      name: "Alutech",
      cat: "windows-facades",
      status: "EXHIBITOR",
      countryRu: "Беларусь",
      countryEn: "Belarus",
      cityRu: "Минск",
      cityEn: "Minsk",
      booth: "C-205",
      featured: false,
      website: "https://alutech.by",
      logo: "https://logo.clearbit.com/alutech.by",
      descRu:
        "Alutech — белорусский производитель алюминиевых и стальных конструкций: секционных ворот, роллет, автоматики и фасадных систем. Продукция поставляется более чем в 60 стран мира.",
      descEn:
        "Alutech is a Belarusian manufacturer of aluminium and steel structures including sectional doors, roller shutters, automation systems and facade solutions, exported to more than 60 countries.",
    },
    {
      name: "Weber",
      cat: "finishing-materials",
      status: "EXHIBITOR",
      countryRu: "Франция",
      countryEn: "France",
      cityRu: "Санкт-Петербург",
      cityEn: "Saint Petersburg",
      booth: "D-410",
      featured: false,
      website: "https://weber.ru",
      logo: "https://logo.clearbit.com/weber.ru",
      descRu:
        "Weber — международный бренд Saint-Gobain, производящий сухие строительные смеси, клеи для плитки, штукатурки и системы утепления фасадов. В России выпускает более 100 наименований продукции.",
      descEn:
        "Weber is an international Saint-Gobain brand producing dry construction mixes, tile adhesives, plasters and facade insulation systems. In Russia the brand manufactures over 100 product lines.",
    },
    {
      name: "Daikin",
      cat: "engineering",
      status: "PARTNER",
      countryRu: "Япония",
      countryEn: "Japan",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "E-150",
      featured: true,
      website: "https://daikin.ru",
      logo: "https://logo.clearbit.com/daikin.com",
      descRu:
        "Daikin — мировой лидер в области климатического оборудования. Компания производит кондиционеры, тепловые насосы, системы вентиляции и промышленное холодильное оборудование. На NEVA BUILD представит решения для умного климат-контроля.",
      descEn:
        "Daikin is a world leader in climate control equipment, manufacturing air conditioners, heat pumps, ventilation and industrial refrigeration systems. At NEVA BUILD it will showcase smart HVAC solutions.",
    },
    {
      name: "Grohe",
      cat: "interior",
      status: "EXHIBITOR",
      countryRu: "Германия",
      countryEn: "Germany",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "F-220",
      featured: false,
      website: "https://grohe.com/ru_ru",
      logo: "https://logo.clearbit.com/grohe.com",
      descRu:
        "GROHE — ведущий мировой бренд в области сантехнической арматуры. Смесители, душевые системы, насадки и аксессуары GROHE сочетают передовые технологии с элегантным дизайном.",
      descEn:
        "GROHE is a leading global brand for sanitary fittings. GROHE mixers, shower systems, heads and accessories combine advanced technology with elegant design.",
    },
    {
      name: "Систематика",
      cat: "smart-home",
      status: "EXHIBITOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Санкт-Петербург",
      cityEn: "Saint Petersburg",
      booth: "G-330",
      featured: false,
      website: "https://systematica.ru",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=80&h=80&fit=crop",
      descRu:
        "Систематика — российская компания, специализирующаяся на разработке и внедрении систем умного дома. Производит контроллеры автоматизации, датчики, решения для управления освещением и безопасностью.",
      descEn:
        "Systematica is a Russian smart home company specialising in automation systems, producing control units, sensors and solutions for lighting control and security.",
    },
    {
      name: "ПетроСвет",
      cat: "lighting",
      status: "EXHIBITOR",
      countryRu: "Россия",
      countryEn: "Russia",
      cityRu: "Санкт-Петербург",
      cityEn: "Saint Petersburg",
      booth: "H-115",
      featured: false,
      website: "https://petrosvet.ru",
      logo: "https://images.unsplash.com/photo-1518737005568-3e3e5f4f0b6a?q=80&w=80&h=80&fit=crop",
      descRu:
        "ПетроСвет — петербургский производитель профессиональных светотехнических решений для жилых и общественных пространств. Разрабатывает светодиодные светильники для внутреннего и наружного освещения.",
      descEn:
        "PetroSvet is a Saint Petersburg manufacturer of professional lighting solutions for residential and public spaces, developing LED luminaires for indoor and outdoor use.",
    },
    {
      name: "Saint-Gobain",
      cat: "construction-materials",
      status: "SPONSOR",
      countryRu: "Франция",
      countryEn: "France",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "A-200",
      featured: true,
      website: "https://saint-gobain.ru",
      logo: "https://logo.clearbit.com/saint-gobain.com",
      descRu:
        "Saint-Gobain — мировой лидер в производстве строительных материалов. Группа включает такие бренды как Isover, Weber, Gyproc и Sekurit. Продукция применяется в жилом, коммерческом и промышленном строительстве.",
      descEn:
        "Saint-Gobain is a world leader in building materials. The group includes brands such as Isover, Weber, Gyproc and Sekurit, with products used in residential, commercial and industrial construction.",
    },
    {
      name: "Grundfos",
      cat: "engineering",
      status: "PARTNER",
      countryRu: "Дания",
      countryEn: "Denmark",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "E-260",
      featured: true,
      website: "https://grundfos.com/ru",
      logo: "https://logo.clearbit.com/grundfos.com",
      descRu:
        "Grundfos — ведущий мировой производитель насосных решений. Продукция компании используется в системах отопления, водоснабжения, канализации и промышленных процессах. NEVA BUILD покажет энергоэффективные насосы нового поколения.",
      descEn:
        "Grundfos is a leading global pump manufacturer. Its products are used in heating, water supply, sewage and industrial processes. NEVA BUILD will showcase next-generation energy-efficient pumps.",
    },
    {
      name: "VELUX",
      cat: "windows-facades",
      status: "EXHIBITOR",
      countryRu: "Дания",
      countryEn: "Denmark",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "C-420",
      featured: false,
      website: "https://velux.ru",
      logo: "https://logo.clearbit.com/velux.com",
      descRu:
        "VELUX — датский производитель мансардных окон и систем дневного освещения. Продукция компании обеспечивает оптимальный баланс естественного света и вентиляции для жилых и коммерческих помещений.",
      descEn:
        "VELUX is a Danish manufacturer of roof windows and daylighting systems, providing optimal natural light and ventilation balance for residential and commercial spaces.",
    },
    {
      name: "Legrand",
      cat: "smart-home",
      status: "EXHIBITOR",
      countryRu: "Франция",
      countryEn: "France",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "G-450",
      featured: false,
      website: "https://legrand.ru",
      logo: "https://logo.clearbit.com/legrand.com",
      descRu:
        "Legrand — мировой специалист в области электрических и цифровых инфраструктур зданий. Производит электроустановочные изделия, системы кабельных каналов, системы умного дома и ИБП.",
      descEn:
        "Legrand is a world specialist in electrical and digital building infrastructures, manufacturing wiring devices, cable management systems, smart home systems and UPS units.",
    },
    {
      name: "Porcelanosa",
      cat: "finishing-materials",
      status: "EXHIBITOR",
      countryRu: "Испания",
      countryEn: "Spain",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "D-330",
      featured: true,
      website: "https://porcelanosa.com",
      logo: "https://logo.clearbit.com/porcelanosa.com",
      descRu:
        "Porcelanosa — испанская компания, производящая высококачественную керамическую плитку, натуральный камень, сантехнику и мебель для ванных комнат. Известна сочетанием авангардного дизайна и превосходного качества.",
      descEn:
        "Porcelanosa is a Spanish company producing premium ceramic tiles, natural stone, sanitaryware and bathroom furniture, renowned for combining avant-garde design with superior quality.",
    },
    {
      name: "ABB",
      cat: "engineering",
      status: "EXHIBITOR",
      countryRu: "Швейцария",
      countryEn: "Switzerland",
      cityRu: "Москва",
      cityEn: "Moscow",
      booth: "E-380",
      featured: false,
      website: "https://abb.com/ru",
      logo: "https://logo.clearbit.com/abb.com",
      descRu:
        "ABB — швейцарская компания в сфере энергетики и автоматизации. На NEVA BUILD представит продукцию для электрических инсталляций, системы управления зданием и решения для зарядной инфраструктуры электромобилей.",
      descEn:
        "ABB is a Swiss energy and automation company. At NEVA BUILD it will present electrical installation products, building management systems and EV charging infrastructure solutions.",
    },
  ] as const;

  for (const [i, e] of exhibitors.entries()) {
    const s = slug(e.name);
    const created = await prisma.exhibitor.upsert({
      where: { slug: s },
      update: {
        logoUrl: e.logo,
        descriptionRu: e.descRu,
        descriptionEn: e.descEn,
        website: e.website,
        cityEn: e.cityEn,
      },
      create: {
        slug: s,
        name: e.name,
        status: e.status as never,
        countryRu: e.countryRu,
        countryEn: e.countryEn,
        cityRu: e.cityRu,
        cityEn: e.cityEn,
        boothNumber: e.booth,
        isFeatured: e.featured,
        isPublished: true,
        sortOrder: i,
        website: e.website,
        logoUrl: e.logo,
        descriptionRu: e.descRu,
        descriptionEn: e.descEn,
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

  // --- Partners / ambassadors ---
  const partners = [
    {
      name: "Анна Соколова",
      type: "AMBASSADOR",
      roleRu: "Архитектор",
      roleEn: "Architect",
      company: "СА «Студия 44»",
      photo:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Дмитрий Орлов",
      type: "AMBASSADOR",
      roleRu: "Дизайнер интерьеров",
      roleEn: "Interior designer",
      company: "Orlov Design",
      photo:
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Мария Лебедева",
      type: "AMBASSADOR",
      roleRu: "Девелопер",
      roleEn: "Developer",
      company: "Северный проект",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Сбербанк",
      type: "SPONSOR",
      roleRu: "Генеральный партнёр",
      roleEn: "General partner",
      company: "",
      photo: "https://logo.clearbit.com/sber.ru",
    },
    {
      name: "Деловой Петербург",
      type: "PARTNER",
      roleRu: "Информационный партнёр",
      roleEn: "Media partner",
      company: "",
      photo: "",
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
          photoUrl: p.photo || undefined,
          sortOrder: i,
          isActive: true,
        },
      })
      .catch(() => {});
  }

  // --- Ticket products ---
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

  // --- Program (clean-insert each run) ---
  await prisma.programSession.deleteMany();
  await prisma.programDay.deleteMany();
  await prisma.speaker.deleteMany();

  const speakerData = [
    {
      nameRu: "Игорь Васильев",
      nameEn: "Igor Vasiliev",
      posRu: "Главный архитектор",
      posEn: "Chief architect",
      company: "СА «Студия 44»",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      nameRu: "Елена Морозова",
      nameEn: "Elena Morozova",
      posRu: "Эксперт по BIM-технологиям",
      posEn: "BIM technology expert",
      company: "DigitalBuild",
      photo:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      nameRu: "Павел Кузнецов",
      nameEn: "Pavel Kuznetsov",
      posRu: "Директор по устойчивому развитию",
      posEn: "Head of sustainability",
      company: "EcoConstruct",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      nameRu: "Наталья Петрова",
      nameEn: "Natalia Petrova",
      posRu: "Руководитель проектов",
      posEn: "Project director",
      company: "StroyPro Group",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      nameRu: "Алексей Громов",
      nameEn: "Alexey Gromov",
      posRu: "Директор по инновациям",
      posEn: "Director of innovation",
      company: "BuildTech Innovations",
      photo:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&h=400&fit=crop&crop=face",
    },
    {
      nameRu: "Ирина Смирнова",
      nameEn: "Irina Smirnova",
      posRu: "Эксперт по недвижимости",
      posEn: "Real estate expert",
      company: "Petersburg Realty Group",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop&crop=face",
    },
  ];
  const speakers = await Promise.all(
    speakerData.map((sp) =>
      prisma.speaker.create({
        data: {
          nameRu: sp.nameRu,
          nameEn: sp.nameEn,
          positionRu: sp.posRu,
          positionEn: sp.posEn,
          company: sp.company,
          photoUrl: sp.photo,
        },
      }),
    ),
  );

  // 3 program days × 5 sessions each
  const baseDay = new Date(EVENT_DEFAULTS.dateStart);
  const dayTitles = [
    { ru: "День первый: Строительство и материалы", en: "Day One: Construction & Materials" },
    { ru: "День второй: Технологии и инновации", en: "Day Two: Technology & Innovation" },
    { ru: "День третий: Дизайн и интерьер", en: "Day Three: Design & Interior" },
  ];

  const sessionMatrix = [
    // Day 1
    [
      {
        titleRu: "Открытие NEVA BUILD 2027",
        titleEn: "NEVA BUILD 2027 Opening",
        type: "PLENARY",
        h: 10,
        m: 0,
        durMin: 90,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["opening", "plenary"],
        spIdx: 0,
        descRu:
          "Торжественное открытие главной строительной выставки Северо-Запада. Ключевые выступления организаторов и почётных гостей выставки.",
        descEn:
          "Grand opening of the main North-West construction exhibition. Key addresses from organisers and honorary guests.",
      },
      {
        titleRu: "Стратегия развития строительной отрасли",
        titleEn: "Building Industry Development Strategy",
        type: "PLENARY",
        h: 12,
        m: 0,
        durMin: 90,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["strategy", "industry"],
        spIdx: 0,
        descRu:
          "Ключевые тренды и приоритеты развития строительной отрасли России в 2027–2030 годах.",
        descEn:
          "Key trends and development priorities for the Russian construction industry 2027–2030.",
      },
      {
        titleRu: "Цифровизация в строительстве",
        titleEn: "Digitalisation in Construction",
        type: "LECTURE",
        h: 14,
        m: 0,
        durMin: 60,
        hallRu: "АрхЛекторий",
        hallEn: "Hall B",
        tags: ["bim", "digital"],
        spIdx: 1,
        descRu:
          "BIM-технологии, цифровые двойники и автоматизация проектирования как драйверы роста эффективности.",
        descEn:
          "BIM, digital twins and design automation as efficiency drivers in modern construction.",
      },
      {
        titleRu: "Мастер-класс: современная отделка",
        titleEn: "Masterclass: Modern Finishing",
        type: "MASTERCLASS",
        h: 15,
        m: 30,
        durMin: 90,
        hallRu: "Демо-зона А",
        hallEn: "Demo Zone A",
        tags: ["finishing", "masterclass"],
        spIdx: 3,
        descRu:
          "Практический мастер-класс по применению декоративных штукатурок и современных отделочных технологий.",
        descEn: "Hands-on masterclass on decorative plasters and modern finishing techniques.",
      },
      {
        titleRu: "Устойчивое строительство: дискуссия",
        titleEn: "Sustainable Construction: Panel Discussion",
        type: "DISCUSSION",
        h: 17,
        m: 0,
        durMin: 60,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["eco", "sustainability"],
        spIdx: 2,
        descRu:
          "Панельная дискуссия об энергоэффективных технологиях, зелёном строительстве и экологических стандартах.",
        descEn:
          "Panel discussion on energy-efficient technology, green construction and environmental standards.",
      },
    ],
    // Day 2
    [
      {
        titleRu: "Умный дом: от концепции к реализации",
        titleEn: "Smart Home: From Concept to Reality",
        type: "PLENARY",
        h: 10,
        m: 0,
        durMin: 90,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["smart-home", "automation"],
        spIdx: 4,
        descRu:
          "Как системы автоматизации и IoT меняют современное жильё. Обзор технологических решений от ведущих производителей.",
        descEn:
          "How automation systems and IoT are transforming modern homes. Overview of technological solutions from leading manufacturers.",
      },
      {
        titleRu: "Инженерные системы зданий",
        titleEn: "Building Engineering Systems",
        type: "LECTURE",
        h: 12,
        m: 0,
        durMin: 60,
        hallRu: "АрхЛекторий",
        hallEn: "Hall B",
        tags: ["hvac", "engineering"],
        spIdx: 2,
        descRu:
          "Современные подходы к проектированию инженерных систем: отопление, вентиляция, кондиционирование и водоснабжение.",
        descEn:
          "Modern approaches to engineering systems design: heating, ventilation, air conditioning and water supply.",
      },
      {
        titleRu: "Воркшоп: BIM-проектирование",
        titleEn: "Workshop: BIM Design",
        type: "WORKSHOP",
        h: 14,
        m: 0,
        durMin: 120,
        hallRu: "Digital-зона",
        hallEn: "Digital Zone",
        tags: ["bim", "workshop"],
        spIdx: 1,
        descRu:
          "Практический воркшоп по информационному моделированию зданий. Работа с ПО Revit и BIM-координация проекта.",
        descEn:
          "Practical building information modelling workshop. Hands-on work with Revit software and BIM project coordination.",
      },
      {
        titleRu: "Энергоэффективные технологии 2027",
        titleEn: "Energy-Efficient Technologies 2027",
        type: "PRESENTATION",
        h: 16,
        m: 30,
        durMin: 60,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["energy", "innovation"],
        spIdx: 4,
        descRu:
          "Презентация инновационных решений в области теплоизоляции, солнечной энергетики и накопителей энергии.",
        descEn:
          "Presentation of innovative solutions in thermal insulation, solar energy and energy storage.",
      },
      {
        titleRu: "Рынок недвижимости Санкт-Петербурга",
        titleEn: "St. Petersburg Real Estate Market",
        type: "DISCUSSION",
        h: 18,
        m: 0,
        durMin: 60,
        hallRu: "АрхЛекторий",
        hallEn: "Hall B",
        tags: ["realty", "market"],
        spIdx: 5,
        descRu:
          "Ситуация на рынке жилой и коммерческой недвижимости: тренды, прогнозы и инвестиционные возможности.",
        descEn:
          "Residential and commercial real estate market situation: trends, forecasts and investment opportunities.",
      },
    ],
    // Day 3
    [
      {
        titleRu: "Архитектура и городская среда",
        titleEn: "Architecture & Urban Environment",
        type: "PLENARY",
        h: 10,
        m: 0,
        durMin: 90,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["architecture", "urbanism"],
        spIdx: 0,
        descRu:
          "Концепции комфортной городской среды, новые подходы к планированию жилых кварталов и общественных пространств.",
        descEn:
          "Comfortable urban environment concepts, new approaches to residential district planning and public spaces.",
      },
      {
        titleRu: "Тренды интерьерного дизайна 2027",
        titleEn: "Interior Design Trends 2027",
        type: "LECTURE",
        h: 12,
        m: 0,
        durMin: 60,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["interior", "design"],
        spIdx: 3,
        descRu:
          "Актуальные тренды в интерьерном дизайне: материалы, цвета, стилевые направления и технологические новинки.",
        descEn:
          "Current interior design trends: materials, colours, style directions and technological novelties.",
      },
      {
        titleRu: "Мастер-класс: световой дизайн",
        titleEn: "Masterclass: Lighting Design",
        type: "MASTERCLASS",
        h: 14,
        m: 0,
        durMin: 90,
        hallRu: "Демо-зона Б",
        hallEn: "Demo Zone B",
        tags: ["lighting", "design"],
        spIdx: 5,
        descRu:
          "Практический мастер-класс по проектированию освещения жилых и общественных пространств с применением LED-технологий.",
        descEn:
          "Practical lighting design masterclass for residential and public spaces using LED technologies.",
      },
      {
        titleRu: "Воркшоп: материалы будущего",
        titleEn: "Workshop: Materials of the Future",
        type: "WORKSHOP",
        h: 15,
        m: 30,
        durMin: 90,
        hallRu: "Digital-зона",
        hallEn: "Digital Zone",
        tags: ["materials", "innovation"],
        spIdx: 4,
        descRu:
          "Знакомство с передовыми строительными материалами: нанопокрытия, «умные» стёкла, биоматериалы и переработанное сырьё.",
        descEn:
          "Introduction to advanced building materials: nano-coatings, smart glass, biomaterials and recycled raw materials.",
      },
      {
        titleRu: "Закрытие выставки. Итоги и перспективы",
        titleEn: "Closing Ceremony. Results & Outlook",
        type: "PLENARY",
        h: 17,
        m: 0,
        durMin: 60,
        hallRu: "Конгресс-холл",
        hallEn: "Congress Hall",
        tags: ["closing", "plenary"],
        spIdx: 0,
        descRu:
          "Торжественное закрытие NEVA BUILD 2027. Подведение итогов, вручение наград участникам и анонс следующей выставки.",
        descEn:
          "Closing ceremony of NEVA BUILD 2027. Summing up results, award ceremony and announcement of the next exhibition.",
      },
    ],
  ] as const;

  for (let d = 0; d < 3; d++) {
    const date = new Date(baseDay);
    date.setUTCDate(baseDay.getUTCDate() + d);
    const day = await prisma.programDay.create({
      data: { date, titleRu: dayTitles[d].ru, titleEn: dayTitles[d].en, sortOrder: d },
    });
    for (const s of sessionMatrix[d]) {
      const start = new Date(date);
      start.setUTCHours(s.h, s.m, 0, 0);
      const end = new Date(start);
      end.setUTCMinutes(start.getUTCMinutes() + s.durMin);
      await prisma.programSession.create({
        data: {
          slug: `${slug(s.titleEn)}-d${d + 1}`,
          dayId: day.id,
          titleRu: s.titleRu,
          titleEn: s.titleEn,
          descriptionRu: s.descRu,
          descriptionEn: s.descEn,
          startTime: start,
          endTime: end,
          hallRu: s.hallRu,
          hallEn: s.hallEn,
          type: s.type as never,
          tags: [...s.tags],
          speakers: { connect: [{ id: speakers[s.spIdx].id }] },
        },
      });
    }
  }

  // --- News ---
  const news = [
    {
      slug: "registration-open-2027",
      titleRu: "Открыта регистрация на NEVA BUILD 2027",
      titleEn: "Registration for NEVA BUILD 2027 is open",
      excerptRu:
        "Уже сейчас вы можете зарегистрироваться как посетитель или подать заявку на участие в качестве экспонента выставки NEVA BUILD 2027.",
      excerptEn:
        "You can already register as a visitor or apply to participate as an exhibitor at NEVA BUILD 2027.",
      contentRu:
        "Оргкомитет NEVA BUILD рад сообщить об открытии регистрации на ведущую строительную выставку Северо-Запада России.\n\nВыставка состоится с 15 по 18 марта 2027 года в КВЦ «Экспофорум», Санкт-Петербург. В этом году участие в ней подтвердили более 350 компаний из 30 стран мира.\n\nДля посетителей: регистрация бесплатна и открыта на сайте nevabuildexpo.ru. Зарегистрировавшись заранее, вы сможете получить персональную карту посетителя с приоритетным входом.\n\nДля потенциальных экспонентов: оставьте заявку через форму обратной связи, и наш менеджер свяжется с вами в течение одного рабочего дня.",
      contentEn:
        "The NEVA BUILD organising committee is pleased to announce registration for the leading construction exhibition in North-West Russia.\n\nThe exhibition will take place from 15 to 18 March 2027 at the Expoforum Congress Centre, Saint Petersburg. This year more than 350 companies from 30 countries have confirmed their participation.\n\nFor visitors: registration is free and available at nevabuildexpo.ru. By registering in advance, you will receive a personal visitor card with priority entry.\n\nFor prospective exhibitors: submit your application through the contact form and our manager will be in touch within one business day.",
      catRu: "Анонсы",
      catEn: "Announcements",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 2,
    },
    {
      slug: "first-exhibitors-announced",
      titleRu: "Объявлены первые участники NEVA BUILD 2027",
      titleEn: "First NEVA BUILD 2027 exhibitors announced",
      excerptRu:
        "В числе первых подтверждённых участников — Knauf, Rockwool, Saint-Gobain, Rehau и Daikin. Список экспонентов продолжает пополняться.",
      excerptEn:
        "Among the first confirmed exhibitors are Knauf, Rockwool, Saint-Gobain, Rehau and Daikin. The list of participants continues to grow.",
      contentRu:
        "Оргкомитет NEVA BUILD с гордостью объявляет первых подтверждённых участников выставки 2027 года.\n\nВ числе экспонентов — ведущие мировые производители строительных материалов и решений: Knauf (Германия), Rockwool (Дания), Saint-Gobain (Франция), Rehau (Германия) и Daikin (Япония).\n\nКаждый из них займёт более 200 кв.м. экспозиционной площади и представит новейшие продукты и технологии, которые будут доступны на рынке уже в 2027 году.",
      contentEn:
        "The NEVA BUILD organising committee is proud to announce the first confirmed participants of the 2027 exhibition.\n\nAmong the exhibitors are leading global manufacturers: Knauf (Germany), Rockwool (Denmark), Saint-Gobain (France), Rehau (Germany) and Daikin (Japan).\n\nEach will occupy more than 200 sq.m. of exhibition space and present the latest products and technologies that will be available on the market in 2027.",
      catRu: "Участники",
      catEn: "Exhibitors",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 5,
    },
    {
      slug: "business-program-preview",
      titleRu: "Деловая программа NEVA BUILD 2027: что вас ждёт",
      titleEn: "NEVA BUILD 2027 Business Program: what to expect",
      excerptRu:
        "Три дня насыщенных дискуссий, мастер-классов и пленарных заседаний с ведущими экспертами строительной и дизайн-отраслей.",
      excerptEn:
        "Three days of intensive discussions, masterclasses and plenary sessions with leading experts from the construction and design industries.",
      contentRu:
        "Деловая программа NEVA BUILD 2027 охватывает актуальные темы строительной, отделочной и интерьерной отраслей.\n\nГлавные темы: цифровизация и BIM, устойчивое строительство, умный дом, тренды интерьерного дизайна, энергоэффективные технологии.\n\nВ программу вошли: 3 пленарных заседания, 6 лекций от ведущих экспертов, 4 мастер-класса с практической частью, 2 профессиональных воркшопа и 4 панельных дискуссии.\n\nДля участия в деловой программе необходима регистрация. Посетители с Business Pass и VIP Pass получают доступ ко всем мероприятиям.",
      contentEn:
        "The NEVA BUILD 2027 business programme covers the most relevant topics in construction, finishing and interior design.\n\nKey topics: digitalisation and BIM, sustainable construction, smart home, interior design trends, and energy-efficient technology.\n\nThe programme includes: 3 plenary sessions, 6 expert lectures, 4 practical masterclasses, 2 professional workshops and 4 panel discussions.\n\nRegistration is required for business programme participation. Visitors with Business Pass and VIP Pass receive access to all events.",
      catRu: "Программа",
      catEn: "Program",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 8,
    },
    {
      slug: "how-to-get-to-expoforum",
      titleRu: "Как добраться до КВЦ «Экспофорум»",
      titleEn: "How to get to the Expoforum Congress Centre",
      excerptRu:
        "Подробный гид по маршрутам в КВЦ «Экспофорум» на общественном транспорте, автомобиле и такси.",
      excerptEn:
        "A detailed guide to reaching the Expoforum Congress Centre by public transport, car and taxi.",
      contentRu:
        "КВЦ «Экспофорум» расположен по адресу: ш. Пулковское, 27, Санкт-Петербург.\n\nНа метро: выйдите на станции «Московская» (красная ветка), затем сядьте на автобус №187 или маршрутное такси до остановки «Экспофорум».\n\nНа автомобиле: следуйте по Пулковскому шоссе в сторону аэропорта. Паркинг КВЦ вмещает более 3 000 автомобилей.\n\nНа такси: используйте приложения Яндекс Go, Uber или Ситимобил. Время в пути от центра города — около 30 минут.\n\nВремя работы выставки: с 10:00 до 19:00 ежедневно.",
      contentEn:
        "The Expoforum Congress Centre is located at Pulkоvskoye Shosse 27, Saint Petersburg.\n\nBy metro: exit at Moskovskaya station (red line) and take bus No. 187 or a minibus to the Expoforum stop.\n\nBy car: follow Pulkоvskoye Shosse towards the airport. The Expoforum car park accommodates more than 3,000 vehicles.\n\nBy taxi: use the Yandex Go, Uber or Citimobil apps. Travel time from the city centre is approximately 30 minutes.\n\nExhibition opening hours: 10:00 to 19:00 daily.",
      catRu: "Гид",
      catEn: "Guide",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 12,
    },
    {
      slug: "smart-home-trends-2027",
      titleRu: "Умный дом в 2027 году: главные тренды",
      titleEn: "Smart home in 2027: the key trends",
      excerptRu:
        "Искусственный интеллект в управлении домом, единые экосистемы и энергоменеджмент — что определяет рынок умного дома в 2027 году.",
      excerptEn:
        "Artificial intelligence in home management, unified ecosystems and energy management — what defines the smart home market in 2027.",
      contentRu:
        "Рынок умного дома в России демонстрирует устойчивый рост: по данным аналитиков, к 2027 году его объём превысит 80 млрд рублей.\n\nКлючевые тренды:\n\n1. ИИ-ассистенты для управления домом становятся стандартом в новостройках бизнес-класса.\n2. Единые экосистемы (Matter, Home+) позволяют объединять устройства разных производителей.\n3. Энергоменеджмент и интеграция с солнечными панелями.\n4. Повышенный фокус на безопасности и защите данных.\n\nНа NEVA BUILD 2027 все эти тренды будут представлены в демо-зоне «Умный дом».",
      contentEn:
        "Russia's smart home market is showing steady growth: analysts expect it to exceed 80 billion roubles by 2027.\n\nKey trends:\n\n1. AI home management assistants are becoming standard in business-class new builds.\n2. Unified ecosystems (Matter, Home+) allow devices from different manufacturers to be combined.\n3. Energy management and integration with solar panels.\n4. Increased focus on security and data protection.\n\nAll these trends will be presented in the Smart Home demo zone at NEVA BUILD 2027.",
      catRu: "Тренды",
      catEn: "Trends",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 16,
    },
    {
      slug: "green-construction-standards",
      titleRu: "Зелёное строительство: стандарты и перспективы",
      titleEn: "Green construction: standards and prospects",
      excerptRu:
        "Экологические стандарты LEED и BREEAM в России: кто применяет и почему это выгодно. Обзор перспектив рынка устойчивого строительства.",
      excerptEn:
        "LEED and BREEAM eco standards in Russia: who applies them and why it makes financial sense. Overview of the sustainable construction market.",
      contentRu:
        "Устойчивое строительство переходит из категории тренда в стандарт отрасли. В России сертификацию LEED или BREEAM прошли уже более 200 объектов.\n\nЧто даёт «зелёный» сертификат:\n- Снижение эксплуатационных расходов на 20–40%\n- Повышение ликвидности объекта\n- Соответствие международным ESG-стандартам\n- Привлекательность для иностранных инвесторов\n\nНа NEVA BUILD 2027 пройдут специальные сессии по теме устойчивого строительства с участием сертифицированных консультантов LEED и BREEAM.",
      contentEn:
        "Sustainable construction is moving from a trend to an industry standard. More than 200 projects in Russia have now received LEED or BREEAM certification.\n\nWhat a green certificate delivers:\n- Reduction of operating costs by 20–40%\n- Higher asset liquidity\n- Compliance with international ESG standards\n- Attractiveness for foreign investors\n\nNEVA BUILD 2027 will host dedicated sustainable construction sessions with certified LEED and BREEAM consultants.",
      catRu: "Аналитика",
      catEn: "Analytics",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 20,
    },
    {
      slug: "interior-design-trends-2027",
      titleRu: "Интерьерный дизайн 2027: что будет актуально",
      titleEn: "Interior design 2027: what will be relevant",
      excerptRu:
        "Натуральные материалы, биофильный дизайн и мультифункциональные пространства — тренды интерьеров наступающего года.",
      excerptEn:
        "Natural materials, biophilic design and multifunctional spaces — the interior trends of the coming year.",
      contentRu:
        "Мировые бюро интерьерного дизайна определили главные тренды 2027 года. Их объединяет стремление к естественности и психологическому комфорту.\n\nТоп-5 трендов:\n\n1. Биофильный дизайн: живые растения, натуральное дерево и камень как основные материалы.\n2. Мультифункциональные пространства: трансформируемая мебель и зонирование.\n3. Нейтральные палитры с акцентами: терракота, шалфей, пыльная роза.\n4. Переработанные и экологичные материалы.\n5. Антропоморфный дизайн: мягкие формы и изгибы.",
      contentEn:
        "Leading interior design studios have identified the main trends for 2027. They share a common drive towards naturalness and psychological comfort.\n\nTop-5 trends:\n\n1. Biophilic design: living plants, natural wood and stone as primary materials.\n2. Multifunctional spaces: transformable furniture and zoning.\n3. Neutral palettes with accents: terracotta, sage, dusty rose.\n4. Recycled and eco-friendly materials.\n5. Anthropomorphic design: soft forms and curves.",
      catRu: "Тренды",
      catEn: "Trends",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 25,
    },
    {
      slug: "become-a-sponsor",
      titleRu: "Спонсорство на NEVA BUILD: возможности для бизнеса",
      titleEn: "Sponsorship at NEVA BUILD: business opportunities",
      excerptRu:
        "Узнайте, как статус спонсора или партнёра выставки помогает укрепить позиции бренда и выйти на новые рынки.",
      excerptEn:
        "Find out how sponsor or partner status at the exhibition helps strengthen your brand position and access new markets.",
      contentRu:
        "Спонсорство на NEVA BUILD — это эффективный инструмент для укрепления позиций бренда среди профессиональной аудитории строительной отрасли.\n\nПакеты спонсорства:\n\n«Генеральный партнёр» — максимальная видимость: логотип на всех рекламных материалах, приоритетное расположение стенда, именная сессия в деловой программе.\n\n«Официальный партнёр» — расширенное присутствие: логотип в каталоге и на сайте, участие в пресс-конференции.\n\n«Медиапартнёр» — информационное сотрудничество: совместный контент, анонсы в СМИ.\n\nДля получения медиакита свяжитесь с нами по адресу partners@nevabuildexpo.ru.",
      contentEn:
        "Sponsorship at NEVA BUILD is an effective tool for strengthening brand recognition among a professional construction audience.\n\nSponsorship packages:\n\n'General Partner' — maximum visibility: logo on all promotional materials, priority stand location, named session in the business programme.\n\n'Official Partner' — expanded presence: logo in the catalogue and on the website, participation in the press conference.\n\n'Media Partner' — information collaboration: joint content, media announcements.\n\nTo receive the media kit, contact us at partners@nevabuildexpo.ru.",
      catRu: "Партнёрство",
      catEn: "Partnership",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
      daysAgo: 30,
    },
  ];

  for (const n of news) {
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - n.daysAgo);
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        coverImageUrl: n.img,
        excerptRu: n.excerptRu,
        excerptEn: n.excerptEn,
        contentRu: n.contentRu,
        contentEn: n.contentEn,
        status: "PUBLISHED",
        publishedAt,
      },
      create: {
        slug: n.slug,
        titleRu: n.titleRu,
        titleEn: n.titleEn,
        excerptRu: n.excerptRu,
        excerptEn: n.excerptEn,
        contentRu: n.contentRu,
        contentEn: n.contentEn,
        categoryRu: n.catRu,
        categoryEn: n.catEn,
        coverImageUrl: n.img,
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
