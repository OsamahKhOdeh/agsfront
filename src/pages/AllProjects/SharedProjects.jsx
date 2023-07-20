import React, { useEffect, useState } from "react";
import "./AllProjects.scss";
import "./SharedProjects.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getEmployeeProjects } from "../../actions/projects";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../api/index";
import { showToastMessage } from "../../helpers/toaster";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { addProject, addTask } from "../../store/projectSlice";
import SearchBox from "../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";
import { timeAgo } from "./AllProjects";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListSubheader } from "@material-ui/core";

function ItemTask(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div class="task-item" style={showMore ? { height: "fit-content !important;" } : { height: "auto;" }}>
      <div className="task-info">
        <h6>{props.project.employee}</h6>
        {/* <span>{project.employee}</span> */}
      </div>
      {props.project.tasks.length > 0 && (
        <div className="wrapper-tasks">
          {props.project.tasks.slice(0, 3).map((task) => (
            <div className="task-date">
              <small>
                <span key={props.index}>
                  <i class="uil uil-table"></i> <strong>Task</strong>: {task.task}
                </span>
              </small>
              <small>
                <span>
                  <i class="uil uil-calendar-alt"></i> <strong>Date</strong>: {new Date(task.date).toLocaleString()}
                </span>
              </small>
            </div>
          ))}
          {showMore &&
            props.project.tasks.slice(2).map((task) => (
              <div className="task-date">
                <small>
                  <span key={props.index}>
                    <i class="uil uil-table"></i> <strong>Task</strong>: {task.task}
                  </span>
                </small>
                <small>
                  <span>
                    <i class="uil uil-calendar-alt"></i> <strong>Date</strong>: {new Date(task.date).toLocaleString()}
                  </span>
                </small>
              </div>
            ))}
        </div>
      )}
      {props.project.tasks.length <= 0 && (
        <div className="no-tasks">
          <i class="uil uil-folder-slash"></i>
          <span> No Tasks Addedd Yet!</span>
        </div>
      )}
      {props.project.tasks.length > 0 && (
        <div className="btn-more">
          <button type="button" class="ags-btn-sm-main-outlin" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

const SharedProjects = () => {
  const today = new Date();
  MyListSubheader.muiSkipListHighlight = true;
  function MyListSubheader(props) {
    return <ListSubheader {...props} />;
  }
  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProjectName, setCurrentProjectName] = useState("");
  const [currentProjectEmployees, setCurrentProjectEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("employee");
  const [dateFilter, setDateFilter] = useState(today);

  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  let projects = useSelector((state) => state.project.projects);
  console.log(projects);

  /* ------------------------------- searchQuery ------------------------------ */

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    console.log("value", e.target.value);
    let option = options.find((item) => item.name.toString().toLowerCase().includes(e.target.value.toLowerCase()));
    if (option) {
      setFilter(e.target.value);
    } else {
      setDateFilter(e.target.value);
    }
  };
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    projects = projects.filter((item) => item.projectName.toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (dateFilter !== "All") {
    projects = projects.filter((item) => {
      if (
        new Date(dateFilter).getFullYear() === new Date(item.updatedAt).getFullYear() &&
        new Date(dateFilter).getMonth() === new Date(item.updatedAt).getMonth() &&
        new Date(dateFilter).getDay() === new Date(item.updatedAt).getDay()
      ) {
        return item;
      }
    });
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    console.log("this is from search");
    projects = projects.filter((item) => item["projectName"].toString().includes(searchQuery.toLowerCase()));
  }

  let allProjectsNames = [];
  projects?.forEach((project) => {
    allProjectsNames.push({ projectName: project.projectName, _id: project._id });
  });
  console.log(allProjectsNames);
  const projectsNames = [...new Set(allProjectsNames)];
  console.log(projectsNames);

  projects = projects.filter((project) => project.projectName === currentProjectName);

  const options = [
    { name: "Employee", value: "employee" },
    // { name: "Project Name", value: "projectName" },
    { name: "Task", value: "tasks" },
  ];

  const dateOptions = [
    { name: "Today", value: today },
    { name: "Last 2 hours", value: Date(new Date().valueOf() - 3 * 1000 * 60 * 60) },
    { name: "Yesterday", value: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24) },
    { name: "All", value: "All" },
  ];
  const removeSpacesFromStr = (str) => {
    return `id_${str.toString().replaceAll(/\s/g, "")}`;
  };
  /* -------------------------------------------------------------------------- */
  return (
    <>
      {/* <div className="project_page_container_shared">
        <div className="projects_filters_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
          <DropDownSelect onChange={handleDateChange} options={dateOptions} />
        </div>
        <div style={{ display: "flex", width: "100%" }} className="project_page_container">
          <div className="projects_list">
            {projectsNames?.map((projectName) => (
              <>
                <div className="project_item" onClick={() => setCurrentProjectName(projectName)}>
                  <h5>{projectName}</h5>
                </div>
              </>
            ))}
          </div>

          <div className="shared_projects_container">
            <div className="shared_projects_name">{currentProjectName}</div>
            <div className="shared_projects_div">
              {currentProjectName && (
                <>
                  {projects?.map((project, index) => (
                    <div key={index} className="project_employee_div">
                      <div className="project_employee_epmloyee">{project.employee}</div>
                      <div className="project_employee_tasks">
                        {project.tasks.map((task) => (
                          <div className="sh_task">
                            <div className="sh_task_date">{new Date(task.date).toLocaleString()}</div>
                            <div className="sh_task_text">{task.task}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div className="projects shared-projects">
        <div className="projects_filters_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <div className="filter">
            <select class="form-select" onChange={handleFilterChange}>
              <option selected disabled>
                Filter
              </option>
              {options.map((op) => (
                <option value={op.value}>{op.name}</option>
              ))}
              {dateOptions.map((op) => (
                <option value={op.value}>{op.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="project">
          <div className="card-project-tittle">
            <h5>My Projects</h5>
          </div>
          <div className="card-project-body">
            <>
              {/* <div className="project_item" onClick={() => setCurrentProject(project)}>
                  <h6>{project.projectName}</h6>
                </div> */}
              <div class="accordion accordion-flush" id="accordionFlushExample">
                {projectsNames?.map((item) => (
                  <div class="accordion-item" onClick={() => setCurrentProjectName(item.projectName)}>
                    <h2 class="accordion-header" id={removeSpacesFromStr(item._id)}>
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${removeSpacesFromStr(item._id)}_1`}
                        aria-expanded="false"
                        aria-controls={`${removeSpacesFromStr(item._id)}_1.`}
                      >
                        {item.projectName}
                      </button>
                    </h2>
                    <div
                      id={`${removeSpacesFromStr(item._id)}_1`}
                      class="accordion-collapse collapse"
                      aria-labelledby={removeSpacesFromStr(item._id)}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        {currentProjectName && (
                          <div className="tasks">
                            {projects?.map((project, index) => (
                              <ItemTask project={project} index={index}></ItemTask>
                            ))}
                          </div>
                        )}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedProjects;
