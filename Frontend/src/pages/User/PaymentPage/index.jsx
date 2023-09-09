import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "~/config";
import payment from "~/assets/images/payment.svg";
import { useEffect, useState } from "react";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import authoService from "~/services/authoService";
import { Breadcrumb, Button, Form, Input, Modal, Select, message } from "antd";
import {
  getAllOrderDetail,
  update as updateDetail,
} from "~/app/reducers/orderDetail";
import validators from "../../../services/validators";
import axios from "axios";

function PaymentPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentUser, setCurrentUser] = useState({});
  const [visibleNotice, setVisibleNotice] = useState(false);
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [fee, setFee] = useState(-1);
  const [delivery, setDelivery] = useState(true);
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
    axios
      .get("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getAllOrderDetail());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);
  async function callTrans() {
    await axios
      .create({
        headers: {
          "Content-Type": "application/json",
          Token: "459a70408be32f213a2db11dcd9be6ba03819d4b",
        },
      })
      .post("https://services.giaohangtietkiem.vn/services/shipment/fee", {
        pick_province: "Thành phố Hà Nội", // for shop
        pick_district: "Quận Cầu Giấy", // for shop
        province: "Thành phố Hà Nội",
        district: district,
        address: "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
        weight: 100,
        value: 0,
        transport: "road",
        deliver_option: "xteam",
        tags: [1, 7],
      })
      .then((response) => {
        if (response?.data.success) {
          setDelivery(response?.data.fee?.delivery);
          setFee(response?.data.fee?.ship_fee_only);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  callTrans();

  function handlePayment(values) {
    ordersDetail
      .filter((x) => x.orders.selected === true)
      .forEach((x) =>
        dispatch(
          updateDetail({
            ...x,
            status: 3,
            fee: fee,
            orders: {
              ...x.orders,
              address: values.address,
              phone: values.phone,
              selected: false,
              dateEnd: now,
              code: sale,
              status: 3,
            },
          })
        )
      );
    messageApi.success("Xác nhận đơn hàng thành công");
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
            <Form
              name="normal_payment"
              className="payment-form"
              initialValues={{
                remember: true,
              }}
              fields={[
                {
                  name: ["phone"],
                  value: currentUser.phone,
                },
              ]}
              onFinish={handlePayment}
            >
              <Form.Item
                label="Số điện thoại liên hệ"
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
                          reject("Nhập sai định dạng số điện thoại !");
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
                label="Chọn tỉnh"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="province"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tỉnh thành !",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="Chọn tỉnh thành"
                  size="large"
                  options={provinces.map((x) => ({
                    value: x.code,
                    label: x.name,
                  }))}
                  onChange={(value) =>
                    setDistricts(
                      provinces.find((x) => x.code === value)?.districts
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                label="Chọn quận huyện"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quận huyện !",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="Chọn quận huyện"
                  size="large"
                  options={districts.map((x) => ({
                    value: x.name,
                    label: x.name,
                  }))}
                  onChange={(value) => setDistrict(value)}
                />
              </Form.Item>
              <Form.Item
                label="Địa chỉ nhận hàng"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="address"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ nhận hàng !",
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
                <Input.TextArea size="large" placeholder="Địa chỉ nhận hàng" />
              </Form.Item>
              {fee >= 0 && delivery && (
                <div className="col-start-1 col-end-4">
                  <div>Phí vận chuyển : {fee?.toLocaleString()}đ</div>
                  <div className="text-red-400 italic">
                    *(Đơn vị điều phối và xử lý vận chuyển : Giao hàng tiết
                    kiệm)
                  </div>
                </div>
              )}
              {!delivery && (
                <div className="col-start-1 col-end-4 text-red-600">
                  Không hỗ trợ dịch vụ vận chuyển tại khu vực này
                </div>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Xác nhận đơn hàng
                </Button>
              </Form.Item>
            </Form>
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
