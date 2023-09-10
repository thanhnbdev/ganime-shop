import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, getAllUser, getUserById, update } from "~/app/reducers/user";

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Pagination, message } from "antd";
import { ExportExcel } from "../../../components/Export/ExportExcel";
import validators from "../../../services/validators";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function PersonnelManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [flag, setFlag] = useState(false);
  const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllUser());
    // eslint-disable-next-line
  }, [flag]);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users
    .filter((x) => x.role?.some((x) => x.name === "NHÂN VIÊN"))
    .slice(itemOffset, endOffset);
  const size = users.filter((x) =>
    x.role?.some((x) => x.name === "NHÂN VIÊN")
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) %
      users.filter((x) => x.role?.some((x) => x.name === "NHÂN VIÊN")).length;
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
    dispatch(add(values));
    setVisibleAdd(false);
    setFlag(!flag);
    form.resetFields();
    messageApi.success("Thêm nhân viên thành công");
  }

  function handleDelete() {
    dispatch(update({ ...user, status: 0 }));
    setVisibleDelete(false);
    setFlag(!flag);
    messageApi.success("Xóa nhân viên thành công");
  }

  function handleRestore() {
    dispatch(update({ ...user, status: 1 }));
    setVisibleRestore(false);
    setFlag(!flag);
    messageApi.success("Khôi phục thành công");
  }

  function handleUpdate(values) {
    dispatch(update({ ...user, ...values }));
    setVisibleUpdate(false);
    setFlag(!flag);
    form.resetFields();
    messageApi.success("Cập nhật thành công");
  }

  const dataCsv = users
    .filter((x) => x.role?.some((x) => x.name === "NHÂN VIÊN"))
    .map((x) => ({
      "Mã nhân viên": x.id,
      "Họ tên": x.fullname,
      "Tên đăng nhập": x.username,
      Email: x.email,
      "Số điện thoại": x.phone,
      "Trạng thái": x.status === 0 ? "Không hoạt động" : "Hoạt động",
    }));

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý nhân viên</div>
      <div className="grid grid-cols-2 gap-2 py-3">
        <div className="w-full">
          <Input.Search
            onSearch={(value) => setTimeout(() => setValueSearch(value), 1000)}
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
          <ExportExcel apiData={dataCsv} fileName={"personnel"} />
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
                  Số điện thoại
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
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
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
                    <td className="px-6 py-4">{x.phone}</td>
                    <td className="px-6 py-4">
                      {x.status === 1 ? "Hoạt động" : "Không hoạt động"}
                    </td>
                    <td className="px-1 py-4 text-center">
                      <Button
                        type="primary"
                        onClick={() => showUpdate(x.id)}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    </td>
                    <td className="px-1 py-4 text-center">
                      {x.status === 1 ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() => showDelete(x.id)}
                          icon={<FontAwesomeIcon icon={faTrash} />}
                        />
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
            title="Xác nhận xóa nhân viên"
            onOk={handleDelete}
            onCancel={() => setVisibleDelete(false)}
          >
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận xóa nhân viên này ?
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
                Xác nhận khôi phục nhân viên này ?
              </h3>
            </div>
          </Modal>
          {/* Modal update */}
          <Modal
            open={visibleUpdate}
            title="Cập nhật thông tin"
            centered
            okButtonProps={{
              form: "update-form",
              key: "update-submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleUpdate(false)}
          >
            <Form
              form={form}
              name="update-form"
              initialValues={{
                remember: true,
              }}
              fields={[
                {
                  name: ["username"],
                  value: user.username,
                },
                {
                  name: ["fullname"],
                  value: user.fullname,
                },
                {
                  name: ["email"],
                  value: user.email,
                },
                {
                  name: ["phone"],
                  value: user.phone,
                },
                {
                  name: ["avatar"],
                  value: user.avatar,
                },
              ]}
              onFinish={handleUpdate}
            >
              <Form.Item
                label="Họ tên"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="fullname"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên !",
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
                <Input size="large" placeholder="Họ tên" />
              </Form.Item>
              <Form.Item
                label="Tên đăng nhập"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="username"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập username !",
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
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                label="Ảnh đại diện"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="avatar"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ảnh đại diện !",
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
                <Input size="large" placeholder="Ảnh đại diện" />
              </Form.Item>
              <Form.Item
                label="Email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.email.test(value)) {
                          reject("Nhập sai định dạng email !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
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
                          reject("Không đúng định dạng số điện thoại !");
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
            </Form>
          </Modal>
          {/* Modal add */}
          <Modal
            open={visibleAdd}
            title="Thêm mới nhân viên"
            centered
            okButtonProps={{
              form: "add-form",
              key: "submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleAdd(false)}
          >
            <Form
              form={form}
              name="add-form"
              initialValues={{
                remember: true,
              }}
              onFinish={handleAdd}
            >
              <Form.Item
                label="Họ tên"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="fullname"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên !",
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
                <Input size="large" placeholder="Họ tên" />
              </Form.Item>
              <Form.Item
                label="Tên đăng nhập"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="username"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập username !",
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
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                label="Ảnh đại diện"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="avatar"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ảnh đại diện !",
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
                <Input size="large" placeholder="Ảnh đại diện" />
              </Form.Item>
              <Form.Item
                label="Email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.email.test(value)) {
                          reject("Nhập sai định dạng email !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
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
                          reject("Không đúng định dạng số điện thoại !");
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
            </Form>
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

export default PersonnelManaPage;
