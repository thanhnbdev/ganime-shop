import {
  faChartSimple,
  faGauge,
  faList,
  faRightFromBracket,
  faShield,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation, useNavigate } from "react-router-dom";

import authoService from "~/services/authoService";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import config from "~/config";

import { Breadcrumb, Layout, Menu } from "antd";
import logo from "~/assets/images/logo-gym.png";

function DefaultLayoutAdmin(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  function handleLogout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id");
    navigate("/login");
  }
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link to={config.routes.dashboard}>Bảng điều khiển</Link>,
      config.routes.dashboard,
      <FontAwesomeIcon icon={faGauge} />
    ),
    currentUser.role?.some((x) => x.id === 2) &&
      getItem(
        <Link to={config.routes.atStore}>Mua tại cửa hàng</Link>,
        config.routes.atStore,
        <FontAwesomeIcon icon={faStore} />
      ),
    getItem("Danh mục quản lý", "sub", <FontAwesomeIcon icon={faList} />, [
      getItem(
        <Link to={config.routes.billManage}>Quản lý hóa đơn</Link>,
        config.routes.billManage
      ),
      getItem(
        <Link to={config.routes.orderManage}>Quản lý đơn hàng</Link>,
        config.routes.orderManage
      ),
      getItem(
        <Link to={config.routes.customerManage}>Quản lý khách hàng</Link>,
        config.routes.customerManage
      ),
      getItem(
        <Link to={config.routes.personnelManage}>Quản lý nhân viên</Link>,
        config.routes.personnelManage
      ),
      getItem(
        <Link to={config.routes.productManage}>Quản lý sản phẩm</Link>,
        config.routes.productManage
      ),
      getItem(
        <Link to={config.routes.categoryManage}>Quản lý loại sản phẩm</Link>,
        config.routes.categoryManage
      ),
      getItem(
        <Link to={config.routes.contactManage}>Quản lý liên hệ</Link>,
        config.routes.contactManage
      ),
      getItem(
        <Link to={config.routes.voucher}>Quản lý voucher</Link>,
        config.routes.voucher
      ),
    ]),
    getItem(
      <Link to={config.routes.authorityManage}>Phân quyền</Link>,
      config.routes.authorityManage,
      <FontAwesomeIcon icon={faShield} />
    ),
    getItem(
      <Link to={config.routes.statistics}>Thống kê</Link>,
      config.routes.statistics,
      <FontAwesomeIcon icon={faChartSimple} />
    ),
    getItem(
      <div onClick={() => handleLogout()}>Đăng xuất</div>,
      "logout",
      <FontAwesomeIcon icon={faRightFromBracket} />
    ),
  ];

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout.Sider
          collapsible
          width={250}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="h-24 mb-4 p-2 flex justify-center items-center">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-20 h-20" />
            </Link>
          </div>
          <Menu
            theme="dark"
            selectedKeys={location?.pathname}
            mode="inline"
            onChange={(value) => alert(value)}
            items={items}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Header
            style={{
              padding: "0 60px",
              background: "#ffffff",
            }}
          >
            <div className="flex justify-end">
              <div className="font-bold ml-6">
                Xin chào {currentUser.fullname} !
              </div>
            </div>
          </Layout.Header>
          <Layout.Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
              items={[{ title: "Admin" }, { title: "Oke" }]}
            />

            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "white",
              }}
              className="rounded-md"
            >
              {props.children}
            </div>
          </Layout.Content>
          <Layout.Footer
            style={{
              textAlign: "center",
            }}
          >
            ©2023 Shop Gym
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default DefaultLayoutAdmin;
