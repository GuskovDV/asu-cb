import React from "react";
import { Minus, Plus } from "lucide-react";

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (value: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, onZoomChange }) => {
  const handleZoom = (delta: number) => {
    const newZoom = Math.min(150, Math.max(50, zoom + delta));
    onZoomChange(newZoom);
  };

  return (
    <div className="flex items-center justify-center h-full space-x-2 ml-auto mr-[10px]">
      <button
        aria-label="Уменьшить масштаб"
        className="w-5 h-5 text-white hover:text-yellow-400 transition"
        onClick={() => handleZoom(-10)}
      >
        <Minus size={12} />
      </button>
      <input
        type="range"
        min={50}
        max={150}
        step={10}
        value={zoom}
        onChange={(e) => onZoomChange(Number(e.target.value))}
        className="h-1 w-32 cursor-pointer appearance-none bg-gray-300 rounded-full
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:bg-gray-700
          [&::-webkit-slider-thumb]:rounded-full"
      />
      <button
        aria-label="Увеличить масштаб"
        className="w-5 h-5 text-white hover:text-yellow-400 transition"
        onClick={() => handleZoom(10)}
      >
        <Plus size={12} />
      </button>
      <span className="ml-2 w-12 text-white text-xs text-right">{zoom}%</span>
    </div>
  );
};

export default ZoomControl;




