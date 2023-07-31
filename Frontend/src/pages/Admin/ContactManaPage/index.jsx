import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  getAllContact,
  getContactById,
  update,
} from "~/app/reducers/contact";

import { CSVLink } from "react-csv";

import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Pagination, message } from "antd";
import { Field, Form, Formik } from "formik";

function ContactManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const contacts = useSelector((state) => state.contact.contacts);
  const contact = useSelector((state) => state.contact.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContact());
    // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = contacts.slice(itemOffset, endOffset);
  const size = contacts.filter((x) =>
    x.name.toLowerCase().includes(valueSearch)
  ).length;

  // Invoke when contact click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % contacts.length;
    setItemOffset(newOffset);
  };

  function showAdd() {
    setVisibleAdd(true);
  }

  function showDelete(id) {
    setVisibleDelete(true);
    dispatch(getContactById(id));
  }

  function showRestore(id) {
    setVisibleRestore(true);
    dispatch(getContactById(id));
  }

  function showUpdate(id) {
    setVisibleUpdate(true);
    dispatch(getContactById(id));
  }

  function validateForm(values) {
    const errors = {};
    if (values.name.length === 0) {
      errors.name = "Required";
    }
    return errors;
  }

  function handleAdd(values) {
    dispatch(add(values));
    setVisibleAdd(false);
    messageApi.success("Thêm liên hệ thành công");
  }

  function handleDelete() {
    dispatch(update({ ...contact, status: 0 }));
    setVisibleDelete(false);
    messageApi.success("Xóa liên hệ thành công");
  }

  function handleRestore() {
    dispatch(update({ ...contact, status: 1 }));
    setVisibleRestore(false);
    messageApi.success("Khôi phục thành công");
  }

  function handleUpdate(values) {
    dispatch(update(values));
    setVisibleUpdate(false);
    messageApi.success("Cập nhật thành công");
  }

  const dataCsv = [];
  contacts.map((x) =>
    dataCsv.push({
      MaLienHe: x.id,
      KhachHang: x.name,
      Email: x.email,
      SoDienThoai: x.phone,
      DiaChi: x.address,
      TieuDe: x.title,
      NoiDung: x.content,
    })
  );

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý liên hệ</div>
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
                  Tiêu đề
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Nội dung
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
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
                    <td className="px-6 py-4">{x.title}</td>
                    <td className="px-6 py-4">{x.name}</td>
                    <td className="px-6 py-4">{x.email}</td>
                    <td className="px-6 py-4">{x.content}</td>
                    <td className="px-6 py-4">
                      {x.status === 1 ? "Đã phản hồi" : "Chưa phản hồi"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button type="primary" onClick={() => showUpdate(x.id)}>
                        Phản hồi
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
            title="Xác nhận xóa liên hệ"
            onCancel={() => setVisibleDelete(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận xóa liên hệ này ?
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
                Xác nhận khôi phục liên hệ này ?
              </h3>
            </div>
          </Modal>
          {/* Modal update */}
          <Modal
            open={visibleUpdate}
            size="4xl"
            popup={true}
            onClose={() => setVisibleUpdate(false)}
          >
            <Modal.Header>
              <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Cập nhật thông tin
              </div>
            </Modal.Header>
            <Modal.Body>
              <Formik
                enableReinitialize
                initialValues={{
                  ...contact,
                  name: contact.name || "",
                  title: contact.title || "",
                  email: contact.email || "",
                  status: contact.status || "",
                }}
                onSubmit={(values) => handleUpdate(values)}
              >
                {({
                  values,
                  touched,
                  /* and other goodies */
                }) => (
                  <Form>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label>Họ tên</label>
                        <Field
                          type="text"
                          name="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={values.name}
                        />
                      </div>
                      <div>
                        <label>Tiêu đề</label>
                        <Field
                          type="text"
                          name="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={values.title}
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <Field
                          type="text"
                          name="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={values.email}
                        />
                      </div>
                      <div>
                        <label>Trạng thái</label>
                        <Field
                          type="text"
                          name="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={
                            values.status === 1
                              ? "Đã phản hồi"
                              : "Chưa phản hồi"
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="submit"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
          {/* Modal add */}
          <Modal
            open={visibleAdd}
            title="Thêm mới liên hệ"
            okButtonProps={{
              form: "add-form",
              key: "submit",
              htmlType: "submit",
            }}
            onOk={handleAdd}
            onCancel={() => setVisibleAdd(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...contact,
                name: contact.name || "",
                title: contact.title || "",
                content: contact.content || "",
                email: contact.email || "",
                status: 1,
              }}
              onSubmit={(values) => handleAdd(values)}
            >
              {({
                values,
                /* and other goodies */
              }) => (
                <Form id="add-form">
                  <div>
                    <div>
                      <label>Họ tên</label>
                      <Field
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.name}
                      />
                    </div>
                    <div>
                      <label>Tiêu đề</label>
                      <Field
                        type="text"
                        name="title"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.title}
                      />
                    </div>
                    <div>
                      <label>Nội dung</label>
                      <Field
                        type="content"
                        as="textarea"
                        name="content"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.content}
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

export default ContactManaPage;
