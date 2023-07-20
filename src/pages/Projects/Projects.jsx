import React, { useEffect, useState } from "react";
import "./Projects.scss";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProjects } from "../../actions/projects";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../api/index";
import { showToastMessage } from "../../helpers/toaster";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { addProject, addTask } from "../../store/projectSlice";

const Projects = () => {
  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState({});
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
    dispatch(getEmployeeProjects(username));
  }, []);

  const projects = useSelector((state) => state.project.projects);
  console.log(projects);

  const handleNewTask = () => {
    setNewTask("");

    if (newTask.length >= 2 && newTask.length <= 150) {
      axios
        .patch(`${BASE_URL}/projects/${currentProject._id}`, { task: newTask })
        .then((response) => {
          console.log(response.data);
          dispatch(addTask(response.data));
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          showToastMessage("Task added successfullyfdfffffffffffff", "success");

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
      setNewTask("");

      showToastMessage("Task must be less than 150 characters and more than 10 ", "reject");
    }
    setNewTask("");
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
  const removeSpacesFromStr = (str) => {
    return `id_${str.toString().replaceAll(/\s/g, "")}`;
  };
  return (
    <>
      <div className="projects">
        <div className="project">
          <div className="card-project-tittle projects-tittle">
            <h5>My Projects</h5>
            <i class="uil uil-plus-circle" data-toggle="modal" data-target="#exampleModal"></i>
          </div>
          <div className="card-project-body">
            <>
              {/* <div className="project_item" onClick={() => setCurrentProject(project)}>
                  <h6>{project.projectName}</h6>
                </div> */}
              <div class="accordion accordion-flush" id="accordionFlushExample">
                {projects?.map((project) => (
                  <div class="accordion-item" onClick={() => setCurrentProject(project)}>
                    <h2 class="accordion-header" id={removeSpacesFromStr(project._id)}>
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${removeSpacesFromStr(project._id)}_1`}
                        aria-expanded="false"
                        aria-controls={`${removeSpacesFromStr(project._id)}_1.`}
                      >
                        {project.projectName}
                      </button>
                    </h2>
                    <div
                      id={`${removeSpacesFromStr(project._id)}_1`}
                      class="accordion-collapse collapse"
                      aria-labelledby={removeSpacesFromStr(project._id)}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <div className="btn-task">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Task here"
                              value={newTask}
                              onChange={(e) => setNewTask(e.target.value)}
                              autocomplete="on"
                            ></input>
                          </div>
                          <div className="ags-btn-main-fill" onClick={handleNewTask}>
                            Add
                          </div>
                        </div>
                        {currentProject?.tasks?.length > 0 && (
                          <div className="tasks">
                            {currentProject?.tasks?.map((task, index) => (
                              <div class="task-item">
                                <div className="task-info">
                                  <h6>{task.task}</h6>
                                  {/* <span>{task.task}</span> */}
                                </div>
                                <div className="task-date">
                                  {task?.adminTask && (
                                    <small>
                                      <span className={index % 2 === 0 ? `task` : `task dark_row`} style={task?.adminTask ? { color: "#ba0021" } : null} key={index}>
                                        <i class="uil uil-table"></i> From Admin: {task.adminName}
                                      </span>
                                    </small>
                                  )}
                                  <small>
                                    <span>
                                      <i class="uil uil-calendar-alt"></i> Date: {new Date(task.date).toLocaleString()}
                                    </span>
                                  </small>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {currentProject?.tasks?.length <= 0 && (
                          <div className="no-tasks">
                            <i class="uil uil-folder-slash"></i>
                            <span> No Tasks Addedd Yet!</span>
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
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="new_Modal"
        overlayClassName="new_Overlay"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {" "}
        <button class="btn-close close__button" onClick={closeModal}></button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add New Project</h2>
        <input type="text" className="new_task_text" placeholder="add new Project here" onChange={(e) => setNewProject(e.target.value)} autocomplete="on"></input>
        <div className="add_proj" onClick={handleNewProject}>
          Add Project
        </div>
      </Modal> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New Project
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" className="from-control" placeholder="Enter project name here" onChange={(e) => setNewProject(e.target.value)} autocomplete="on"></input>
            </div>
            <div class="modal-footer">
              <button type="button" class="ags-btn-sm-main-outlin" data-dismiss="modal" onClick={handleNewProject}>
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
