"use client";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant, SearchParams } from "@/lib/types";
import { Coffee } from "lucide-react";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<string>("");

  const searchRestaurants = async (params: SearchParams) => {
    setLoading(true);
    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      setRestaurants(data.restaurants);
      setMode(data.mode);
    } catch (error) {
      alert("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8 px-4 shadow-md mb-8">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Coffee size={32} />
          <div>
            <h1 className="text-2xl font-bold text-white">社内ランチ選定ツール</h1>
            <p className="text-blue-100 text-sm">3〜5人のランチに最適なお店をAIが提案</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <SearchForm onSearch={searchRestaurants} loading={loading} />

        {mode && (
          <div className="mt-4 text-xs text-right text-gray-400">
            {mode === "gemini" ? "✨ AIモードで検索完了" : "ℹ️ デモ(ダミー)モードで表示中"}
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-1">
          {restaurants.map((shop, index) => (
            <RestaurantCard key={index} restaurant={shop} />
          ))}
          {!loading && restaurants.length === 0 && (
            <div className="text-center py-12 text-gray-400 italic">
              条件を入力して検索してください
            </div>
          )}
        </div>
      </div>
    </main>
  );
}