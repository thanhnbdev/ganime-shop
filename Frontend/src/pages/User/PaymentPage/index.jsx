import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import config from "~/config";

import payment from "~/assets/images/payment.svg";

import { useEffect, useState } from "react";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import authoService from "~/services/authoService";

import { Breadcrumb, Button, Input, Modal, message } from "antd";
import { getAllOrder } from "~/app/reducers/order";
import {
  getAllOrderDetail,
  update as updateDetail,
} from "~/app/reducers/orderDetail";

function PaymentPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentUser, setCurrentUser] = useState({});
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [visibleNotice, setVisibleNotice] = useState(false);
  const orders = useSelector((state) => state.order.orders);
  const ordersDetail = useSelector((state) => state.orderDetail.ordersDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sale } = useParams();

  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllOrderDetail());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  function handlePayment() {
    ordersDetail
      .filter((x) => x.orders.selected === true)
      .forEach((x) =>
        dispatch(
          updateDetail({
            ...x,
            status: 2,
            orders: {
              ...x.orders,
              address: address,
              phone: phone,
              selected: false,
              dateEnd: now,
              code: sale,
              status: 2,
            },
          })
        )
      );
    messageApi.success("Xác nhận thanh toán thành công");
    setTimeout(() => {
      setVisibleNotice(true);
    }, 1000);
  }

  function handleBack() {
    navigate("/");
    setVisibleNotice(false);
  }
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
      <div className="bg-slate-100 py-4 px-44">
        <div className="pt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={config.routes.purchase}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Giỏ hàng của tôi
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thanh toán đơn hàng</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="text-center font-bold mt-6">THANH TOÁN ĐƠN HÀNG</div>
        <div className="mt-8 grid grid-cols-3">
          <div className="col-start-1 col-end-3">
            <div className="font-bold pb-4">Thông tin khách hàng</div>
            <div>
              <p>
                Người đặt hàng :{" "}
                <span className="font-bold">{currentUser.fullname}</span>
              </p>
            </div>
            <div className="mt-2">
              <label>Số điện thoại liên hệ</label>
              <Input
                value={phone}
                size="large"
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </div>
            <div className="mt-2">
              <label>Địa chỉ nhận hàng</label>
              <Input.TextArea
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Input.TextArea>
            </div>
            <div className="mt-4">
              <Button
                type="primary"
                className="w-full"
                onClick={() => handlePayment()}
              >
                Thanh toán
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center pl-8">
            <img src={payment} alt="payment" className="w-full" />
          </div>
        </div>
      </div>
      {/* Modal confirm */}
      <Modal
        open={visibleNotice}
        title="Thông báo xác nhận đơn hàng"
        footer={null}
      >
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-green-500">
            Bạn đã điền đủ thông tin thanh toán. Chúng tôi sẽ liên hệ lại với
            bạn sớm để xác nhận về đơn hàng này.
          </h3>
          <p>Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!</p>
          <div className="text-center text-blue-500 underline">
            <Button onClick={() => handleBack()}>Về trang chủ</Button>
          </div>
        </div>
      </Modal>
      <FooterLayout />
    </div>
  );
}

export default PaymentPage;
