import React from 'react'
import './status_tracker_styles.css'
import { orderStatus } from '../../../config/piOrderStatus'

const StatusTracker = ({pi}) => {
  return (
    <div class="">
						<div class="">
							<div style={{display : "flex" , flexDirection : "row"}}>
								<div class={!pi.pi_done_status.includes(orderStatus.CONFIRMED) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.CONFIRMED}</p>
								</div>
								<div class={!pi.pi_done_status.includes(orderStatus.DEPOSIT_PAID) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.DEPOSIT_PAID}</p>
								</div>
                <div class={!pi.pi_done_status.includes(orderStatus.BOOKED) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.BOOKED}</p>
								</div>
								<div class={!pi.pi_done_status.includes(orderStatus.FULL_PAYMENT) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.FULL_PAYMENT}</p>
								</div>
                <div class={!pi.pi_done_status.includes(orderStatus.INVOICE_READY) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.INVOICE_READY}</p>
								</div>
                <div class={!pi.pi_done_status.includes(orderStatus.PAKINGLIST_READY) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.PAKINGLIST_READY}</p>
								</div>
                <div class={!pi.pi_done_status.includes(orderStatus.DONE_DEAL) ? "order-tracking" : `order-tracking completed`  }>
									<span class="is-complete"></span>
									<p>{orderStatus.DONE_DEAL}</p>
								</div>
                
							</div>
						</div>
</div>
  )
}

export default StatusTracker