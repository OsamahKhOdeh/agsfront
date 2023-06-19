import React from "react";
import "../../../pages/Orders/SignedProformaInvoices/status_tracker_styles.css";
import { orderStatus, ordersModel } from "../../../config/piOrderStatus";

const OrderStatusTrackerUser = ({ pi }) => {
    console.log(pi);
  const odersStatus = ordersModel
  return (
    <>
      {/* this is design for desktop view */}
      <div class="order-tracker-desktop">
        <div style={{ display: "flex", flexDirection: "row" }}>
         {odersStatus.map((order, index) => 
            <div class={!odersStatus[index]?.status?.includes(pi.processStatus[index]?.status) ? "order-tracking" : `order-tracking completed`}>
                <span class="is-complete"></span>
                <p>{order.name}</p>
            </div>
        ) }
          {/* <div class={!pi.pi_done_status?.includes(orderStatus[2].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[2].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[3].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[3].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[4].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[4].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[5].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[5].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[6].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[6].status}</p>
          </div> */}
        </div>
      </div>
      {/* this is design for mobile view */}
    <div class="order-tracker-mobile">
    {/* <div style={{ display: "flex", flexDirection: "row" }}>
      <div class={!pi.pi_done_status?.includes(orderStatus[0].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[0].status}</p>
      </div>
      <div class={!pi.pi_done_status?.includes(orderStatus[2].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[2].status}</p>
      </div>
      <div class={!pi.pi_done_status?.includes(orderStatus[3].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[3].status}</p>
      </div>
      <div class={!pi.pi_done_status?.includes(orderStatus[4].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[4].status}</p>
      </div>
      <div class={!pi.pi_done_status?.includes(orderStatus[5].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[5].status}</p>
      </div>
      <div class={!pi.pi_done_status?.includes(orderStatus[6].status) ? "order-tracking" : `order-tracking completed`}>
        <span class="is-complete"></span>
        <p>{orderStatus[6].status}</p>
      </div>
    </div> */}
    <ul className="stepper-items">
      {odersStatus.map((order, index) => 
        <li class={!odersStatus[index]?.status?.includes(pi.processStatus[index]?.status) ? "order-not-complete" : `order-complete`}>
          <i class="uil-medium uil-check-circle"></i>
          {order.name}</li>
      )}
    </ul>
  </div>
  </>
  );
};

export default OrderStatusTrackerUser;