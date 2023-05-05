import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./pages/Home/Home";
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
function App() {
  return (
    <div style={{ background: "#f7f7f7" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/website" element={<WebsitePage />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />}></Route>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="user" element={<UserLayout />}>
                <Route index element={<Warranty />}></Route>
                <Route path="pricelist" element={<PriceList />}></Route>
                <Route path="pdf" element={<ProformaInvoice />}></Route>
                <Route path="piadmin" element={<PIActionsAdmin />}></Route>
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
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
