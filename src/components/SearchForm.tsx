"use client";
import { useState } from "react";
import { SearchParams } from "@/lib/types";

export default function SearchForm({ onSearch, loading }: { onSearch: (params: SearchParams) => void, loading: boolean }) {
  const [params, setParams] = useState<SearchParams>({ stations: "", cuisine: "", budget: "" });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">最寄り駅</label>
          <input
            type="text"
            placeholder="例：恵比寿駅、目黒駅"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none text-black"
            value={params.stations}
            onChange={(e) => setParams({ ...params, stations: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">食べたいもの</label>
          <input
            type="text"
            placeholder="例：イタリアン、和食、さっぱりしたもの"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none text-black"
            value={params.cuisine}
            onChange={(e) => setParams({ ...params, cuisine: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">予算（1人あたり）</label>
          <input
            type="text"
            placeholder="例：1500円以内"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none text-black"
            value={params.budget}
            onChange={(e) => setParams({ ...params, budget: e.target.value })}
          />
        </div>
        <button
          onClick={() => onSearch(params)}
          disabled={loading || !params.stations}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "検索中..." : "お店を探す"}
        </button>
      </div>
    </div>
  );
}