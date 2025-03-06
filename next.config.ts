import { NextConfig } from 'next';

const config: NextConfig = {
  // ESLintチェックを無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScriptの型チェックを無効化
  typescript: {
    ignoreBuildErrors: true,
  },
  // 静的エクスポートを有効化（Firebase Hostingにデプロイする場合に推奨）
  output: 'export',
  // 画像最適化を無効化（静的エクスポート時に必要）
  images: {
    unoptimized: true,
  },
  // その他の設定
  reactStrictMode: true,
};

export default config;