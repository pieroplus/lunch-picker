import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { Restaurant } from "@/lib/types";

const DUMMY_DATA: Restaurant[] = [
  {
    name: "サンプル和食 恵比寿屋",
    genre: "和食・会席",
    distance: "恵比寿駅から徒歩3分",
    budget: "1,500円",
    recommendation: "落ち着いた個室があり、5人でもゆったり話せます。日替わりの焼き魚御膳が絶品。",
    notes: "ランチタイムは混雑するため、12時前の入店がおすすめ。",
    url: '#',
  },
  {
    name: "イタリアンバル・ステラ",
    genre: "イタリアン",
    distance: "恵比寿駅から徒歩5分",
    budget: "1,200円",
    recommendation: "明るい店内で会話が弾みます。自家製生パスタが人気。",
    notes: "ドリンクバー付きですが、90分制の制限がある場合があります。",
    url: '#',
  },
  {
    name: "本格中華 龍鳳閣",
    genre: "中華料理",
    distance: "恵比寿駅から徒歩2分",
    budget: "1,000円",
    recommendation: "円卓があるので5人のランチに最適。提供スピードが非常に早いです。",
    notes: "ランチは現金のみの支払いです。",
    url: '#',
  }
];

export async function POST(req: Request) {
    console.log("API KEY:", process.env.GEMINI_API_KEY);
  try {
    const { stations, cuisine, budget } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // APIキーがない場合はダミーモード
    if (!apiKey || apiKey === "") {
      console.log("Using Dummy Mode");
      return NextResponse.json({ restaurants: DUMMY_DATA, mode: "dummy" });
    }

    // Gemini API モード
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `
あなたは「実在確認を最優先する飲食店検索エンジン」です。
生成AIとしての創作能力は使用せず、既知の実在店舗のみを提案してください。

【検索条件】
・最寄り駅：${stations}
・食べたいもの：${cuisine}
・予算：${budget}
・利用シーン：会社の3〜5人でのランチ、会話がしやすい店
・徒歩10分以内


【出力形式】
JSON配列のみを出力すること。
文章・説明・補足・コードブロックは禁止。

[
  {
    "name": "正式な店舗名",
    "genre": "料理ジャンル",
    "distance": "駅からの距離",
    "budget": "ランチ予算",
    "recommendation": "会話しやすい理由や特徴（簡潔）",
    "notes": "注意点（不明なら空文字）",
    "url": "実在する可能性が高いURL（不明なら空文字）"
  }
]
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // JSON部分のみを抽出（GeminiがMarkdownのコードブロックで返す場合があるため）
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const restaurants = jsonMatch ? JSON.parse(jsonMatch[0]) : DUMMY_DATA;

    return NextResponse.json({ restaurants, mode: "gemini" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ restaurants: DUMMY_DATA, mode: "error-fallback" });
  }
}