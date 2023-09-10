import config from "~/config";

// Pages
import HomeUserPage from "~/pages/User/HomeUserPage";
import ProfileUserPage from "~/pages/User/ProfileUserPage";
import ProductDetailPage from "~/pages/User/ProductDetailPage";
import PurchasePage from "~/pages/User/PurchasePage";
import PaymentPage from "~/pages/User/PaymentPage";
import ContactPage from "~/pages/User/ContactPage";
import AboutPage from "~/pages/User/AboutPage";
import FavouritePage from "~/pages/User/FavouritePage";
import NotFound from "~/pages/Common/NotFound";
import LoginPage from "~/pages/Common/LoginPage";
import SignupPage from "~/pages/Common/SignupPage";
import DashboardPage from "~/pages/Admin/DashboardPage";
import ProductManaPage from "~/pages/Admin/ProductManaPage";
import CategoryManaPage from "~/pages/Admin/CategoryManaPage";
import OrderManaPage from "~/pages/Admin/OrderManaPage";
import BillManaPage from "~/pages/Admin/BillManaPage";
import StatisticsPage from "~/pages/Admin/StatisticsPage";
import CustomerManaPage from "~/pages/Admin/CustomerManaPage";
import PersonnelManaPage from "~/pages/Admin/PersonnelManaPage";
import ContactManaPage from "~/pages/Admin/ContactManaPage";
import AuthorityManaPage from "~/pages/Admin/AuthorityManaPage";
import VoucherManaPage from "~/pages/Admin/VoucherManaPage";
import DefaultLayoutAdmin from "~/layouts/DefaultLayoutAdmin";
import AtStorePage from "../pages/Admin/AtStorePage";
import SizeManagePage from "../pages/Admin/SizeManaPage";
import ColorManagePage from "../pages/Admin/ColorManaPage";

// Routes public

const publicRoutes = [
  { path: config.routes.home, component: HomeUserPage, layout: null },
  { path: config.routes.profile, component: ProfileUserPage, layout: null },
  { path: config.routes.favourite, component: FavouritePage, layout: null },
  {
    path: config.routes.productDetail,
    component: ProductDetailPage,
    layout: null,
  },
  { path: config.routes.purchase, component: PurchasePage, layout: null },
  { path: config.routes.payment, component: PaymentPage, layout: null },
  { path: config.routes.contact, component: ContactPage, layout: null },
  { path: config.routes.about, component: AboutPage, layout: null },
  { path: config.routes.notfound, component: NotFound, layout: null },
  { path: config.routes.login, component: LoginPage, layout: null },
  { path: config.routes.signup, component: SignupPage, layout: null },
];

const privateRoutes = [
  {
    path: config.routes.dashboard,
    component: DashboardPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.atStore,
    component: AtStorePage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.productManage,
    component: ProductManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.categoryManage,
    component: CategoryManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.customerManage,
    component: CustomerManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.contactManage,
    component: ContactManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.orderManage,
    component: OrderManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.billManage,
    component: BillManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.voucher,
    component: VoucherManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.sizeManage,
    component: SizeManagePage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.colorManage,
    component: ColorManagePage,
    layout: DefaultLayoutAdmin,
  },
];

const privateAdminRoutes = [
  {
    path: config.routes.personnelManage,
    component: PersonnelManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.authorityManage,
    component: AuthorityManaPage,
    layout: DefaultLayoutAdmin,
  },
  {
    path: config.routes.statistics,
    component: StatisticsPage,
    layout: DefaultLayoutAdmin,
  },
];

export { publicRoutes, privateRoutes, privateAdminRoutes };
