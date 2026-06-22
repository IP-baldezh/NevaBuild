import { describe, it, expect, vi, beforeEach } from "vitest";

// Мокируем server-only до импорта модуля (уже мокирован в setup.ts)
// Мокируем @prisma/client для изоляции от генерируемого клиента
vi.mock("@prisma/client", () => ({
  Role: {
    SUPER_ADMIN: "SUPER_ADMIN",
    CONTENT_MANAGER: "CONTENT_MANAGER",
    SALES_MANAGER: "SALES_MANAGER",
    VIEWER: "VIEWER",
    EXHIBITOR: "EXHIBITOR",
    ORGANIZER: "ORGANIZER",
  },
}));

// Мокируем auth() из ./auth
vi.mock("../auth", () => ({
  auth: vi.fn(),
}));

import { canEdit, ADMIN_ROLES, EDITOR_ROLES } from "../authz";
import { Role } from "@prisma/client";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const mockAuth = auth as unknown as ReturnType<typeof vi.fn>;
const mockRedirect = redirect as unknown as ReturnType<typeof vi.fn>;

describe("canEdit", () => {
  it("возвращает true для SUPER_ADMIN", () => {
    expect(canEdit(Role.SUPER_ADMIN)).toBe(true);
  });

  it("возвращает true для CONTENT_MANAGER", () => {
    expect(canEdit(Role.CONTENT_MANAGER)).toBe(true);
  });

  it("возвращает true для SALES_MANAGER", () => {
    expect(canEdit(Role.SALES_MANAGER)).toBe(true);
  });

  it("возвращает false для VIEWER", () => {
    expect(canEdit(Role.VIEWER)).toBe(false);
  });

  it("возвращает false для EXHIBITOR", () => {
    expect(canEdit(Role.EXHIBITOR)).toBe(false);
  });

  it("возвращает false для ORGANIZER", () => {
    expect(canEdit(Role.ORGANIZER)).toBe(false);
  });

  it("возвращает false для undefined", () => {
    expect(canEdit(undefined)).toBe(false);
  });
});

describe("ADMIN_ROLES", () => {
  it("включает SUPER_ADMIN", () => {
    expect(ADMIN_ROLES).toContain(Role.SUPER_ADMIN);
  });

  it("включает CONTENT_MANAGER", () => {
    expect(ADMIN_ROLES).toContain(Role.CONTENT_MANAGER);
  });

  it("включает SALES_MANAGER", () => {
    expect(ADMIN_ROLES).toContain(Role.SALES_MANAGER);
  });

  it("включает VIEWER", () => {
    expect(ADMIN_ROLES).toContain(Role.VIEWER);
  });

  it("не включает EXHIBITOR", () => {
    expect(ADMIN_ROLES).not.toContain(Role.EXHIBITOR);
  });

  it("не включает ORGANIZER", () => {
    expect(ADMIN_ROLES).not.toContain(Role.ORGANIZER);
  });
});

describe("EDITOR_ROLES", () => {
  it("включает SUPER_ADMIN", () => {
    expect(EDITOR_ROLES).toContain(Role.SUPER_ADMIN);
  });

  it("включает CONTENT_MANAGER", () => {
    expect(EDITOR_ROLES).toContain(Role.CONTENT_MANAGER);
  });

  it("включает SALES_MANAGER", () => {
    expect(EDITOR_ROLES).toContain(Role.SALES_MANAGER);
  });

  it("не включает VIEWER", () => {
    expect(EDITOR_ROLES).not.toContain(Role.VIEWER);
  });
});

describe("requireAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("редиректит неаутентифицированного пользователя", async () => {
    mockAuth.mockResolvedValue(null);
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`REDIRECT:${url}`);
    });

    const { requireAdmin } = await import("../authz");
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("редиректит пользователя с ролью ORGANIZER", async () => {
    mockAuth.mockResolvedValue({ user: { role: Role.ORGANIZER } });
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`REDIRECT:${url}`);
    });

    const { requireAdmin } = await import("../authz");
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("пропускает SUPER_ADMIN", async () => {
    const session = { user: { role: Role.SUPER_ADMIN } };
    mockAuth.mockResolvedValue(session);

    const { requireAdmin } = await import("../authz");
    const result = await requireAdmin();
    expect(result).toEqual(session);
  });

  it("пропускает VIEWER", async () => {
    const session = { user: { role: Role.VIEWER } };
    mockAuth.mockResolvedValue(session);

    const { requireAdmin } = await import("../authz");
    const result = await requireAdmin();
    expect(result).toEqual(session);
  });
});
