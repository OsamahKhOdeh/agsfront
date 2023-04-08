import React from 'react'
import './status_select_styles.css'
import { useDispatch } from 'react-redux'
import { orderStatus } from '../../../config/piOrderStatus'
import { changeSignedProformaInvoiceStatus } from '../../../store/proformaInvoicesSlice'
const statuses = [
    orderStatus.CONFIRMED , orderStatus.DEPOSIT_PAID , orderStatus.BOOKED , orderStatus.FULL_PAYMENT , orderStatus.INVOICE_READY , orderStatus.PAKINGLIST_READY ,orderStatus.DONE_DEAL
]


const StatusSelect = ({pi}) => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        dispatch(changeSignedProformaInvoiceStatus({id : pi.pi_id , status : value}))
        //setInputs(values => ({...values, [name]: value}))
      }
  return (
    <><select className='select____status__class' id="exporter" name="exporter" onChange={handleChange}>
      {
        statuses.map((status) =>
        <option  value={status}>{status}</option>
        )
      }
     </select>
     <button class="button_next_stage">Next Stage</button>
     </>
  )
}

export default StatusSelect