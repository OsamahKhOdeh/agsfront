import React from "react";
import "./report-event.scss";
export const ReportEvent = () => {
  return (
    <div className="report_container">
      <div className="container">
        <div className="card">
          <div class="card-header">
            <div class="tittle-card">
              <p> Report for : Marketing campaign No. 211 </p>
            </div>
          </div>
          <div className="card-body">
            <div className="report-information">
              <div className="report-item">
                <strong>Campaign subject: </strong>
                <span>Growwatt inverters</span>
              </div>
              <div className="report-item">
                <strong>The cause of the campaign: </strong>
                <span>Too high stock </span>
              </div>
              <div className="report-item">
                <strong>Campaign ordered by: </strong>
                <span>Hosen, Abdullah, Osama</span>
              </div>
              <div className="report-item">
                <strong>Campaign targeted: </strong>
                <span>B2B in Lebanon, Iraq</span>
              </div>
              <div className="report-item">
                <strong>Means: </strong>
                <span>Online ads and Streat marketing</span>
              </div>
              <div className="report-item">
                <strong>Total spendings: </strong>
                <span> 2700 $</span>
              </div>
              <div className="report-item">
                <strong>Show campaign means: </strong>
                <span>
                  <i class="uil uil-file-plus-alt"></i>
                  <i class="uil uil-file-plus-alt"></i>
                  <i class="uil uil-file-plus-alt"></i>
                </span>
              </div>
            </div>
            <div className="aditional-information">
              <div className="box-input">
                <div className="form-group">
                  <label htmlFor="pi">PI sold because of the campain: </label>
                  <textarea type="text" rows="4" className="form-control">
                    {" "}
                  </textarea>
                </div>
              </div>
              <div className="box-input">
                <div className="form-group">
                  <label htmlFor="pi">PI sold because of the campain: </label>
                  <textarea type="text" rows="4" className="form-control"></textarea>
                </div>
              </div>
              <div className="box-input">
                <div className="form-group">
                  <label htmlFor="pi">PI sold because of the campain: </label>
                  <textarea type="text" rows="4" className="form-control"></textarea>
                </div>
              </div>
              <div className="box-input">
                <div className="form-group">
                  <label htmlFor="pi">PI sold because of the campain: </label>
                  <textarea type="text" rows="4" className="form-control"></textarea>
                </div>
              </div>
            </div>
            <div className="btn-submit">
              <button className="ags-btn-main-fill">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportEvent;
