import React from "react";

export const DeparturesLogistic = () => {
  return (
    <div className="container">
      <div className="card">
        <div class="card-header">
          <div class="tittle-card">
            <p> Departures </p>
          </div>
        </div>
        <div className="card-body">
          <div className="grid-logistic">
            <div className="grid-item">
              <div className="grid-item-tittle">Warehouse stats</div>
              <div className="grid-item-content ">
                <table class="table text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">stats</th>
                      <th scope="col">list of items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>state 1</td>
                      <td>Item 1</td>
                    </tr>
                    <tr>
                      <td>state 2</td>
                      <td>Item 2</td>
                    </tr>
                    <tr>
                      <td>state 3</td>
                      <td>Item 3</td>
                    </tr>
                    <tr>
                      <td>state 4</td>
                      <td>Item 4</td>
                    </tr>
                    <tr>
                      <td>state 5</td>
                      <td>Item 5</td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="warehouse-stats">
                <div className="list-of-items">
                    <p>item 1 </p>
                    <p>item 2 </p>
                    <p>item 3 </p>
                    <p>item 4 </p>
                    <p>item 5 </p>
                    <p>item 6 </p>
                </div>
                <div className="stats">
                    <p>stats 1 </p>
                    <p>stats 2 </p>
                    <p>stats 3 </p>
                    <p>stats 4 </p>
                    <p>stats 5 </p>
                    <p>stats 6 </p>
                </div>
               </div> */}
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-tittle">Trucks on the way</div>
              <div className="grid-item-content">
                <table class="table text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">PKL</th>
                      <th scope="col">Departure date</th>
                      <th scope="col">Location</th>
                      <th scope="col">Papers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PO 276</td>
                      <td>MUST</td>
                      <td>Note pop up</td>
                      <td>Continue</td>
                    </tr>
                    <tr>
                      <td>PO 276</td>
                      <td>LUMINOUS</td>
                      <td>Note pop up</td>
                      <td>Continue</td>
                    </tr>
                    <tr>
                      <td>PO 276</td>
                      <td>RAMBO</td>
                      <td>Note pop up</td>
                      <td>Continue</td>
                    </tr>
                    <tr>
                      <td>PO 276</td>
                      <td>ORBIT</td>
                      <td>Note pop up</td>
                      <td>Continue</td>
                    </tr>
                    <tr>
                      <td>PO 276</td>
                      <td>FSOLAR</td>
                      <td>Note pop up</td>
                      <td>Continue</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-item-tittle">Out going Trucks</div>
              <div className="grid-item-content">
                <div className="grid-item-content-truck">
                  <div className="box">
                    <div className="box-tittle">Goods Check</div>
                    <div className="box-content">
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>

                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-sucess-outlin">Decision</span>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="box-tittle">Information input</div>
                    <div className="box-content">
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>

                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>
                      <div className="box-row">
                        <p>PI 276</p>
                        <span className="ags-btn-sm-main-outlin">Enter Information</span>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="box-tittle">Goods Released</div>
                    <div className="box-content">
                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
                      </div>
                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
                      </div>
                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
                      </div>
                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
                      </div>

                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
                      </div>
                      <div className="box-row">
                        <p>
                          Inv 206 <span>&#8594;</span> Pkl 83
                        </p>
                        <span className="ags-btn-sm-primary-outlin">Take Action</span>
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
  );
};
export default DeparturesLogistic;
