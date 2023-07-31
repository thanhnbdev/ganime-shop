import {
  faCartShopping,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "~/assets/images/logo-gym.png";

import { Link } from "react-router-dom";
import config from "~/config";
import authoService from "~/services/authoService";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "~/app/reducers/order";

import { useNavigate } from "react-router-dom";

function HeaderLayout(props) {
  const [currentUser, setCurrentUser] = useState({});
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrder());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, [props.count]);

  function handleLogout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id");
    navigate("/login");
  }

  return (
    <div className="shadow-gray-400 shadow-sm fixed w-full bg-white z-50">
      <div className="bg-black text-white py-3 px-48 grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3">
          <div className="text-sm">
            <span className="pr-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            Hà Nội, Việt Nam
          </div>
          <div className="text-sm">
            <span className="pr-2">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            0987654321
          </div>
          <div className="text-sm">
            <span className="pr-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            ganime@gmail.com
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-sm">
            {currentUser?.id > 0 ? (
              <span>Xin chào, {currentUser?.fullname} !</span>
            ) : (
              <div>
                <span className="pr-2">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <Link
                  to={config.routes.login}
                  className="no-underline text-white"
                >
                  Đăng nhập
                </Link>{" "}
                /{" "}
                <Link
                  className="no-underline text-white"
                  to={config.routes.signup}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <div>
            <Link to={config.routes.purchase}>
              <span className="pr-2 relative inline-flex items-center text-white">
                <FontAwesomeIcon icon={faCartShopping} />
                {orders.filter((x) => x.status === 1).length > 0 ? (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {orders.filter((x) => x.status === 1).length}
                  </div>
                ) : (
                  ""
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 px-40">
        <div className="font-bold text-3xx py-3">
          <Link to={config.routes.home}>
            <img src={logo} alt="logo" className="h-16" />
          </Link>
        </div>
        <div className="col-start-2 col-end-4 flex justify-end items-center">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
              <li className="list-none">
                <Link
                  className="no-underline text-black"
                  to={config.routes.home}
                >
                  Trang chủ
                </Link>
              </li>
              {currentUser?.id > 0 ? (
                <li className="list-none">
                  <Link
                    className="no-underline text-black"
                    to={config.routes.favourite}
                  >
                    Yêu thích
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="list-none">
                <Link
                  className="no-underline text-black"
                  to={config.routes.about}
                >
                  Về chúng tôi
                </Link>
              </li>
              <li className="list-none">
                <Link
                  className="no-underline text-black"
                  to={config.routes.contact}
                >
                  Kết nối
                </Link>
              </li>
              {currentUser?.id > 0 ? (
                <li className="list-none">
                  <Link
                    className="no-underline text-black"
                    to={config.routes.profile}
                  >
                    Tài khoản của tôi
                  </Link>
                </li>
              ) : (
                ""
              )}
              {currentUser?.id > 0 ? (
                <li className="list-none cursor-pointer">
                  <div
                    className="no-underline text-black"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </div>
                </li>
              ) : (
                ""
              )}
              {currentUser?.role?.some(
                (x) => x.name === "QUẢN LÝ" || x.name === "NHÂN VIÊN"
              ) ? (
                <li className="list-none font-bold">
                  <Link
                    className="no-underline text-blue-600"
                    to={config.routes.dashboard}
                  >
                    Đến trang quản lý
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLayout;
