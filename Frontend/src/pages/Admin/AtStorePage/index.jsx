import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "~/app/reducers/product";
import { getAllColor } from "../../../app/reducers/color";
import { getAllSize } from "../../../app/reducers/size";
import { update as updateProduct } from "~/app/reducers/product";
import img from "../../../assets/images/at-store.svg";
import http from "~/services/apiService";

function AtStorePage() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const sizes = useSelector((state) => state.size.sizes);
  const colors = useSelector((state) => state.color.colors);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllSize());
    dispatch(getAllColor());
  }, []);

  function onFinish(value) {
    http
      .httpPost("order-detail/at-store", {
        fullname: value.fullname,
        product: products.find((x) => x.id === value.product),
        size: value.size,
        color: value.color,
        quantity: value.quantity,
        phone: value.phone,
      })
      .then((res) => {
        if (res) {
          // update product quantity
          dispatch(
            updateProduct({
              ...products.find((x) => x.id === value.product),
              quantity:
                products.find((x) => x.id === value.product).quantity -
                value.quantity,
            })
          );
          messageApi.success("Mua hàng thành công");
          form.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      {contextHolder}
      <div className="mb-4 font-bold">Mua tại cửa hàng</div>
      <div className="grid grid-cols-3 gap-2">
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="grid grid-cols-2 gap-3 col-start-1 col-end-3"
          fields={[
            {
              name: ["product"],
              value: products.filter((x) => x.quantity > 0)[0]?.id,
            },
            {
              name: ["size"],
              value: sizes[0]?.name,
            },
            {
              name: ["color"],
              value: colors[0]?.name,
            },
          ]}
        >
          <Form.Item
            label="Tên khách hàng"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username !",
              },
            ]}
          >
            <Input placeholder="Tên khách hàng" size="large" />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="product"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
            ]}
          >
            <Select
              className="w-full"
              size="large"
              options={products
                .filter((x) => x.quantity > 0)
                .map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
            ]}
          >
            <InputNumber className="w-full" size="large" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username !",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="size"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
            ]}
          >
            <Select
              className="w-full"
              size="large"
              options={sizes.map((x) => ({
                label: x.name,
                value: x.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="color"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
            ]}
          >
            <Select
              className="w-full"
              size="large"
              options={colors.map((x) => ({
                label: x.name,
                value: x.name,
              }))}
            />
          </Form.Item>
          <Form.Item className="col-start-1 col-end-3">
            <Button type="primary" htmlType="submit" className="w-1/2">
              MUA NGAY
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center p-3">
          <img src={img} alt="at-store" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default AtStorePage;
