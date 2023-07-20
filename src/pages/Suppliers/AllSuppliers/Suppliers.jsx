import React, { useEffect } from "react";
import "./Suppliers.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../../helpers/toaster";

const Suppliers = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    const getAllSuppliers = async () => {
      await axios
        .get(`${BASE_URL}/supplier`)
        .then(async (response) => {
          setAllSuppliers(response.data);
          console.log(allSuppliers);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllSuppliers();
  }, []);

  const updateSupplier = (item) => {
    navigate("/user/updateSupplier", { state: { ...item } });
  };
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${BASE_URL}/supplier/${supplier._id}`)
      .then(async (response) => {
        let index = allSuppliers.findIndex((s) => s._id === supplier._id);
        console.log("index", index);
        const updatedSuppliers = [...allSuppliers];
        updatedSuppliers.splice(index, 1);
        setAllSuppliers(updatedSuppliers);
        console.log(allSuppliers);
        showToastMessage("Supplier Deleted Succesfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="blogs_container">
        <div className="card-custom">
          <div className="card-custom-tittle">
            <h6>Suppliers</h6>
            {/* <span
            className="ags-btn-main-fill border-btn"
            onClick={() => {
              navigate("/user/addSupplier");
            }}
          >
            <i class="uil uil-plus"></i> Add New
          </span> */}
            <i
              className="uil uil-plus-circle uil-lage"
              onClick={() => {
                navigate("/user/addSupplier");
              }}
            ></i>
          </div>
          <div className="card-custom-body">
            <div className="wrapper-blogs">
              {allSuppliers.length > 0 &&
                allSuppliers.map((item, index) => (
                  <div className="blog">
                    <div class="card">
                      <div class="card__body">
                        <span class="actions">
                          <i class="uil uil-trash-alt" onClick={() => setSupplier(item)} data-toggle="modal" data-target="#exampleModal"></i>
                          <i class="uil uil-edit-alt" onClick={() => updateSupplier(item)}></i>
                        </span>
                        <h4>{item.name}</h4>
                        {item.bankAccount.map((account, index) => (
                          <p>
                            {account.bankName} | {account.accountNumber} | {account.swiftBIC} | {account.currency}
                          </p>
                        ))}
                      </div>
                      <div class="card__footer">
                        <div class="user">
                          <img src={item.image} alt="user__image" class="user__image" />
                          <div class="user__info">
                            <h5>
                              {item.address.country}, {item.address.city}, {item.address.state}
                            </h5>
                            <small>
                              {item.contact.length > 0 && (
                                <>
                                  {item.contact[0].email} | {item.contact[0].phone}
                                </>
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {allSuppliers.length <= 0 && (
                // <div className="no-suppliers">

                //     <p>No Suppliers Added Yet!</p>
                // </div>
                <div class="empty-img">
                  <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                  <p class="text-secondary mb-0">No Suppliers Added Yet!</p>
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
                Delete {supplier.name}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete supplier </p>
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

export default Suppliers;
