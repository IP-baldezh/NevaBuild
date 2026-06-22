import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // output: "standalone", // включать только для Docker-деплоя, не для Vercel
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TODO: добавить домен S3/CDN-хранилища при подключении объектного хранилища
      { protocol: "https", hostname: "**.nevabuildexpo.ru" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    // Серверные экшены — лимит размера загружаемых файлов (медиа в админке)
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default withNextIntl(nextConfig);
