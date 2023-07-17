import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import ProductForm from "./pages/ProductForm/ProductForm";
import PriceList from "./pages/PriceList/PriceList";
import Table from "./Components/Table/Table";
//import ProformaInvoice from "./pages/ProformaInvoice/ProformaInvoice";
import ProformaInvoice from "./Components/PoformaInvoice/ProformaInvoice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPriceList from "./pages/CustomerPriceList/CustomerPriceList";
import MakiPi from "./pages/MakePi/MakePi";
import PiStepper from "./pages/MakePi/PiStepper";
import Warranty from "./pages/Warranty/Warranty";
import WarrantyCheck from "./pages/Warranty/WarrantyCheck/WarrantyCheck";
import CheckCustomer from "./pages/Invoice/CheckCustomer";
import AdminPage from "./pages/Admin/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./pages/Layout/Layout";
import UserLayout from "./pages/Layout/UserLayout";
import useAuth from "./hooks/useAuth";
import { ROLES } from "./config/roles";
import RequireAuth from "./actions/RequireAuth";
import Employees from "./pages/Employees/Employees";
import NewUser from "./pages/NewUser/NewUser";
import PriceListInfo from "./pages/Warranty/PriceListInfo/PriceListInfo";
import PriceListPDF from "./Components/PriceListPDF/PriceListPDF";
import PIActionsAdmin from "./pages/PIActions/PIActionsAdmin/PIActionsAdmin";
import ProformaInvoiceOrders from "./pages/Orders/ProformaInvoiceOrders/ProformaInvoiceOrders";
import EditProforamaInvoice from "./pages/EditProformaInvoice/EditProforamaInvoice";
import MakePo from "./pages/MakePo/MakePo";
import SignedProformaInvoices from "./pages/Orders/SignedProformaInvoices/SignedProformaInvoices";
import Finance from "./pages/Finance/Finance";
import Orders from "./pages/Orders/Orders";
import Projects from "./pages/Projects/Projects";
import AllProjects from "./pages/AllProjects/AllProjects";
import SharedProjects from "./pages/AllProjects/SharedProjects";
import WebsitePage from "./pages/WebsitePage/WebsitePage";
import PoInfo from "./pages/MakePo/PoInfo/PoInfo";
import Invoice from "./Components/PurchaseOrderPdf/Invoice";
import PurchaseOrderPdf from "./Components/PurchaseOrderPdf/PurchaseOrderPdf";
import PurchaseOrdersAll from "./pages/PurchaseOrdersAll/PurchaseOrdersAll";
import EditStock from "./pages/EditStock/EditStock";
import PackingList from "./pages/PackingList/PackingList";
import PackingListPdf from "./Components/PackingListPdf/PackingListPdf";
import PackingListsAll from "./pages/PackingListsAll/PackingListsAll";
import PackingListManual from "./pages/PackingList/PackingListManual";
import Home from "./pages/Home/Home";
import EditStock2 from "./pages/EditStock/EditStock2";
import NewLayout from "./Components/NewLayout/NewLayout";
import AddIssue from "./Components/NewLayout/Modules/pages/Add-Issue/AddIssue";
import CheckProduct from "./pages/CheckProduct/CheckProduct";
import HomeDashboard from "./Components/NewLayout/Modules/pages/Home-Dashboard/HomeDashboard";
import Issues from "./Components/NewLayout/Modules/pages/All-Issues/Issues";
import FileUploader from "./pages/Test";
import OrderTracking from "./Components/Order Tracking/OrderTracking";
import OrderTrackingUser from "./Components/OrderTrackingUser/OrderTrackingUser";
import DeparturesLogistic from "./Components/NewLayout/Modules/pages/Logistic/DeparturesLogistic";
import ComingLogistic from "./Components/NewLayout/Modules/pages/Logistic/ComingLogistic";
import AllLogistic from "./Components/NewLayout/Modules/pages/Logistic/AllLogistic";
import HomeFinanace from "./Components/NewLayout/Modules/pages/Finanace/HomeFinanace";
import AddExpense from "./Components/NewLayout/Modules/pages/Finanace/AddExpense/AddExpense";
import OrderPayment from "./Components/NewLayout/Modules/pages/Finanace/OrderPayment/OrderPayment";
import DashboardSummary from "./Components/NewLayout/Modules/pages/Finanace/DashboardSummary/DashboardSummary";
import CustomerManagment from "./Components/NewLayout/Modules/pages/Sales/CustomerMangment/CustomerManagment";
import Blogs from "./Components/NewLayout/Modules/pages/Sales/Blogs/Blogs";
import { ReportEvent } from "./Components/NewLayout/Modules/pages/Sales/ReportEvent/ReportEvent";
import AddSupplier from "./pages/Suppliers/AddSupplier/AddSupplier";
import Suppliers from "./pages/Suppliers/AllSuppliers/Suppliers";
import UpdateSupplier from "./pages/Suppliers/UpdateSupplier/UpdateSupplier";
import AddForwarder from "./pages/Forwarders/AddForwarder/AddForwarder";
import UpdateForwarder from "./pages/Forwarders/UpdateForwarder/UpdateForwarder";
import AllForwarders from "./pages/Forwarders/AllForwarders/Forwarders";
import Forwarders from "./pages/Forwarders/AllForwarders/Forwarders";
import Customers from "./pages/Customers/Customers/Customers";
import AddCustomer from "./pages/Customers/AddCustomer/AddCustomer";
import UpdateCustomer from "./pages/Customers/UpdateCustomer/UpdateCustomer";
import UpdateShipmentAgent from "./pages/ShipmentsAgents/UpdateShipmentAgent/UpdateShipmentAgent";
import AddShipmentAgent from "./pages/ShipmentsAgents/AddShipmentAgent/AddShipmentAgent";
import AllShipmentsAgents from "./pages/ShipmentsAgents/AllShipmentsAgents/AllShipmentsAgents";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="test" element={<FileUploader />} />
          <Route path="/website" element={<WebsitePage />}></Route>
          <Route path="/check" element={<CheckProduct />}></Route>
          {/* this are routes for new dashboard */}
          <Route path="dashboard" element={<NewLayout />}>
            <Route index path="home" element={<HomeDashboard />}></Route>
            <Route path="add-issue" element={<AddIssue />}></Route>
            <Route path="issues" element={<Issues />}></Route>
            {/* This is logistic routes */}
            <Route path="allLogistic" element={<AllLogistic />}></Route>
            <Route path="comingLogistic" element={<ComingLogistic />}></Route>
            <Route path="departuresLogistic" element={<DeparturesLogistic />}></Route>
            {/* This is Finanace routes */}
            <Route path="homeFinanace" element={<HomeFinanace />}></Route>
            <Route path="addExpense" element={<AddExpense />}></Route>
            <Route path="orderPyment" element={<OrderPayment />}></Route>
          </Route>
          <Route path="dashboardSummary" element={<DashboardSummary />}></Route>
          <Route path="customerManagment" element={<CustomerManagment />}></Route>
          <Route path="blogs" element={<Blogs />}></Route>
          <Route path="report" element={<ReportEvent />}></Route>
          {/* end routes dashboard */}
          <Route path="check-product" element={<CheckProduct />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />}></Route>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="user" element={<UserLayout />}>
                <Route path="home" element={<Home />} />
                <Route index element={<Warranty />}></Route>
                <Route path="pricelist" element={<PriceList />}></Route>
                <Route path="pdf" element={<ProformaInvoice />}></Route>
                <Route path="piadmin" element={<PIActionsAdmin />}></Route>
                <Route path="allpo" element={<PurchaseOrdersAll />}></Route>
                <Route path="orders" element={<Orders />}></Route>
                <Route path="projects" element={<Projects />}></Route>
                <Route path="allprojects" element={<AllProjects />}></Route>
                <Route path="sharedprojects" element={<SharedProjects />}></Route>
                <Route path="orders/pisigned" element={<SignedProformaInvoices />}></Route>
                <Route path="editpi/:id" element={<EditProforamaInvoice />}></Route>
                <Route path="addproduct" element={<ProductForm />}></Route>
                <Route path="makepi" element={<PiStepper />}></Route>
                <Route path="makepo" element={<MakePo />}></Route>
                <Route path="poinfo" element={<PoInfo />}></Route>
                <Route path="popdf" element={<PurchaseOrderPdf />}></Route>
                <Route path="finance" element={<Finance />}></Route>
                <Route path="editstock" element={<EditStock />}></Route>
                <Route path="editstock2" element={<EditStock2 />}></Route>
                <Route path="packinglist" element={<PackingList />}></Route>
                <Route path="packinglistmanual" element={<PackingListManual />}></Route> <Route path="packinglistpdf" element={<PackingListPdf />}></Route>
                <Route path="allpkl" element={<PackingListsAll />}></Route>
                <Route path="table" element={<ProformaInvoice />}></Route>
                <Route path="pricelistinfo" element={<PriceListInfo />}></Route>
                <Route path="pricelistpdf" element={<PriceListPDF />}></Route>
                <Route path="warranty" element={<Warranty />}></Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<AdminPage />}></Route>
                  <Route path="employees" element={<Employees />}></Route>
                  <Route path="new_user" element={<NewUser />}></Route>
                </Route>
                <Route path="warranty-check" element={<WarrantyCheck />}></Route>
                <Route path="customer-price-list" element={<CustomerPriceList />}></Route>
                <Route path="checkCustomer" element={<CheckCustomer />}></Route>
                <Route path="order-tracking" element={<OrderTracking />}></Route>
                {/* <Route path="order-tracking-user" element={<OrderTrackingUser />}></Route> */}
                {/* Suppliers Routes */}
                <Route path="addSupplier" element={<AddSupplier />}></Route>
                <Route path="updateSupplier" element={<UpdateSupplier />}></Route>
                <Route path="suppliers" element={<Suppliers />}></Route>
                {/* Forwarders Routes */}
                <Route path="forwarders" element={<Forwarders />}></Route>
                <Route path="updateForwarder" element={<UpdateForwarder />}></Route>
                <Route path="addForwarder" element={<AddForwarder />}></Route>
                {/* Customer  Routes*/}
                <Route path="customers" element={<Customers />}></Route>
                <Route path="updateCustomer" element={<UpdateCustomer />}></Route>
                <Route path="addCustomer" element={<AddCustomer />}></Route>
                {/* Shipment Agents  Routes*/}
                <Route path="shippingAgents" element={<AllShipmentsAgents />}></Route>
                <Route path="addShipmentAgent" element={<AddShipmentAgent />}></Route>
                <Route path="updateShipmentAgent" element={<UpdateShipmentAgent />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
