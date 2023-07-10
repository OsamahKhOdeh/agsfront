import React, { useEffect, useState } from "react";
import "./AllProjects.css";
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

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

function ProjectTasks(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="project_tasks_all">
      {/* <div className="modal_title">
        {props.currentProject.projectName} ({props.currentProject.employee})
      </div> */}
      {props.currentProject.projectName && (
        <div className="add-task">
          <input type="text" className="form-control" placeholder="Update Task here" onChange={(e) => props.setNewTask(e.target.value)} autocomplete="on"></input>
          <div className="ags-btn-main-fill" onClick={props.handleNewTask}>
            Add
          </div>
        </div>
      )}
      {props.currentProject?.tasks?.slice(0, 3).map((task, index) => (
        <>
          <div className="task-item">
            <div className="date-task">
              <span>{new Date(task.date).toLocaleString()}</span>
              <span>{timeAgo(new Date(task.date))}</span>
            </div>
            <div className="date-info">{task.task}</div>
          </div>
        </>
      ))}
      {showMore &&
        props.currentProject?.tasks?.slice(2).map((task, index) => (
          <>
            <div className="task-item">
              <div className="date-task">
                <span>{new Date(task.date).toLocaleString()}</span>
                <span>{timeAgo(new Date(task.date))}</span>
              </div>
              <div className="date-info">{task.task}</div>
            </div>
          </>
        ))}
      {props.currentProject.tasks?.length > 0 && (
        <div className="btn-more text-center">
          <button type="button" class="ags-btn-sm-main-outlin" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

const AllProjects = () => {
  const today = new Date();

  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("employee");
  const [dateFilter, setDateFilter] = useState(today);

  console.log(currentProject.projectName);
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
    dispatch(getAllProjects(username));
  }, []);

  let projects = useSelector((state) => state.project.projects);
  console.log(projects);

  const handleNewTask = () => {
    if (newTask.length > 10 && newTask.length <= 150) {
      axios
        .patch(`${BASE_URL}/projects/${currentProject._id}`, { task: newTask, admin: isAdmin, username: username })
        .then((response) => {
          console.log(response.data);
          dispatch(addTask(response.data));
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          showToastMessage("Task added successfully", "success");
          setNewTask("");
          setTimeout(() => {
            //  setShowNewPaymentForm(false)
          }, 1000);

          console.log("PDF file uploaded successfully");
        })
        .catch((error) => {
          // setLoading(false)
          // toastWithMessage(error.message, "error");
          // showToastMessage(error.message , "error")
          //setShowNewPaymentForm(false)

          console.error(error);
        });
    } else {
      showToastMessage("Task must be less than 150 characters and more than 10 ", "reject");
    }
    setRefresh(Math.floor(Math.random() * 100 + 1));
  };

  const handleNewProject = () => {
    if (newProject.length > 3) {
      axios
        .post(`${BASE_URL}/projects`, { projectName: newProject, employee: username })
        .then((response) => {
          console.log(response.data);
          const newProject = response.data;
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          dispatch(addProject(newProject));
          showToastMessage("Project added successfully", "success");
          setTimeout(() => {
            //  setShowNewPaymentForm(false)
          }, 1000);

          console.log("PDF file uploaded successfully");
        })
        .catch((error) => {
          // setLoading(false)
          // toastWithMessage(error.message, "error");
          // showToastMessage(error.message , "error")
          //setShowNewPaymentForm(false)

          console.error(error);
        });

      closeModal();
    }
  };

  /* ------------------------------- searchQuery ------------------------------ */
  console.log(filter.length);
  console.log(searchQuery);

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
    projects = projects.filter((item) => item["projectName"].toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "Employee", value: "employee" },
    { name: "Project Name", value: "projectName" },
    { name: "Task", value: "tasks" },
  ];

  const dateOptions = [
    { name: "Today", value: today },
    { name: "Last 2 hours", value: Date(new Date().valueOf() - 3 * 1000 * 60 * 60) },
    { name: "Yesterday", value: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24) },
    { name: "All", value: "All" },
  ];

  /* -------------------------------------------------------------------------- */
  return (
    <>
      <ToastContainer />
      <div className="project_page_container_all">
        {/* <div className="projects_filters_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
          <DropDownSelect onChange={handleDateChange} options={dateOptions} />
        </div> */}
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
        {/* <div className="projects_list" style={{ width: "100%", margin: "auto" }}>
          {projects?.map((project) => (
            <>
              <div
                style={{ display: "flex" }}
                className="project_item"
                onClick={() => {
                  setCurrentProject(project);
                  openModal(true);
                }}
              >
                <div className="project_name">
                  <h5>{project.projectName}</h5>
                </div>{" "}
                <div className="project_employee">
                  <b style={{ color: "red" }}> {project.employee}</b>
                </div>
                <div>
                  <h6 className="project_time" style={{ color: "blue" }}>
                    {timeAgo(new Date(project.updatedAt))}
                  </h6>
                </div>
                <div className="project_last_task">{project?.tasks[project?.tasks?.length - 1]?.task}</div>
              </div>
            </>
          ))}
        </div> */}

        {/* New Design  */}
        <div className=" pi__table  pi__table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Employee</th>
                <th scope="col">Time</th>
                <th scope="col">Last Task</th>
                <th scope="col">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project) => (
                <tr>
                  <th scope="row">{project.projectName}</th>
                  <td>{project.employee}</td>
                  <td>{timeAgo(new Date(project.updatedAt))}</td>
                  <td>{project?.tasks[project?.tasks?.length - 1]?.task}</td>
                  <td
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      setCurrentProject(project);
                    }}
                  >
                    <i class="uil uil-eye uil-medium required"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="new_Modal"
        overlayClassName="new_Overlay"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="exit_butt" onClick={() => closeModal()}>
          Exit
        </div>
        <ProjectTasks setNewTask={setNewTask} currentProject={currentProject} handleNewTask={handleNewTask}></ProjectTasks>
      </Modal> */}

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {currentProject.projectName} ({currentProject.employee})
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ProjectTasks setNewTask={setNewTask} currentProject={currentProject} handleNewTask={handleNewTask}></ProjectTasks>
              {/* <input type="text" className="from-control" placeholder="Enter project name here" onChange={(e) => setNewProject(e.target.value)} autocomplete="on"></input> */}
            </div>
            {/* <div class="modal-footer">
              <button type="button" class="ags-btn-sm-main-outlin" data-dismiss="modal" onClick={handleNewProject}>
                Add Project
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProjects;
