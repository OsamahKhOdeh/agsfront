import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProjects } from "../../actions/projects";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../api/index";
import { showToastMessage } from "../../helpers/toaster";
import Modal from "react-modal";

const Projects = () => {
  const { username, isAdmin, status } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState({});
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
    axios
      .patch(`${BASE_URL}/projects/${currentProject._id}`, { task: newTask })
      .then((response) => {
        //  setLoading(false)
        //toastWithMessage("Payment added successfully","success")
        showToastMessage("Payment added successfully", "success");
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
  };

  const handleNewProject = () => {
    if (newProject.length > 3) {
      axios
        .post(`${BASE_URL}/projects`, { projectName: newProject, employee: username })
        .then((response) => {
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          showToastMessage("Payment added successfully", "success");
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
  return (
    <>
      <div className="project_page_container">
        <div className="projects_list">
          {projects?.map((project) => (
            <>
              <div className="project_item" onClick={() => setCurrentProject(project)}>
                <h2>{project.projectName}</h2>
              </div>
            </>
          ))}
          <div className="add_project_button" onClick={openModal}>
            Add new Project
          </div>
        </div>

        <div className="project_tasks">
          {currentProject?.tasks?.map((task, index) => (
            <>
              <div className="task">
                <div className="task_date">{task.date}</div>
                <div className="task_text">{task.task}</div>
              </div>
            </>
          ))}

          <div className="add_task">
            <input
              type="text"
              className="new_task_text"
              placeholder="add task here"
              onChange={(e) => setNewTask(e.target.value)}
            ></input>
            <div className="new_task" onClick={handleNewTask}>
              Add new task
            </div>
          </div>
        </div>
      </div>
      <Modal
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
        <input
          type="text"
          className="new_task_text"
          placeholder="add new Project here"
          onChange={(e) => setNewProject(e.target.value)}
        ></input>
        <div className="add_proj" onClick={handleNewProject}>
          Add Project
        </div>
      </Modal>
    </>
  );
};

export default Projects;
