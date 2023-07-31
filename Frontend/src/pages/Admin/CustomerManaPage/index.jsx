import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRole } from "~/app/reducers/role";
import { add, getAllUser, getUserById, update } from "~/app/reducers/user";

import { CSVLink } from "react-csv";

import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Pagination, message } from "antd";
import { Field, Form, Formik } from "formik";

function CustomerManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [flag, setFlag] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const users = useSelector((state) => state.user.users);
  const roles = useSelector((state) => state.role.roles);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllRole());
    // eslint-disable-next-line
  }, [flag]);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users
    .filter((x) => x.role?.some((x) => x.name === "KHÁCH HÀNG"))
    .slice(itemOffset, endOffset);
  const size = users.filter((x) =>
    x.role?.some((x) => x.name === "KHÁCH HÀNG")
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) %
      users.filter((x) => x.role?.some((x) => x.name === "KHÁCH HÀNG")).length;
    setItemOffset(newOffset);
  };

  function showAdd() {
    setVisibleAdd(true);
  }

  function showDelete(id) {
    setVisibleDelete(true);
    dispatch(getUserById(id));
  }

  function showRestore(id) {
    setVisibleRestore(true);
    dispatch(getUserById(id));
  }

  function showUpdate(id) {
    setVisibleUpdate(true);
    dispatch(getUserById(id));
  }

  function handleAdd(values) {
    dispatch(
      add({
        ...values,
        role: [roles[2]],
      })
    );
    messageApi.success("Thêm khách hàng thành công");
    setVisibleAdd(false);
  }

  function handleDelete() {
    dispatch(update({ ...user, status: 0 }));
    messageApi.success("Xóa khách hàng thành công");
    setVisibleDelete(false);
  }

  function handleRestore() {
    dispatch(update({ ...user, status: 1 }));
    messageApi.success("Khôi phục thành công");
    setVisibleRestore(false);
  }

  function handleUpdate(values) {
    dispatch(update(values));
    messageApi.success("Cập nhật thành công");
    setVisibleUpdate(false);
  }

  const dataCsv = [];
  users
    .filter((x) => x.role?.some((x) => x.name === "KHÁCH HÀNG"))
    .map((x) =>
      dataCsv.push({
        MaNhanVien: x.id,
        HoTen: x.fullname,
        TenDangNhap: x.username,
        Email: x.email,
        TrangThai: x.status === 0 ? "Không hoạt động" : "Hoạt động",
      })
    );

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý khách hàng</div>
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
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên đăng nhập
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
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
                .filter((x) => x.fullname.toLowerCase().includes(valueSearch))
                .map((x) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{x.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={x.avatar}
                        alt={x.fullname}
                        className="w-12 h-12 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{x.fullname}</td>
                    <td className="px-6 py-4">{x.username}</td>
                    <td className="px-6 py-4">{x.email}</td>
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
            title="Xác nhận xóa khách hàng"
            onOk={handleDelete}
            onCancel={() => setVisibleDelete(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận xóa khách hàng này ?
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
                Xác nhận khôi phục khách hàng này ?
              </h3>
            </div>
          </Modal>
          {/* Modal update */}
          <Modal
            open={visibleUpdate}
            okButtonProps={{
              form: "update-form",
              key: "update-submit",
              htmlType: "submit",
            }}
            title="Cập nhật thông tin khách hàng"
            onCancel={() => setVisibleUpdate(false)}
          >
            <Formik
              enableReinitialize
              initialValues={{
                ...user,
                fullname: user.fullname || "",
                avatar: user.avatar || "",
                username: user.username || "",
                email: user.email || "",
                status: user.status || "",
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
                      <label>Họ tên</label>
                      <Field
                        type="text"
                        name="fullname"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.fullname}
                      />
                    </div>
                    <div>
                      <label>Ảnh đại diện</label>
                      <Field
                        type="text"
                        name="avatar"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.avatar}
                      />
                    </div>
                    <div>
                      <label>Tên đăng nhập</label>
                      <Field
                        type="text"
                        name="username"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.username}
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
                    <div>
                      <label>Trạng thái</label>
                      <Field
                        type="text"
                        name="status"
                        disabled
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={
                          values.status === 1 ? "Hoạt động" : "Không hoạt động"
                        }
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
            title="Thêm mới khách hàng"
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
                ...user,
                fullname: user.fullname || "",
                avatar: user.avatar || "",
                username: user.username || "",
                password: user.password || "",
                email: user.email || "",
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
                        name="fullname"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.fullname}
                      />
                    </div>
                    <div>
                      <label>Ảnh đại diện</label>
                      <Field
                        type="text"
                        name="avatar"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.avatar}
                      />
                    </div>
                    <div>
                      <label>Tên đăng nhập</label>
                      <Field
                        type="text"
                        name="username"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.username}
                      />
                    </div>
                    <div>
                      <label>Mật khẩu</label>
                      <Field
                        type="password"
                        name="password"
                        className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                        value={values.password}
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

export default CustomerManaPage;
