import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, update } from "~/app/reducers/user";

import moment from "moment";
import { Link } from "react-router-dom";

import { add } from "~/app/reducers/feedback";
import { getAllOrderDetail } from "~/app/reducers/orderDetail";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Steps,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { update as updateOrder } from "~/app/reducers/order";
import { update as updateOrderDetail } from "~/app/reducers/orderDetail";
import authoService from "~/services/authoService";
import validators from "../../../services/validators";
import { faBan, faTimeline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileUserPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleChangePass, setVisinleChangePass] = useState(false);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [quality, setQuality] = useState("Tuyệt vời");
  const [content, setContent] = useState("");
  const [product, setProduct] = useState("");
  const [flag, setFlag] = useState(false);
  const [visibleStep, setVisibleStep] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemOffset2, setItemOffset2] = useState(0);
  const [itemOffset3, setItemOffset3] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [od, setOd] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ordersDetailHistory = useSelector(
    (state) => state.orderDetail.ordersDetailHistory
  );
  const ordersDetailCancelHistory = useSelector(
    (state) => state.orderDetail.ordersDetailCancelHistory
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
  }, [flag]);

  // tab-1
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = ordersDetailHistory.slice(itemOffset, endOffset);
  const size = ordersDetailHistory.length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % ordersDetailHistory.length;
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
  // tab-3
  const itemsPerPage3 = 8;
  const endOffset3 = itemOffset3 + itemsPerPage3;
  const currentItems3 = ordersDetailCancelHistory.slice(
    itemOffset3,
    endOffset3
  );
  const size3 = ordersDetailCancelHistory.length;

  // Invoke when user click to request another page.
  const handlePageClick3 = (page) => {
    const newOffset3 =
      ((page - 1) * itemsPerPage3) % ordersDetailCancelHistory.length;
    setItemOffset3(newOffset3);
  };

  function handleUpdate(values) {
    dispatch(
      update({
        ...currentUser,
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        avatar: values.avatar,
      })
    );
    messageApi.success("Thay đổi thông tin thành công");
  }

  function handleChangePassword(values) {
    if (bcryptjs.compareSync(values.oldPass, currentUser.password)) {
      if (values.newPass === values.reNewPass) {
        dispatch(
          update({
            ...currentUser,
            password: bcryptjs.hashSync(values.newPass, 10),
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

  function handleUndo() {
    dispatch(updateOrder({ ...od.orders, status: 5 }));
    dispatch(
      updateOrderDetail({
        ...od,
        status: 5,
      })
    );
    messageApi.success("Bạn đã hủy đơn hàng thành công");
    setIsModalOpen(false);
    setFlag(!flag);
  }

  const items = [
    {
      key: "1",
      label: `Thông tin`,
      children: (
        <div>
          <Form
            name="profile-form"
            fields={[
              {
                name: ["fullname"],
                value: currentUser?.fullname,
              },
              {
                name: ["username"],
                value: currentUser?.username,
              },
              {
                name: ["email"],
                value: currentUser?.email,
              },
              {
                name: ["phone"],
                value: currentUser?.phone,
              },
              {
                name: ["avatar"],
                value: currentUser?.avatar,
              },
            ]}
            onFinish={handleUpdate}
          >
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
                  <Form.Item
                    label="Họ tên"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="fullname"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ tên !",
                      },
                      {
                        validator(_, value) {
                          return new Promise((resolve, reject) => {
                            if (validators.space.test(value)) {
                              reject("Không bao gồm khoảng trắng ở đầu !");
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Họ tên" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Tên đăng nhập"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="username"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập username !",
                      },
                      {
                        validator(_, value) {
                          return new Promise((resolve, reject) => {
                            if (validators.space.test(value)) {
                              reject("Không bao gồm khoảng trắng ở đầu !");
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Username" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="email"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email !",
                      },
                      {
                        validator(_, value) {
                          return new Promise((resolve, reject) => {
                            if (!validators.email.test(value)) {
                              reject("Nhập sai định dạng email !");
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Username" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="phone"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại !",
                      },
                      {
                        validator(_, value) {
                          return new Promise((resolve, reject) => {
                            if (!validators.phone.test(value)) {
                              reject("Không đúng định dạng số điện thoại !");
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Ảnh đại diện"
                    className="col-start-1 col-end-3"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="avatar"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ảnh đại diện !",
                      },
                      {
                        validator(_, value) {
                          return new Promise((resolve, reject) => {
                            if (validators.space.test(value)) {
                              reject("Không bao gồm khoảng trắng ở đầu !");
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Ảnh đại diện" size="large" />
                  </Form.Item>
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
                      {x.orders.product.price.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4">x{x.quantity}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {(
                        x.orders.product.price * x.orders.quantity
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
                  <th scope="col" className="px-6 py-3">
                    Hành động
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
                      {x.orders.product.price.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4">x{x.quantity}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {(
                        (x.orders.product.price -
                          (x.orders.product.price * x.orders.code) / 100) *
                        x.orders.quantity
                      ).toLocaleString()}
                      ₫
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Tooltip placement="top" title={"Hủy đơn"}>
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            setOd(x);
                            setIsModalOpen(true);
                          }}
                          icon={<FontAwesomeIcon icon={faBan} />}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title={"Quá trình"}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#22a6b3" }}
                          onClick={() => {
                            setOd(x);
                            setVisibleStep(true);
                          }}
                          icon={<FontAwesomeIcon icon={faTimeline} />}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal Step */}
          <Modal
            open={visibleStep}
            width={"80%"}
            title="Trạng thái đơn hàng"
            footer={null}
            onCancel={() => setVisibleStep(false)}
          >
            <div className="my-8">
              <Steps
                type="navigation"
                percent={60}
                current={od.status}
                onChange={(value) => console.log(value)}
                items={[
                  {
                    title: "Đặt đơn hàng",
                    status: `${od.status === 5 ? "error" : ""}`,
                    description: od.orders?.date,
                  },
                  {
                    title: "Xác nhận đơn hàng",
                    status: `${od.status === 5 ? "error" : ""}`,
                  },
                  {
                    title: "Thanh toán",
                    status: `${od.status === 5 ? "error" : ""}`,
                  },
                  {
                    title: "Giao hàng",
                    status: `${od.status === 5 ? "error" : ""}`,
                    description: od.orders?.date,
                  },
                ]}
              />
            </div>
          </Modal>
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
    {
      key: "4",
      label: `Đơn hàng đã hủy`,
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
                {currentItems3.reverse().map((x) => (
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
                      {x.orders.product.price.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4">x{x.quantity}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {(
                        (x.orders.product.price -
                          (x.orders.product.price * x.orders.code) / 100) *
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
              onChange={handlePageClick3}
              pageSize={itemsPerPage3}
              total={size3}
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
        footer={null}
        onOk={handleChangePassword}
        onCancel={() => setVisinleChangePass(false)}
      >
        <Form
          name="normal_changepass"
          className="changepass-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="oldPass"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại !",
              },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (validators.space.test(value)) {
                      reject("Không bao gồm khoảng trắng ở đầu !");
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu hiện tại" size="large" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="newPass"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới !",
              },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (validators.space.test(value)) {
                      reject("Không bao gồm khoảng trắng ở đầu !");
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ]}
          >
            <Input.Password size="large" placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="reNewPass"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu mới !",
              },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (validators.space.test(value)) {
                      reject("Không bao gồm khoảng trắng ở đầu !");
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ]}
          >
            <Input.Password size="large" placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal undo */}
      <Modal
        title="Xác nhận hủy đơn hàng"
        open={isModalOpen}
        onOk={handleUndo}
        onCancel={() => setIsModalOpen(false)}
      >
        <p className="text-red-600">
          Đơn hàng sẽ bị hủy và không thể khôi phục
        </p>
      </Modal>
      <FooterLayout />
    </div>
  );
}

export default ProfileUserPage;
