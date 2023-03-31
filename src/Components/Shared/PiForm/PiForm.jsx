import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import { updateProformaInvoice } from '../../../actions/proformaInvoice';

const PiForm = ({oldPi}) => {
    const showToastMessage = () => {
        toast.success("Proforma Inovice updated Succesfully ✅", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

    const dispatch = useDispatch();
    console.log(oldPi);
 const location = oldPi?.location;
 const currency = oldPi?.currency;
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

      

    const [inputs , setInputs] = useState(oldPi ? oldPi : {});
    function calcTotal(){
        inputs.products?.map((product) => {
            total +=(calcPrice(product)*product.qty) 
        })
      }
      calcTotal();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const handleProductQtyChange = (event , id) => {
        const name = event.target.name;
        const value = event.target.value;
        let theproducts = [...inputs.products];
        const theProduct = theproducts.filter(product => product._id === id)[0];
        const index = theproducts.indexOf(theProduct)
        let clonePro = {...theproducts[index]}
        clonePro.qty = parseInt(value)
        theproducts[index]= clonePro;
        setInputs(values => ({...values, products : theproducts}))
        console.log(inputs);
      
    }

    const handleProductPriceChange = (event , id) =>{
        const name = event.target.name;
        const value = event.target.value;
        let theproducts = [...inputs.products];
        const theProduct = theproducts.filter(product => product._id === id)[0];
        const index = theproducts.indexOf(theProduct)
        let clonePro = {...theproducts[index]}

        if(location === "freezone" && currency === "AED"){
           clonePro.freezonePriceAED =parseFloat(value);
          }
          if(location === "local" && currency === "AED"){
            clonePro.LocalPriceAED =parseFloat(value);
          }
          if(location === "freezone" && currency === "USD"){
            clonePro.freezonePrice =parseFloat(value);
          }if(location === "local" && currency === "USD"){
            clonePro.LocalPrice =parseFloat(value);
          }
          theproducts[index]= clonePro;
          setInputs(values => ({...values, products : theproducts}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
      }


      const handleUpdateButtonClick = (event) => {
        dispatch(updateProformaInvoice(oldPi._id , inputs));
        showToastMessage();
      }


  return (
    
    <div > 
              <ToastContainer />

    <form  onSubmit={handleSubmit}>
    <div>
    <label for="exp" class="label">Exporter:</label>
    <input 
    id='exp'
      class="form-control"
      type="text" 
      name="exporter" 
      value={inputs.exporter || ""} 
      onChange={handleChange}
    />

    </div>
    <label class="label">Buyer Address:</label>
    <input 
      class="form-control"
      type="text" 
      name="buyer_address" 
      value={inputs.buyer_address || ""} 
      onChange={handleChange}
    />
    <label class="label">Consignee: </label>
    <input 
      class="form-control"
      type="text" 
      name="consignee" 
      value={inputs.consignee || ""} 
      onChange={handleChange}
    />
    <label class="label">Notify Party :</label>
    <input 
      class="form-control"
      type="text" 
      name="notify_party" 
      value={inputs.notify_party || ""} 
      onChange={handleChange}
    />
    <label class="label">Party of Discharge :</label>
    <input 
      class="form-control"
      type="text" 
      name="party_of_discharge" 
      value={inputs.party_of_discharge || ""} 
      onChange={handleChange}
    />
    <label class="label">Final Distenation :</label>
    <input 
      class="form-control"
      type="text" 
      name="final_distination" 
      value={inputs.final_distination || ""} 
      onChange={handleChange}
    />
    <label class="label">Discount :</label>
    <input 
      class="form-control"
      type="text" 
      name="discount" 
      value={inputs.discount || ""} 
      onChange={handleChange}
    />
    
    <label class="label">Additions :</label>
    <input 
      class="form-control"
      type="text" 
      name="additions" 
      value={inputs.additions || ""} 
      onChange={handleChange}
    />
    <label class="label">Phone Number :</label>
    <input 
      class="form-control"
      type="text" 
      name="phone_number" 
      value={inputs.phone_number || ""} 
      onChange={handleChange}
    />
    
    
      {/*<input style={{width : "100%" , height : "56px"}} class="btn btn-primary" type="submit" />*/}
      
  </form>
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
                {inputs.products.map((product,index) =>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{product.brand}{product.code}</td>
                        <td><input 
                             type="text" 
                             name="product_qty" 
                             placeholder={product.qty}
                             value={product.qty || ""} 
                             onChange={(e)=>handleProductQtyChange(e , product._id)}
                           /></td>
                        <td><input 
                             type="text" 
                             name="product_price"  
                             value={(calcPrice(product)).toFixed(3) || ""} 
                             onChange={(e)=>handleProductPriceChange(e , product._id)}
                           /></td>
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
                    <td >{inputs.discount}</td>
                </tr><tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Additions</td>
                    <td >{inputs.additions}</td>
                </tr><tr>
                    <td  style={{textAlign : "center"}} colSpan={4}>Final</td>
                    <td >{total.toFixed(3) - -(inputs.additions) - inputs.discount}</td>
                </tr>
            </tfoot>
          </table>
          <div class="d-grid gap-2">

          <button onClick={handleUpdateButtonClick} style={{width : "50%" , margin : "auto"}} className='btn btn-primary' >Update Proforma Invoice</button>
          </div>
  </div>
  )
}

export default PiForm