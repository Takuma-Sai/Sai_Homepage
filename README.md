# Sai Homepage

AIエンジニア 崔 拓真（Takuma Sai）のポートフォリオサイト。1 ページ構成。

## 技術スタック

- Next.js 16（App Router）/ React 19 / TypeScript
- Tailwind CSS v4
- ヒーローの地球儀は Canvas 2D の自前実装（外部ライブラリなし）

## 開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Windows で `.tools/node-v24.14.0-win-x64/` に置いた Node を使う場合は `dev.ps1` / `lint.ps1` / `build.ps1` を実行する（`.tools/` は git 管理外）。

## ディレクトリ構成

```
src/
├── app/                 # ルーティング（layout.tsx, page.tsx, globals.css）
├── components/
│   ├── layout/          # ヘッダー・フッター・モバイルナビ
│   ├── sections/        # ページの各セクション（Hero / About / Skills / Works / Contact）
│   ├── effects/         # 地球儀キャンバス・スクロール連動の演出
│   └── ui/              # セクション枠・見出し・アイコン・SNSリンクなどの部品
└── lib/
    ├── content/
    │   └── site-content.ts  # 掲載内容のデータ
    └── globe/           # 地球儀の大陸データ・航路・球面計算
```

## 内容の更新

プロフィール・スキル・実績・SNS リンクなどの掲載内容は、すべて `src/lib/content/site-content.ts` に集約している。文言の変更はこのファイルだけを編集すればよい。
