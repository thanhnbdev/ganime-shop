import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, update } from "~/app/reducers/user";

import moment from "moment";
import { Link } from "react-router-dom";

import { Field, Form, Formik } from "formik";
import { add } from "~/app/reducers/feedback";
import { getAllOrderDetail } from "~/app/reducers/orderDetail";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Pagination,
  Select,
  Tabs,
  message,
} from "antd";
import authoService from "~/services/authoService";

function ProfileUserPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleChangePass, setVisinleChangePass] = useState(false);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [quality, setQuality] = useState("Tuyệt vời");
  const [content, setContent] = useState("");
  const [product, setProduct] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [itemOffset2, setItemOffset2] = useState(0);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const ordersDetailHistory = useSelector(
    (state) => state.orderDetail.ordersDetailHistory
  );
  const ordersDetailHistoryUserBill = useSelector(
    (state) => state.orderDetail.ordersDetailHistoryUserBill
  );
  const dispatch = useDispatch();
  const bcryptjs = require("bcryptjs");

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllOrderDetail());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  // tab-1
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = ordersDetailHistory
    .filter((x) => x.orders.status === 2)
    .slice(itemOffset, endOffset);
  const size = ordersDetailHistory.filter((x) => x.orders.status === 2).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) %
      ordersDetailHistory.filter((x) => x.orders.status === 2).length;
    setItemOffset(newOffset);
  };
  // tab-2
  const itemsPerPage2 = 8;
  const endOffset2 = itemOffset2 + itemsPerPage2;
  const currentItems2 = ordersDetailHistoryUserBill.slice(
    itemOffset2,
    endOffset2
  );
  const size2 = ordersDetailHistoryUserBill.length;

  // Invoke when user click to request another page.
  const handlePageClick2 = (page) => {
    const newOffset2 =
      ((page - 1) * itemsPerPage2) % ordersDetailHistoryUserBill.length;
    setItemOffset2(newOffset2);
  };

  function handleUpdate(values, touched) {
    dispatch(
      update({
        ...currentUser,
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      })
    );
    messageApi.success("Thay đổi thông tin thành công");
  }

  function handleChangePassword() {
    if (bcryptjs.compareSync(oldPass, currentUser.password)) {
      if (newPass === reNewPass) {
        dispatch(
          update({
            ...currentUser,
            password: bcryptjs.hashSync(newPass, 10),
          })
        );
        setVisinleChangePass(false);
        messageApi.success("Thay đổi mật khẩu thành công");
      } else {
        messageApi.error("Mật khẩu xác nhận sai");
      }
    } else {
      messageApi.error("Mật khẩu không đúng");
    }
  }

  function handleFeedback() {
    let rate = 1;
    if (quality === "Tuyệt vời") {
      rate = 5;
    } else if (quality === "Tốt") {
      rate = 4;
    } else if (quality === "Bình thường") {
      rate = 3;
    } else if (quality === "Kém") {
      rate = 2;
    } else {
      rate = 1;
    }
    dispatch(
      add({
        product: product,
        user: currentUser,
        quality: quality,
        rate: rate,
        content: content,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    setVisibleFeedback(false);
    messageApi.success("Đánh giá thành công");
  }

  const items = [
    {
      key: "1",
      label: `Thông tin`,
      children: (
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              ...currentUser,
              fullname: currentUser?.fullname || "",
              username: currentUser?.username || "",
              email: currentUser?.email || "",
              avatar: currentUser?.avatar || "",
            }}
            onSubmit={(values, touched) => handleUpdate(values, touched)}
          >
            {({
              values,
              touched,
              /* and other goodies */
            }) => (
              <Form>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex justify-center items-center p-3 border-2 border-white">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullname}
                      className="rounded-md w-56 h-56"
                    />
                  </div>
                  <div className="col-start-2 col-end-4">
                    <div className="grid grid-cols-2 gap-2 pt-6">
                      <div>
                        <label>Họ tên</label>
                        <Field
                          type="text"
                          name="fullname"
                          className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                          value={values.fullname}
                        />
                      </div>
                      <div>
                        <label>Tên đăng nhập</label>
                        <Field
                          type="text"
                          name="username"
                          disabled
                          className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                          value={values.username}
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <Field
                          type="text"
                          name="email"
                          className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                          value={values.email}
                        />
                      </div>
                      <div>
                        <label>Ảnh đại diện</label>
                        <Field
                          type="text"
                          name="avatar"
                          disabled
                          className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                          value={values.avatar}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          className="w-full"
                        >
                          Thay đổi thông tin
                        </Button>
                      </div>
                      <div>
                        <Button
                          danger
                          type="primary"
                          className="w-full"
                          size="large"
                          onClick={() => setVisinleChangePass(true)}
                        >
                          Thay đổi mật khẩu
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ),
    },
    {
      key: "2",
      label: `Sản phẩm đã mua`,
      children: (
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3" colSpan={2}>
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày mua
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thành tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đánh giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems2.reverse().map((x) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        to={`/product-detail/${x.orders.product.id}/${x.orders.product.name}`}
                      >
                        <img
                          src={x.orders.product.image}
                          alt={x.orders.product.name}
                          className="rounded-md"
                          width={50}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {x.orders.product.name} - size {x.size}
                    </td>
                    <td className="px-6 py-4">
                      {x.orders.product.category.name}
                    </td>
                    <td className="px-6 py-4">{x.orders.date}</td>
                    <td className="px-6 py-4">
                      {(
                        x.orders.product.price -
                        (x.orders.product.price *
                          (x.orders.product.sale + x.orders.code)) /
                          100
                      ).toLocaleString()}
                      đ
                    </td>
                    <td className="px-6 py-4">x{x.quantity}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {(
                        (x.orders.product.price -
                          (x.orders.product.price *
                            (x.orders.product.sale + x.orders.code)) /
                            100) *
                        x.orders.quantity
                      ).toLocaleString()}
                      ₫
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        type="primary"
                        className="w-full"
                        onClick={() => {
                          setVisibleFeedback(true);
                          setProduct(x.orders.product);
                        }}
                      >
                        Đánh giá
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            {/* Pagination */}
            <Pagination
              showSizeChanger={false}
              defaultCurrent={1}
              onChange={handlePageClick2}
              pageSize={itemsPerPage}
              total={size2}
            />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: `Đang chờ xác nhận`,
      children: (
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3" colSpan={2}>
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày mua
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.reverse().map((x) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        to={`/product-detail/${x.orders.product.id}/${x.orders.product.name}`}
                      >
                        <img
                          src={x.orders.product.image}
                          alt={x.orders.product.name}
                          className="rounded-md"
                          width={50}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {x.orders.product.name} - size {x.size}
                    </td>
                    <td className="px-6 py-4">
                      {x.orders.product.category.name}
                    </td>
                    <td className="px-6 py-4">{x.orders.date}</td>
                    <td className="px-6 py-4">
                      {(
                        x.orders.product.price -
                        (x.orders.product.price *
                          (x.orders.product.sale + x.orders.code)) /
                          100
                      ).toLocaleString()}
                      đ
                    </td>
                    <td className="px-6 py-4">x{x.quantity}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {(
                        (x.orders.product.price -
                          (x.orders.product.price *
                            (x.orders.product.sale + x.orders.code)) /
                            100) *
                        x.orders.quantity
                      ).toLocaleString()}
                      ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            {/* Pagination */}
            <Pagination
              showSizeChanger={false}
              defaultCurrent={1}
              onChange={handlePageClick}
              pageSize={itemsPerPage}
              total={size}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <HeaderLayout />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="bg-slate-100 py-4 px-28">
        <div className="pt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="mt-6">
          <div className="col-start-2 col-end-5 bg-white rounded-md p-4">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </div>
      </div>
      {/* Modal feedback */}
      <Modal
        open={visibleFeedback}
        onOk={handleFeedback}
        title="Đánh giá sản phẩm"
        okText="Đánh giá"
        onCancel={() => setVisibleFeedback(false)}
      >
        <div>
          <div>
            <label>Nội dung đánh giá</label>
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
            />
          </div>
          <div>
            <label>Chất lượng</label>
            <Select
              value={quality}
              size="large"
              onChange={(value) => setQuality(value)}
              className="w-full"
            >
              <Select.Option value="Tuyệt vời">Tuyệt vời</Select.Option>
              <Select.Option value="Tốt">Tốt</Select.Option>
              <Select.Option value="Bình thường">Bình thường</Select.Option>
              <Select.Option value="Kém">Kém</Select.Option>
              <Select.Option value="Tệ">Tệ</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
      {/* Modal change password */}
      <Modal
        open={visibleChangePass}
        title="Thay đổi mật khẩu"
        okText="Thay đổi"
        onOk={handleChangePassword}
        onCancel={() => setVisinleChangePass(false)}
      >
        <div>
          <div>
            <div>
              <label>Mật khẩu cũ</label>
              <Input.Password
                size="large"
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>
            <div>
              <label>Mật khẩu mới</label>
              <Input.Password
                size="large"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div>
              <label>Nhập lại mật khẩu mới</label>
              <Input.Password
                size="large"
                onChange={(e) => setReNewPass(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
      <FooterLayout />
    </div>
  );
}

export default ProfileUserPage;
