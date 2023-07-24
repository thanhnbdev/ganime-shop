import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  getAllCategory,
  getCategoryById,
  update,
} from "~/app/reducers/category";

import { CSVLink } from "react-csv";

import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Pagination, message } from "antd";
import { Field, Form, Formik } from "formik";

function CategoryManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const categories = useSelector((state) => state.category.categories);
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const size = categories.filter((x) =>
    x.name.toLowerCase().includes(valueSearch)
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
  };

  function showAdd() {
    setVisibleAdd(true);
  }

  function showDelete(id) {
    setVisibleDelete(true);
    dispatch(getCategoryById(id));
  }

  function showRestore(id) {
    setVisibleRestore(true);
    dispatch(getCategoryById(id));
  }

  function showUpdate(id) {
    setVisibleUpdate(true);
    dispatch(getCategoryById(id));
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
        ...values,
        category: categories.find((x) => x.id === Number(values.category)),
      })
    );
    setVisibleAdd(false);
    messageApi.success("Thêm loại sản phẩm thành công");
  }

  function handleDelete() {
    dispatch(update({ ...category, status: 0 }));
    setVisibleDelete(false);
    messageApi.success("Xóa loại sản phẩm thành công");
  }

  function handleRestore() {
    dispatch(update({ ...category, status: 1 }));
    setVisibleRestore(false);
    messageApi.success("Khôi phục thành công");
  }

  function handleUpdate(values) {
    dispatch(update(values));
    setVisibleUpdate(false);
    messageApi.success("Cập nhật thành công");
  }

  const dataCsv = [];
  categories.map((x) =>
    dataCsv.push({
      MaLoaiSanPham: x.id,
      TenLoaiSanPham: x.name,
      MieuTa: x.description,
    })
  );

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý loại sản phẩm</div>
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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên loại sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Miêu tả
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" colSpan={2} className="px-6 py-3 text-center">
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
                    <td className="px-6 py-4">{x.name}</td>
                    <td className="px-6 py-4">{x.description}</td>
                    <td className="px-6 py-4">
                      {x.status === 1 ? "Hoạt động" : "Không hoạt động"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button type="primary" onClick={() => showUpdate(x.id)}>
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
          {/* Modal delete */}
          <Modal
            open={visibleDelete}
            onOk={handleDelete}
            onCancel={() => setVisibleDelete(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận xóa loại sản phẩm ?
              </h3>
            </div>
          </Modal>
          {/* Modal restore */}
          <Modal
            open={visibleRestore}
            onOk={handleRestore}
            onCancel={() => setVisibleRestore(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận khôi phục loại sản phẩm này ?
              </h3>
            </div>
          </Modal>
          {/* Modal update */}
          <Modal
            open={visibleUpdate}
            title="Cập nhật loại sản phẩm"
            okButtonProps={{
              form: "update-form",
              key: "submit",
              htmlType: "submit",
            }}
            okText="Cập nhật"
            onCancel={() => setVisibleUpdate(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...category,
                name: category.name || "",
                description: category.description || "",
              }}
              onSubmit={(values) => handleUpdate(values)}
            >
              {({
                values,
                touched,
                /* and other goodies */
              }) => (
                <Form id="update-form">
                  <div>
                    <div>
                      <label>Tên loại sản phẩm</label>
                      <Field
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label>Chi tiết</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="description"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.description}
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
          {/* Modal add */}
          <Modal
            open={visibleAdd}
            title="Thêm mới loại sản phẩm"
            okButtonProps={{
              form: "add-form",
              key: "submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleAdd(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...category,
                name: category.name || "",
                description: category.description || "",
                status: 1,
              }}
              onSubmit={(values) => handleAdd(values)}
            >
              {({
                values,
                touched,
                /* and other goodies */
              }) => (
                <Form id="add-form">
                  <div>
                    <div>
                      <label>Tên loại sản phẩm</label>
                      <Field
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label>Chi tiết</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="description"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.description}
                      />
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

export default CategoryManaPage;
