import React from "react";
import { useSettings } from "../context/SettingsContext";
import ColorThemeCustomizer from "../components/ColorThemeCustomizer/ColorThemeCustomizer";

const fontOptions = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Fira Code", value: "Fira Code, monospace" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
];

const SettingsCustomizationPage: React.FC = () => {
  const {
    theme,
    fontSize,
    fontFamily,
    setTheme,
    setFontSize,
    setFontFamily,
  } = useSettings();

  return (
    <div className="space-y-8 max-w-4xl p-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded shadow transition-all duration-300">
      <h2 className="text-2xl font-semibold">Кастомизация интерфейса</h2>

      {/* Выбор темы */}
      <div>
        <label className="block mb-1 font-medium">Тема:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 dark:text-white transition"
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
        </select>
      </div>

      {/* Размер шрифта */}
      <div>
        <label className="block mb-1 font-medium">Размер шрифта:</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min={10}
            max={20}
            step={1}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
          <span className="inline-block w-10 text-sm">{fontSize}px</span>
        </div>
      </div>

      {/* Шрифт */}
      <div>
        <label className="block mb-1 font-medium">Шрифт:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 dark:text-white"
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
        <div className="mt-2 p-2 border rounded bg-gray-100 dark:bg-gray-800">
          <p style={{ fontFamily }} className="text-sm">
            Пример текста: The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>

      {/* Цветовая тема */}
      <div>
        <h3 className="text-lg font-semibold mt-6">Цветовая палитра</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Выберите базовый цвет или настройте вручную каждый оттенок. Цветовая палитра применяется ко всем элементам интерфейса.
        </p>
        <ColorThemeCustomizer />
      </div>
    </div>
  );
};

export default SettingsCustomizationPage;