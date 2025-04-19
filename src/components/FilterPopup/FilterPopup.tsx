import React, { useState } from "react";

interface FilterPopupProps {
  column: string;
  values: string[];
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  close: () => void;
  filterRef: React.RefObject<HTMLDivElement | null>;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  column,
  values,
  filters,
  setFilters,
  close,
  filterRef,
}) => {
  const appliedFilter = filters[column] || [];
  const [tempSelected, setTempSelected] = useState<string[]>(appliedFilter);
  const [search, setSearch] = useState("");

  const filteredValues = Array.from(new Set(values)).filter((val) =>
    val.toLowerCase().includes(search.toLowerCase())
  );

  const isAllSelected = filteredValues.every((val) =>
    tempSelected.includes(val)
  );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setTempSelected(tempSelected.filter((val) => !filteredValues.includes(val)));
    } else {
      const combined = Array.from(new Set([...tempSelected, ...filteredValues]));
      setTempSelected(combined);
    }
  };

  const clearAll = () => setTempSelected([]);

  const resetFilter = () => {
    setFilters((prev) => {
      const updated = { ...prev };
      delete updated[column];
      return updated;
    });
    close();
  };

  const applyFilter = () => {
    setFilters((prev) => ({
      ...prev,
      [column]: tempSelected,
    }));
    close();
  };

  return (
    <div
      ref={filterRef}
      className="absolute z-50 bg-white border text-black p-3 rounded shadow w-64 text-xs resize overflow-auto min-w-[250px] h-[300px] max-w-[600px] max-h-[500px] flex flex-col"
      style={{ resize: "both", overflow: "auto" }}
    >
      <div className="font-semibold mb-2">Фильтр по: {column}</div>
      <input
        type="text"
        placeholder="Поиск..."
        className="mb-2 w-full border rounded p-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex justify-between mb-2 text-xs text-blue-600">
        <button onClick={toggleSelectAll}>
          {isAllSelected ? "Снять выделение" : "Выделить всё"}
        </button>
        <button onClick={clearAll}>Очистить</button>
      </div>
      <div className="flex-1 min-h-[100px] overflow-auto border rounded p-1 space-y-1 text-xs text-gray-800">
        {filteredValues.length > 0 ? (
          filteredValues.map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tempSelected.includes(val)}
                onChange={() => {
                  const next = tempSelected.includes(val)
                    ? tempSelected.filter((v) => v !== val)
                    : [...tempSelected, val];
                  setTempSelected(next);
                }}
              />
              <span className="truncate">{val}</span>
            </label>
          ))
        ) : (
          <div className="text-gray-400 italic text-center py-2">Нет совпадений</div>
        )}
      </div>
      <div className="mt-3 flex justify-between items-center text-xs">
        {appliedFilter.length > 0 && (
          <button onClick={resetFilter} className="text-red-500">
            Сбросить фильтр
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <button onClick={close} className="text-gray-600">
            Отмена
          </button>
          <button onClick={applyFilter} className="text-blue-600 font-semibold">
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
export type { FilterPopupProps };



