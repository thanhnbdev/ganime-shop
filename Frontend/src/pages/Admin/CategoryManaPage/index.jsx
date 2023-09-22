import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  getAllCategory,
  getCategoryById,
  update,
} from "~/app/reducers/category";

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

function CategoryManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [page, setPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const categories = useSelector((state) => state.category.categories);
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllCategory());
    // eslint-disable-next-line
  }, []);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories
    .filter((x) => x.name.toLowerCase().includes(valueSearch.toLowerCase()))
    .slice(itemOffset, endOffset);
  const size = categories.filter((x) =>
    x.name.toLowerCase().includes(valueSearch.toLowerCase())
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    setPage(page - 1);
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

  function handleAdd(values) {
    dispatch(
      add({
        ...values,
        category: categories.find((x) => x.id === Number(values.category)),
        status: 1,
      })
    );
    setVisibleAdd(false);
    form.resetFields();
    messageApi.success("Thêm loại sản phẩm thành công");
  }

  function handleDelete() {
    dispatch(update({ ...category, status: 0 }));
    setVisibleDelete(false);
    form.resetFields();
    messageApi.success("Xóa loại sản phẩm thành công");
  }

  function handleRestore() {
    dispatch(update({ ...category, status: 1 }));
    setVisibleRestore(false);
    messageApi.success("Khôi phục thành công");
  }

  function handleUpdate(values) {
    dispatch(update({ ...category, ...values }));
    setVisibleUpdate(false);
    messageApi.success("Cập nhật thành công");
  }

  const dataCsv = categories.map((x) => ({
    "Mã loại sản phẩm": x.id,
    "Tên loại sản phẩm": x.name,
    "Miêu tả": x.description,
  }));

  return (
    <div>
      {contextHolder}
      <div className="font-bold">Trang quản lý loại sản phẩm</div>
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
          <ExportExcel apiData={dataCsv} fileName={"category"} />
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
                .filter((x) =>
                  x.name.toLowerCase().includes(valueSearch.toLowerCase())
                )
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1 + 5 * page}</td>
                    <td className="px-6 py-4">{x.name}</td>
                    <td className="px-6 py-4">{x.description}</td>
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
            <Form
              form={form}
              fields={[
                {
                  name: ["name"],
                  value: category.name,
                },
                {
                  name: ["description"],
                  value: category.description,
                },
              ]}
              id="update-form"
              onFinish={handleUpdate}
            >
              <Form.Item
                label="Tên loại sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên loại sản phẩm !",
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
                <Input placeholder="Tên loại sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Miêu tả"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="description"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập miêu tả !",
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
                <Input.TextArea size="large" placeholder="Miêu tả" />
              </Form.Item>
            </Form>
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
            <Form form={form} id="add-form" onFinish={handleAdd}>
              <Form.Item
                label="Tên loại sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên loại sản phẩm !",
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
                <Input placeholder="Tên loại sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Miêu tả"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="description"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập miêu tả !",
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
                <Input.TextArea size="large" placeholder="Miêu tả" />
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

export default CategoryManaPage;
