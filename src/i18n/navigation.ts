import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Локале-зависимые обёртки над next/navigation.
// Используй эти Link/useRouter вместо стандартных в публичной части сайта.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
