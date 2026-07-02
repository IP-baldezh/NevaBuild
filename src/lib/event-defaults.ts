/**
 * Значения события по умолчанию.
 * ВАЖНО: дата и цифры НЕ зашиты в компоненты — они приходят из EventSettings (БД).
 * Этот объект используется как:
 *  1) данные для seed (начальное наполнение EventSettings);
 *  2) безопасный фолбэк, если в БД ещё нет строки настроек.
 * Менять рабочие значения нужно через админку, а не здесь.
 */
export const EVENT_DEFAULTS = {
  titleRu: "Международная строительно-интерьерная выставка и форум",
  titleEn: "International Building & Interior Exhibition and Forum",
  // Дата редактируется в админке. В мокапах — 22–24 апреля 2027.
  dateStart: "2027-04-22T00:00:00.000Z",
  dateEnd: "2027-04-24T00:00:00.000Z",
  venueRu: "КВЦ «Экспофорум», Павильон H",
  venueEn: "Expoforum, Pavilion H",
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
  seoTitleRu: "NEVA BUILD — строительно-интерьерная выставка в Санкт-Петербурге",
  seoTitleEn: "NEVA BUILD — Building & Interior Exhibition in Saint Petersburg",
  seoDescriptionRu:
    "Крупнейшая строительно-интерьерная выставка Северо-Запада России. КВЦ «Экспофорум», Санкт-Петербург.",
  seoDescriptionEn:
    "The largest building & interior exhibition in North-West Russia. Expoforum, Saint Petersburg.",
  organizerRu: "ООО «Идеалист»",
  organizerEn: "Idealist LLC",
  social: {
    telegram: "https://t.me/nevabuild",
    vk: "https://vk.com/nevabuild",
    youtube: "",
    website: "https://nevabuildexpo.ru",
  },
  domains: ["nevabuildexpo.ru", "neva-build.ru", "expo-neva.ru"],
} as const;

export type EventSettingsData = typeof EVENT_DEFAULTS;
