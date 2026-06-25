"use client";

type Props = {
  placeholder: string;
  submitLabel: string;
};

export function FooterNewsletterForm({ placeholder, submitLabel }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <input
        type="email"
        required
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/20 bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 transition-colors focus:border-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="h-12 w-full rounded-xl bg-brand-red font-bold text-[15px] text-white transition-colors duration-200 hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
