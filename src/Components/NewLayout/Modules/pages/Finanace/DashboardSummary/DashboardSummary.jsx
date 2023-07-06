import React, { useState } from "react";
import "./dashboard-summary.scss";
import "../AddExpense/add-expense.scss";
import DatePicker from "react-datepicker";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
export const DashboardSummary = () => {
  const navigate = useNavigate();
  let departments = [
    {
      id: 1,
      name: "Administrative",
      icon: "uil-dashboard",
      isSelected: false,
      brands: [
        {
          id: 1,
          name: "3K Battery",
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
          ],
        },
        {
          id: 2,
          name: "Deye",
          src: ".../../../../../images/brands/brand2.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 3,
          name: "Doglin",
          src: ".../../../../../images/brands/brand3.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar2.jpg",
            },
          ],
        },
        {
          id: 4,
          name: "GROWATT",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar10.png",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar9.png",
            },
          ],
        },
        {
          id: 5,
          name: "MUST",
          src: ".../../../../../images/brands/brand5.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar2.jpg",
            },
          ],
        },
        {
          id: 6,
          name: "LUMINOUS",
          src: ".../../../../../images/brands/brand6.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 7,
          name: "ROCKET",
          src: ".../../../../../images/brands/brand7.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar1.jpg",
            },
          ],
        },
        {
          id: 8,
          name: "Felicity Solar",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 9,
          name: "RAMBO",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 10,
          name: "ORBIT",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar4.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 11,
          name: "LONGI",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 12,
          name: "EXIDE",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
      ],
    },
  ];
  let brands = departments[0].brands;
  let arrayPos = [
    {
      id: 1,
      name: "PO 235",
      isSelected: false,
    },
    {
      id: 2,
      name: "PO 214",
      isSelected: false,
    },
    {
      id: 3,
      name: "PO 215",
      isSelected: false,
    },
    {
      id: 4,
      name: "PO 216",
      isSelected: false,
    },
    {
      id: 5,
      name: "PO 217",
      isSelected: false,
    },
    {
      id: 6,
      name: "PO 218",
      isSelected: false,
    },
    {
      id: 7,
      name: "PO 219",
      isSelected: false,
    },
    {
      id: 8,
      name: "PO 220",
      isSelected: false,
    },
    {
      id: 8,
      name: "PO 223",
      isSelected: false,
    },
    {
      id: 8,
      name: "PO 224",
      isSelected: false,
    },
    {
      id: 8,
      name: "PO 225",
      isSelected: false,
    },
  ];
  let comapnies = [
    {
      id: 1,
      name: "Handling",
      isSelected: false,
    },
    {
      id: 2,
      name: "shipping one",
      isSelected: false,
    },
    {
      id: 3,
      name: "Palleting",
      isSelected: false,
    },
    {
      id: 4,
      name: "Workets",
      isSelected: false,
    },
    {
      id: 4,
      name: "Damage",
      isSelected: false,
    },
    {
      id: 4,
      name: "Pest",
      isSelected: false,
    },
  ];
  let viewFiles = [];
  const [blDate, setBlDate] = useState(new Date());
  const routeToOrderPymanent = () => {
    navigate("/dashboard/orderPyment");
  };
  return (
    <div className="dashboard-summary shared">
      <div className="container ">
        <div className="card">
          <div class="card-header">
            <div class="tittle-card">
              <p> Dashboard Finanace </p>
            </div>
          </div>
          <div className="card-body">
            {/* Supplier section */}
            <div class="brands-section">
              <fieldset class="checkbox-group">
                {/* <div class="col-12 tittle-section">
                  <p>Beneficiary </p>
                </div> */}
                {brands.map((brand, index) => (
                  <div class="checkbox">
                    <label class="checkbox-wrapper">
                      <input type="radio" class="checkbox-input" name="beneficiary" id="beneficiary_id" />
                      <span class="checkbox-tittle">
                        <span class="checkbox-icon">
                          <img src={brand.src} alt="{brand.name}-img" />
                        </span>
                        <span class="checkbox-label">{brand.name}</span>
                      </span>
                    </label>
                  </div>
                ))}
                {brands.length <= 0 && (
                  <div class="empty-img">
                    <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                    <span>No Suppliers Available Yet! </span>
                  </div>
                )}
              </fieldset>
            </div>
            {/* Order Purchase Section */}
            <div class="brands-section order-purchase-section">
              <fieldset class="checkbox-group">
                {/* <div class="col-12 tittle-section">
                  <p>Purchase Order</p>
                </div> */}
                {arrayPos.map((item, index) => (
                  <div class="checkbox">
                    <label class="checkbox-wrapper">
                      <input type="radio" class="checkbox-input" name="purchaseOrder" id="purchaseOrder_id" />
                      <span class="checkbox-tittle">
                        <span class="checkbox-label">{item.name}</span>
                      </span>
                    </label>
                  </div>
                ))}
                {arrayPos.length <= 0 && (
                  <div class="empty-img">
                    <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                    <span>No POS Available Yet! </span>
                  </div>
                )}
              </fieldset>
            </div>
            {/* Supplier section */}
            <div class="brands-section">
              <div class="col-12 tittle-section">
                <p>Tally </p>
                <div className="tow-dates">
                  <div className="date-item">
                    <span>From</span>
                    <DatePicker showIcon selected={blDate} onChange={(date) => setBlDate(date)} />
                  </div>
                  <div className="date-item">
                    <span>To</span>
                    <DatePicker showIcon selected={blDate} onChange={(date) => setBlDate(date)} />
                  </div>
                </div>
              </div>
              <div className="table-tally">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Supplier</th>
                        <th scope="col">PO</th>
                        <th scope="col">Done</th>
                        <th scope="col">Payed</th>
                        <th scope="col">Remaining Balance</th>
                        <th scope="col">ACB</th>
                        <th scope="col">Total Number of POs</th>
                        <th scope="col">Total Amount Paid</th>
                        <th scope="col">Factory contrib</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Must</th>
                        <td>232</td>
                        <td>50%</td>
                        <td>530,000</td>
                        <td>230,000</td>
                        <td>7 Days</td>
                        <td>31</td>
                        <td>1,512,000.00</td>
                        <td>10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">Must</th>
                        <td>232</td>
                        <td>50%</td>
                        <td>530,000</td>
                        <td>230,000</td>
                        <td>7 Days</td>
                        <td>31</td>
                        <td>1,512,000.00</td>
                        <td>10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">Must</th>
                        <td>232</td>
                        <td>50%</td>
                        <td>530,000</td>
                        <td>230,000</td>
                        <td>7 Days</td>
                        <td>31</td>
                        <td>1,512,000.00</td>
                        <td>10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">Must</th>
                        <td>232</td>
                        <td>50%</td>
                        <td>530,000</td>
                        <td>230,000</td>
                        <td>7 Days</td>
                        <td>31</td>
                        <td>1,512,000.00</td>
                        <td>10,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="brands-section">
              {/* <div class="col-12 tittle-section">
                <p>Tally </p>
              </div> */}
              <div className="wrapper-grid">
                <div className="left-section">
                  <div className="tittle">
                    <h5>In Transit Payments</h5>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Through</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Beneficiary</th>
                          <th scope="col">Status</th>
                          <th scope="col">Time</th>
                          <th scope="col">file</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Cash in shop</th>
                          <td>100,000</td>
                          <td>Rocket</td>
                          <td>
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">option #1</option>
                              <option value="2">option #2</option>
                              <option value="3">option #3</option>
                            </select>
                          </td>
                          <td>3 Hours</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Bank Of Misr</th>
                          <td>100,000</td>
                          <td>Luminous</td>
                          <td>
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">option #1</option>
                              <option value="2">option #2</option>
                              <option value="3">option #3</option>
                            </select>
                          </td>
                          <td>3 Hours</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">ZAD</th>
                          <td>100,000</td>
                          <td>Falicity Solar</td>
                          <td>
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">option #1</option>
                              <option value="2">option #2</option>
                              <option value="3">option #3</option>
                            </select>
                          </td>
                          <td>3 Hours</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="right-section">
                  <div className="tittle">
                    <h5>Payments History</h5>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Beneficiary</th>
                          <th scope="col">PO</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Through</th>
                          <th scope="col">Date</th>
                          <th scope="col">file</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Must</th>
                          <td>232</td>
                          <td>230,000</td>
                          <td>NBD</td>
                          <td>3 Days ago</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Luminous</th>
                          <td>212</td>
                          <td>430,000</td>
                          <td>Bank Of Misr</td>
                          <td>1 Days ago</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Rocket</th>
                          <td>172</td>
                          <td>120,000</td>
                          <td>Z AD</td>
                          <td>7 Days ago</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Falicity Solar</th>
                          <td>372</td>
                          <td>450,000</td>
                          <td>Z AD</td>
                          <td>2 Days ago</td>
                          <td>
                            <i class="uil uil-file-check-alt"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="pending-payments">
                <div className="tittle text-center">
                  <h5>Pending Payments</h5>
                </div>
                <div class="table-responsive">
                  <table class="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Priority</th>
                        <th scope="col">Beneficiary</th>
                        <th scope="col">PO</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Through</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Must</td>
                        <td>222</td>
                        <td>120,000</td>
                        <td>NBD</td>
                        <td>2 Days ago</td>
                        <td>
                          <i class="uil uil-file-check-alt"></i>
                          <i class="uil uil-bell"></i>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Luminous</td>
                        <td>262</td>
                        <td>320,000</td>
                        <td>Bank Of Misr</td>
                        <td>7 Days ago</td>
                        <td>
                          <i class="uil uil-file-check-alt"></i>
                          <i class="uil uil-bell"></i>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Rocket</td>
                        <td>235</td>
                        <td>20,000</td>
                        <td>NBD</td>
                        <td>6 Days ago</td>
                        <td>
                          <i class="uil uil-file-check-alt"></i>
                          <i class="uil uil-bell"></i>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Must</td>
                        <td>122</td>
                        <td>120,000</td>
                        <td>Z AD</td>
                        <td>4 Days ago</td>
                        <td>
                          <i class="uil uil-file-check-alt"></i>
                          <i class="uil uil-bell"></i>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>Rocket</td>
                        <td>152</td>
                        <td>230,000</td>
                        <td>Cash in shop</td>
                        <td>1 Days ago</td>
                        <td>
                          <i class="uil uil-file-check-alt"></i>
                          <i class="uil uil-bell"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="buttons-group">
              <button class="ags-btn-main-fill" onClick={() => routeToOrderPymanent()}>
                <span>Make a payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
