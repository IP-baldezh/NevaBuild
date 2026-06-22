"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import type { Partner } from "@prisma/client";

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const t = useTranslations("Partners");
  if (!partners.length) return null;

  return (
    <>
      <ScrollReveal>
        <SectionTitle
          index="06"
          label={t("label")}
          title={t("title")}
          description={t("description") || undefined}
          className="mb-14"
        />
      </ScrollReveal>

      <StaggerReveal
        stagger={0.06}
        className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3"
      >
        {partners.map((p) => (
          <StaggerItem key={p.id}>
            <div className="group flex h-32 items-center justify-center bg-background transition-colors hover:bg-card md:h-40">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                {p.name}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </>
  );
}
