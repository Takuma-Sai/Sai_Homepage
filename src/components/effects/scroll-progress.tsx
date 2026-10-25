/**
 * ページ上部のスクロール進行バー。
 * 動きは globals.css の .scroll-progress（scroll-driven / フォールバック）が担う。
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300"
    />
  );
}
