import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
export const HomeFinanace = () => {
  const navigate = useNavigate();
  const routeToAddExpaense = () => {
    navigate("/dashboard/addExpense");
  };
  const routeToOrderPymanent = () => {
    navigate("/dashboard/orderPyment");
  };
  return (
    <>
      {/* <div className="finance-home">
        <ul className="grid">
        <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Outgoing Payments</h5>
              </div>
              <div className='item-body'>
                <div className="grid-managment">
                <div className="managment-item">
                  <div className="pie pi_90" >90%</div>
                  <p>Customer Engagement target</p>
                </div>
                <div className="managment-item">
                  <div><span>&#9888;</span></div>
                  <p>Liability score 4 / 9</p>
                </div>
                <div className="managment-item">
                  <div class="pie1">
                    <span class="overlay">
                      <span>50%</span>
                    </span>
                  </div>
                  <p>Customer Retention</p>
                </div>
                </div>
                <hr />
                <div className="marketing-item">
                    <h6>Declining customers</h6>
                    <table class="table marketing-table">
                        <thead>
                          <tr>
                            <th scope="col" className='border-start-0'>Name</th>
                            <th scope="col">Handler</th>
                            <th scope="col" className='border-end-0'>Last Purchace</th>
                            <th scope="col" className='border-end-0'>Last interact</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Incoming Payment</h5>
              </div>
              <div className='item-body'>
                <div className="grid-managment">
                <div className="managment-item">
                  <div className="pie pi_90" >90%</div>
                  <p>Customer Engagement target</p>
                </div>
                <div className="managment-item">
                  <div class="pie1">
                    <span class="overlay">
                      <span>50%</span>
                    </span>
                  </div>
                  <p>Customer Retention</p>
                </div>
                </div>
                <hr />
                <div className="marketing-item">
                    <h6>Declining customers</h6>
                    <table class="table marketing-table">
                        <thead>
                          <tr>
                            <th scope="col" className='border-start-0'>Name</th>
                            <th scope="col">Handler</th>
                            <th scope="col" className='border-end-0'>Last Purchace</th>
                            <th scope="col" className='border-end-0'>Last interact</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Customer Management</h5>
              </div>
              <div className='item-body'>
                <div className="grid-managment">
                <div className="managment-item">
                  <div className="pie pi_90" >90%</div>
                  <p>Customer Engagement target</p>
                </div>
                <div className="managment-item">
                  <div class="pie1">
                    <span class="overlay">
                      <span>50%</span>
                    </span>
                  </div>
                  <p>Customer Retention</p>
                </div>
                </div>
                <hr />
                <div className="marketing-item">
                    <h6>Declining customers</h6>
                    <table class="table marketing-table">
                        <thead>
                          <tr>
                            <th scope="col" className='border-start-0'>Name</th>
                            <th scope="col">Handler</th>
                            <th scope="col" className='border-end-0'>Last Purchace</th>
                            <th scope="col" className='border-end-0'>Last interact</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                          <tr>
                            <td className='border-start-0'>sad</td>
                            <td>das</td>
                            <td className='border-end-0'>Since 73 Days</td>
                            <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Performa Invoices</h5>
              </div>
              <div className='item-body'>
                <div className="marketing-item">
                <table class="table performa-table ">
                <thead>
                  <tr>
                    <th scope="col" className='border-start-0'>NO</th>
                    <th scope="col">Name</th>
                    <th scope="col" className='border-end-0'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-start-0'>256</td>
                    <td>Osama</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>365</td>
                    <td>Sara</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>985</td>
                    <td>Hussam</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr> <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr> <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr> <tr>
                    <td className='border-start-0'>698</td>
                    <td>Ahmad</td>
                    <td className='border-end-0'>
                      <span>Take decision</span>
                    </td>
                  </tr>
                </tbody>
              </table>
                </div>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Hawk Eye </h5>
              </div>
              <div className='item-body'>
              <table class="table  ">
                <tbody>
                  <tr>
                    <td className='border-start-0'>PowernSun making new strides  to Iraq</td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>JA is offering new type of cells  and Nanosun </td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>PowernSun making new strides  to Iraq</td>
                  </tr>
                  <tr>
                    <td className='border-start-0 border-bottom-0'>PowernSun making new strides  to Iraq</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Department Projects </h5>
              </div>
              <div className='item-body'>
                <table class="table  ">
                  <tbody>
                    <tr>
                      <td className='border-start-0'>Change in the Dynamic of Commission </td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>Change in the Dynamic of Commission </td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>Change in the Dynamic of Commission </td>
                    </tr>
                    <tr>
                      <td className='border-start-0 border-bottom-0'>Change in the Dynamic of Commission </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Latest Updates </h5>
              </div>
              <div className='item-body'>
                <table class="table  ">
                  <tbody>
                    <tr>
                      <td className='border-start-0'>Increase in the budget of the departments</td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>New Employees in Syrian Marketing team</td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>Increase in the budget of  the departments</td>
                    </tr>
                    <tr>
                      <td className='border-start-0 border-bottom-0'> team</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li className="grid-item">
              <div className='item-tittle'>
                  <h5>Reporting </h5>
              </div>
              <div className='item-body'>
              <table class="table  ">
                <tbody>
                  <tr>
                    <td className='border-start-0'>Marketing campaign 211 for inverters</td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>SONEX event in Jordan Last june</td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>Marketing campaign 211 for inverters</td>
                  </tr>
                  <tr>
                    <td className='border-start-0 border-bottom-0'>SONEX event in Jordan Last june</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </li>
        </ul>
    </div> */}
      {/* <div class="circle-wrap">
   <div class="circle">
      <div class="mask full-3">
        <div class="fill-3"></div>
      </div>
      <div class="mask half">
        <div class="fill-3"></div>
      </div>
    <div class="inside-circle"> 75% </div>
  </div>
   </div> */}

      <div className="finance-home">
        <ul className="grid">
          <li className="grid-item">
            <div className="item-tittle">
              <h5>Outgoing Payments</h5>
            </div>
            <div className="item-body">
              <div className="grid-managment grid-finance">
                <div className="managment-item">
                  <div class="pie1">
                    <span class="overlay">
                      <span>50%</span>
                    </span>
                  </div>
                  <p>Customer Retention</p>
                </div>
                <div className="managment-item">
                  <div className="item-warning">
                    <span>&#9888;</span>
                  </div>
                  <p>Liability score 4 / 9</p>
                </div>
                <div className="managment-item">
                  <div class="circle-wrap">
                    <div class="circle">
                      <div class="mask full-3">
                        <div class="fill-3"></div>
                      </div>
                      <div class="mask half">
                        <div class="fill-3"></div>
                      </div>
                      <div class="inside-circle"> 75% </div>
                    </div>
                  </div>
                  <p>Engagement target</p>
                </div>
              </div>
              <hr />
              <div className="marketing-item">
                <h6 className="switch">
                  <i className="uil uil-angle-left-b"></i> Sent payment <i className="uil uil-angle-right-b"></i>
                </h6>
                <table class="table marketing-table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-start-0">
                        Beneficiary
                      </th>
                      <th scope="col">PO</th>
                      <th scope="col" className="border-end-0">
                        Amount
                      </th>
                      <th scope="col" className="border-end-0">
                        Through
                      </th>
                      <th scope="col" className="border-end-0">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-start-0">Must</td>
                      <td>232</td>
                      <td className="border-end-0">230,000</td>
                      <td className="border-end-0">NBD</td>
                      <td className="border-end-0">3 D. ago</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">LUMINOUS</td>
                      <td>233</td>
                      <td className="border-end-0">230,000</td>
                      <td className="border-end-0">Bank Of misr</td>
                      <td className="border-end-0">3 D. ago</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">LUMINOUS</td>
                      <td>233</td>
                      <td className="border-end-0">230,000</td>
                      <td className="border-end-0">Bank Of misr</td>
                      <td className="border-end-0">3 D. ago</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">LUMINOUS</td>
                      <td>233</td>
                      <td className="border-end-0">230,000</td>
                      <td className="border-end-0">Bank Of misr</td>
                      <td className="border-end-0">3 D. ago</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">LUMINOUS</td>
                      <td>233</td>
                      <td className="border-end-0">230,000</td>
                      <td className="border-end-0">Bank Of misr</td>
                      <td className="border-end-0">3 D. ago</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ags-btn-main-fill btn-finance" onClick={() => routeToOrderPymanent()}>
                  Cash an Expense
                </div>
              </div>
            </div>
          </li>
          <li className="grid-item">
            <div className="item-tittle">
              <h5>Incoming Payment</h5>
            </div>
            <div className="item-body">
              <div className="grid-managment grid-finance">
                <div className="managment-item">
                  <div class="pie1">
                    <span class="overlay">
                      <span>50%</span>
                    </span>
                  </div>
                  <p>Weekend closing</p>
                </div>
                <div className="managment-item">
                  <div className="item-warning">
                    {/* <span>&#9888;</span> */}
                    <i class="uil uil-bell"></i>
                  </div>
                  <p>Payments coming 7</p>
                </div>
                <div className="managment-item">
                  <div class="circle-wrap">
                    <div class="circle">
                      <div class="mask full-3">
                        <div class="fill-3"></div>
                      </div>
                      <div class="mask half">
                        <div class="fill-3"></div>
                      </div>
                      <div class="inside-circle"> 75% </div>
                    </div>
                  </div>
                  <p>Paid out of booked </p>
                </div>
              </div>
              <hr />
              <div className="marketing-item">
                <h6 className="switch">
                  <i className="uil uil-angle-left-b"></i> Received payment <i className="uil uil-angle-right-b"></i>
                </h6>
                <table class="table marketing-table recived-payment-table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-start-0">
                        Customer
                      </th>
                      <th scope="col">Amount</th>
                      <th scope="col" className="border-end-0">
                        Date
                      </th>
                      <th scope="col" className="border-end-0">
                        For
                      </th>
                      <th scope="col" className="border-end-0">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-start-0">sad</td>
                      <td>20</td>
                      <td className="border-end-0">since 3 Days</td>
                      <td className="border-end-0">PI 512</td>
                      <td className="border-end-0">
                        <i class="uil uil-file-info-alt uil-small"></i>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">sad</td>
                      <td>20</td>
                      <td className="border-end-0">since 3 Days</td>
                      <td className="border-end-0">PI 512</td>
                      <td className="border-end-0">
                        <i class="uil uil-file-info-alt uil-small"></i>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">sad</td>
                      <td>20</td>
                      <td className="border-end-0">since 3 Days</td>
                      <td className="border-end-0">PI 512</td>
                      <td className="border-end-0">
                        <i class="uil uil-file-info-alt uil-small"></i>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">sad</td>
                      <td>20</td>
                      <td className="border-end-0">since 3 Days</td>
                      <td className="border-end-0">PI 512</td>
                      <td className="border-end-0">
                        <i class="uil uil-file-info-alt uil-small"></i>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">sad</td>
                      <td>20</td>
                      <td className="border-end-0">since 3 Days</td>
                      <td className="border-end-0">PI 512</td>
                      <td className="border-end-0">
                        <i class="uil uil-file-info-alt uil-small"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
          <li className="grid-item">
            <div className="item-tittle">
              <h5>Performa Invoices</h5>
            </div>
            <div className="item-body">
              <div className="marketing-item">
                <table class="table performa-table ">
                  <thead>
                    <tr>
                      <th scope="col" className="border-start-0">
                        NO
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col" className="border-end-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-start-0">256</td>
                      <td>Osama</td>
                      <td className="border-end-0">
                        <span className="ags-btn-sm-sucess-outlin">Take Action</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
          <li className="grid-item">
            <div className="item-tittle">
              <h5>Purchase Orders</h5>
            </div>
            <div className="item-body pb-3">
              <div className="marketing-item">
                <table class="table performa-table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-start-0">
                        Supplier
                      </th>
                      <th scope="col" className="border-start-0">
                        PO
                      </th>
                      <th scope="col">State</th>
                      <th scope="col" className="border-end-0">
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-start-0">Must</td>
                      <td>232</td>
                      <td>In shipping</td>
                      <td>2512 $</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">Luminous</td>
                      <td>232</td>
                      <td>Under Production</td>
                      <td>2512 $</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">Rocket</td>
                      <td>232</td>
                      <td>Clearing</td>
                      <td>2512 $</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">Rocket</td>
                      <td>232</td>
                      <td>Clearing</td>
                      <td>2512 $</td>
                    </tr>
                    <tr>
                      <td className="border-start-0">Rocket</td>
                      <td>232</td>
                      <td>Clearing</td>
                      <td>2512 $</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ags-btn-main-fill btn-finance" onClick={() => routeToAddExpaense()}>
                  Add Expense
                </div>
              </div>
            </div>
          </li>
          <li className="grid-item item-purchase-orders">
            <div className="item-tittle">
              <h5>Warehouse Management</h5>
            </div>
            <div className="item-body ">
              <div className="marketing-item">
                <table class="table performa-table  mb-3">
                  <thead>
                    <tr>
                      <th scope="col" className="border-start-0">
                        PO
                      </th>
                      <th scope="col" className="border-start-0">
                        Supplier
                      </th>
                      <th scope="col">Warehouse</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>232</td>
                      <td className="border-start-0">Must</td>
                      <td>Azal</td>
                    </tr>
                    <tr>
                      <td>232</td>
                      <td className="border-start-0">Luminous</td>
                      <td>Old</td>
                    </tr>
                    <tr>
                      <td>232</td>
                      <td className="border-start-0">Must</td>
                      <td>New</td>
                    </tr>
                    <tr>
                      <td>232</td>
                      <td className="border-start-0">Must</td>
                      <td>Azal</td>
                    </tr>
                    <tr>
                      <td>232</td>
                      <td className="border-start-0">Must</td>
                      <td>Azal</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ags-btn-main-fill btn-finance" onClick={() => routeToAddExpaense()}>
                  Add Expense
                </div>
              </div>
            </div>
          </li>
          <li className="grid-item">
            <div className="item-tittle">
              <h5>Actions </h5>
            </div>
            <div className="item-body">
              <div className="btn-actions">
                <div className="ags-btn-sm-sucess-outlin">
                  <span>Add Customer</span>
                </div>
                <div className="ags-btn-sm-sucess-outlin">
                  <span>Add Supplier</span>
                </div>
                <div className="ags-btn-sm-sucess-outlin">
                  <span>Add Warehouse company</span>
                </div>
                <div className="ags-btn-sm-sucess-outlin">
                  <span>Add Forwarder</span>
                </div>
              </div>
              {/* <table class="table  ">
                    <tbody>
                      <tr>
                        <td className='border-start-0'>
                          <span>Add Customer</span> 
                        </td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>
                          <span>Add Customer</span>  </td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>
                          <span>Add Customer</span>  </td>
                      </tr>
                      <tr>
                        <td className='border-start-0 border-bottom-0'>
                          <span className='ags-btn-sm-sucess-outlin'>Add Customer</span> 
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
            </div>
          </li>
          {/* <li className="grid-item">
                <div className='item-tittle'>
                    <h5>Latest Updates </h5>
                </div>
                <div className='item-body'>
                  <table class="table  ">
                    <tbody>
                      <tr>
                        <td className='border-start-0'>Increase in the budget of the departments</td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>New Employees in Syrian Marketing team</td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>Increase in the budget of  the departments</td>
                      </tr>
                      <tr>
                        <td className='border-start-0 border-bottom-0'> team</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="grid-item">
                <div className='item-tittle'>
                    <h5>Reporting </h5>
                </div>
                <div className='item-body'>
                <table class="table  ">
                  <tbody>
                    <tr>
                      <td className='border-start-0'>Marketing campaign 211 for inverters</td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>SONEX event in Jordan Last june</td>
                    </tr>
                    <tr>
                      <td className='border-start-0'>Marketing campaign 211 for inverters</td>
                    </tr>
                    <tr>
                      <td className='border-start-0 border-bottom-0'>SONEX event in Jordan Last june</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </li> */}
        </ul>
      </div>
    </>
  );
};
export default HomeFinanace;
