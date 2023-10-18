import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { projectsFilterBtns } from "@/config/imports";
import { filterBtnConfigTypes } from "@/types/imports";
import { AddImage } from "@/assets/imports";
import { Filter, PaginationComponent, ProjectsCard } from "@/components/imports";
import { ProjectType } from "@/store/types";

import { PROJECTS_ROOT_URL, FETCH_PROJECTS_DATA_URL } from "@/apis/endpoint";

const Projects = () => {
  const activeFilter: string = localStorage.getItem("grid_type") || "grid";
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const navigate = useNavigate();

  const handleFilter = (value: filterBtnConfigTypes["value"]) => {
    localStorage.setItem("grid_type", value);
    location.reload();
    // setCurrentPage(0);
  };

  const accessToken = localStorage.getItem('access_token');

  const fetchData = async (page: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ FETCH_PROJECTS_DATA_URL }&page=${ page + 1 }`,
        config
      );

      setProjects(response.data.results);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (project: ProjectType) => {
    console.log("project:", project);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(
        `${ PROJECTS_ROOT_URL }/${ project.id }`,
        config
      );

      console.log("Deleted Successfully!");
      // @ts-ignore
      document.getElementById(project.id).style.display = "none";


    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage])

  const createProject = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await axios.post(
        `${ PROJECTS_ROOT_URL }`,
        {},
        config
      );

      navigate(`info/${res.data.id}`);

    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative h-full">
      <div className="w-full flex items-center justify-end pt-4 pb-7 sticky top-0 bg-milk z-[9999]">
        <Filter
          filterBtnConfig={projectsFilterBtns}
          active={activeFilter}
          onFilter={handleFilter}
        />
      </div>

      <div
        className={`layout w-full mb-[21px] gap-5 ${activeFilter === "grid" ? "grid" : "list"
          }`}
      >
        <div className="parent rounded-[10px] w-full h-[240px] bg-white flex flex-col cursor-pointer hover:opacity-60 transition-all">
          <div
            className="main w-full flex flex-col my-auto gap-6 items-center justify-center"
            onClick={createProject}
          >
            <img className="image" width={55} src={AddImage} alt="Add Image" />
            <p className="text mx-auto text-center px-4 text-md font-secondary-medium text-black2">
              Create New Project
            </p>
          </div>
        </div>
        {projects.map((project: ProjectType, index: number) => <ProjectsCard
          key={index}
          info={project}
          handleDelete={() => handleDelete(project)}
        />
        )}
      </div>
      {totalPages > 1 ? <PaginationComponent pageCount={totalPages} onPageChange={(value: number) => setCurrentPage(value)} /> : <></>}
    </div>
  );
}

export default Projects;
