"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ImageIcon, Upload, X, Check, Loader2, Images } from "lucide-react";
import { uploadMedia, fetchMediaAssets, type MediaAssetItem } from "@/server/actions/admin/media";

type Props = {
  name: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
};

export function ImagePickerField({ name, defaultValue = "", onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function openDialog() {
    setOpen(true);
    setTab("library");
    setLoadingAssets(true);
    try {
      const list = await fetchMediaAssets();
      setAssets(list);
    } finally {
      setLoadingAssets(false);
    }
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadMedia(fd);
      if (result?.url) {
        setValue(result.url);
        onChange?.(result.url);
        setOpen(false);
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFileUpload(file);
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85dvh]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
                <h2 className="font-semibold text-base">Выбрать изображение</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b px-6 shrink-0">
                {(["library", "upload"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      tab === t
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "library" ? "Из библиотеки" : "Загрузить"}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">
                {tab === "library" &&
                  (loadingAssets ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="size-6 animate-spin text-gray-400" />
                    </div>
                  ) : assets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
                      <Images className="size-10" />
                      <p className="text-sm">Нет загруженных изображений</p>
                      <button
                        type="button"
                        onClick={() => setTab("upload")}
                        className="text-sm text-black underline underline-offset-2"
                      >
                        Загрузить первое
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {assets.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          title={a.filename}
                          onClick={() => {
                            setValue(a.url);
                            onChange?.(a.url);
                            setOpen(false);
                          }}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:border-gray-400 ${
                            value === a.url
                              ? "border-black ring-2 ring-black ring-offset-1"
                              : "border-gray-200"
                          }`}
                        >
                          {a.mimeType.startsWith("image/") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.url}
                              alt={a.filename}
                              className="w-full h-full object-contain bg-gray-50"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <ImageIcon className="size-6 text-gray-400" />
                            </div>
                          )}
                          {value === a.url && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Check className="size-6 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}

                {tab === "upload" && (
                  <div className="flex flex-col items-center gap-4">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => !uploading && fileRef.current?.click()}
                      className={`w-full border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-3 cursor-pointer transition-colors
                        ${uploading ? "pointer-events-none opacity-60" : ""}
                        ${dragOver ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"}`}
                    >
                      {uploading ? (
                        <Loader2 className="size-8 text-gray-400 animate-spin" />
                      ) : (
                        <Upload className="size-8 text-gray-400" />
                      )}
                      <p className="text-sm text-gray-500 text-center">
                        {uploading ? "Загрузка..." : "Перетащите файл или нажмите для выбора"}
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG, SVG, WebP до 8 МБ</p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="space-y-1.5">
      <input type="hidden" name={name} value={value} />

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-14 w-14 shrink-0 rounded-md border border-gray-100 bg-white object-contain"
          />
          <p className="flex-1 truncate text-xs text-gray-500 min-w-0">{value}</p>
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={openDialog}
              className="h-8 rounded-full border border-gray-200 bg-white px-3 text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              Изменить
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("");
                onChange?.("");
              }}
              title="Удалить"
              className="size-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <X className="size-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openDialog}
          className="flex w-full items-center justify-center gap-2 h-20 rounded-lg border-2 border-dashed border-gray-200 text-sm text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-600"
        >
          <ImageIcon className="size-4" />
          Выбрать изображение
        </button>
      )}

      {dialog}
    </div>
  );
}
