import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Modal, Pagination, Steps, message } from "antd";
import { update as updateOrder } from "~/app/reducers/order";
import {
  getAllOrderDetail,
  getOrderDetailById,
  update,
} from "~/app/reducers/orderDetail";
import { update as updateProduct } from "~/app/reducers/product";
import { getAllVoucher, update as updateVoucher } from "~/app/reducers/voucher";
import { ExportExcel } from "../../../components/Export/ExportExcel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimeline } from "@fortawesome/free-solid-svg-icons";

function OrderManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleVerify, setVisibleVerify] = useState(false);
  const [visibleStep, setVisibleStep] = useState(false);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const ordersDetailHistoryAdmin = useSelector(
    (state) => state.orderDetail.ordersDetailHistoryAdmin
  );
  const orderDetail = useSelector((state) => state.orderDetail.orderDetail);
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderDetail());
    dispatch(getAllVoucher());
    // eslint-disable-next-line
  }, [flag]);

  const arrFilter = ordersDetailHistoryAdmin.filter(
    (x, i, arr) =>
      arr.findIndex(
        (y) =>
          y.orders.user.id === x.orders.user.id &&
          y.orders.date === x.orders.date &&
          y.orders.status === x.orders.status
      ) === i
  );

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = arrFilter
    .filter((x) =>
      x.orders.user?.fullname.toLowerCase().includes(valueSearch.toLowerCase())
    )
    .slice(itemOffset, endOffset);
  const size = arrFilter.filter((x) =>
    x.orders.user?.fullname.toLowerCase().includes(valueSearch.toLowerCase())
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    setPage(page - 1);
    const newOffset = ((page - 1) * itemsPerPage) % size;
    setItemOffset(newOffset);
  };

  function getListInfo() {
    return ordersDetailHistoryAdmin.filter(
      (x) =>
        x.orders.user.id === orderDetail.orders?.user.id &&
        x.orders.date === orderDetail.orders?.date &&
        x.orders.status === orderDetail.orders?.status
    );
  }

  let totalOrder = 0;
  ordersDetailHistoryAdmin
    .filter(
      (x) =>
        x.orders.user.id === orderDetail.orders?.user.id &&
        x.orders.date === orderDetail.orders?.date &&
        x.orders.status === orderDetail.orders?.status
    )
    .map((x) => (totalOrder += x.orders.product.price * x.quantity));

  function showDetail(id) {
    setVisibleDetail(true);
    dispatch(getOrderDetailById(id));
  }

  function showVerify(id) {
    setVisibleVerify(true);
    dispatch(getOrderDetailById(id));
  }

  function showStep(id) {
    setVisibleStep(true);
    dispatch(getOrderDetailById(id));
  }

  function handleStep() {
    // update quantity product
    getListInfo().forEach((element) => {
      const voucher = vouchers.find((x) => x.id === element.orders.code);
      dispatch(update({ ...element, status: orderDetail.status + 1 }));
      dispatch(
        updateOrder({
          ...element.orders,
          status: orderDetail.status + 1,
        })
      );
      dispatch(
        updateProduct({
          ...element.orders.product,
          quantity: element.orders.product.quantity - element.quantity,
        })
      );
      // update voucher quantity
      if (voucher) {
        dispatch(
          updateVoucher({ ...voucher, quantity: voucher?.quantity - 1 })
        );
      }
    });
    setFlag(!flag);
    messageApi.success(
      `Xác nhận đơn hàng ${
        orderDetail.state === 3 ? "thanh toán" : "giao"
      } thành công`
    );
    setVisibleStep(false);
  }

  function handleVerify() {
    // update quantity product
    getListInfo().forEach((element) => {
      const voucher = vouchers.find((x) => x.id === element.orders.code);
      dispatch(update({ ...element, status: 4, selected: false }));
      dispatch(updateOrder({ ...element.orders, status: 4, selected: false }));
      // update voucher quantity
      if (voucher) {
        dispatch(
          updateVoucher({ ...voucher, quantity: voucher?.quantity - 1 })
        );
      }
    });
    setFlag(!flag);
    messageApi.success("Xác nhận đơn hàng giao thành công");
    setVisibleVerify(false);
  }

  const dataCsv = ordersDetailHistoryAdmin.map((x) => ({
    "Mã đơn hàng": x.id,
    "Khách hàng": x.orders.user.fullname,
    "Sản phẩm": x.orders.product.name,
    "Giá bán": x.orders.product.price,
    "Ngày đặt hàng": x.orders.date,
    "Số lượng": x.quantity,
    "Kích cỡ": x.size,
  }));

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý đơn hàng</div>
      <div className="grid grid-cols-2 gap-2 py-3">
        <div>
          <div className="w-full">
            <Input.Search
              onSearch={(value) =>
                setTimeout(() => setValueSearch(value), 1000)
              }
              size="large"
              allowClear
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <ExportExcel apiData={dataCsv} fileName={"orders"} />
        </div>
      </div>
      <div className="mt-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Khách hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Kích cỡ
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" colSpan={3} className="px-6 py-3 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .reverse()
                .filter((x) =>
                  x.orders.user?.fullname
                    .toLowerCase()
                    .includes(valueSearch.toLowerCase())
                )
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1 + 5 * page}</td>
                    <td className="px-6 py-4">{x.orders.user.fullname}</td>
                    <td className="px-6 py-4">{x.orders?.product.name}</td>
                    <td className="px-6 py-4">{x.size}</td>
                    <td className="px-6 py-4">{x.orders.date}</td>
                    <td className="px-6 py-4">
                      {ordersDetailHistoryAdmin
                        .filter(
                          (y) =>
                            y.orders.user.id === x.orders?.user.id &&
                            y.orders.date === x.orders?.date
                        )
                        .reduce((acc, o) => acc + parseInt(o.quantity), 0)}
                    </td>
                    <td className="px-2 py-4 text-center">
                      <Button
                        type="primary"
                        onClick={() => showDetail(x.id)}
                        icon={<FontAwesomeIcon icon={faEye} />}
                      />
                    </td>
                    {x.status !== 5 && (
                      <td className="px-2 py-4 text-center">
                        <Button
                          type="primary"
                          danger
                          onClick={() => showVerify(x.id)}
                          icon={<FontAwesomeIcon icon={faCheck} />}
                        />
                      </td>
                    )}
                    <td className="px-2 py-4 text-center">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#22a6b3" }}
                        onClick={() => showStep(x.id)}
                        icon={<FontAwesomeIcon icon={faTimeline} />}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Modal detail */}
          <Modal
            open={visibleDetail}
            centered
            width={"80%"}
            title="Thông tin chi tiết đơn hàng"
            okText="Xác thực"
            cancelText="Đóng"
            onOk={() => showVerify(orderDetail.id)}
            onCancel={() => setVisibleDetail(false)}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>Tên khách hàng</label>
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  value={orderDetail.orders?.user.fullname || ""}
                />
              </div>
              <div>
                <label>Ngày đặt</label>
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  value={orderDetail.orders?.date || ""}
                />
              </div>
              <div>
                <label>Ngày nhận hàng</label>
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  value={orderDetail.orders?.dateEnd || ""}
                />
              </div>
              <div>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  value={orderDetail.orders?.phone || ""}
                />
              </div>
              <div className="col-start-1 col-end-3">
                <label>Địa chỉ nhận hàng</label>
                <textarea
                  type="text"
                  readOnly
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  value={orderDetail.orders?.address || ""}
                />
              </div>
              <div className="col-start-1 col-end-3 font-bold">
                Danh sách các sản phẩm đã mua
              </div>
              <div className="col-start-1 col-end-3 relative overflow-y-auto h-48 shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th colSpan={2} scope="col" className="px-6 py-3">
                        Tên sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giá
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Loại sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListInfo().map((x) => (
                      <tr
                        key={x.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{x.id}</td>
                        <td className="px-6 py-4">
                          <img
                            src={x.orders.product.image}
                            alt={x.orders.product.name}
                            className="h-12 w-12 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4">{x.orders.product.name}</td>
                        <td className="px-6 py-4">
                          {x.orders.product.price.toLocaleString()}đ
                        </td>
                        <td className="px-6 py-4">{x.quantity}</td>
                        <td className="px-6 py-4">
                          {x.orders.product.category.name}
                        </td>
                        <td className="px-6 py-4">
                          {(
                            x.orders.product.price * x.quantity
                          ).toLocaleString()}
                          đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-start-1 col-end-3 text-blue-600 font-bold">
                Tổng tiền thanh toán :{" "}
                {orderDetail.orders?.code > 0 ? (
                  <span>
                    <strike className="mx-2 text-gray-400">
                      {totalOrder.toLocaleString()}đ
                    </strike>
                    {(
                      totalOrder -
                      (totalOrder * orderDetail.orders?.code) / 100
                    ).toLocaleString()}
                    đ
                  </span>
                ) : (
                  <span>{totalOrder.toLocaleString()}đ</span>
                )}
              </div>
              {orderDetail.orders?.code > 0 ? (
                <div className="mt-3 text-red-600 font-bold">
                  Đã sử dụng voucher giảm giá {orderDetail.orders?.code}%
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Modal>
          {/* Modal Verify */}
          <Modal
            open={visibleVerify}
            title="Xác thực đơn hàng"
            okText="Xác thực"
            onOk={handleVerify}
            onCancel={() => setVisibleVerify(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Xác nhận đơn hàng thanh toán thành công ?
              </h3>
            </div>
          </Modal>
          {/* Modal Step */}
          <Modal
            open={visibleStep}
            width={"80%"}
            title="Trạng thái đơn hàng"
            okText={`${
              orderDetail.status === 5 ? "Đơn hàng đã bị hủy" : "Bước tiếp theo"
            }`}
            okButtonProps={{
              style: {
                backgroundColor: orderDetail.status === 5 ? "red" : "",
                display: orderDetail.status >= 4 ? "none" : "inline-block",
              },
            }}
            onOk={handleStep}
            onCancel={() => setVisibleStep(false)}
          >
            <div className="my-8">
              <Steps
                type="navigation"
                percent={60}
                current={orderDetail.status}
                onChange={(value) => console.log(value)}
                items={[
                  {
                    title: "Đặt đơn hàng",
                    status: `${orderDetail.status === 5 ? "error" : ""}`,
                    description: orderDetail.orders?.date,
                  },
                  {
                    title: "Xác nhận đơn hàng",
                    status: `${orderDetail.status === 5 ? "error" : ""}`,
                  },
                  {
                    title: "Thanh toán",
                    status: `${orderDetail.status === 5 ? "error" : ""}`,
                  },
                  {
                    title: "Giao hàng",
                    status: `${orderDetail.status === 5 ? "error" : ""}`,
                    description: orderDetail.orders?.date,
                  },
                ]}
              />
            </div>
          </Modal>
        </div>
      </div>
      <div className="flex justify-center items-center mt-3">
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
  );
}

export default OrderManaPage;
