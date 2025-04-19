import React from "react";
import ZoomControl from "../ZoomControl/ZoomControl";
import { useSettings } from "../../context/SettingsContext";

const Footer: React.FC = () => {
  const { scale, setScale } = useSettings();

  return (
    <footer className="h-footer bg-gray-800 text-white flex items-center justify-between text-xs shadow-inner px-4">
      <span className="text-[10px]">© 2025 АСУ ЦБ</span>
      <ZoomControl zoom={scale} onZoomChange={setScale} />
    </footer>
  );
};

export default Footer;



