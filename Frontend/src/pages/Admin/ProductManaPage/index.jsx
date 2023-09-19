import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "~/app/reducers/category";
import { getAllProduct, getProductById, update } from "~/app/reducers/product";
import http from "~/services/apiService";

import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faPalette,
  faPlus,
  faRotateLeft,
  faRulerCombined,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Select,
  message,
} from "antd";
import { getAllColor } from "../../../app/reducers/color";
import { getAllSize } from "../../../app/reducers/size";
import {
  add as addPs,
  getAllProductSize,
  deleteById,
} from "~/app/reducers/productSize";
import {
  add as addPc,
  getAllProductColor,
  deleteById as deletePcById,
} from "~/app/reducers/productColor";
import { ExportExcel } from "../../../components/Export/ExportExcel";
import validators from "../../../services/validators";

function ProductManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleSize, setVisibleSize] = useState(false);
  const [visibleColor, setVisibleColor] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [flag, setFlag] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const [valueSearch, setValueSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.product.products);
  const sizes = useSelector((state) => state.size.sizes);
  const colors = useSelector((state) => state.color.colors);
  const product = useSelector((state) => state.product.product);
  const categories = useSelector((state) => state.category.categories);
  const productSizes = useSelector((state) => state.productSize.productSizes);
  const productColors = useSelector(
    (state) => state.productColor.productColors
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllSize());
    dispatch(getAllColor());
    dispatch(getAllProductSize());
    dispatch(getAllProductColor());
    // eslint-disable-next-line
  }, [flag]);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products
    .filter(
      (x) =>
        x.name?.toLowerCase().includes(valueSearch?.toLowerCase()) &&
        x?.category?.name
          ?.toLowerCase()
          .includes(categorySearch?.toLowerCase()) &&
        x.color?.some((y) => y.name.includes(colorSearch)) &&
        x.size?.some((y) => y.name.includes(sizeSearch))
    )
    .slice(itemOffset, endOffset);
  const size = products.filter(
    (x) =>
      x.name?.toLowerCase().includes(valueSearch?.toLowerCase()) &&
      x?.category?.name
        ?.toLowerCase()
        .includes(categorySearch?.toLowerCase()) &&
      x.color?.some((y) => y.name.includes(colorSearch)) &&
      x.size?.some((y) => y.name.includes(sizeSearch))
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    setPage(page - 1);
    const newOffset = ((page - 1) * itemsPerPage) % size;
    setItemOffset(newOffset);
  };

  function showAdd() {
    setVisibleAdd(true);
  }

  function showDetail(id) {
    setVisibleDetail(true);
    dispatch(getProductById(id));
  }

  function showSize(id) {
    setVisibleSize(true);
    dispatch(getProductById(id));
  }

  function showColor(id) {
    setVisibleColor(true);
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

  function handleAdd(values) {
    http.httpPost("product/add-new", {
      product: {
        name: values.name,
        image: url,
        price: values.price,
        description: values.description,
        brand: values.brand,
        status: 1,
        quantity: values.quantity,
        category: categories.find((x) => x.id === Number(values.category)),
      },
      sizeColor: {
        size: sizes.filter((x) => values.size.some((y) => y === x.id)),
        color: colors.filter((x) => values.size.some((y) => y === x.id)),
      },
    });
    setVisibleAdd(false);
    form.resetFields();
    setUrl("");
    setFlag(!flag);
    messageApi.success("Thêm sản phẩm thành công");
  }

  function handleAddSize(values) {
    dispatch(
      addPs({
        product: product,
        size: sizes.find((x) => x.id === values.size),
      })
    );
    setVisibleSize(false);
    messageApi.success("Thêm kích cỡ thành công");
  }

  function handleAddColor(values) {
    dispatch(
      addPc({
        product: product,
        color: colors.find((x) => x.id === values.color),
      })
    );
    setVisibleColor(false);
    messageApi.success("Thêm màu sắc thành công");
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
        ...product,
        ...values,
        category: categories.find((x) => x.id === Number(values.category)),
        size: product.size,
        id: product.id,
        image: url.length > 0 ? url : product.image,
      })
    );
    setVisibleUpdate(false);
    form.resetFields();
    setUrl("");
    messageApi.success("Cập nhật thành công");
  }

  function formatListSize(item) {
    return item?.map((x) => x.name).join(", ");
  }

  const dataCsv = products.map((x) => ({
    "Mã sản phẩm": x.id,
    "Tên sản phẩm": x.name,
    "Ảnh sản phẩm": x.image,
    "Giá sản phẩm": x.price,
    "Miêu tả": x.description,
    "Thương hiệu": x.brand,
    "Số lượng": x.quantity,
    "Loại sản phẩm": x.category?.name,
    "Kích cỡ": formatListSize(x.size),
    "Màu sắc": formatListSize(x.color),
  }));

  const uploadImage = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "ganime");
    data.append("cloud_name", "dyrc9s2gx");
    fetch("https://api.cloudinary.com/v1_1/dyrc9s2gx/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-2 gap-2 py-2">
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
          <ExportExcel apiData={dataCsv} fileName={"products"} />
        </div>
        <div className="col-start-1 col-end-3 grid grid-cols-3 gap-x-3">
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Lọc theo loại sản phẩm"
            size="large"
            onChange={(value) => setCategorySearch(value)}
            options={categories.map((x) => ({
              value: x.name,
              label: x.name,
            }))}
          />
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Lọc theo màu sắc"
            size="large"
            onChange={(value) => setColorSearch(value)}
            options={colors.map((x) => ({
              value: x.name,
              label: x.name,
            }))}
          />
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Lọc theo kích cỡ"
            size="large"
            onChange={(value) => setSizeSearch(value)}
            options={sizes.map((x) => ({
              value: x.name,
              label: x.name,
            }))}
          />
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
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng tồn
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" colSpan={5} className="text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter(
                  (x) =>
                    x.name
                      ?.toLowerCase()
                      .includes(valueSearch?.toLowerCase()) &&
                    x?.category?.name
                      ?.toLowerCase()
                      .includes(categorySearch?.toLowerCase()) &&
                    x.color.some((y) => y.name.includes(colorSearch)) &&
                    x.size.some((y) => y.name.includes(sizeSearch))
                )
                .map((x, index) => (
                  <tr
                    key={x.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="text-center">{index + 1 + 5 * page}</td>
                    <td className="px-6 py-4">
                      <img
                        src={x.image}
                        alt={x.name}
                        className="h-12 w-12 rounded-md"
                      />
                    </td>
                    <td className="py-4">{x.name}</td>
                    <td className="py-4">{x.price.toLocaleString()}đ</td>
                    <td className="text-center">{x.quantity}</td>
                    <td className="py-4">
                      {x.quantity === 0 ? "Hết hàng" : "Còn hàng"}
                    </td>
                    <td className="py-4">
                      {x.status === 1 ? "Còn bán" : "Không còn bán"}
                    </td>
                    <td className="py-4 px-1 text-center">
                      <Button
                        type="primary"
                        onClick={() => showColor(x.id)}
                        style={{ backgroundColor: "orange" }}
                        icon={<FontAwesomeIcon icon={faPalette} />}
                      />
                    </td>
                    <td className="py-4 px-1 text-center">
                      <Button
                        type="primary"
                        onClick={() => showSize(x.id)}
                        style={{ backgroundColor: "pink" }}
                        icon={<FontAwesomeIcon icon={faRulerCombined} />}
                      />
                    </td>
                    <td className="py-4 px-1 text-center">
                      <Button
                        type="primary"
                        onClick={() => showDetail(x.id)}
                        icon={<FontAwesomeIcon icon={faEye} />}
                      />
                    </td>
                    <td className="py-4 px-1 text-center">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#1abc9c" }}
                        onClick={() => showUpdate(x.id)}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    </td>
                    <td className="py-4 px-1 text-center">
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
                          onClick={() => showRestore(x.id)}
                          icon={<FontAwesomeIcon icon={faRotateLeft} />}
                        />
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
                  <span className="font-bold">Miêu tả</span> :{" "}
                  {product.description}
                </div>
                <div>
                  <span className="font-bold">Loại sản phẩm</span> :{" "}
                  {product?.category?.name}
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
                  {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
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
          {/* Modal add size */}
          <Modal
            open={visibleSize}
            title="Thêm kích cỡ sản phẩm"
            okButtonProps={{
              form: "add-size-form",
              key: "add-size-submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleSize(false)}
          >
            <Form
              fields={[
                {
                  name: ["size"],
                  value: sizes.filter(
                    (obj) => !product.size?.some(({ id }) => obj.id === id)
                  )[0]?.id,
                },
              ]}
              id="add-size-form"
              form={form}
              onFinish={handleAddSize}
            >
              <Form.Item name="size">
                <Select
                  size="large"
                  className="w-full"
                  options={sizes
                    .filter(
                      (obj) => !product.size?.some(({ id }) => obj.id === id)
                    )
                    .map((x) => ({
                      value: x.id,
                      label: x.name,
                    }))}
                />
              </Form.Item>
            </Form>
          </Modal>
          {/* Modal add color */}
          <Modal
            open={visibleColor}
            title="Thêm màu sắc sản phẩm"
            okButtonProps={{
              form: "add-color-form",
              key: "add-color-submit",
              htmlType: "submit",
            }}
            onCancel={() => setVisibleColor(false)}
          >
            <Form
              fields={[
                {
                  name: ["color"],
                  value: colors.filter(
                    (obj) => !product.color?.some(({ id }) => obj.id === id)
                  )[0]?.id,
                },
              ]}
              id="add-color-form"
              form={form}
              onFinish={handleAddColor}
            >
              <Form.Item name="color">
                <Select
                  size="large"
                  className="w-full"
                  options={colors
                    .filter(
                      (obj) => !product.color?.some(({ id }) => obj.id === id)
                    )
                    .map((x) => ({
                      value: x.id,
                      label: x.name,
                    }))}
                />
              </Form.Item>
            </Form>
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
            width={"80%"}
            onCancel={() => setVisibleUpdate(false)}
          >
            <Form
              form={form}
              id="update-form"
              className="grid grid-cols-3 gap-x-3"
              fields={[
                {
                  name: ["image"],
                  value: product.image,
                },
                {
                  name: ["name"],
                  value: product.name,
                },
                {
                  name: ["price"],
                  value: product.price,
                },
                {
                  name: ["brand"],
                  value: product.brand,
                },
                {
                  name: ["quantity"],
                  value: product.quantity,
                },
                {
                  name: ["description"],
                  value: product.description,
                },
                {
                  name: ["category"],
                  value: product.category?.id,
                },
              ]}
              onFinish={handleUpdate}
            >
              <Form.Item className="text-center">
                <img
                  src={url.length > 0 ? url : product.image}
                  alt="img"
                  className="w-full h-48 rounded-md"
                />
              </Form.Item>
              <Form.Item
                label="Ảnh"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ảnh sản phẩm !",
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
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                />
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sản phẩm !",
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
                <Input placeholder="Tên sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Giá sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="price"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá sản phẩm !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.positiveIntNum.test(value)) {
                          reject("Nhập sai định dạng số !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>
              <Form.Item
                label="Thương hiệu"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="brand"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thương hiệu sản phẩm !",
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
                <Input placeholder="Thương hiệu sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="quantity"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.positiveIntNum.test(value)) {
                          reject("Nhập sai định dạng số !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>
              <Form.Item
                label="Chi tiết sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="description"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chi tiết sản phẩm !",
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
                <Input placeholder="Chi tiết sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Loại sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="category"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại sản phẩm !",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={categories.map((x) => ({
                    value: x.id,
                    label: x.name,
                  }))}
                />
              </Form.Item>
              <div>
                <label>Kích cỡ</label>
                <div className="mt-4">
                  {product.size?.map((x) => (
                    <span
                      key={x.id}
                      className="inline-flex relative items-center px-4 py-2 mr-2 bg-blue-100 rounded"
                    >
                      <span className="font-bold text-lg text-blue-800">
                        {x.name}
                      </span>
                      <span
                        className="cursor-pointer absolute -top-2 right-0 text-lg"
                        onClick={() => {
                          dispatch(
                            deleteById(
                              productSizes.find(
                                (y) =>
                                  y.product.id === product.id &&
                                  y.size.id === x.id
                              ).id
                            )
                          );
                          setVisibleUpdate(false);
                          messageApi.success("Xóa kích cỡ thành công");
                        }}
                      >
                        x
                      </span>
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
                      className="inline-flex relative items-center p-2 mr-2 text-sm font-medium text-white rounded"
                    >
                      <span>{x.name}</span>
                      <span
                        className="cursor-pointer absolute -top-2 right-0 text-lg"
                        onClick={() => {
                          dispatch(
                            deletePcById(
                              productColors.find(
                                (y) =>
                                  y.product.id === product.id &&
                                  y.color.id === x.id
                              ).id
                            )
                          );
                          setVisibleUpdate(false);
                          messageApi.success("Xóa màu sắc thành công");
                        }}
                      >
                        x
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </Form>
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
            width={"80%"}
            onCancel={() => setVisibleAdd(false)}
          >
            <Form
              id="add-form"
              form={form}
              fields={[
                {
                  name: ["quantityy"],
                  value: 1,
                },
              ]}
              className="grid grid-cols-3 gap-x-3"
              onFinish={handleAdd}
            >
              {url.length > 0 && (
                <Form.Item>
                  <img src={url} alt="img" className="w-full h-48 rounded-md" />
                </Form.Item>
              )}
              <Form.Item
                label="Ảnh"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ảnh sản phẩm !",
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
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                />
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sản phẩm !",
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
                <Input placeholder="Tên sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Giá sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="price"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá sản phẩm !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.positiveIntNum.test(value)) {
                          reject("Nhập sai định dạng số !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>
              <Form.Item
                label="Thương hiệu"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="brand"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thương hiệu sản phẩm !",
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
                <Input placeholder="Thương hiệu sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="quantity"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.positiveIntNum.test(value)) {
                          reject("Nhập sai định dạng số !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>
              <Form.Item
                label="Chi tiết sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="description"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chi tiết sản phẩm !",
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
                <Input placeholder="Chi tiết sản phẩm" size="large" />
              </Form.Item>
              <Form.Item
                label="Loại sản phẩm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="category"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại sản phẩm !",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={categories.map((x) => ({
                    value: x.id,
                    label: x.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Kích cỡ"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="size"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn kích cỡ sản phẩm !",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  maxTagCount={"responsive"}
                  size="large"
                  options={sizes.map((x) => ({
                    value: x.id,
                    label: x.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Màu sắc"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="color"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn màu sắc sản phẩm !",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  maxTagCount={"responsive"}
                  size="large"
                  options={colors.map((x) => ({
                    value: x.id,
                    label: x.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng sản phẩm thêm (Nếu thêm nhiều sản phẩm)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="quantityy"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm thêm !",
                  },
                  {
                    validator(_, value) {
                      return new Promise((resolve, reject) => {
                        if (!validators.positiveIntNum.test(value)) {
                          reject("Nhập sai định dạng số !");
                        } else {
                          resolve();
                        }
                      });
                    },
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="w-full"
                  min={1}
                  max={100}
                />
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

export default ProductManaPage;
