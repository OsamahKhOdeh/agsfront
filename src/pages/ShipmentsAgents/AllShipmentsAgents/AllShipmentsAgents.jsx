import React from "react";
import "./AllShipmentsAgents.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { showToastMessage } from "../../../helpers/toaster";
const AllShipmentsAgents = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [allAgents, setAgents] = useState([]);
  const [agent, setAgent] = useState({});
  useEffect(() => {
    const getAgents = async () => {
      await axios
        .get(`${BASE_URL}/shipping-agent`)
        .then(async (response) => {
          console.log(response.data);
          setAgents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAgents();
  }, []);
  const updateCustomer = (item) => {
    navigate("/user/updateShipmentAgent", { state: { ...item } });
  };
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${BASE_URL}/shipping-agent/${agent._id}`)
      .then(async (response) => {
        let index = allAgents.findIndex((s) => s._id === agent._id);
        console.log("index", index);
        const updatedAgents = [...allAgents];
        updatedAgents.splice(index, 1);
        setAgents(updatedAgents);
        console.log(setAgents);
        showToastMessage("Shipping Deleted Successfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="blogs_container forwarders">
        <div className="card-custom">
          <div className="card-custom-tittle">
            <h6>Shipping Agents</h6>
            <i
              className="uil uil-plus-circle uil-lage"
              onClick={() => {
                navigate("/user/addShipmentAgent");
              }}
            ></i>
          </div>
          <div className="card-custom-body">
            <div className="wrapper-blogs">
              {allAgents?.length > 0 &&
                allAgents?.map((item, index) => (
                  <div className="blog">
                    <div class="card">
                      <div class="card__body">
                        <span class="actions">
                          <i class="uil uil-trash-alt" onClick={() => setAgent(item)} data-toggle="modal" data-target="#exampleModal"></i>
                          <i class="uil uil-edit-alt" onClick={() => updateCustomer(item)}></i>
                        </span>
                        <h4>{item.name}</h4>
                        <p>
                          {item.address.country} | {item.address.city} | {item.address.street}
                        </p>
                      </div>
                      <div class="card__footer">
                        <div class="user">
                          <img src={item.image} alt="user__image" class="user__image" />
                          <div class="user__info">
                            <h5>
                              {item.address.country}, {item.address.city}, {item.address.state} {item.address.street}
                            </h5>
                            <small>
                              {item.contact[0].email} | {item.contact[0].phone}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {allAgents?.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                  <p class="text-secondary mb-0">No Shipping Agents Added Yet!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete {agent.name}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete shipping agent </p>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={handleConfirmDelete} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllShipmentsAgents;
