import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  getAllContact,
  getContactById,
  update,
} from "~/app/reducers/contact";
import {
  faPlus,
  faRotateLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Pagination, message } from "antd";
import { ExportExcel } from "../../../components/Export/ExportExcel";
import validators from "../../../services/validators";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllContact());
    // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = contacts
    .filter((x) => x.name.toLowerCase().includes(valueSearch.toLowerCase()))
    .slice(itemOffset, endOffset);
  const size = contacts.filter((x) =>
    x.name.toLowerCase().includes(valueSearch.toLowerCase())
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

  function handleAdd(values) {
    dispatch(add(values));
    setVisibleAdd(false);
    form.resetFields();
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
    dispatch(update({ ...contact, ...values }));
    setVisibleUpdate(false);
    form.resetFields();
    messageApi.success("Cập nhật thành công");
  }

  const dataCsv = contacts.map((x) => ({
    "Mã liên hệ": x.id,
    "Khách hàng": x.name,
    Email: x.email,
    "Số điện thoại": x.phone,
    "Địa chỉ": x.address,
    "Tiêu đề": x.title,
    "Nội dung": x.content,
  }));

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý liên hệ</div>
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
          <ExportExcel apiData={dataCsv} fileName={"contacts"} />
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
                .filter((x) =>
                  x.name.toLowerCase().includes(valueSearch.toLowerCase())
                )
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{x.title}</td>
                    <td className="px-6 py-4">{x.name}</td>
                    <td className="px-6 py-4">{x.email}</td>
                    <td className="px-6 py-4">{x.content}</td>
                    <td className="px-6 py-4">
                      {x.status === 1 ? "Đã phản hồi" : "Chưa phản hồi"}
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
                          icon={<FontAwesomeIcon icon={faRotateLeft} />}
                        />
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
            okButtonProps={{
              form: "update-form",
              key: "submit",
              htmlType: "submit",
            }}
            title="Cập nhật thông tin"
            onCancel={() => setVisibleUpdate(false)}
          >
            <Form
              form={form}
              fields={[
                {
                  name: ["name"],
                  value: contact.name,
                },
                {
                  name: ["title"],
                  value: contact.title,
                },
                {
                  name: ["content"],
                  value: contact.content,
                },
                {
                  name: ["email"],
                  value: contact.email,
                },
              ]}
              id="update-form"
              onFinish={handleUpdate}
            >
              <Form.Item
                label="Họ tên"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
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
                <Input placeholder="Họ tên" size="large" />
              </Form.Item>
              <Form.Item
                label="Tiêu đề"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="title"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề !",
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
                <Input placeholder="Tiêu đề" size="large" />
              </Form.Item>
              <Form.Item
                label="Nội dung"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="content"
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
                <Input.TextArea size="large" placeholder="Nội dung" />
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
            </Form>
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
            <Form form={form} id="add-form" onFinish={handleAdd}>
              <Form.Item
                label="Họ tên"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
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
                <Input placeholder="Họ tên" size="large" />
              </Form.Item>
              <Form.Item
                label="Tiêu đề"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="title"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề !",
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
                <Input placeholder="Tiêu đề" size="large" />
              </Form.Item>
              <Form.Item
                label="Nội dung"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="content"
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
                <Input.TextArea size="large" placeholder="Nội dung" />
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

export default ContactManaPage;
