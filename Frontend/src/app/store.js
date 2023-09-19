import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// reducers
import user from "./reducers/user";
import size from "./reducers/size";
import color from "./reducers/color";
import role from "./reducers/role";
import contact from "./reducers/contact";
import product from "./reducers/product";
import order from "./reducers/order";
import orderDetail from "./reducers/orderDetail";
import category from "./reducers/category";
import authority from "./reducers/authority";
import feedback from "./reducers/feedback";
import favourite from "./reducers/favourite";
import voucher from "./reducers/voucher";
import productSize from "./reducers/productSize";
import productColor from "./reducers/productColor";

const reducer = combineReducers({
  // here we will be adding reducers
  user: user,
  size: size,
  color: color,
  role: role,
  contact: contact,
  product: product,
  productSize: productSize,
  productColor: productColor,
  order: order,
  orderDetail: orderDetail,
  category: category,
  authority: authority,
  feedback: feedback,
  favourite: favourite,
  voucher: voucher,
});
const store = configureStore({
  reducer,
});
export default store;
