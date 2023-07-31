import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, getAllVoucher, update } from "~/app/reducers/voucher";

import authoService from "~/services/authoService";

import { Button, message } from "antd";
import { Field, Form, Formik } from "formik";

function VoucherManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentUser, setCurrentUser] = useState({});
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const dispatch = useDispatch();
  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace("T", " ")
    .slice(0, 16);

  useEffect(() => {
    dispatch(getAllVoucher());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    vouchers.forEach((x) => {
      if (x.dateEnd > now) {
        dispatch(update({ ...x, status: 1 }));
      }
    });
    // eslint-disable-next-line
  }, []);

  function handleUpdate(values) {
    if (values.code.length < 12) {
      messageApi.error("Mã giảm giá không vượt quá 12 kí tự");
    } else if (
      values.sale > 0 &&
      values.code.length >= 12 &&
      values.quantity > 0 &&
      values.dateEnd.length > 0
    ) {
      dispatch(
        add({
          ...values,
          dateStart: values.dateStart.replace("T", " "),
          dateEnd: values.dateEnd.replace("T", " "),
          user: currentUser,
        })
      );
      messageApi.success("Tạo mã giảm giá thành công", { autoClose: 2000 });
    } else {
      messageApi.error("Không được để trống !");
    }
  }

  return (
    <div>
      {contextHolder}
      <Formik
        enableReinitialize
        initialValues={{
          code: "",
          sale: "",
          quantity: "",
          dateStart: now,
          dateEnd: "",
        }}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({
          values,
          /* and other goodies */
        }) => (
          <Form>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div>
                <label>Mã giảm giá</label>
                <Field
                  type="text"
                  name="code"
                  value={values.code}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label>Phần trăm giảm giá</label>
                <Field
                  name="sale"
                  value={values.sale}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label>Số lượng</label>
                <Field
                  name="quantity"
                  value={values.quantity}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                  min="1"
                />
              </div>
              <div>
                <label>Ngày tạo</label>
                <Field
                  type="datetime-local"
                  name="dateStart"
                  disabled
                  value={values.dateStart}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label>Ngày hết hạn</label>
                <Field
                  type="datetime-local"
                  name="dateEnd"
                  value={values.dateEnd}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label>Nhân viên tạo mã</label>
                <Field
                  type="text"
                  disabled
                  value={currentUser.username}
                  className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="col-start-3 flex justify-end">
                <Button type="primary" htmlType="submit">
                  Tạo mã giảm giá
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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
                  Ngày tạo
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
                  <td className="px-6 py-4">{x.dateStart}</td>
                  <td className="px-6 py-4">{x.dateEnd}</td>
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
