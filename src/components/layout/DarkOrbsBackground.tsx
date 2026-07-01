/** Статичные орбы-акценты для внутренних тёмных страниц (без анимации скролла). */
export function DarkOrbsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute rounded-full"
        style={{
          width: "55vh",
          height: "55vh",
          top: "12%",
          left: "6%",
          background: "#12B669",
          opacity: 0.42,
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "42vh",
          height: "42vh",
          top: "22%",
          left: "64%",
          background: "#a9ec46",
          opacity: 0.2,
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
