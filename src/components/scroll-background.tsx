// 微細なフラクタルノイズ（質感用）。SVG を data URI 化したもの。
const noiseDataUri =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const meshGradients = [
  "radial-gradient(60% 50% at 18% 22%, rgba(8, 145, 178, 0.20), transparent 70%)",
  "radial-gradient(55% 45% at 82% 30%, rgba(14, 165, 233, 0.18), transparent 70%)",
  "radial-gradient(60% 55% at 50% 82%, rgba(13, 148, 136, 0.16), transparent 72%)",
].join(", ");

/**
 * 全ページ共通のスクロール連動背景。
 * グラデーションメッシュ・パララックスオーブ・グリッド/ノイズ質感を重ねる。
 * 動きは globals.css の各クラス（scroll-driven / フォールバック）が担う。
 */
export function ScrollBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* グラデーションメッシュ（スクロールで位置・色相が変化） */}
      <div
        className="bg-mesh absolute inset-0"
        style={{ backgroundImage: meshGradients }}
      />

      {/* 奥のレイヤー（小さく動く） */}
      <div className="parallax-far absolute inset-0">
        <div className="orb-3 absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-teal-700/10 blur-[100px]" />
        {/* グリッド（質感・奥行き） */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />
      </div>

      {/* 中間レイヤー */}
      <div className="parallax-mid absolute inset-0">
        <div className="orb-2 absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-sky-500/15 blur-[120px]" />
      </div>

      {/* 手前のレイヤー（大きく動く＝視差） */}
      <div className="parallax-near absolute inset-0">
        <div className="orb-1 absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="orb-1 absolute right-1/4 top-2/3 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* フィルムグレイン */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: noiseDataUri }}
      />
    </div>
  );
}
