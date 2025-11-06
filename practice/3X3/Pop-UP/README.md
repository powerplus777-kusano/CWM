# AI 3X3マトリクス生成ツール

AIが自動生成する問題解決型3X3マトリクスツールです。中心のタイトルを入力すると、8つのサブタイトルと詳細な解説を自動生成します。

## ✨ 主な機能

- **🤖 AI自動生成**: タイトルを入力するだけで、8つの関連項目と詳細を生成
- **📦 モックデータ対応**: APIなしでもローカルで動作（レシピ、ビジネススキル、汎用トピック対応）
- **🎨 動的カラーリング**: テーマに合わせて色使いを自動調整
- **🖼️ Unsplash画像統合**: テーマに関連する背景画像を自動取得
- **💡 詳細モーダル**: 各項目をクリックして具体例・材料・手順を表示
- **🖨️ 2種類の印刷機能**:
  - マトリクスのみ印刷
  - 全詳細ページ一括印刷（A4対応）
- **💾 HTMLダウンロード**: 生成したマトリクスを完全版HTMLとしてダウンロード
- **📱 レスポンシブデザイン**: スマートフォン、タブレット、PC完全対応

## 🚀 クイックスタート

### 最速の使い方（API不要）

1. `public/index.html` をブラウザで開く
2. タイトルを入力（例: 「ナスのレシピ8選」「営業スキル」「時間管理術」）
3. 「生成する」をクリック

**これだけで動作します！** モックデータが自動的に使用されます。

### 対応コンテンツタイプ

- **🍳 レシピ・料理系**: 8カテゴリ × 3レシピ = 24レシピ完備
- **💼 ビジネススキル系**: 8スキル + 詳細な習得方法
- **📚 汎用トピック**: 8つの実践的アプローチ + ステップ

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーし、Claude APIキーを設定します:

```bash
cp .env.example .env
```

`.env`ファイルを編集:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Claude APIキーは[Anthropic Console](https://console.anthropic.com/)から取得できます。

### 3. ローカル開発サーバーの起動

```bash
npm run dev
```

または、Netlify CLIを使用:

```bash
netlify dev
```

ブラウザで `http://localhost:8888` を開きます。

## Netlifyへのデプロイ

### 1. Netlifyにサイトを作成

```bash
netlify init
```

### 2. 環境変数を設定

Netlify管理画面で環境変数を設定:

- Site Settings > Environment variables
- `ANTHROPIC_API_KEY` を追加

または、CLIで設定:

```bash
netlify env:set ANTHROPIC_API_KEY "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 3. デプロイ

```bash
netlify deploy --prod
```

## 使い方

1. **タイトル入力**: 中心のタイトル（テーマ）を入力
   - 例: 「営業スキル」「プロジェクト管理」「健康的な生活」

2. **生成**: 「生成する」ボタンをクリック

3. **詳細表示**: 各セルをクリックして詳細情報を表示

4. **印刷**: 「印刷する」ボタンでA4サイズで印刷

5. **ダウンロード**: 「HTMLダウンロード」で保存

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript (Vanilla)
- **バックエンド**: Netlify Functions (Node.js)
- **AI API**: Anthropic Claude 3.5 Sonnet
- **画像**: Unsplash API
- **アイコン**: Lucide Icons

## セキュリティ

- APIキーは環境変数で管理
- Netlify Functionsでサーバーサイド処理
- ユーザーはAPIキー不要で利用可能

## ライセンス

MIT License

## サポート

問題が発生した場合は、Issueを作成してください。

---

## 📖 詳細情報

**本番デプロイやカスタマイズの詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) をご覧ください。**

- デプロイ方法の詳細
- トラブルシューティング
- カスタマイズ方法
- 制限事項と注意点
- チェックリスト
