import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAllOrder, getOrderById, update } from "~/app/reducers/order";
import {
  getAllOrderDetail,
  update as updateDetail,
} from "~/app/reducers/orderDetail";
import { getAllVoucher } from "~/app/reducers/voucher";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import {
  Breadcrumb,
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  message,
} from "antd";
import moment from "moment";

function PurchasePage() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [flag, setFlag] = useState(false);
  const [saleLocal, setSaleLocal] = useState(0);
  const [voucher, setVoucher] = useState("");
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const orders = useSelector((state) => state.order.orders);
  const ordersDetail = useSelector((state) => state.orderDetail.ordersDetail);
  const order = useSelector((state) => state.order.order);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVoucher());
    dispatch(getAllOrder());
    dispatch(getAllOrderDetail());
    // eslint-disable-next-line
  }, [flag]);

  function showDelete(id) {
    dispatch(getOrderById(id));
    setVisibleDelete(true);
  }

  function handleDelete() {
    setFlag(!flag);
    dispatch(update({ ...order, status: 0 }));
    setVisibleDelete(false);
    messageApi.success("Xóa sản phẩm thành công");
  }

  function handleVoucher() {
    const check = vouchers.find(
      (x) =>
        x.code === voucher &&
        moment().isBefore(x.dateEnd) &&
        moment().isAfter(x.dateStart)
    );
    if (check) {
      setSaleLocal(check.sale);
      dispatch(update({ ...order, code: check.sale }));
      setFlag(!flag);
      messageApi.success("Sử dụng mã thành công");
    } else {
      messageApi.error("Mã khuyến mại không tồn tại");
    }
    setVisibleCode(false);
  }

  function handleCheckbox(order) {
    if (orders.some((x) => x.selected === false)) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    dispatch(update({ ...order, selected: !order.selected }));
  }

  function handleDecreaseQuantity(order) {
    if (order.quantity > 1) {
      const odetail = ordersDetail.find((x) => x.orders.id === order.id);
      dispatch(
        updateDetail({
          ...odetail,
          quantity: order.quantity - 1,
        })
      );
      dispatch(
        update({
          ...order,
          quantity: order.quantity - 1,
        })
      );
    }
  }

  function handleIncreaseQuantity(order) {
    const odetail = ordersDetail.find((x) => x.orders.id === order.id);
    dispatch(
      updateDetail({
        ...odetail,
        quantity: order.quantity + 1,
      })
    );
    dispatch(
      update({
        ...order,
        quantity: order.quantity + 1,
      })
    );
  }

  function handleAllSelect() {
    if (orders.some((x) => x.selected === false)) {
      setIsCheckAll(true);
      window.localStorage.setItem("isCheckAll", true);
      orders.forEach((x) =>
        dispatch(
          update({
            ...x,
            selected: true,
          })
        )
      );
    } else {
      setIsCheckAll(false);
      window.localStorage.setItem("isCheckAll", false);
      orders.forEach((x) =>
        dispatch(
          update({
            ...x,
            selected: false,
          })
        )
      );
    }
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
            <Breadcrumb.Item>Giỏ hàng của tôi</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {orders.filter((x) => x.status === 1).length > 0 ? (
          <div>
            <div className="mt-6">
              <div>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        <Checkbox
                          type="checkbox"
                          checked={
                            window.localStorage.getItem("isCheckAll")
                              ? JSON.parse(
                                  window.localStorage.getItem("isCheckAll")
                                )
                              : false
                          }
                          onChange={() => handleAllSelect()}
                        />
                        <label htmlFor="checkbox-purchase" className="sr-only">
                          checkbox
                        </label>
                      </th>
                      <th scope="col" colSpan={2} className="px-6 py-3">
                        Sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Đơn giá
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thành tiền
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((x) => x.status === 1)
                      .map((x) => (
                        <tr key={x.id} className="bg-white">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Checkbox
                                type="checkbox"
                                checked={x.selected}
                                onChange={() => handleCheckbox(x)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/product-detail/${x.product.id}/${x.product.name}`}
                            >
                              <img
                                src={x.product.image}
                                alt={x.product.name}
                                className="rounded-md"
                                width={50}
                              />
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            {x.product.name.length > 30
                              ? x.product.name.substring(0, 30) + "..."
                              : x.product.name}{" "}
                            - size {x.size}
                          </td>
                          <td className="px-6 py-4">
                            {x.product.price.toLocaleString()}₫
                          </td>
                          <td className="px-6 py-4 grid grid-cols-3 mt-4">
                            <Button
                              shape="round"
                              icon={<FontAwesomeIcon icon={faMinus} />}
                              onClick={() => handleDecreaseQuantity(x)}
                            />
                            <div className="flex justify-center">
                              <Input
                                className="w-14"
                                onChange={(e) => console.log(e.target.value)}
                                value={x.quantity}
                              />
                            </div>
                            <Button
                              shape="round"
                              icon={<FontAwesomeIcon icon={faPlus} />}
                              onClick={() => handleIncreaseQuantity(x)}
                            />
                          </td>
                          <td className="px-6 py-4 text-red-600 font-bold">
                            {(x.product.price * x.quantity).toLocaleString()}₫
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              danger
                              type="primary"
                              onClick={() => showDelete(x.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Modal delete */}
                <Modal
                  open={visibleDelete}
                  onOk={handleDelete}
                  onCancel={() => setVisibleDelete(false)}
                >
                  <div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                      Xác nhận xóa sản phẩm khỏi giỏ hàng ?
                    </h3>
                  </div>
                </Modal>
                {/* Modal voucher */}
                <Modal
                  open={visibleCode}
                  title="Nhập mã giảm giá"
                  onOk={handleVoucher}
                  onCancel={() => setVisibleCode(false)}
                >
                  <div>
                    <label>Mã giảm giá</label>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      placeholder="Chọn mã voucher"
                      size="large"
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
                  </div>
                </Modal>
              </div>
            </div>
            <div className="mt-2 font-bold text-blue-600">
              <span
                className="cursor-pointer"
                onClick={() => setVisibleCode(true)}
              >
                Sử dụng mã voucher {saleLocal ? `(Giảm ${saleLocal}%)` : ""}
              </span>
            </div>
            {saleLocal ? (
              <div className="text-red-600">
                (Đã sử dụng mã voucher giảm{" "}
                {((totalPrice * saleLocal) / 100).toLocaleString()}đ)
              </div>
            ) : (
              ""
            )}
            <div className="mt-6 grid grid-cols-2">
              <div className="col-start-2 col-end-3">
                <span>
                  Tổng thanh toán (
                  {
                    orders.filter((x) => x.selected === true && x.status === 1)
                      .length
                  }{" "}
                  sản phẩm) :{" "}
                  <span className="text-red-600 font-bold">
                    {(
                      totalPrice -
                      (totalPrice * saleLocal) / 100
                    ).toLocaleString()}
                    đ
                  </span>
                </span>
                <Button
                  type="primary"
                  className="w-56 ml-8"
                  onClick={() => navigate(`payment/${saleLocal}`)}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-14 mb-10 text-center">
            <div>Giỏ hàng của bạn đang trống !</div>
            <div className="text-blue-600">
              <Link to={"/"} className="no-underline">
                Đi đến mua hàng ngay !
              </Link>
            </div>
          </div>
        )}
      </div>
      <FooterLayout />
    </div>
  );
}

export default PurchasePage;
