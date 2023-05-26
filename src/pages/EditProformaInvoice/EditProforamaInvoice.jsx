import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PiForm from '../../Components/Shared/PiForm/PiForm'

const EditProforamaInvoice = () => {
    const { id } = useParams();
    const oldPi = useSelector((state)=>state.proformaInvoices.proformaInvoices.filter(p=>p._id === id)[0])
    console.log(id) 
    console.log(oldPi);
  return (
    <div style={{margin : "auto" , width : "75%" , paddingBottom : "200px"}}><PiForm oldPi={oldPi} /></div>
  )
}

export default EditProforamaInvoice