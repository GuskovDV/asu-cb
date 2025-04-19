import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, Filter, ChevronDown } from "lucide-react";
import FilterPopup, { FilterPopupProps } from "../FilterPopup/FilterPopup";

interface Project {
  code: string;
  name: string;
  division: string;
  enterprise: string;
}

const ProjectTable: React.FC = () => {
  const [filterMenu, setFilterMenu] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const filterRef = useRef<HTMLDivElement>(null); // ✅ строго HTMLDivElement

  const demoProjects: Project[] = Array.from({ length: 100 }).map((_, i) => {
    const divisions = ["Сибирь", "Урал", "Ванадий", "Тимир"];
    const division = divisions[i % divisions.length];
    const names = [
      "Жилой комплекс",
      "Промышленная зона",
      "Административное здание",
      "Объект инфраструктуры",
    ];
    const name = `${names[i % names.length]} №${i + 1}`;
    const enterpriseMap: Record<string, string> = {
      Сибирь: "ЗСМК",
      Урал: "НТМК",
      Ванадий: "ЕВТ",
      Тимир: "ЕВТ",
    };
    return {
      code: `БК-${String(i + 1).padStart(3, "0")}`,
      name,
      division,
      enterprise: enterpriseMap[division] || "",
    };
  });

  const filteredProjects = demoProjects
    .filter((p) => !divisionFilter || p.division === divisionFilter)
    .filter((p) => {
      return (
        (!columnFilters.code || columnFilters.code.includes(p.code)) &&
        (!columnFilters.name || columnFilters.name.includes(p.name)) &&
        (!columnFilters.division || columnFilters.division.includes(p.division)) &&
        (!columnFilters.enterprise || columnFilters.enterprise.includes(p.enterprise))
      );
    });

  const groupedProjects = filteredProjects.reduce((acc: Record<string, Project[]>, project) => {
    if (!acc[project.division]) acc[project.division] = [];
    acc[project.division].push(project);
    return acc;
  }, {});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="mb-4 flex space-x-2 justify-start flex-wrap">
        {["Все", "Сибирь", "Урал", "Ванадий", "Тимир"].map((region) => (
          <button
            key={region}
            className={`w-[120px] text-center px-3 py-1 border rounded transition ${
              divisionFilter === region || (region === "Все" && divisionFilter === null)
                ? "bg-gray-200 text-gray-900 border-gray-400"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setDivisionFilter(region === "Все" ? null : region)}
          >
            {region} (
            {region === "Все"
              ? demoProjects.length
              : demoProjects.filter((p) => p.division === region).length}
            )
          </button>
        ))}
      </div>

      <table className="min-w-full bg-white shadow rounded text-xs table-fixed border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-gray-100">
            {["code", "name", "division", "enterprise"].map((column) => (
              <th key={column} className="p-2 text-left border border-gray-300 relative">
                <div className="flex items-center justify-between relative">
                  <span>
                    {{
                      code: "Бизнес код",
                      name: "Наименование проекта",
                      division: "Дивизион",
                      enterprise: "Предприятие",
                    }[column]}
                  </span>
                  <div className="relative">
                    <button
                      className="ml-2 text-xs hover:text-yellow-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterMenu(filterMenu === column ? null : column);
                      }}
                    >
                      {columnFilters[column] ? (
                        <Filter size={14} className="text-blue-600" />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                    <AnimatePresence>
                      {filterMenu === column && (
                        <motion.div
                          key="filter"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-1 z-50"
                        >
                          <FilterPopup
                            column={column}
                            values={demoProjects.map((p) => p[column as keyof Project])}
                            filters={columnFilters}
                            setFilters={setColumnFilters}
                            close={() => setFilterMenu(null)}
                            filterRef={filterRef}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedProjects).map(([division, projects]) => (
            <React.Fragment key={division}>
              <tr
                className="bg-gray-100 text-xs font-medium text-gray-800 cursor-pointer"
                onClick={() => setExpandedGroups((prev) => ({ ...prev, [division]: !prev[division] }))}
              >
                <td colSpan={4} className="p-2 pl-4 border border-gray-300 w-full">
                  {expandedGroups[division] ? (
                    <Minus size={14} className="inline mr-1" />
                  ) : (
                    <Plus size={14} className="inline mr-1" />
                  )}
                  {division}
                </td>
              </tr>
              {expandedGroups[division] &&
                projects.map((project) => (
                  <tr key={project.code} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-2 border border-gray-200">{project.code}</td>
                    <td className="p-2 border border-gray-200">{project.name}</td>
                    <td className="p-2 border border-gray-200">{project.division}</td>
                    <td className="p-2 border border-gray-200">{project.enterprise}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

