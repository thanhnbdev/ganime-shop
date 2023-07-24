const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  loginAdmin: "/auth/login",
  profile: "/profile",
  contact: "/contact-us",
  about: "/about-us",
  favourite: "/favourite",
  productDetail: "/product-detail/:idProduct/:nameProduct",
  purchase: "/my-purchase",
  payment: "/my-purchase/payment/:sale",
  dashboard: "/admin/dashboard",
  voucher: "/admin/voucher-manage",
  orderManage: "/admin/order-manage",
  billManage: "/admin/bill-manage",
  statistics: "/admin/statistics",
  productManage: "/admin/product-manage",
  authorityManage: "/admin/authority-manage",
  categoryManage: "/admin/category-manage",
  customerManage: "/admin/customer-manage",
  personnelManage: "/admin/personnel-manage",
  contactManage: "/admin/contact-manage",
  atStore: "/admin/at-store",
  notfound: "/*",
};
export default routes;