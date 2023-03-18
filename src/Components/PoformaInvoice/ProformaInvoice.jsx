import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../Invoice/Invoice'
import { PDFViewer } from '@react-pdf/renderer';
import invoice from '../../data/invoice-data'
import { useDispatch, useSelector } from 'react-redux';
import { setPiProudcts } from '../../store/piSlice';
import { useEffect } from 'react';

const ProformaInvoice = () => {
  const cart = useSelector((state)=>state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {dispatch(setPiProudcts(cart))},[])
  
   const pi = useSelector((state)=>state.pi);
   const currency = useSelector((state)=>state.filters.currency);
   const location =useSelector((state)=>state.filters.location);
   const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

   console.log(location);


  return (
    <div style={{width:"1200px"}}>
   <PDFViewer width="100%" height="1200" className="app" >
                <Invoice pi={pi} currency={currency} location={location}  usdToAedRate={usdToAedRate} />
   </PDFViewer>
 
    </div>
  )
}

export default ProformaInvoice

/*
   
<PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>

*/