import React from 'react'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProformaInvoicesAction, updateProformaInvoiceStatus } from '../../../actions/proformaInvoice';
import { changeProformaInvoiceStatus } from '../../../store/proformaInvoicesSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getEmployeeProformaInvoicesAction } from '../../../actions/proformaInvoice';
import useAuth from '../../../hooks/useAuth';
import ProformaInvoice from '../../../Components/PoformaInvoice/ProformaInvoice';

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




const ProformaInvoiceOrders = () => {

const [isPdf , setIsPdf] = useState(false)
const [currentPi , setCurrentPi] = useState({})

const {username} = useAuth();

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getEmployeeProformaInvoicesAction(username))
  },[dispatch] )
  
  const proformaInvoices = useSelector((state) => state.proformaInvoices.proformaInvoices)

  const handleApprove = (id) => {
    dispatch(updateProformaInvoiceStatus({id, newStatus : 'Approved'}))
  }
  const handleReject = (id) => {
    dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected'}))
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
      <th scope="col">PDF</th>
    </tr>
  </thead>
  <tbody>
    {
      proformaInvoices.map((proformaInvoice, index) => (
        <tr key={index}>
          <th scope="row">{proformaInvoice.no}</th>
          <td>{proformaInvoice.employee}</td>
          <td>{timeAgo(new Date(proformaInvoice.createdAt))}</td>
          <td>{proformaInvoice.buyer_address}</td>
          <td className={colorByStatus(proformaInvoice?.status)} >{proformaInvoice?.status}</td>
          <td>{proformaInvoice.status==="Approved" ? 
             <button type="button" className="btn btn-primary" onClick={()=>handlePDF(proformaInvoice)}>PDF</button>
              :
             proformaInvoice.status==="Rejected" 
             ?
             <>
             <button type="button" className="btn btn-primary" onClick={()=>navigate(`/user/editpi/${proformaInvoice._id}`)}>Edit</button>
              {proformaInvoice?.managerMessage} 
              </>
              : 
              "Waiting for manager approval" }
            </td>
        </tr>
      ))
    }
    
  </tbody>
</table>
</div>
  )
}

export default ProformaInvoiceOrders