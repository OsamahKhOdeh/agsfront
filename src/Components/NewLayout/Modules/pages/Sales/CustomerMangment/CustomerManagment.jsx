import React from "react";
import "./CustomerManagment.scss";
export const CustomerManagment = () => {
  let departments = [
    {
      id: 1,
      name: "Administrative",
      icon: "uil-dashboard",
      isSelected: false,
      brands: [
        {
          id: 1,
          name: "Must",
          src: "../../../../../images/brands/brand2.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: "../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: "../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: "../../../../../images/users/avatar11.png",
            },
            {
              id: 3,
              name: "Jon Grealish",
              src: ".../../../../../images/users/avatar.jpg",
            },
            {
              id: 4,
              name: "Rahim Strlenk",
              src: ".../../../../../images/users/avatar.jpg",
            },
          ],
        },
      ],
    },
  ];
  let users = departments[0].brands[0].users;
  return (
    <>
      <div className="customer-managemnt">
        <div className="container">
          <div className="card">
            <div class="card-header">
              <div class="tittle-card">
                <p> Customer Management </p>
              </div>
            </div>
            <div className="card-body">
              <div className="wrapper-grid-managment">
                <div className="left-side">
                  <div className="box">
                    <div className="card">
                      <div className="card-header">
                        <div className="tittle-card">
                          <p>idle Customer List</p>
                        </div>
                      </div>
                      <div className="card-body">
                        {/* <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div> */}
                        <table class="table  ">
                          <thead>
                            <tr>
                              <th scope="col" className="border-start-0">
                                Customer Name
                              </th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>
                                <span className="ags-btn-sm-main-outlin" data-toggle="modal" data-target="#exampleModal">
                                  Convert
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>
                                <span className="ags-btn-sm-main-outlin" data-toggle="modal" data-target="#exampleModal">
                                  Convert
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>
                                <span className="ags-btn-sm-main-outlin" data-toggle="modal" data-target="#exampleModal">
                                  Convert
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card">
                      <div className="card-header">
                        <div className="tittle-card">
                          <p>Customer inside the process</p>
                        </div>
                      </div>
                      <div className="card-body">
                        <table class="table  ">
                          <thead>
                            <tr>
                              <th scope="col" className="border-start-0">
                                Customer Name
                              </th>
                              <th scope="col">Handler</th>
                              <th scope="col" className="border-end-0">
                                Stage
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card">
                      <div className="card-header">
                        <div className="tittle-card">
                          <p>Todays Customer in Retention 1/5</p>
                        </div>
                      </div>
                      <div className="card-body">
                        <table class="table  ">
                          <thead>
                            <tr>
                              <th scope="col" className="border-start-0">
                                Customer Name
                              </th>
                              <th scope="col">Handler</th>
                              <th scope="col" className="border-end-0">
                                Report
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                              <td className="border-end-0">
                                <span>YYYY</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="box">
                    <div className="card">
                      <div className="card-header">
                        <div className="tittle-card">
                          <p>Customers exceeding their average time for an order </p>
                        </div>
                      </div>
                      <div className="card-body">
                        {/* <div className="item">
                        <strong>Customer Name</strong>
                        <strong>Handler</strong>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div>
                      <div className="item">
                        <span>ASDJFN</span>
                        <span className="ags-btn-sm-main-outlin">Convert</span>
                      </div> */}
                        <table class="table  ">
                          <thead>
                            <tr>
                              <th scope="col" className="border-start-0">
                                Customer Name
                              </th>
                              <th scope="col">Handler</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                            </tr>
                            <tr>
                              <td className="border-start-0">ycyd</td>
                              <td>YYYY</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-side">
                  <div className="box">
                    <div className="card">
                      <div className="card-header">
                        <div className="tittle-card">
                          <p>Customer Profile</p>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="customer-profile">
                          <div className="item">
                            <h6>
                              <i class="uil uil-user"></i>
                              <span>Customer Name:</span>
                              <small> Jhon Wick</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-invoice"></i>
                              <span>Most Purchased: </span>
                              <small>Purchase_1 | Purchase_2 | Purchase_3 | Purchase_4</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-dice-five"></i>
                              <span>How differentiated: </span>
                              <small>5</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-calender"></i>
                              <span>Last purchase date: </span>
                              <small>5/22/2023</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-gold"></i>
                              <span>last purchase amount: </span>
                              <small>52</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-clock-five"></i>
                              <span>verage time between purchases: </span>
                              <small>52</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-bill"></i>
                              <span>Finance rating for his Invoices: </span>
                              <small>34</small>
                            </h6>
                          </div>
                          <div className="item">
                            <h6>
                              <i class="uil uil-setting"></i>
                              <span>Logistic rating for his invoices: </span>
                              <small>43</small>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="users-section">
                <div class="col-12 tittle-section">
                  <p>Choose Users</p>
                </div>
                <div class="grid">
                  {users.map((user, index) => (
                    <label class="card">
                      <input class="card__input" type="checkbox" />
                      <div class="card__body" title="Hussam Khaled">
                        <div class="card__body-cover">
                          <img class="card__body-cover-image" src={user.src} />
                          <span class="card__body-cover-checkbox">
                            <svg class="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {users.length <= 0 && (
                  <div class="empty-img">
                    <img src="../../../../../images/icons/no-user.svg" alt="empty-img" />
                    <span>No Users Available Yet! </span>
                  </div>
                )}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerManagment;
