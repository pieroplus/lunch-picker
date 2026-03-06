import { Restaurant } from "@/lib/types";
import { MapPin, Utensils, Wallet, Star, AlertCircle } from "lucide-react";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            <a href={restaurant.url} target="_blank" style={{ cursor: 'pointer' }}>{restaurant.name}</a></h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
            {restaurant.genre}
          </span>
        </div>
        
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-red-500 shrink-0" />
            <span>{restaurant.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-green-600 shrink-0" />
            <span>{restaurant.budget}</span>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1 font-bold text-orange-700">
              <Star size={16} fill="currentColor" />
              <span>おすすめポイント</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{restaurant.recommendation}</p>
          </div>
          <div className="flex items-start gap-2 text-xs bg-gray-50 p-2 rounded">
            <AlertCircle size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <span className="text-gray-500 italic">{restaurant.notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}