// Netlify Function: Claude API呼び出し用サーバーレス関数
// CORS問題を回避するため、サーバー側からAPIを呼び出す

exports.handler = async (event, context) => {
    // CORSヘッダーの設定
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // OPTIONSリクエスト（プリフライト）への対応
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // POSTリクエストのみ許可
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // リクエストボディの解析
        const { theme, apiKey } = JSON.parse(event.body);

        if (!theme) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'テーマが指定されていません' })
            };
        }

        // APIキーの取得（環境変数またはリクエストから）
        const claudeApiKey = process.env.CLAUDE_API_KEY || apiKey;

        if (!claudeApiKey) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'APIキーが設定されていません' })
            };
        }

        // Claude APIへのリクエスト
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': claudeApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 2048,
                messages: [{
                    role: 'user',
                    content: `あなたは戦略思考の専門家です。以下のテーマについて、3×3マトリクス思考に基づいた分析を行ってください。

テーマ: ${theme}

以下のJSON形式で、中心テーマと周囲8つの重要な要素を提供してください：

{
  "center": "中心テーマ（20文字以内）",
  "cells": [
    "要素1（15文字以内）",
    "要素2（15文字以内）",
    "要素3（15文字以内）",
    "要素4（15文字以内）",
    "要素5（15文字以内）",
    "要素6（15文字以内）",
    "要素7（15文字以内）",
    "要素8（15文字以内）"
  ]
}

重要な指示：
1. JSON形式のみを返してください（説明文は不要）
2. 8つの要素は、テーマを多角的に分析できるよう、バランスよく配置してください
3. 各要素は具体的で実践的なものにしてください
4. 文字数制限を必ず守ってください`
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({
                    error: `API Error: ${errorData.error?.message || 'Unknown error'}`
                })
            };
        }

        const data = await response.json();

        // Claude APIからのレスポンスをそのまま返す
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'サーバーエラーが発生しました: ' + error.message
            })
        };
    }
};
