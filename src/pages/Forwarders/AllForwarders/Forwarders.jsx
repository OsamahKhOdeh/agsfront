import React from "react";
import "./AllForwarders.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { showToastMessage } from "../../../helpers/toaster";
const Forwarders = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [allForwarders, setAllForwarders] = useState([]);
  const [forwarder, setForwarder] = useState({});
  useEffect(() => {
    const getAllFrowarders = async () => {
      await axios
        .get(`${BASE_URL}/forwarder`)
        .then(async (response) => {
          console.log(response.data);
          setAllForwarders(response.data);
          console.log(allForwarders);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllFrowarders();
  }, []);
  const updateForwarder = (item) => {
    navigate("/user/updateForwarder", { state: { ...item } });
  };
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${BASE_URL}/forwarder/${forwarder._id}`)
      .then(async (response) => {
        let index = allForwarders.findIndex((s) => s._id === forwarder._id);
        console.log("index", index);
        const updatedForwarders = [...allForwarders];
        updatedForwarders.splice(index, 1);
        setAllForwarders(updatedForwarders);
        console.log(allForwarders);
        showToastMessage("Forwarder Deleted Succesfully", "success");
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
            <h6>Forwarders</h6>
            <i
              className="uil uil-plus-circle uil-lage"
              onClick={() => {
                navigate("/user/addforwarder");
              }}
            ></i>
          </div>
          <div className="card-custom-body">
            <div className="wrapper-blogs">
              {allForwarders?.length > 0 &&
                allForwarders?.map((item, index) => (
                  <div className="blog">
                    <div class="card">
                      <div class="card__body">
                        <span class="actions">
                          <i class="uil uil-trash-alt" onClick={() => setForwarder(item)} data-toggle="modal" data-target="#exampleModal"></i>
                          <i class="uil uil-edit-alt" onClick={() => updateForwarder(item)}></i>
                        </span>
                        <h4>{item.name}</h4>
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Etd</th>
                              <th scope="col">Storage Duration</th>
                              <th scope="col">Transit Time</th>
                              <th scope="col">Cost Container</th>
                              <th scope="col">Container Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.etd ? item.etd : 0}</td>
                              <td>{item.freeStorageDuration ? item.freeStorageDuration : 0}</td>
                              <td>{item.transitTime ? item.transitTime : 0}</td>
                              <td>{item.costPerContainer ? item.costPerContainer : 0}</td>
                              <td>{item.availableContainerCount ? item.transitTime : 0}</td>
                            </tr>
                          </tbody>
                        </table>
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
              {allForwarders?.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                  <p class="text-secondary mb-0">No Forwarders Added Yet!</p>
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
                Delete {forwarder.name}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete forwarder </p>
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

export default Forwarders;
