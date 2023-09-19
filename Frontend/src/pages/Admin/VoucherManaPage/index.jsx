import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, getAllVoucher, update } from "~/app/reducers/voucher";

import authoService from "~/services/authoService";

import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import validators from "../../../services/validators";
import moment from "moment";

function VoucherManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentUser, setCurrentUser] = useState({});
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllVoucher());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    vouchers.forEach((x) => {
      if (moment().isAfter(x.dateEnd)) {
        dispatch(update({ ...x, status: 0 }));
      }
    });
    // eslint-disable-next-line
  }, []);

  function handleAdd(values) {
    dispatch(
      add({
        ...values,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        user: currentUser,
        status: values.dateEnd.isBefore(moment()) ? 0 : 1,
      })
    );
    form.resetFields();
    messageApi.success("Tạo mã giảm giá thành công", { autoClose: 2000 });
  }

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        onFinish={handleAdd}
        className="grid grid-cols-3 gap-x-3"
      >
        <Form.Item
          label="Mã giảm giá"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="code"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã giảm giá !",
            },
            {
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (value.length !== 12) {
                    reject("Mã giảm giá phải đủ 12 kí tự !");
                  } else {
                    resolve();
                  }
                });
              },
            },
            {
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (vouchers.find((x) => x.code === value)) {
                    reject("Mã giảm giá đã tồn tại !");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input placeholder="Mã giảm giá" size="large" />
        </Form.Item>
        <Form.Item
          label="Phần trăm giảm giá"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="sale"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập phần trăm giảm giá !",
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
          label="Số lượng"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="quantity"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng !",
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
          label="Ngày kích hoạt"
          name="dateStart"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày kích hoạt !",
            },
          ]}
        >
          <DatePicker
            size="large"
            placeholder="Ngày kích hoạt"
            className="w-full"
            showTime
          />
        </Form.Item>
        <Form.Item
          label="Ngày hết hạn"
          name="dateEnd"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày hết hạn !",
            },
          ]}
        >
          <DatePicker
            size="large"
            placeholder="Ngày hết hạn"
            className="w-full"
            showTime
          />
        </Form.Item>
        <Form.Item
          label="Nhân viên tạo mã"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder={currentUser.username} readOnly size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Tạo mã giảm giá
          </Button>
        </Form.Item>
      </Form>
      <div className="font-bold">Danh sách mã giảm giá</div>
      <div className="mt-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã
                </th>
                <th scope="col" className="px-6 py-3">
                  Phần trăm
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày kích hoạt
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày hết hạn
                </th>
                <th scope="col" className="px-6 py-3">
                  Người tạo
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((x) => (
                <tr
                  key={x.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{x.id}</td>
                  <td className="px-6 py-4">{x.code}</td>
                  <td className="px-6 py-4">{x.sale} %</td>
                  <td className="px-6 py-4">{x.quantity}</td>
                  <td className="px-6 py-4">
                    {moment(x.dateStart).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(x.dateEnd).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">{x.user.username}</td>
                  <td className="px-6 py-4">
                    {x.status === 1 ? "Còn hạn" : "Hết hạn"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VoucherManaPage;
