import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, update as updateProduct } from "~/app/reducers/product";
import { getAllProductSize } from "~/app/reducers/productSize";
import { getAllProductColor } from "~/app/reducers/productColor";
import { getAllOrderDetail, deleteById } from "~/app/reducers/orderDetail";
import { getAllUser } from "~/app/reducers/user";
import { getAllVoucher } from "~/app/reducers/voucher";
import http from "~/services/apiService";
import { getAllColor } from "~/app/reducers/color";
import { getAllSize } from "~/app/reducers/size";
import img from "~/assets/images/at-store.svg";
import validators from "~/services/validators";
import axios from "axios";
import moment from "moment";
import { prefix } from "@fortawesome/free-brands-svg-icons";

function AtStorePage() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const products = useSelector((state) => state.product.products);
  const productSizes = useSelector((state) => state.productSize.productSizes);
  const productColors = useSelector(
    (state) => state.productColor.productColors
  );
  const ordersDetailHistoryAdmin = useSelector(
    (state) => state.orderDetail.ordersDetailHistoryAdmin
  );
  const users = useSelector((state) => state.user.users);
  const [user, setUser] = useState({});
  const [voucher, setVoucher] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [idProduct, setIdProduct] = useState([]);
  const [listResult, setListResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowOrder, setIsShowOrder] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [check, setCheck] = useState(false);
  const [ship, setShip] = useState(false);
  const [list, setList] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [fee, setFee] = useState(-1);
  const [delivery, setDelivery] = useState(true);
  const [money, setMoney] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllSize());
    dispatch(getAllColor());
    dispatch(getAllUser());
    dispatch(getAllOrderDetail());
    dispatch(getAllVoucher());
    dispatch(getAllProductSize());
    dispatch(getAllProductColor());
    setList(
      idProduct
        .sort((a, b) => a - b)
        .map((x) => ({
          quantity: list.find((z) => z.product?.id === x)?.quantity || 1,
          product: products.find((y) => y.id === x),
          size: products.find((y) => y.id === x).size?.[0]?.name || "Hết size",
          color:
            products.find((y) => y.id === x).color?.[0]?.name || "Hết color",
        }))
    );
    axios
      .get("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idProduct, listResult]);

  const totalPrice = list.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 50,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: 120,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 100,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      width: 100,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      width: 200,
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      width: 200,
    },
  ];
  const columns2 = [
    {
      title: "STT",
      dataIndex: "index",
      width: 50,
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
    },
    {
      title: "Ngày tạo hóa đơn",
      dataIndex: "date",
    },
    {
      title: "Số loại sản phẩm",
      dataIndex: "quantity",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
    },
  ];

  const data2 = ordersDetailHistoryAdmin
    .filter(
      (x, i, arr) =>
        arr.findIndex(
          (y) =>
            y.orders.user.id === x.orders.user.id &&
            y.orders.date === x.orders.date &&
            y.status === 6 &&
            y.orders.user.fullname.toLowerCase().includes(valueSearch)
        ) === i
    )
    .map((x, index) => ({
      key: index,
      index: index + 1,
      name: x.orders.user.fullname,
      phone: x.orders.user.phone,
      date: x.orders.date,
      quantity: ordersDetailHistoryAdmin.filter(
        (y) =>
          y.orders.user.id === x.orders?.user.id &&
          y.orders.date === x.orders?.date &&
          y.orders.status === x.orders?.status
      ).length,
      actions: (
        <Button
          type="primary"
          style={{ backgroundColor: "#00a8ff" }}
          className="w-full"
          onClick={() => {
            setListResult(
              ordersDetailHistoryAdmin.filter(
                (y) =>
                  y.orders.user.id === x.orders?.user.id &&
                  y.orders.date === x.orders?.date &&
                  y.orders.status === x.orders?.status
              )
            );
            setIdProduct(
              ordersDetailHistoryAdmin
                .filter(
                  (y) =>
                    y.orders.user.id === x.orders?.user.id &&
                    y.orders.date === x.orders?.date &&
                    y.orders.status === x.orders?.status
                )
                .map((x) => x.orders.product.id)
            );
            form.setFieldsValue({
              product: ordersDetailHistoryAdmin
                .filter(
                  (y) =>
                    y.orders.user.id === x.orders?.user.id &&
                    y.orders.date === x.orders?.date &&
                    y.orders.status === x.orders?.status
                )
                .map((x) => x.orders.product.id),
              phone: ordersDetailHistoryAdmin.filter(
                (y) =>
                  y.orders.user.id === x.orders?.user.id &&
                  y.orders.date === x.orders?.date &&
                  y.orders.status === x.orders?.status
              )[0]?.orders.user.phone,
              address: ordersDetailHistoryAdmin.filter(
                (y) =>
                  y.orders.user.id === x.orders?.user.id &&
                  y.orders.date === x.orders?.date &&
                  y.orders.status === x.orders?.status
              )[0]?.orders.address,
              user: ordersDetailHistoryAdmin.filter(
                (y) =>
                  y.orders.user.id === x.orders?.user.id &&
                  y.orders.date === x.orders?.date &&
                  y.orders.status === x.orders?.status
              )[0]?.orders.user.id,
            });
            setIsShowOrder(false);
          }}
        >
          Tiếp tục
        </Button>
      ),
    }));
  axios
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
      value: totalPrice,
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

  const data = idProduct.map((x, index) => ({
    key: index,
    index: index + 1,
    name: (
      <div className="flex items-center gap-x-2">
        <img
          src={products.find((y) => y.id === x)?.image}
          alt={products.find((y) => y.id === x)?.name}
          className="w-12 h-12 rounded-md"
        />
        {products.find((y) => y.id === x)?.name}
      </div>
    ),
    price: `${products.find((y) => y.id === x)?.price.toLocaleString()}
    đ`,
    quantity: (
      <InputNumber
        min={1}
        max={products.find((y) => y.id === x)?.quantity}
        defaultValue={1}
        onChange={(value) =>
          setList([
            ...list.filter((z) => z.product?.id !== x),
            {
              product: products.find((y) => y.id === x),
              color: list.find((z) => z.product?.id === x)?.color,
              size: list.find((z) => z.product?.id === x)?.size,
              quantity: value,
            },
          ])
        }
      />
    ),
    size: (
      <Select
        className="w-full"
        size="large"
        options={products
          .find((y) => y.id === x)
          ?.size.map((x) => ({
            label: x.name,
            value: x.name,
          }))}
        defaultValue={
          products.find((y) => y.id === x)?.size?.[0]?.name || "Hết size"
        }
        onChange={(value) =>
          setList([
            ...list.filter((z) => z.product?.id !== x),
            {
              product: products.find((y) => y.id === x),
              quantity: list.find((z) => z.product?.id === x)?.quantity,
              color: list.find((z) => z.product?.id === x)?.color,
              size: value,
            },
          ])
        }
      />
    ),
    color: (
      <Select
        className="w-full"
        size="large"
        options={products
          .find((y) => y.id === x)
          ?.color.map((x) => ({
            label: x.name,
            value: x.name,
          }))}
        defaultValue={
          products.find((y) => y.id === x)?.color?.[0]?.name || "Hết color"
        }
        onChange={(value) =>
          setList([
            ...list.filter((z) => z.product?.id !== x),
            {
              product: products.find((y) => y.id === x),
              quantity: list.find((z) => z.product?.id === x)?.quantity,
              size: list.find((z) => z.product?.id === x)?.size,
              color: value,
            },
          ])
        }
      />
    ),
    actions: (
      <Button
        type="primary"
        onClick={() => {
          setIdProduct([...idProduct, x]);
          console.log([...idProduct, x]);
          setList([
            ...list,
            {
              quantity: 1,
              product: products.find((y) => y.id === x),
              size: products.find((y) => y.id === x)?.color?.[0]?.name,
              color: products.find((y) => y.id === x)?.size?.[0]?.name,
            },
          ]);
        }}
      >
        Thêm
      </Button>
    ),
  }));

  function onFinish(value) {
    console.log(value);
    console.log(list);
    http
      .httpPost("order-detail/at-store", {
        check: check,
        user: check
          ? users.find((x) => x.id === value.user)?.id
          : value.fullname,
        atStore: list,
        phone: value.phone,
        address: value.address,
        sale: vouchers.find((x) => x.code === voucher)?.sale,
        fee: fee,
        status: isPending ? 6 : 4,
      })
      .then((res) => {
        if (res) {
          // delete order template
          if (listResult.length > 0) {
            listResult.forEach((x) => dispatch(deleteById(x.id)));
          }
          // update product quantity
          list.forEach((x) => {
            dispatch(
              updateProduct({
                ...x.product,
                quantity: x.product?.quantity - x.quantity,
              })
            );
          });
          setList([]);
          setFee(0);
          form.resetFields();
          setMoney(0);
          setIsModalOpen(false);
          setIdProduct([]);
          messageApi.success(
            `${
              isPending
                ? "Hóa đơn đã được treo thành công !"
                : "Mua hàng thành công !"
            }`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-2">
        <div className="col-start-3 flex justify-end gap-x-2">
          <Checkbox onChange={(e) => setShip(e.target.checked)}>
            Vận chuyển
          </Checkbox>
          <Checkbox onChange={(e) => setCheck(e.target.checked)}>
            Khách hàng cũ
          </Checkbox>
          <Button
            type="primary"
            style={{ backgroundColor: "#22a6b3" }}
            onClick={() => setIsShowOrder(true)}
          >
            Hóa đơn đang treo
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <Form
          form={form}
          fields={[
            {
              name: ["fullname"],
              value: listResult[0]?.orders.user.fullname,
            },
          ]}
          id="buy-form"
          onFinish={onFinish}
          className="grid grid-cols-3 gap-x-3"
        >
          {check ? (
            <Form.Item
              label="Chọn khách hàng"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="user"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng !",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  setUser(value);
                  form.setFieldsValue({
                    phone: users.find((x) => x.id === value).phone,
                  });
                }}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                size="large"
                options={users.map((x) => ({
                  value: x.id,
                  label: `${x.fullname} - ${x.phone}`,
                }))}
              />
            </Form.Item>
          ) : (
            <Form.Item
              label="Tên khách hàng"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng !",
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
              <Input placeholder="Tên khách hàng" size="large" />
            </Form.Item>
          )}
          <Form.Item
            label="Số điện thoại"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="phone"
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
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="product"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sản phẩm !",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              maxTagCount={"responsive"}
              className="w-full"
              size="large"
              options={products
                .filter(
                  (x) =>
                    x.quantity > 0 && x.size.length > 0 && x.color.length > 0
                )
                .map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
              onChange={(value) => setIdProduct(value)}
            />
          </Form.Item>
          {ship && (
            <>
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
            </>
          )}
          <Form.Item
            label="Ghi chú địa chỉ"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="address"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung !",
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
            <Input.TextArea size="large" />
          </Form.Item>
          <div className="col-start-1 col-end-4 mb-6">
            <Table columns={columns} dataSource={data} size="middle" />
            {totalPrice > 0 && (
              <div className="text-lg font-bold mt-4">
                Tổng tiền :{" "}
                <span className="text-red-500">
                  {(
                    (fee >= 0 ? totalPrice + fee : totalPrice) *
                    (voucher?.length > 0
                      ? (100 - vouchers.find((x) => x.code === voucher)?.sale) /
                        100
                      : 1)
                  ).toLocaleString()}
                  đ
                </span>
              </div>
            )}
          </div>
          <Form.Item
            label="Tiền khách đưa"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="money"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tiền khách đưa !",
              },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (!validators.positiveIntNum.test(value)) {
                      reject("Số không thỏa mãn !");
                    } else {
                      resolve();
                    }
                  });
                },
              },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (
                      value -
                        (money -
                          (fee >= 0 ? totalPrice + fee : totalPrice) *
                            (voucher?.length > 0
                              ? (100 -
                                  vouchers.find((x) => x.code === voucher)
                                    ?.sale) /
                                100
                              : 1)) <
                      0
                    ) {
                      reject("Số tiền không đủ !");
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ]}
          >
            <InputNumber
              min={0}
              size="large"
              className="w-full"
              onChange={(value) => setMoney(value)}
            />
          </Form.Item>
          <Form.Item
            label="Voucher giảm giá"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              placeholder="Chọn mã voucher"
              size="large"
              allowClear
              options={vouchers
                .filter(
                  (x) =>
                    moment().isBefore(x.dateEnd) &&
                    moment().isAfter(x.dateStart)
                )
                .map((x) => ({
                  value: x.code,
                  label: `${x.code} - Giảm ${x.sale}%`,
                }))}
              className="w-full"
              onChange={(value) => setVoucher(value)}
            />
          </Form.Item>
          {voucher?.length > 0 && (
            <div className="text-red-500 font-bold col-start-1">
              Giảm giá {vouchers.find((x) => x.code === voucher)?.sale}%
            </div>
          )}
          {money > 0 && (
            <div className="col-start-1">
              Tiền trả lại :{" "}
              {(
                money -
                (fee >= 0 ? totalPrice + fee : totalPrice) *
                  (voucher?.length > 0
                    ? (100 - vouchers.find((x) => x.code === voucher)?.sale) /
                      100
                    : 1)
              )?.toLocaleString()}
              đ
            </div>
          )}
          {fee >= 0 && delivery && ship && (
            <div className="col-start-1 col-end-4">
              <div>Tiền hàng : {totalPrice?.toLocaleString()}đ</div>
              <div>Phí vận chuyển : {fee?.toLocaleString()}đ</div>
              <div className="text-red-400 italic">
                *(Đơn vị điều phối và xử lý vận chuyển : Giao hàng tiết kiệm)
              </div>
            </div>
          )}
          {!delivery && (
            <div className="col-start-1 col-end-4 text-red-600">
              Không hỗ trợ dịch vụ vận chuyển tại khu vực này
            </div>
          )}
          {money -
            (fee >= 0 ? totalPrice + fee : totalPrice) *
              (voucher?.length > 0
                ? (100 - vouchers.find((x) => x.code === voucher)?.sale) / 100
                : 1) >=
            0 &&
            idProduct.length > 0 && (
              <>
                <Form.Item className="col-start-1 mt-6">
                  <Button
                    type="primary"
                    className="w-full"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsPending(false);
                    }}
                  >
                    MUA NGAY
                  </Button>
                </Form.Item>
                <Form.Item className="mt-6">
                  <Button
                    type="primary"
                    className="w-full"
                    style={{ backgroundColor: "#f0932b" }}
                    form="buy-form"
                    htmlType="submit"
                    onClick={() => setIsPending(true)}
                  >
                    TREO HÓA ĐƠN
                  </Button>
                </Form.Item>
              </>
            )}
        </Form>
        {/* Modal order */}
        <Modal
          title="Danh sách hóa đơn đang treo"
          open={isShowOrder}
          // onOk={handleOk}
          width={"75%"}
          footer={null}
          onCancel={() => setIsShowOrder(false)}
        >
          <Input.Search
            onSearch={(value) => setTimeout(() => setValueSearch(value), 1000)}
            size="large"
            allowClear
            placeholder="Tìm kiếm theo tên khách hàng..."
          />
          <Table
            columns={columns2}
            dataSource={data2}
            size="middle"
            className="mt-4"
          />
        </Modal>
        {/* Modal confirm */}
        <Modal
          title="Xác nhận thanh toán tại quầy"
          open={isModalOpen}
          footer={null}
          width={600}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="text-lg">
            Xác nhận thanh toán đơn hàng này tại quầy với giá{" "}
            <span className="text-red-600 font-bold">
              {(fee >= 0 ? totalPrice + fee : totalPrice).toLocaleString()}đ
            </span>
          </div>
          <Button
            type="primary"
            className="w-full mt-4"
            htmlType="submit"
            danger
            form="buy-form"
          >
            XÁC NHẬN THANH TOÁN
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default AtStorePage;
