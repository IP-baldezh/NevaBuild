// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Мок next-auth/react — signIn недоступен в тестовой среде
vi.mock("next-auth/react", () => ({ signIn: vi.fn() }));

// Мок next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

import AdminLoginPage from "../page";

describe("AdminLoginPage", () => {
  it("рендерится без IntlProvider (нет next-intl в /admin зоне)", () => {
    expect(() => render(<AdminLoginPage />)).not.toThrow();
  });

  it("показывает статичный логотип /logo-ru.svg", () => {
    render(<AdminLoginPage />);
    const img = screen.getByRole("img", { name: "НЕВА БИЛД" });
    expect(img).toHaveAttribute("src", "/logo-ru.svg");
  });

  it("содержит заголовок страницы входа", () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Вход в админ-панель");
  });

  it("содержит поля email и пароль", () => {
    render(<AdminLoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
  });

  it("содержит кнопку Войти", () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole("button", { name: /войти/i })).toBeInTheDocument();
  });
});
