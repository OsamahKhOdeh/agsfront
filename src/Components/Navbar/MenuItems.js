import { BASE_DOMAIN } from "../../api/index";

export const AdminMenuItems = [
  // {
  //   title: "Performa Invoice",
  //   path: "/user/makepi",
  //   cName: "dropdown-link",
  //   icon : "bx-pie-chart-alt-2"
  // },
  // {
  //   title: "Purchase Order",
  //   path: "/user/makepo",
  //   cName: "dropdown-link",
  //   icon : "bx-polygon"
  // },
  // {
  //   title: "Quotation",
  //   path: "/user/warranty",
  //   cName: "dropdown-link",
  //   icon : "bx-money"
  // },
  {
    title: "Orders Tracking",
    path: "/user/order-tracking",
    cName: "dropdown-link",
    icon: "bx-package",
  },
  {
    title: "Add Items",
    path: "/user/addproduct",
    cName: "dropdown-link",
    icon: "bx-plus",
  },
  {
    title: "Employees",
    path: "/user/employees",
    cName: "dropdown-link",
    icon: "bxs-group",
  },
  {
    title: "Edit Items",
    path: "/user/admin",
    cName: "dropdown-link",
    icon: "bx-edit-alt",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Update Prices",
    path: "/user/updatePrices",
    cName: "dropdown-link",
    icon: "bx-dollar",
  },
  {
    title: "Show all PI/s",
    path: "/user/piadmin",
    cName: "dropdown-link",
    icon: "bx-list-ul",
  },

  {
    title: "Show all PKLs",
    path: "/user/allpkl",
    cName: "dropdown-link",
    icon: "bxs-package",
  },
  {
    title: "Show all PO/s",
    path: "/user/allpo",
    cName: "dropdown-link",
    icon: "bx-show",
  },
  {
    title: "Orders",
    path: "/user/orders",
    cName: "dropdown-link",
    icon: "bx-border-radius",
  },
  {
    title: "Employees Projects",
    path: "/user/allprojects",
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Shared Projects",
    path: "/user/sharedprojects",
    cName: "dropdown-link",
    icon: "bx-share-alt",
  },
  {
    title: "My Projects",
    path: "/user/projects",
    cName: "dropdown-link",
    icon: "bx-dialpad-alt",
  },
  // {
  //   title: "Suppliers",
  //   path: `/user/suppliers`,
  //   cName: "dropdown-link",
  //   icon: "bx-selection",
  // },
  // {
  //   title: "Forwarders",
  //   path: `/user/forwarders`,
  //   cName: "dropdown-link",
  //   icon: "bx-trip",
  // },
  // {
  //   title: "Shipping Agents",
  //   path: `/user/shippingAgents`,
  //   cName: "dropdown-link",
  //   icon: "bxs-truck",
  // },
  // {
  //   title: "Customers",
  //   path: `/user/customers`,
  //   cName: "dropdown-link",
  //   icon: "bx-group",
  // },
  // {
  //   title: "Clearance Agents",
  //   path: `/user/clearanceAgents`,
  //   cName: "dropdown-link",
  //   icon: "bx-group",
  // },
  {
    title: "Datasheet",
    path: `${BASE_DOMAIN}/website`,
    cName: "dropdown-link",
    icon: "bx-data",
  },
];
export const EmployeeMenuItems = [
  {
    title: "Performa Invoice",
    path: "/user/makepi",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Make Countation",
    path: "/user/warranty",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Orders",
    path: "/user/orders",
    cName: "dropdown-link",
    icon: "bx-border-radius",
  },
  {
    title: "Projects",
    path: "/user/projects",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Make PKL",
    path: "/user/packinglistmanual",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Customers",
    path: `/user/customers`,
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Shipping Agents",
    path: `/user/shippingAgents`,
    cName: "dropdown-link",
    icon: "bxs-truck",
  },
  {
    title: "Clearance Agents",
    path: `/user/clearanceAgents`,
    cName: "dropdown-link",
    icon: "bxl-magento",
  },
  {
    title: "Warehouses",
    path: `/user/warehouses`,
    cName: "dropdown-link",
    icon: "bxs-widget",
  },
];

export const SalesManagerMenuItems = [
  {
    title: "Performa Invoice",
    path: "/user/makepi",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Make Countation",
    path: "/user/warranty",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Orders",
    path: "/user/orders",
    cName: "dropdown-link",
    icon: "bx-border-radius",
  },
  {
    title: "Purchase Order",
    path: "/user/makepo",
    cName: "dropdown-link",
    icon: "bx-polygon",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Show all PI/s",
    path: "/user/piadmin",
    cName: "dropdown-link",
    icon: "bx-list-ul",
  },
  {
    title: "Emplyees Projects",
    path: "/user/allprojects",
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Shared Projects",
    path: "/user/sharedprojects",
    cName: "dropdown-link",
    icon: "bx-share-alt",
  },
  {
    title: "My Projects",
    path: "/user/projects",
    cName: "dropdown-link",
    icon: "bx-dialpad-alt",
  },
  {
    title: "Datasheet",
    path: `${BASE_DOMAIN}/website`,
    cName: "dropdown-link",
    icon: "bx-data",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Customers",
    path: `/user/customers`,
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Make PKL",
    path: "/user/packinglistmanual",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Shipping Agents",
    path: `/user/shippingAgents`,
    cName: "dropdown-link",
    icon: "bxs-truck",
  },
  {
    title: "Clearance Agents",
    path: `/user/clearanceAgents`,
    cName: "dropdown-link",
    icon: "bxl-magento",
  },
  {
    title: "Warehouses",
    path: `/user/warehouses`,
    cName: "dropdown-link",
    icon: "bxs-widget",
  },
];

export const FinancialMenuItems = [
  {
    title: "Finance/Payments",
    path: "/user/finance",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },

  {
    title: "Show all PI/s",
    path: "/user/piadmin",
    cName: "dropdown-link",
    icon: "bx-list-ul",
  },
  {
    title: "Show all PKLs",
    path: "/user/allpkl",
    cName: "dropdown-link",
    icon: "bxs-package",
  },

  {
    title: "Projects",
    path: "/user/projects",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Customers",
    path: `/user/customers`,
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Shipping Agents",
    path: `/user/shippingAgents`,
    cName: "dropdown-link",
    icon: "bxs-truck",
  },
  {
    title: "Clearance Agents",
    path: `/user/clearanceAgents`,
    cName: "dropdown-link",
    icon: "bxl-magento",
  },
  {
    title: "Warehouses",
    path: `/user/warehouses`,
    cName: "dropdown-link",
    icon: "bxs-widget",
  },
  {
    title: "Update Prices",
    path: "/user/updatePrices",
    cName: "dropdown-link",
    icon: "bx-dollar",
  },
];

export const LogisticsMenuItems = [
  {
    title: "Projects",
    path: "/user/projects",
    cName: "dropdown-link",
    icon: "bx-pie-chart-alt-2",
  },
  {
    title: "Edit Stock",
    path: "/user/editstock2",
    cName: "dropdown-link",
    icon: "bxs-edit",
  },
  {
    title: "Packing List",
    path: "/user/packinglistmanual",
    cName: "dropdown-link",
    icon: "bx-package",
  },
  {
    title: "Orders",
    path: "/user/orders",
    cName: "dropdown-link",
    icon: "bx-border-radius",
  },
  {
    title: "Suppliers",
    path: `/user/suppliers`,
    cName: "dropdown-link",
    icon: "bx-selection",
  },
  {
    title: "Forwarders",
    path: `/user/forwarders`,
    cName: "dropdown-link",
    icon: "bx-trip",
  },
  {
    title: "Customers",
    path: `/user/customers`,
    cName: "dropdown-link",
    icon: "bx-group",
  },
  {
    title: "Shipping Agents",
    path: `/user/shippingAgents`,
    cName: "dropdown-link",
    icon: "bxs-truck",
  },
  {
    title: "Clearance Agents",
    path: `/user/clearanceAgents`,
    cName: "dropdown-link",
    icon: "bxl-magento",
  },
  {
    title: "Warehouses",
    path: `/user/warehouses`,
    cName: "dropdown-link",
    icon: "bxs-widget",
  },
];
export const SyriaEmployeeMenuItems = [
  {
    title: "PriceList/Quotation",
    path: "/user/warranty",
    cName: "dropdown-link",
    icon: "bx-money",
  },
];
export const AdminSyriaMenuItems = [
  {
    title: "PO",
    path: "/user/makepi",
    cName: "dropdown-link",
    icon: "bx-money",
  },
  {
    title: "Orders",
    path: "/user/orders",
    cName: "dropdown-link",
    icon: "bx-border-radius",
  },
];
