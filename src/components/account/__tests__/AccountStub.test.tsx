// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AccountStub } from "../AccountStub";

// next/link в тестах — простой <a>
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("AccountStub", () => {
  it("рендерится без IntlProvider (нет зависимости от useLocale)", () => {
    // Этот тест был бы упавшим, пока AccountStub использовал <Logo /> с useLocale()
    expect(() => render(<AccountStub title="Test" text="Text" />)).not.toThrow();
  });

  it("показывает статичный логотип /logo-ru.svg (не через locale)", () => {
    render(<AccountStub title="Test" text="Text" />);
    const img = screen.getByRole("img", { name: "НЕВА БИЛД" });
    expect(img).toHaveAttribute("src", "/logo-ru.svg");
  });

  it("отображает заголовок и текст", () => {
    render(<AccountStub title="Кабинет участника" text="Будет доступен позже." />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Кабинет участника");
    expect(screen.getByText("Будет доступен позже.")).toBeInTheDocument();
  });

  it("содержит ссылку на главную страницу", () => {
    render(<AccountStub title="Test" text="Text" />);
    const link = screen.getByRole("link", { name: /главную/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
