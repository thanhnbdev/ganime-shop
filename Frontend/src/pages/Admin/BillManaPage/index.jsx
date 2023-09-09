import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrderDetail,
  getOrderDetailById,
} from "~/app/reducers/orderDetail";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Input, Modal, Pagination } from "antd";
import { getAllVoucher } from "~/app/reducers/voucher";
import PDFFile from "../../../components/Pdf/PDFFile";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

function OrderManaPage() {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const ordersDetailHistoryAdminBill = useSelector(
    (state) => state.orderDetail.ordersDetailHistoryAdminBill
  );
  const orderDetail = useSelector((state) => state.orderDetail.orderDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderDetail());
    dispatch(getAllVoucher());
    // eslint-disable-next-line
  }, []);

  const arrFilter = ordersDetailHistoryAdminBill.filter(
    (x, i, arr) =>
      arr.findIndex(
        (y) =>
          y.orders.user.id === x.orders.user.id &&
          y.orders.date === x.orders.date
      ) === i
  );

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = arrFilter.slice(itemOffset, endOffset);
  const size = arrFilter.length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % arrFilter.length;
    setItemOffset(newOffset);
  };

  function getListInfo() {
    return ordersDetailHistoryAdminBill.filter(
      (x) =>
        x.orders.date === orderDetail.orders?.date &&
        x.orders.user.id === orderDetail.orders?.user.id
    );
  }

  let totalOrder = 0;
  ordersDetailHistoryAdminBill
    .filter(
      (x) =>
        x.orders.date === orderDetail.orders?.date &&
        x.orders.user.id === orderDetail.orders?.user.id
    )
    .map((x) => (totalOrder += x.orders.product.price * x.quantity));

  function showDetail(id) {
    setVisibleDetail(true);
    dispatch(getOrderDetailById(id));
  }

  return (
    <div className="p-4">
      <div className="font-bold">Trang quản lý hóa đơn</div>
      <div className="grid grid-cols-2 gap-2 py-3">
        <div className="w-full">
          <Input.Search
            onSearch={(value) => setTimeout(() => setValueSearch(value), 1000)}
            size="large"
            allowClear
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th colSpan={2} scope="col" className="px-6 py-3">
                  Khách hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" colSpan={2} className="px-6 py-3 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .reverse()
                .filter((x) =>
                  x.orders.user.fullname
                    .toLowerCase()
                    .includes(valueSearch.toLowerCase())
                )
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={x.orders.user.avatar}
                        alt={x.orders.user.fullname}
                        className="w-12 h-12 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{x.orders.user.fullname}</td>
                    <td className="px-6 py-4">{x.orders.phone}</td>
                    <td className="px-6 py-4">{x.orders.date}</td>
                    <td className="px-6 py-4">{x.orders.address}</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">
                      {x.status === 4 ? "Đã thanh toán" : ""}
                    </td>
                    <td className="px-1 py-4 text-center">
                      <Button
                        type="primary"
                        onClick={() => showDetail(x.id)}
                        icon={<FontAwesomeIcon icon={faEye} />}
                      />
                    </td>
                    <td className="px-1 py-4 text-center">
                      <PDFDownloadLink
                        document={<PDFFile orderDetail={x} />}
                        filename="FORM"
                      >
                        <Button
                          type="primary"
                          danger
                          icon={<FontAwesomeIcon icon={faFileExport} />}
                        />
                      </PDFDownloadLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Modal detail */}
          <Modal
            open={visibleDetail}
            centered
            title="Chi tiết hóa đơn"
            width={"75%"}
            onCancel={() => setVisibleDetail(false)}
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label>Tên khách hàng</label>
                <Input
                  readOnly
                  className="w-full"
                  size="large"
                  value={orderDetail.orders?.user.fullname || ""}
                />
              </div>
              <div>
                <label>Ngày đặt</label>
                <Input
                  readOnly
                  className="w-full"
                  size="large"
                  value={orderDetail.orders?.date || ""}
                />
              </div>
              <div>
                <label>Ngày nhận hàng</label>
                <Input
                  readOnly
                  className="w-full"
                  size="large"
                  value={orderDetail.orders?.dateEnd || ""}
                />
              </div>
              <div>
                <label>Số điện thoại</label>
                <Input
                  readOnly
                  className="w-full"
                  size="large"
                  value={orderDetail.orders?.phone || ""}
                />
              </div>
              <div className="col-start-1 col-end-3">
                <label>Địa chỉ nhận hàng</label>
                <Input.TextArea
                  readOnly
                  className="w-full"
                  size="large"
                  rows={2}
                  value={orderDetail.orders?.address || ""}
                />
              </div>
              <div className="col-start-1 col-end-3 font-bold">
                Danh sách các sản phẩm đã mua
              </div>
              <div className="col-start-1 col-end-3 relative overflow-y-auto h-48">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        Kích cỡ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Màu sắc
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
                        <td className="px-6 py-4">{x.size}</td>
                        <td className="px-6 py-4">{x.color}</td>
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
                  Đã sử dụng voucher giảm giá {orderDetail.orders?.code}%{" "}
                </div>
              ) : (
                <div></div>
              )}
              {orderDetail.fee > 0 && (
                <div className="font-bold text-red-600 col-start-1 col-end-3">
                  Phí vận chuyển : {orderDetail.fee.toLocaleString()}đ
                </div>
              )}
            </div>
          </Modal>
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
    </div>
  );
}

export default OrderManaPage;
