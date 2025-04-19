import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// Проекты
import ProjectListPage from "./pages/ProjectListPage";
import ProjectCreatePage from "./pages/ProjectCreatePage";

// Единичные расценки
import ERCatalogPage from "./pages/ERCatalogPage";
import ERGroupPage from "./pages/ERGroupPage";
import ERMonitoringPage from "./pages/ERMonitoringPage";

// Справочники
import PriceDirectoriesPage from "./pages/PriceDirectoriesPage";
import ProjectDirectoriesPage from "./pages/ProjectDirectoriesPage";

// ВМТР
import VMTRRegistryPage from "./pages/VMTRRegistryPage";
import VMTRConstructivePage from "./pages/VMTRConstructivePage";

// Дашборды
import DashboardGeneralPage from "./pages/DashboardGeneralPage";
import DashboardProjectsPage from "./pages/DashboardProjectsPage";

// Учебный центр
import CoursesPage from "./pages/CoursesPage";
import DocsPage from "./pages/DocsPage";

// Настройки
import ProfilePage from "./pages/ProfilePage";
import AccessRightsPage from "./pages/AccessRightsPage";
import SettingsCustomizationPage from "./pages/SettingsCustomizationPage";

// Заглушка
import Placeholder from "./pages/Placeholder";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Проекты */}
      <Route path="проекты/создать" element={<ProjectCreatePage />} />
      <Route path="проекты/список" element={<ProjectListPage />} />

      {/* Единичные расценки */}
      <Route path="единичные-расценки/каталог" element={<ERCatalogPage />} />
      <Route path="единичные-расценки/экспертная-группа" element={<ERGroupPage />} />
      <Route path="единичные-расценки/мониторинг" element={<ERMonitoringPage />} />

      {/* Справочники */}
      <Route path="справочники/ценовые" element={<PriceDirectoriesPage />} />
      <Route path="справочники/проектные" element={<ProjectDirectoriesPage />} />

      {/* ВМТР */}
      <Route path="вмтр/реестр" element={<VMTRRegistryPage />} />
      <Route path="вмтр/конструктивные-элементы" element={<VMTRConstructivePage />} />

      {/* Дашборды */}
      <Route path="дашборды/общий" element={<DashboardGeneralPage />} />
      <Route path="дашборды/по-проектам" element={<DashboardProjectsPage />} />

      {/* Учебный центр */}
      <Route path="учебный-центр/курсы" element={<CoursesPage />} />
      <Route path="учебный-центр/документация" element={<DocsPage />} />

      {/* Настройки */}
      <Route path="настройки/профиль" element={<ProfilePage />} />
      <Route path="настройки/права-доступа" element={<AccessRightsPage />} />
      <Route path="настройки/кастомизация" element={<SettingsCustomizationPage />} />

      {/* Заглушка */}
      <Route path="*" element={<Placeholder title="Страница не найдена" />} />
    </Route>
  </Routes>
);

export default AppRoutes;


