import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { useSettings } from "../../context/SettingsContext";

const Layout: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const submenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scale, fontSize, fontFamily, theme } = useSettings();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!submenuRefs.current.some(ref => ref && ref.contains(e.target as Node))) {
        setActiveIndex(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    const handleScroll = () => setActiveIndex(null);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen text-sm ${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ fontSize: `${fontSize}px`, fontFamily }}
    >
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          submenuRefs={submenuRefs}
        />

        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
          <main
            className="flex-1 p-6 overflow-auto"
            style={{ transform: `scale(${scale / 100})`, transformOrigin: "top left" }}
          >
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

