import React from 'react'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProformaInvoicesAction, updateProformaInvoiceStatus } from '../../../actions/proformaInvoice';
import { changeProformaInvoiceStatus } from '../../../store/proformaInvoicesSlice';
import { useNavigate } from 'react-router-dom';
import ProformaInvoice from '../../../Components/PoformaInvoice/ProformaInvoice';
import { useState } from 'react';

// Define a function that takes a date as an argument
// and returns a string that represents how long ago the date was
export const timeAgo = (date) => {

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if(seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};



const PIActionsAdmin = () => {
const [isPdf , setIsPdf] = useState(false)
const [currentPi , setCurrentPi] = useState({})
const [ popupClass ,setPopupClass]= useState("form-popup hidden");


  function colorByStatus(status) {
    switch (status) {
      case 'Pending':
        return 'table-secondary';
      case 'Approved':
        return'table-success';
      case 'Rejected':
        return 'table-danger';
      default:
        return 'table-secondary';
    }
  }

  function colorByUpdate(createdAt , updatedAt) {
    const status = (createdAt === updatedAt)
    switch (status) {
      case true:
        return 'table-secondary';
      case false:
        return'table-success';
      
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getProformaInvoicesAction())
  },[dispatch] )
  
  const proformaInvoices = useSelector((state) => state.proformaInvoices.proformaInvoices)

  const handleApprove = (id) => {
    dispatch(updateProformaInvoiceStatus({id, newStatus : 'Approved'}))
  }
  const handleReject = (id) => {
    setPopupClass("form-popup showing")
    //dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected'}))
  }



  const handleRejectMessage = (event) => {
    event.preventDefault();
    console.log(event.target.rej_msg.value);
    const id = currentPi._id;
    dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected' , managerMessage : event.target.rej_msg.value}))
    setPopupClass("form-popup hidden")
    event.target.rej_msg.value = "";
  }



  const handleDelete = (id) => {}
  const handlePDF = (pi) => 
  {
    setCurrentPi(pi);
    setIsPdf(true); 
    console.log(isPdf);
  }
  if(isPdf) {return(
    <>
    <div className="next_div" style={{paddingBottom : "20px"}}  >
    <button className="btn_next success_prev" onClick={()=>{ setIsPdf(false)}} >PREVIOUS</button>
  </div>
  <ProformaInvoice adminPi={currentPi} />

  </>
  
)  }

  else
  return (
    <div className='page_container'>
    <>
    
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
  <label className="btn btn-outline-primary" htmlFor="btnradio1">All</label>

  <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
  <label className="btn btn-outline-primary" htmlFor="btnradio2">Pending</label>

  <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
  <label className="btn btn-outline-primary" htmlFor="btnradio3">Approved</label>
  <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off"/>
  <label className="btn btn-outline-primary" htmlFor="btnradio4">Rejected</label>


  <div className={popupClass} id="myForm">
  <form onSubmit={handleRejectMessage} class="form-container">
    <h1>Reject with note</h1>

    <label for="rej_msg"><b>Rejection message</b></label>
    <input type="text" placeholder="Enter why you reject this proforma invoice" name="rej_msg" />


    <button type="submit" class="btn">Send</button>
    <button style={{position : "absolute" , right : "23px"}} type="button" class="btn cancel" onClick={()=>{setPopupClass("form-popup hidden")}}>Close</button>
  </form>
</div>


</div>
    </>
    <table className="pi__table table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employee</th>
      <th scope="col">Date/Time</th>
      <th scope="col">Customer</th>
      <th scope="col">Status</th>
      <th style={{width:"140px"}} scope="col">PDF</th>
      <th style={{width:"225px"}} scope="col">Handle</th>
      <th style={{width:"28 0px"}} scope="col">Manager Note</th>
    </tr>
  </thead>
  <tbody>
    {
      proformaInvoices.map((proformaInvoice, index) => (
        <tr key={index}>
          <th scope="row">{proformaInvoice.no}</th>
          <td>{proformaInvoice?.employee?.split("/")[0]}</td>
          <td>{timeAgo(new Date(proformaInvoice.updatedAt))}</td>
          <td>{proformaInvoice.buyer_address}</td>
          <td className={colorByStatus(proformaInvoice?.status)} >{proformaInvoice?.status}</td>
          <td><button type="button" className="btn btn-primary" onClick={()=>handlePDF(proformaInvoice)}>PDF</button></td>
          <td>
            <div>
              <button type="button" className="fixed_width btn btn-outline-danger" onClick={()=>{ setCurrentPi(proformaInvoice);handleReject(proformaInvoice._id)}}>Reject</button>
              <button type="button" className="btn btn-success" onClick={()=>handleApprove(proformaInvoice._id)}>Approve</button>
              </div>
          </td>
          <td className={colorByUpdate(proformaInvoice.createdAt , proformaInvoice.updatedAt)}>
            {proformaInvoice.managerMessage}
          </td>
        </tr>
      ))
    }
    
  </tbody>
</table>
</div>
  )
}

export default PIActionsAdmin