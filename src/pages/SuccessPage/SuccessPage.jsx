import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth';
import { setPiEmployee, setPiProudcts } from '../../store/piSlice';
import './styles.css'

const SuccessPage = () => {
    const cart = useSelector((state)=>state.cart.cart);
  const {username , status , phone} = useAuth();
  console.log(username );
  console.log(phone);
  const dispatch = useDispatch();
  useEffect(() => {dispatch(setPiProudcts(cart))
 dispatch(setPiEmployee({employeeName: username , employeePhone: phone}));  
 console.log(phone);
  },[])
  
    const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
    const piInfo = useSelector((state)=>state.pi.piInfo)
    const products = useSelector((state)=>state.cart.cart)
    
    const res = Object.entries(piInfo).map(([name, obj]) => ({ name, ...obj }))
    console.log(Object.values(piInfo));
    function calcPrice(item) {
        let price =0;
        if(location === "freezone" && currency === "AED"){
          price = item.freezonePriceAED;
        }
        if(location === "local" && currency === "AED"){
          price = item.LocalPriceAED;
        }
        if(location === "freezone" && currency === "USD"){
          price = item.freezonePrice;
        }if(location === "local" && currency === "USD"){
          price = item.LocalPrice;
        }
        
        return price;
      }
      let total = 0;

      function calcTotal(){
        products?.map((product) => {
            total +=(calcPrice(product)*product.qty) 
        })
      }
      calcTotal();

      function colorByStatus(val) {
        if(val){
            return'table-success';
        }else
         return 'table-danger';
      }

  return (
    <div style={{width : "75%" , margin : "auto" }}>
 <div className="sucess_container">
   
          </div>
            <div style={{paddingTop : "30px"}}>
            <table style={{border : 1}} class="table table-bordered table-sm">
            <tbody>
                <tr>
                    <td className='property table-secondary'>Exporter</td>
                    <td className={colorByStatus(piInfo.exporter)}>{piInfo.exporter}</td>
                </tr><tr>
                    <td className='property table-secondary'>Buyer</td>
                    <td className={colorByStatus(piInfo.buyerAdress)}>{piInfo.buyerAdress}</td>
                </tr><tr>
                    <td className='property table-secondary'>Consignee</td>
                    <td className={colorByStatus(piInfo.consignee )}>{piInfo.consignee}</td>
                </tr><tr>
                    <td className='property table-secondary'>Notify Party</td>
                    <td className={colorByStatus(piInfo.notifyParty )}>{piInfo.notifyParty}</td>
                </tr><tr>
                    <td className='property table-secondary'>Party of Discharge</td>
                    <td className={colorByStatus(piInfo.partyOfDischarge )}>{piInfo.partyOfDischarge}</td>
                </tr><tr>
                    <td className='property table-secondary'>Final Destination</td>
                    <td className={colorByStatus(piInfo.finalDistination )}>{piInfo.finalDistination}</td>
                </tr><tr>
                    <td className='property table-secondary'>Phone Number</td>
                    <td className={colorByStatus(piInfo.phoneNumber )}>{piInfo.phoneNumber}</td>
                </tr><tr>
                    <td className='property table-secondary'>Discount</td>
                    <td className='table-success' >{piInfo.discount}</td>
                </tr><tr>
                    <td className='property table-secondary'>Additions</td>
                    <td className='table-success'>{piInfo.additions}</td>
                </tr><tr>
                    <td className='property table-secondary'>Date</td>
                    <td className={colorByStatus(piInfo.date )}>{piInfo.date}</td>
                </tr><tr>
                    <td className='property table-secondary'>Notes</td>
                    <td className='table-success'>{piInfo.note}</td>
                </tr>
                <tr>
                    <td className='property table-secondary'>Terms</td>
                    <td className={colorByStatus(piInfo.terms )}>
{/*                    Advance Payment {piInfo.paymentPercentage}% Balance to be paid time providing copy of BL
*/}                        
                            {piInfo.terms}
                     </td>
                </tr>
            </tbody>
          </table>
          <table style={{border : 1}} class="table table-bordered table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Prodct</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index) =>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{product.brand}{product.code}</td>
                        <td className={product.qty <= 0 && "table-danger" }>{product.qty}</td>
                        <td>{(calcPrice(product)).toFixed(3)}</td>
                        <td>{(calcPrice(product)*product.qty).toFixed(3)}</td>
                    </tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Total</td>
                    
                    <td >{total.toFixed(3)}</td>
                </tr><tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Discount</td>
                    <td >{piInfo.discount}</td>
                </tr><tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Additions</td>
                    <td >{piInfo.additions}</td>
                </tr><tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Final</td>
                    <td >{total.toFixed(3) - -(piInfo.additions) - piInfo.discount}</td>
                </tr>
            </tfoot>
          </table>
            </div>
            </div>
  )
}

export default SuccessPage