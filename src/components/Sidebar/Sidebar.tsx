// src/components/Sidebar/Sidebar.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  Package,
  BarChart,
  Settings,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  submenuRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const menuItems = [
  {
    label: "Проекты",
    icon: <Folder size={18} />,
    submenu: [
      { name: "Создать проект", path: "/проекты/создать" },
      { name: "Список проектов", path: "/проекты/список" },
    ],
  },
  {
    label: "Единичные расценки",
    icon: <FileText size={18} />,
    submenu: [
      { name: "Каталог ЕР", path: "/единичные-расценки/каталог" },
      { name: "Экспертная группа", path: "/единичные-расценки/экспертная-группа" },
      { name: "Мониторинг цен", path: "/единичные-расценки/мониторинг" },
    ],
  },
  {
    label: "Справочники",
    icon: <Folder size={18} />,
    submenu: [
      { name: "Ценовые справочники", path: "/справочники/ценовые" },
      { name: "Проектные справочники", path: "/справочники/проектные" },
    ],
  },
  {
    label: "ВМТР",
    icon: <Package size={18} />,
    submenu: [
      { name: "Реестр ВМТР", path: "/вмтр/реестр" },
      { name: "Конструктивные элементы", path: "/вмтр/конструктивные-элементы" },
    ],
  },
  {
    label: "Дашборды",
    icon: <BarChart size={18} />,
    submenu: [
      { name: "Общий", path: "/дашборды/общий" },
      { name: "По проектам", path: "/дашборды/по-проектам" },
    ],
  },
  {
    label: "Учебный центр",
    icon: <BookOpen size={18} />,
    submenu: [
      { name: "Курсы", path: "/учебный-центр/курсы" },
      { name: "Документация", path: "/учебный-центр/документация" },
    ],
  },
  {
    label: "Настройки",
    icon: <Settings size={18} />,
    submenu: [
      { name: "Профиль", path: "/настройки/профиль" },
      { name: "Права доступа", path: "/настройки/права-доступа" },
      { name: "Кастомизация", path: "/настройки/кастомизация" }, // 👈 новая страница
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeIndex, setActiveIndex, submenuRefs }) => {
  const setRef = (idx: number) => (el: HTMLDivElement | null) => {
    submenuRefs.current[idx] = el;
  };

  return (
    <aside className="w-[40px] bg-gray-900 flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center space-y-5">
        {menuItems.map((item, idx) => (
          <div key={idx} className="relative group">
            <button
              className={`w-8 h-8 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-md hover:bg-gray-700 transition duration-300 ${
                activeIndex === idx ? "ring-2 ring-white" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex === idx ? null : idx);
              }}
            >
              {item.icon}
            </button>
            <AnimatePresence>
              {activeIndex === idx && (
                <motion.div
                  ref={setRef(idx)}
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full top-0 ml-3 bg-white shadow-xl rounded px-3 py-2 z-10 w-[250px] origin-left"
                >
                  <div className="absolute left-[-8px] top-[9px] w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white" />
                  <div className="text-xs font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">
                    {item.label}
                  </div>
                  <ul className="space-y-1">
                    {item.submenu.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <Link
                          to={subItem.path}
                          className="block text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                          onClick={() => setActiveIndex(null)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;


