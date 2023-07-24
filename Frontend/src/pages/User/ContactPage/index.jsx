import { useDispatch } from "react-redux";

import contact from "~/assets/images/contact.svg";

import HeaderLayout from "~/layouts/HeaderLayout";
import FooterLayout from "~/layouts/FooterLayout";

import { add } from "~/app/reducers/contact";

import { Field, Form, Formik } from "formik";
import { Button, Input, message } from "antd";

function ContactPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  function handleContact(values, action) {
    if (
      values.title.length > 0 &&
      values.email.length > 0 &&
      values.content.length > 0 &&
      values.name.length > 0 &&
      values.phone.length > 0 &&
      values.address.length > 0
    ) {
      dispatch(add(values));
      messageApi.success("Gửi liên hệ thành công", { autoClose: 2000 });
      action.resetForm();
    } else {
      messageApi.error("Vui lòng không được để trống !");
    }
  }

  return (
    <div>
      <HeaderLayout />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {contextHolder}
      <div className="bg-slate-100 py-4 px-44">
        <div className="text-center font-bold mt-8 text-2xl">
          Kết nối với chúng tôi
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="font-bold">Thông tin</div>
            <div>
              Kết nối với chúng tôi để hiểu biết thêm về shop. Chúng tôi sẽ sớm
              kết nối lại với bạn !
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                address: "",
                email: "",
                title: "",
                phone: "",
                content: "",
                status: 0,
              }}
              onSubmit={(values, actions) => handleContact(values, actions)}
            >
              {({
                values,
                errors,
                touched,
                /* and other goodies */
              }) => (
                <Form>
                  <div className="mt-4">
                    <label>Tiêu đề</label>
                    <Field
                      type="text"
                      name="title"
                      size="large"
                      value={values.title}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Họ tên</label>
                    <Field
                      type="text"
                      name="name"
                      value={values.name}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Số điện thoại</label>
                    <Field
                      type="text"
                      name="phone"
                      value={values.phone}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Nội dung</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="content"
                      value={values.content}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Địa chỉ</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="address"
                      value={values.address}
                      className="bg-gray-50 border border-solid border-slate-200 rounded-lg focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mt-4">
                    <Button type="primary" htmlType="submit" className="w-full">
                      Send
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="p-8">
            <img src={contact} alt="contact" />
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}

export default ContactPage;
