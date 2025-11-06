// 3X3マトリクス自動生成API
// Claude APIを使用してタイトルから8つのサブタイトルと詳細を生成

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // CORSヘッダー設定
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  };

  // プリフライトリクエストへの対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // POSTリクエストのみ受け付け
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // リクエストボディをパース
    const { title } = JSON.parse(event.body);

    if (!title || title.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'タイトルが入力されていません' })
      };
    }

    // 環境変数からAPIキーを取得
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API設定エラー。管理者に連絡してください。' })
      };
    }

    // Claude APIへのリクエスト
    const prompt = `「${title}」というテーマで問題解決型の3X3マトリクスを作成してください。

以下の形式で、8つの項目を生成してください。各項目は、このテーマを深く理解し実践するために重要なポイントです。

各項目について:
1. タイトル（20文字以内、簡潔で具体的に）
2. 説明（60文字程度、その項目の本質を説明）
3. 具体例（3つ、各30文字程度）
4. 習得のポイント（60文字程度、実践的なアドバイス）

必ず以下のJSON形式で出力してください（他の説明文は不要）:

{
  "items": [
    {
      "title": "タイトル1",
      "description": "説明文1",
      "examples": ["具体例1-1", "具体例1-2", "具体例1-3"],
      "point": "習得のポイント1"
    },
    ...（全8項目）
  ],
  "colorScheme": {
    "primary": "#667eea",
    "secondary": "#764ba2",
    "background": "#e8eef5"
  },
  "unsplashKeyword": "適切な英語キーワード"
}

colorSchemeは、テーマに合った色を提案してください。
unsplashKeywordは、テーマを表現する適切な英語キーワードを1つ提案してください。`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API Error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: 'AI APIエラーが発生しました',
          details: response.statusText
        })
      };
    }

    const data = await response.json();

    // Claude APIのレスポンスからコンテンツを抽出
    const content = data.content[0].text;

    // JSONを抽出（コードブロックで囲まれている場合も対応）
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'AI応答の解析に失敗しました',
          rawContent: content
        })
      };
    }

    const result = JSON.parse(jsonMatch[0]);

    // 生成結果を返す
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        title: title,
        ...result
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'サーバーエラーが発生しました',
        message: error.message
      })
    };
  }
};
