import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "~/app/reducers/category";
import {
  add,
  getAllProduct,
  getProductById,
  update,
} from "~/app/reducers/product";

import { CSVLink } from "react-csv";

import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Pagination, message } from "antd";
import { Field, Form, Formik } from "formik";
import { getAllColor } from "../../../app/reducers/color";
import { getAllSize } from "../../../app/reducers/size";

function ProductManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.product.products);
  const sizes = useSelector((state) => state.size.sizes);
  const colors = useSelector((state) => state.color.colors);
  const product = useSelector((state) => state.product.product);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllSize());
    dispatch(getAllColor());
    // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const size = products.filter((x) =>
    x.name.toLowerCase().includes(valueSearch)
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  function showAdd() {
    setVisibleAdd(true);
  }

  function showDetail(id) {
    setVisibleDetail(true);
    dispatch(getProductById(id));
  }

  function showDelete(id) {
    setVisibleDelete(true);
    dispatch(getProductById(id));
  }

  function showRestore(id) {
    setVisibleRestore(true);
    dispatch(getProductById(id));
  }

  function showUpdate(id) {
    setVisibleUpdate(true);
    dispatch(getProductById(id));
  }

  function validateForm(values) {
    const errors = {};
    if (values.name.length === 0) {
      errors.name = "Required";
    }
    return errors;
  }

  function handleAdd(values) {
    dispatch(
      add({
        product: {
          name: values.name,
          image: values.image,
          price: values.price,
          description: values.description,
          brand: values.brand,
          status: values.status,
          sale: values.sale,
          quantity: values.quantity,
          category: categories.find((x) => x.id === Number(values.category)),
        },
        size: values.size,
      })
    );
    setVisibleAdd(false);
    messageApi.success("Thêm sản phẩm thành công");
  }

  function handleDelete() {
    dispatch(update({ ...product, status: 0 }));
    setVisibleDelete(false);
    messageApi.success("Xóa sản phẩm thành công");
  }

  function handleRestore() {
    dispatch(update({ ...product, status: 1 }));
    setVisibleRestore(false);
    messageApi.success("Khôi phục thành công");
  }

  function handleUpdate(values) {
    dispatch(
      update({
        ...values,
        category: categories.find((x) => x.id === Number(values.category)),
        size: product.size,
      })
    );
    setVisibleUpdate(false);
    messageApi.success("Cập nhật thành công");
  }

  function formatListSize(item) {
    const arr = [];
    item?.map((x) => {
      arr.push(x.name);
    });
    return arr.join(", ");
  }

  const dataCsv = [];
  products.map((x) =>
    dataCsv.push({
      MaSanPham: x.id,
      TenSanPham: x.name,
      AnhSanPham: x.image,
      GiaSanPham: x.price,
      MieuTa: x.description,
      ThuongHieu: x.brand,
      KhuyenMai: x.sale,
      SoLuong: x.quantity,
      LoaiSanPham: x.category.name,
      KichCo: formatListSize(x.size),
      MauSac: formatListSize(x.color),
    })
  );

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý sản phẩm</div>
      <div className="grid grid-cols-2 gap-2 py-3">
        <div className="w-full">
          <Input.Search
            onChange={(e) =>
              setTimeout(() => setValueSearch(e.target.value), 1000)
            }
            size="large"
            allowClear
            placeholder="Tìm kiếm..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="primary"
            onClick={() => showAdd()}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            <span className="mx-2">Thêm</span>
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#27ae60" }}
            icon={<FontAwesomeIcon icon={faFileExcel} />}
          >
            <CSVLink data={dataCsv} className="mx-2">
              Export
            </CSVLink>
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Giảm giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" colSpan={3} className="px-6 py-3 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter((x) => x.name.toLowerCase().includes(valueSearch))
                .map((x) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{x.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={x.image}
                        alt={x.name}
                        className="h-12 w-12 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{x.name}</td>
                    <td className="px-6 py-4">{x.price.toLocaleString()}đ</td>
                    <td className="px-6 py-4">
                      {x.sale === 0 ? "Không có" : `${x.sale}%`}
                    </td>
                    <td className="px-6 py-4">
                      {x.status === 1 ? "Còn hàng" : "Hết hàng"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button type="primary" onClick={() => showDetail(x.id)}>
                        Xem chi tiết
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#1abc9c" }}
                        onClick={() => showUpdate(x.id)}
                      >
                        Chỉnh sửa
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {x.status === 1 ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() => showDelete(x.id)}
                        >
                          Xóa
                        </Button>
                      ) : (
                        <Button
                          type="default"
                          danger
                          onClick={() => showRestore(x.id)}
                        >
                          Khôi phục
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Modal detail */}
          <Modal
            open={visibleDetail}
            title="Thông tin chi tiết sản phẩm"
            width={800}
            onCancel={() => setVisibleDetail(false)}
          >
            <div className="grid grid-cols-2">
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  width={300}
                  className="rounded-md"
                />
              </div>
              <div className="mt-6">
                <div>
                  <span className="font-bold">Tên sản phẩm</span> :{" "}
                  {product.name}
                </div>
                <div>
                  <span className="font-bold">Giá</span> :{" "}
                  {product.price?.toLocaleString()}đ
                </div>
                <div>
                  <span className="font-bold">Giảm giá</span> :{" "}
                  {product.sale === 0 ? "Không có" : `${product.sale}%`}
                </div>
                <div>
                  <span className="font-bold">Miêu tả</span> :{" "}
                  {product.description}
                </div>
                <div>
                  <span className="font-bold">Kích cỡ</span> :{" "}
                  {formatListSize(product?.size)}
                </div>
                <div>
                  <span className="font-bold">Màu sắc</span> :{" "}
                  {formatListSize(product?.color)}
                </div>
                <div>
                  <span className="font-bold">Số lượng</span> :{" "}
                  {product.quantity}
                </div>
                <div>
                  <span className="font-bold">Tình trạng</span> :{" "}
                  {product.status === 1 ? "Còn hàng" : "Hết hàng"}
                </div>
                <div>
                  <span className="font-bold">Thương hiệu</span> :{" "}
                  {product.brand}
                </div>
              </div>
            </div>
          </Modal>
          {/* Modal delete */}
          <Modal
            open={visibleDelete}
            title="Xác nhận xóa sản phẩm"
            onOk={handleDelete}
            onCancel={() => setVisibleDelete(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Xác nhận xóa sản phẩm ?
              </h3>
            </div>
          </Modal>
          {/* Modal restore */}
          <Modal
            open={visibleRestore}
            title="Xác nhận khôi phục sản phẩm"
            onOk={handleRestore}
            onCancel={() => setVisibleRestore(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Xác nhận khôi phục sản phẩm này ?
              </h3>
            </div>
          </Modal>
          {/* Modal update */}
          <Modal
            open={visibleUpdate}
            centered
            title="Cập nhật sản phẩm"
            okButtonProps={{
              form: "update-form",
              key: "update-submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleUpdate(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...product,
                name: product.name || "",
                price: product.price || "",
                brand: product.brand || "",
                quantity: product.quantity || 0,
                size: product.size?.name || "",
                category: product.category?.id || "",
                description: product.description || "",
                image: product.image || "",
              }}
              onSubmit={(values) => handleUpdate(values)}
            >
              {({
                values,
                /* and other goodies */
              }) => (
                <Form id="update-form">
                  <div>
                    <div>
                      <label>Ảnh</label>
                      <Field
                        type="text"
                        name="image"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.image}
                      />
                    </div>
                    <div>
                      <label>Tên sản phẩm</label>
                      <Field
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label>Giá sản phẩm</label>
                      <Field
                        type="text"
                        name="price"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.price}
                      />
                    </div>
                    <div>
                      <label>Thương hiệu</label>
                      <Field
                        type="text"
                        name="brand"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.brand}
                      />
                    </div>
                    <div>
                      <label>Số lượng</label>
                      <Field
                        type="text"
                        name="quantity"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.quantity}
                      />
                    </div>
                    <div>
                      <label>Chi tiết</label>
                      <Field
                        type="text"
                        name="description"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.description}
                      />
                    </div>
                    <div>
                      <label>Loại sản phẩm</label>
                      <Field
                        as="select"
                        type="text"
                        name="category"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.category}
                      >
                        {categories.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label>Kích cỡ</label>
                      <div>
                        {product.size?.map((x) => (
                          <span
                            key={x.id}
                            className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded"
                          >
                            {x.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label>Màu sắc</label>
                      <div>
                        {product.color?.map((x) => (
                          <span
                            key={x.id}
                            style={{ backgroundColor: x.descriptions }}
                            className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-white rounded"
                          >
                            {x.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
          {/* Modal add */}
          <Modal
            open={visibleAdd}
            centered
            title="Thêm mới sản phẩm"
            okButtonProps={{
              form: "add-form",
              key: "submit",
              htmlType: "submit",
            }}
            width={800}
            onCancel={() => setVisibleAdd(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...product,
                category: categories[0]?.id,
                name: product.name || "",
                price: product.price || "",
                sale: product.sale || "",
                brand: product.brand || "",
                quantity: product.quantity || "",
                size: sizes[0],
                color: colors[0],
                description: product.description || "",
                image: product.image || "",
                status: 1,
              }}
              onSubmit={(values) => handleAdd(values)}
            >
              {({
                values,
                /* and other goodies */
              }) => (
                <Form id="add-form">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label>Ảnh</label>
                      <Field
                        type="text"
                        name="image"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.image}
                      />
                    </div>
                    <div>
                      <label>Tên sản phẩm</label>
                      <Field
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label>Giá sản phẩm</label>
                      <Field
                        type="text"
                        name="price"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.price}
                      />
                    </div>
                    <div>
                      <label>Giảm giá</label>
                      <Field
                        type="text"
                        name="sale"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.sale}
                      />
                    </div>
                    <div>
                      <label>Số lượng</label>
                      <Field
                        type="text"
                        name="quantity"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.quantity}
                      />
                    </div>
                    <div>
                      <label>Thương hiệu</label>
                      <Field
                        type="text"
                        name="brand"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.brand}
                      />
                    </div>
                    <div>
                      <label>Chi tiết</label>
                      <Field
                        type="text"
                        name="description"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.description}
                      />
                    </div>
                    <div>
                      <label>Kích cỡ</label>
                      <Field
                        as="select"
                        type="text"
                        name="size"
                        defaultValue={values.id}
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.size?.id}
                      >
                        {sizes.map((x) => (
                          <option key={x.id} value={x}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label>Màu sắc</label>
                      <Field
                        as="select"
                        type="text"
                        name="color"
                        defaultValue={values.id}
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.color?.id}
                      >
                        {colors.map((x) => (
                          <option key={x.id} value={x}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label>Loại sản phẩm</label>
                      <Field
                        as="select"
                        type="text"
                        name="category"
                        defaultValue={values.id}
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.category?.id}
                      >
                        {categories.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
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

export default ProductManaPage;
