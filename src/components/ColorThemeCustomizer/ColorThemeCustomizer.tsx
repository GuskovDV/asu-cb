import React, { useState, useEffect } from "react";

interface ColorTheme {
  name: string;
  shades: string[];
}

const defaultTheme: ColorTheme = {
  name: "По умолчанию",
  shades: ["#e5f6ff", "#b3e6ff", "#80d4ff", "#4dc3ff", "#1ab2ff", "#008fcc", "#006699"],
};

const brandThemes: ColorTheme[] = [
  {
    name: "Ocean Blue",
    shades: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00acc1", "#0097a7"],
  },
  {
    name: "Sunset Orange",
    shades: ["#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00"],
  },
  {
    name: "Emerald Green",
    shades: ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#388e3c"],
  },
];

const ColorThemeCustomizer: React.FC = () => {
  const [themeName, setThemeName] = useState("Моя тема");
  const [shades, setShades] = useState<string[]>([...defaultTheme.shades]);
  const [themes, setThemes] = useState<ColorTheme[]>([]);
  const [pendingShades, setPendingShades] = useState<string[]>([...defaultTheme.shades]);

  // Загрузка сохранённых тем
  useEffect(() => {
    const saved = localStorage.getItem("colorThemes");
    if (saved) {
      try {
        setThemes(JSON.parse(saved));
      } catch {
        localStorage.removeItem("colorThemes");
      }
    }
  }, []);

  // Применение темы к :root
  const applyTheme = (newShades: string[]) => {
    document.documentElement.style.setProperty("--color-primary", newShades[4]);
    newShades.forEach((color, index) => {
      const level = (index + 1) * 100;
      document.documentElement.style.setProperty(`--color-primary-${level}`, color);
    });
  };

  useEffect(() => {
    applyTheme(shades);
  }, [shades]);

  const saveTheme = () => {
    if (!themeName.trim()) return;
    const newTheme: ColorTheme = { name: themeName.trim(), shades };
    const updatedThemes = [...themes.filter(t => t.name !== newTheme.name), newTheme];
    setThemes(updatedThemes);
    localStorage.setItem("colorThemes", JSON.stringify(updatedThemes));
  };

  const handleApply = () => {
    setShades([...pendingShades]);
  };

  const handleChange = (index: number, color: string) => {
    const updated = [...pendingShades];
    updated[index] = color;
    setPendingShades(updated);
  };

  const applyPreset = (theme: ColorTheme) => {
    setPendingShades(theme.shades);
    setThemeName(theme.name);
  };

  const resetToDefault = () => {
    setPendingShades([...defaultTheme.shades]);
    setThemeName("По умолчанию");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Цветовая тема</h3>

      <div>
        <label className="block font-medium mb-1">Имя темы:</label>
        <input
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pendingShades.map((color, idx) => (
          <div key={idx}>
            <label className="text-sm font-medium block mb-1">{(idx + 1) * 100}</label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-full h-10 border rounded cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-400)] text-white px-4 py-2 rounded"
          onClick={handleApply}
        >
          ✅ Применить
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          onClick={saveTheme}
        >
          💾 Сохранить
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={resetToDefault}
        >
          ♻️ Сбросить по умолчанию
        </button>
      </div>

      {/* Предустановленные темы */}
      <div className="mt-6">
        <h4 className="font-medium mb-2">Брендовые темы:</h4>
        <div className="flex flex-wrap gap-3">
          {[defaultTheme, ...brandThemes].map((t) => (
            <button
              key={t.name}
              onClick={() => applyPreset(t)}
              className="px-4 py-2 rounded border text-sm"
              style={{
                background: `linear-gradient(90deg, ${t.shades[0]}, ${t.shades[6]})`,
                color: "#000",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorThemeCustomizer;