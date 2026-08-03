"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import type { ExhibitorCategory } from "@prisma/client";
import {
  saveCategory,
  saveCategoryOrder,
  deleteCategory,
  toggleCategoryVisibility,
} from "@/server/actions/admin/content";
import { ImagePickerField } from "@/components/admin/ImagePickerField";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import {
  CategoryCard,
  CARD_BGS,
  ICON_MAP,
  resolveIcon,
} from "@/components/categories/CategoryCard";
import { GripVertical, Plus, ArrowLeft, Eye, EyeOff, Trash2, X } from "lucide-react";

// ─── Confirm dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <p className="text-sm font-medium mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-full border px-4 text-sm hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-9 rounded-full bg-red-600 text-white px-4 text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Icon picker ──────────────────────────────────────────────────────────────
function IconPickerField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const CurrentIcon = resolveIcon(value);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm hover:border-gray-400 transition-colors text-left"
      >
        <CurrentIcon className="size-4 shrink-0 text-gray-600" />
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "Выбрать иконку"}
        </span>
      </button>

      {open && (
        <div className="mt-2 p-3 rounded-xl border border-gray-200 bg-gray-50/80">
          <div className="grid grid-cols-7 gap-1.5">
            {Object.entries(ICON_MAP).map(([name, Icon]) => (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={`size-9 flex items-center justify-center rounded-lg transition-all ${
                  value === name
                    ? "bg-black text-white shadow-sm"
                    : "hover:bg-white hover:shadow-sm text-gray-600 border border-transparent hover:border-gray-200"
                }`}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tag chip input for subtitle ──────────────────────────────────────────────
function SubTagInput({
  value,
  onChange,
  suggestions,
  placeholder,
  name,
}: {
  value: string;
  onChange: (v: string) => void;
  suggestions: string[];
  placeholder?: string;
  name: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const tags = value
    ? value
        .split(" · ")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const availableSuggestions = suggestions.filter((s) => !tags.includes(s));

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed].join(" · "));
  }

  function removeTag(i: number) {
    onChange(tags.filter((_, idx) => idx !== i).join(" · "));
  }

  return (
    <div className="space-y-2">
      {/* Hidden input carries the joined value for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Selected chips */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black text-white text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity leading-none"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available suggestions from other categories */}
      {availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availableSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="px-2.5 py-1 rounded-full border text-xs hover:bg-black hover:text-white hover:border-black transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      {/* Custom tag input */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Введите и нажмите Enter"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(inputValue);
              setInputValue("");
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            addTag(inputValue);
            setInputValue("");
          }}
          className="h-10 px-3 rounded-lg border text-sm hover:bg-black hover:text-white hover:border-black transition-all shrink-0 font-medium"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

// ─── Desktop preview card (smaller than grid — for edit panel) ────────────────
function PreviewCard({
  title,
  sub,
  image,
  iconName,
  num = "01",
  bg,
}: {
  title: string;
  sub: string;
  image: string;
  iconName: string;
  num?: string;
  bg?: string;
}) {
  const Icon = resolveIcon(iconName);
  const background = bg || CARD_BGS[0];

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{ background: background, height: "clamp(220px, 20vw, 340px)" }}
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
      )}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "#a9ec46" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black text-white"
          style={{ fontSize: "clamp(60px, 10vw, 120px)", opacity: 0.04, lineHeight: 1 }}
        >
          {num}
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        <div
          className="size-11 rounded-xl flex items-center justify-center border shrink-0"
          style={{ background: "rgba(169,236,70,0.06)", borderColor: "rgba(169,236,70,0.18)" }}
        >
          <Icon className="size-5" style={{ color: "#a9ec46" }} />
        </div>
        <div>
          <p
            className="font-black text-white leading-tight mb-2"
            style={{ fontSize: "clamp(14px, 1.4vw, 20px)" }}
          >
            {title || "Название категории"}
          </p>
          {sub && <p className="text-white/75 text-[12px] tracking-wide">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Compact card for iPhone preview ─────────────────────────────────────────
function MobilePreviewCard({
  titleRu,
  imageUrl,
  iconName,
  subRu,
  index,
}: {
  titleRu: string;
  imageUrl?: string | null;
  iconName?: string | null;
  subRu?: string | null;
  index: number;
}) {
  const Icon = resolveIcon(iconName);
  const bg = CARD_BGS[index % CARD_BGS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden flex-shrink-0"
      style={{ background: bg, height: 185 }}
    >
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black text-white"
          style={{ fontSize: 80, opacity: 0.04, lineHeight: 1 }}
        >
          {num}
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
        <div
          className="size-10 rounded-xl flex items-center justify-center border shrink-0"
          style={{ background: "rgba(169,236,70,0.06)", borderColor: "rgba(169,236,70,0.18)" }}
        >
          <Icon className="size-5" style={{ color: "#a9ec46" }} />
        </div>
        <div>
          <p className="font-black text-white text-sm leading-tight mb-1">
            {titleRu || "Категория"}
          </p>
          {subRu && <p className="text-white/75 text-[11px] tracking-wide">{subRu}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── iPhone 14 Pro frame ──────────────────────────────────────────────────────
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  const CONTENT_W = 340;
  const SCREEN_W = 232;
  const scale = SCREEN_W / CONTENT_W;

  return (
    <div className="mx-auto select-none" style={{ width: 256 }}>
      <div
        style={{
          background: "linear-gradient(145deg, #e8c4b8, #c89080)",
          borderRadius: 44,
          padding: "12px 12px",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.12), 0 24px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.22)",
          position: "relative",
        }}
      >
        {[68, 114, 164].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              left: -3,
              top,
              width: 3,
              height: top === 68 ? 26 : 44,
              background: "#b07868",
              borderRadius: "2px 0 0 2px",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            right: -3,
            top: 136,
            width: 3,
            height: 62,
            background: "#b07868",
            borderRadius: "0 2px 2px 0",
          }}
        />
        <div
          style={{
            background: "#000",
            borderRadius: 34,
            overflow: "hidden",
            position: "relative",
            height: 490,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 11,
              left: "50%",
              transform: "translateX(-50%)",
              width: 88,
              height: 26,
              background: "#000",
              borderRadius: 13,
              zIndex: 20,
              boxShadow: "0 0 0 1.5px #1a1a1a",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 46,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: CONTENT_W,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                overflowY: "auto",
                height: Math.ceil(444 / scale),
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sortable grid card — uses shared CategoryCard ────────────────────────────
function SortableCategoryCard({
  category,
  index,
  onEdit,
  onToggleVisibility,
  onRequestDelete,
}: {
  category: ExhibitorCategory;
  index: number;
  onEdit: () => void;
  onToggleVisibility: () => void;
  onRequestDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  });

  const visible = (category as ExhibitorCategory & { isVisible?: boolean }).isVisible !== false;
  const num = String(index + 1).padStart(2, "0");
  const bg = CARD_BGS[index % CARD_BGS.length];
  const sub = (category as ExhibitorCategory & { subRu?: string }).subRu ?? "";

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : visible ? 1 : 0.55,
        zIndex: isDragging ? 50 : undefined,
      }}
    >
      {/*
        Spread dnd listeners directly onto CategoryCard so it IS the drag handle.
        Admin controls in children use onPointerDown stopPropagation to prevent
        accidental drag start when clicking buttons.
      */}
      <CategoryCard
        num={num}
        iconName={category.icon}
        label={category.titleRu}
        sub={sub || undefined}
        image={category.imageUrl}
        bg={bg}
        className="border border-white/5 hover:border-white/20 transition-all duration-300 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onClick={onEdit}
        {...attributes}
        {...listeners}
      >
        {/* Hidden badge */}
        {!visible && (
          <div className="absolute top-5 left-5 z-20 rounded-full bg-black/70 px-2.5 py-1 flex items-center gap-1.5 pointer-events-none">
            <EyeOff className="size-3 text-white/70" />
            <span className="text-[10px] text-white/70 font-semibold tracking-wide">Скрыто</span>
          </div>
        )}

        {/* Admin controls */}
        <div
          className="absolute top-5 right-5 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            title={visible ? "Скрыть с сайта" : "Показать на сайте"}
            onClick={onToggleVisibility}
            className="size-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 transition-colors"
          >
            {visible ? (
              <Eye className="size-3.5 text-white/80" />
            ) : (
              <EyeOff className="size-3.5 text-white/80" />
            )}
          </button>
          <button
            type="button"
            title="Удалить"
            onClick={onRequestDelete}
            className="size-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-red-600 transition-colors"
          >
            <Trash2 className="size-3.5 text-red-400" />
          </button>
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-5 right-5 z-20 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
          <GripVertical className="size-4 text-white/70" />
        </div>
      </CategoryCard>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function CategoriesClient({
  initialCategories,
}: {
  initialCategories: ExhibitorCategory[];
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [selectedId, setSelectedId] = useState<string | "new" | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Live preview state
  const [pvTitle, setPvTitle] = useState("");
  const [pvTitleEn, setPvTitleEn] = useState("");
  const [pvSubRu, setPvSubRu] = useState("");
  const [pvSubEn, setPvSubEn] = useState("");
  const [pvImage, setPvImage] = useState("");
  const [pvIcon, setPvIcon] = useState("");

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // Derive tag suggestions from existing subRu/subEn values in the DB
  const tagSuggestionsRu = useMemo(() => {
    const tags = new Set<string>();
    categories.forEach((cat) => {
      const sub = (cat as ExhibitorCategory & { subRu?: string }).subRu;
      if (sub)
        sub.split(" · ").forEach((t) => {
          const s = t.trim();
          if (s) tags.add(s);
        });
    });
    return Array.from(tags);
  }, [categories]);

  const tagSuggestionsEn = useMemo(() => {
    const tags = new Set<string>();
    categories.forEach((cat) => {
      const sub = (cat as ExhibitorCategory & { subEn?: string }).subEn;
      if (sub)
        sub.split(" · ").forEach((t) => {
          const s = t.trim();
          if (s) tags.add(s);
        });
    });
    return Array.from(tags);
  }, [categories]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function openEdit(cat: ExhibitorCategory) {
    setSelectedId(cat.id);
    setPvTitle(cat.titleRu);
    setPvTitleEn(cat.titleEn);
    setPvSubRu((cat as ExhibitorCategory & { subRu?: string }).subRu ?? "");
    setPvSubEn((cat as ExhibitorCategory & { subEn?: string }).subEn ?? "");
    setPvImage(cat.imageUrl ?? "");
    setPvIcon(cat.icon ?? "");
  }

  function openNew() {
    setSelectedId("new");
    setPvTitle("");
    setPvTitleEn("");
    setPvSubRu("");
    setPvSubEn("");
    setPvImage("");
    setPvIcon("");
  }

  function goBack() {
    setSelectedId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex((c) => c.id === active.id);
    const newIndex = categories.findIndex((c) => c.id === over.id);
    if (oldIndex === newIndex) return;
    const newOrder = arrayMove(categories, oldIndex, newIndex);
    setCategories(newOrder);
    void saveCategoryOrder(newOrder.map((c) => c.id));
  }

  function handleToggleVisibility(cat: ExhibitorCategory) {
    const currentVisible = (cat as ExhibitorCategory & { isVisible?: boolean }).isVisible !== false;
    const newVal = !currentVisible;
    setCategories((cs) =>
      cs.map((c) => (c.id === cat.id ? ({ ...c, isVisible: newVal } as ExhibitorCategory) : c)),
    );
    void toggleCategoryVisibility(cat.id, newVal);
  }

  function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setCategories((cs) => cs.filter((c) => c.id !== id));
    const fd = new FormData();
    fd.append("id", id);
    void deleteCategory(fd);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if (selectedId !== "new") {
      const cat = categories.find((c) => c.id === selectedId);
      const visible = (cat as ExhibitorCategory & { isVisible?: boolean })?.isVisible !== false;
      fd.set("isVisible", visible ? "true" : "false");
    } else {
      fd.set("isVisible", "true");
      fd.set("sortOrder", String(categories.length));
    }

    setIsSaving(true);
    try {
      await saveCategory(fd);
      goBack();
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  const selectedCat = categories.find((c) => c.id === selectedId);
  const previewIndex =
    selectedId === "new"
      ? categories.length
      : Math.max(
          0,
          categories.findIndex((c) => c.id === selectedId),
        );
  const previewNum = String(previewIndex + 1).padStart(2, "0");
  const previewBg = CARD_BGS[previewIndex % CARD_BGS.length];
  const previewTitleRu = pvTitle || selectedCat?.titleRu || "Название категории";
  const previewTitleEn = pvTitleEn || selectedCat?.titleEn || "Category Name";
  const previewSubRu =
    pvSubRu || (selectedCat as ExhibitorCategory & { subRu?: string })?.subRu || "";
  const previewSubEn =
    pvSubEn || (selectedCat as ExhibitorCategory & { subEn?: string })?.subEn || "";

  // ── Grid view ───────────────────────────────────────────────────────────────
  if (!selectedId) {
    return (
      <>
        {confirmDeleteId && (
          <ConfirmDialog
            message="Удалить категорию? Это действие нельзя отменить."
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmDeleteId(null)}
          />
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold">Разделы выставки</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Перетащите карточки для изменения порядка · Нажмите для редактирования
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 h-9 rounded-full bg-black text-white px-4 text-sm font-medium hover:bg-black/80 transition-colors"
          >
            <Plus className="size-4" />
            Добавить
          </button>
        </div>

        {categories.length > 0 ? (
          <>
            {/* max-w matches container-neva (1440px) so card proportions mirror the public site */}
            <div style={{ maxWidth: 1440 }}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={categories.map((c) => c.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categories.map((cat, i) => (
                      <SortableCategoryCard
                        key={cat.id}
                        category={cat}
                        index={i}
                        onEdit={() => openEdit(cat)}
                        onToggleVisibility={() => handleToggleVisibility(cat)}
                        onRequestDelete={() => setConfirmDeleteId(cat.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Mobile preview — read-only, no editing functionality */}
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Мобильный вид
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="text-xs text-muted-foreground mb-8 text-center">
                Так карточки отображаются на смартфоне — прокрутите экран телефона, чтобы увидеть
                все разделы.
              </p>
              <div className="flex justify-center">
                <IPhoneFrame>
                  <div
                    style={{
                      padding: "12px 12px 32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {categories.map((cat, i) => (
                      <MobilePreviewCard
                        key={cat.id}
                        titleRu={cat.titleRu}
                        imageUrl={cat.imageUrl}
                        iconName={cat.icon}
                        subRu={(cat as ExhibitorCategory & { subRu?: string }).subRu}
                        index={i}
                      />
                    ))}
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-sm text-muted-foreground">
            Нет категорий — нажмите «Добавить»
          </div>
        )}
      </>
    );
  }

  // ── Detail / edit view ──────────────────────────────────────────────────────
  return (
    <div>
      <button
        onClick={goBack}
        className="flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Назад к списку
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-10 items-start">
        {/* ── Form ── */}
        <div className="space-y-5">
          <h2 className="font-semibold text-base">
            {selectedId === "new" ? "Новая категория" : "Редактировать"}
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {selectedCat && <input type="hidden" name="id" value={selectedCat.id} />}

            <FormField label="Название (RU)" htmlFor="titleRu" required>
              <Input
                id="titleRu"
                name="titleRu"
                defaultValue={selectedCat?.titleRu}
                onChange={(e) => setPvTitle(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Подзаголовок (RU)">
              <SubTagInput
                name="subRu"
                value={pvSubRu}
                onChange={(v) => setPvSubRu(v)}
                suggestions={tagSuggestionsRu}
                placeholder="Напр.: Конструкции, Кровля…"
              />
            </FormField>

            <FormField label="Название (EN)" htmlFor="titleEn" required>
              <Input
                id="titleEn"
                name="titleEn"
                defaultValue={selectedCat?.titleEn}
                onChange={(e) => setPvTitleEn(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Подзаголовок (EN)">
              <SubTagInput
                name="subEn"
                value={pvSubEn}
                onChange={(v) => setPvSubEn(v)}
                suggestions={tagSuggestionsEn}
                placeholder="E.g.: Structures, Roofing…"
              />
            </FormField>

            <FormField label="Slug" htmlFor="slug">
              <Input
                id="slug"
                name="slug"
                defaultValue={selectedCat?.slug}
                placeholder="авто из EN"
              />
            </FormField>

            <FormField label="Иконка">
              <IconPickerField value={pvIcon} onChange={setPvIcon} />
              <input type="hidden" name="icon" value={pvIcon} />
            </FormField>

            <FormField label="Изображение карточки">
              <ImagePickerField
                name="imageUrl"
                defaultValue={selectedCat?.imageUrl ?? ""}
                onChange={setPvImage}
              />
            </FormField>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={isSaving}
                className="h-11 rounded-full bg-black text-white px-6 text-sm font-semibold hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Сохранение…" : "Сохранить"}
              </button>
              {selectedCat && (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(selectedCat.id)}
                  className="h-11 rounded-full border px-5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Удалить
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Previews ── */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-6">
            Предпросмотр
          </p>

          {/* RU previews: desktop + iPhone */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <span className="inline-block px-1.5 py-0.5 rounded bg-muted text-[10px] font-bold">
                RU
              </span>
              Русская версия
            </p>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-full" style={{ maxWidth: 280 }}>
                <p className="text-[10px] text-muted-foreground mb-2">Десктоп</p>
                <PreviewCard
                  title={previewTitleRu}
                  sub={previewSubRu}
                  image={pvImage}
                  iconName={pvIcon || selectedCat?.icon || ""}
                  num={previewNum}
                  bg={previewBg}
                />
              </div>
              <div className="shrink-0">
                <p className="text-[10px] text-muted-foreground mb-2">Мобильный</p>
                <IPhoneFrame>
                  <div style={{ padding: "12px 12px 32px" }}>
                    <MobilePreviewCard
                      titleRu={previewTitleRu}
                      imageUrl={pvImage || null}
                      iconName={pvIcon || selectedCat?.icon || null}
                      subRu={previewSubRu || null}
                      index={previewIndex}
                    />
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </div>

          {/* EN previews: desktop + iPhone */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <span className="inline-block px-1.5 py-0.5 rounded bg-muted text-[10px] font-bold">
                EN
              </span>
              English version
            </p>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-full" style={{ maxWidth: 280 }}>
                <p className="text-[10px] text-muted-foreground mb-2">Desktop</p>
                <PreviewCard
                  title={previewTitleEn}
                  sub={previewSubEn}
                  image={pvImage}
                  iconName={pvIcon || selectedCat?.icon || ""}
                  num={previewNum}
                  bg={previewBg}
                />
              </div>
              <div className="shrink-0">
                <p className="text-[10px] text-muted-foreground mb-2">Mobile</p>
                <IPhoneFrame>
                  <div style={{ padding: "12px 12px 32px" }}>
                    <MobilePreviewCard
                      titleRu={previewTitleEn}
                      imageUrl={pvImage || null}
                      iconName={pvIcon || selectedCat?.icon || null}
                      subRu={previewSubEn || null}
                      index={previewIndex}
                    />
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmDeleteId && (
        <ConfirmDialog
          message="Удалить категорию? Это действие нельзя отменить."
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
}
