import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
//import DashHeader from './DashHeader'
//import DashFooter from './DashFooter'
import "./layout_styles.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "../../global/_global.scss";
import NewLayout from "../../Components/NewLayout/NewLayout";
import {
  AdminMenuItems,
  EmployeeMenuItems,
  FinancialMenuItems,
  LogisticsMenuItems,
  SalesManagerMenuItems,
} from "../../Components/Navbar/MenuItems";
import useAuth from "../../hooks/useAuth";
import { logOut } from "../../store/authSlice";
import { emptyCart } from "../../store/cartSlice";
import { clearFilters } from "../../store/filtersSlice";
const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(useAuth()?.username);
  const moveTop = () => {
    window.scrollTo(0, 0);
    let mybutton = document.getElementById("btn-back-to-top");
  };
  const { isAdmin, roles } = useAuth();
  let MenuItems = EmployeeMenuItems;
  if (isAdmin) {
    MenuItems = AdminMenuItems;
  }
  if (roles.includes("Sales Manager")) {
    MenuItems = SalesManagerMenuItems;
  }
  if (roles.includes("Financial")) {
    MenuItems = FinancialMenuItems;
  }
  if (roles.includes("Logistics")) {
    MenuItems = LogisticsMenuItems;
  }
  const logout = () => {
    dispatch(logOut());
    dispatch(emptyCart());
    dispatch(clearFilters());

    navigate("/");

    setUser(null);
  };
  const [currentPage, setCurrentPage] = useState("home");
  const [isOpen, setIsoOpen] = useState(false);

  return (
    <>
      {/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button">Something else here</button>
  </div>
</div> */}
    <span  id="btn-back-to-top" className="ags-btn-top" onClick={()=>moveTop()}><i class="uil uil-arrow-circle-up"></i></span>
      <div className={`snippet-body ${isOpen ? "" : ""} `}>
        <header className={`header ${isOpen ? "" : "body-pd"} `} id="header">
          {/* onClick={()=>setIsoOpen((prev)=>!prev)} */}
          <div
            className="header_toggle"
            onClick={() => setIsoOpen((prev) => !prev)}
          >
            <i
              className={`bx bx-menu ${isOpen ? "" : "bx-x"} `}
              id="header-toggle"
            ></i>
          </div>
          <div class="dropdown show">
          <div className="profile-img" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          <img src="https://i.pravatar.cc/150?u=fake@pravatar.com"  alt="avatar-img" />{" "}
          </div>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" onClick={() => {}}>
              <i class="uil uil-user-circle"></i> {user}
          </a>
            <a class="dropdown-item" onClick={logout}>
              {/* <div > */}
                {/* <a  className="nav_link"> */}
                <i class="uil uil-sign-out-alt"></i>
                  <span className="nav_name">Signout</span>
                {/* </a> */}
              {/* </div> */}
            </a>
            {/* <a class="dropdown-item" href="#">Something else here</a> */}
          </div>
        </div>
        </header>
        {/* {`l-navbar  ${isOpen ? '' : 'show' } `} */}
        <div className={`l-navbar  ${isOpen ? "" : "show"} `} id="nav-bar">
          <nav className="nav">
            <div>
              <a  className="nav_logo">
                <i className="bx bx-layer nav_logo-icon"></i>{" "}
                <span className="nav_logo-name">AGS</span>{" "}
              </a>
              <div className="nav_list">
              {isAdmin && 
             <>
              <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <a class="invoice">
                  <i className={`bx nav_icon  bx bx-down-arrow`}></i> <span>Invoice</span>
                  </a>
              </button>
              <div class="dropdown-menu dropdown-menu-right dropdown-invoice" >
              <a class="dropdown-item " >
              <Link to='/user/makepi' className="invoice-item">
                Performa Invoice
              </Link>
                </a>
              <a class="dropdown-item" >
                <Link to='/user/makepo' className="invoice-item">
                Purchase Order
              </Link>
                </a>
              <a class="dropdown-item" >
                <Link to='/user/warranty' className="invoice-item">
                  Quotation
                  </Link>
                </a>
              {/* <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a> */}
              </div>
              </>
              }
                {MenuItems.map((MenuItem)=>
                <a  className="nav_link " >
                 <Link to={MenuItem.path}>
                  <i className={`bx nav_icon ${MenuItem.icon}`}></i>
                  <span className="nav_name">{MenuItem.title}</span>
                  </Link>
                </a>
                )}
               <a  className="nav_link " href="http://143.42.61.215/website" target="_blank" >
                 {/* <Link to=''> */}
                  <i className={`bx nav_icon bx-data`}></i>
                  <span className="nav_name">Datasheet</span>
                  {/* </Link> */}
                </a>
              </div>
            </div>
            {/* <div onClick={logout}>
            <a  className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>{" "}
              <span className="nav_name">SignOut</span>{" "}
            </a>
            </div> */}
          </nav>
        </div>
        <div
          className={`height-100  ${
            isOpen ? "body-content-pd-2" : "body-content-pd"
          } `}
        >
          <Outlet />
        </div>
      </div>
      
      {/* <Navbar />
      <div style={{ display: "flex", paddingTop: "82px" }}>
        <Sidebar />
        <Outlet />
      </div> */}
    </>
  );
};
export default UserLayout;
