import React from "react";
import ProjectTable from "../components/ProjectTable/ProjectTable";

const ProjectListPage: React.FC = () => {
  return (
    <div className="text-gray-800 text-sm">
      <h2 className="text-2xl font-semibold mb-4">Реестр проектов</h2>
      <div className="bg-white rounded shadow p-4 border border-gray-200">
        <ProjectTable />
      </div>
    </div>
  );
};

export default ProjectListPage;

