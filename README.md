# テレAIクローン

電話番号・注文を管理する Next.js 製のサンプルアプリです。ログイン画面からダッシュボードに遷移し、電話番号や注文情報の CRUD を行う UI が用意されています。UI コンポーネントは Radix UI と Tailwind CSS を利用し、[v0.dev](https://v0.dev) から生成されたコードをベースにしています。

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kiichi-pmagentjps-projects/v0-)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ONQuuzIBPCO)

## サービス概要
- ログイン後にダッシュボードへアクセスし、電話番号一覧や注文一覧を閲覧できます。
- 画面はすべて仮データで構成されており、実際のバックエンド処理は未実装です。
- 今後 Supabase 認証や CSV 出力などの機能追加を想定しています。

## ディレクトリ構成
```
app/          ページコンポーネント (login, dashboard, numbers, orders など)
components/   再利用可能な UI コンポーネント群
lib/          補助的なユーティリティ関数
public/       画像などの静的ファイル
styles/       グローバル CSS
next.config.mjs  Next.js の設定
```

## ローカル開発
1. 依存パッケージをインストール
   ```bash
   pnpm install
   ```
2. 開発サーバを起動
   ```bash
   pnpm dev
   ```
3. `http://localhost:3000` をブラウザで開きます。

## 参考
- プロジェクトは [v0.dev](https://v0.dev) で作成・更新されると自動でこのリポジトリに同期されます。
- デプロイ先は Vercel です。
