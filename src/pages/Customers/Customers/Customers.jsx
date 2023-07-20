import React from "react";
import "./Customers.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { showToastMessage } from "../../../helpers/toaster";
const Customers = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [allCustomers, setAllCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const getAllCustomers = async () => {
      await axios
        .get(`${BASE_URL}/customer`)
        .then(async (response) => {
          console.log(response.data);
          setAllCustomers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllCustomers();
  }, []);
  const updateCustomer = (item) => {
    navigate("/user/UpdateCustomer", { state: { ...item } });
  };
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${BASE_URL}/customer/${customer._id}`)
      .then(async (response) => {
        let index = allCustomers.findIndex((s) => s._id === customer._id);
        console.log("index", index);
        const updatedCustomers = [...allCustomers];
        updatedCustomers.splice(index, 1);
        setAllCustomers(updatedCustomers);
        console.log(setAllCustomers);
        showToastMessage("Customer Deleted Successfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="blogs_container forwarders">
        <div className="card-custom">
          <div className="card-custom-tittle">
            <h6>Customers</h6>
            <i
              className="uil uil-plus-circle uil-lage"
              onClick={() => {
                navigate("/user/addCustomer");
              }}
            ></i>
          </div>
          <div className="card-custom-body">
            <div className="wrapper-blogs">
              {allCustomers?.length > 0 &&
                allCustomers?.map((item, index) => (
                  <div className="blog">
                    <div class="card">
                      <div class="card__body">
                        <span class="actions">
                          <i class="uil uil-trash-alt" onClick={() => setCustomer(item)} data-toggle="modal" data-target="#exampleModal"></i>
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
              {allCustomers?.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                  <p class="text-secondary mb-0">No Customers Added Yet!</p>
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
                Delete {customer.name}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete customer </p>
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

export default Customers;
