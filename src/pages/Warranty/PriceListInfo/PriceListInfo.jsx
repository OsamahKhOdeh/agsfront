import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Table/Table'
import { setIsPI } from '../../../store/piSlice'
import InvoiceInfo from '../../MakePi/InvoiceInfo'
const PriceListInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div style={{width : "90%" , margin : "auto" }}>
      <div className="next_div"  >
              <button className="btn_next success_prev" onClick={()=>{ navigate('/user/warranty')}} >PREVIOUS</button>
              <button className="btn_next success_next" onClick={()=>{dispatch(setIsPI(false)); navigate('/user/pricelistpdf')}} >NEXT</button>
            </div>
    <InvoiceInfo/>
    <Table/>
    </div>
  )
}

export default PriceListInfo