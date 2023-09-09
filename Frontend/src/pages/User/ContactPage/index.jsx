import { useDispatch } from "react-redux";
import contact from "~/assets/images/contact.svg";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";
import { add } from "~/app/reducers/contact";
import { Button, Form, Input, message } from "antd";
import validators from "../../../services/validators";
import TextArea from "antd/es/input/TextArea";

function ContactPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function handleContact(values) {
    dispatch(add(values));
    messageApi.success("Gửi liên hệ thành công", { autoClose: 2000 });
    form.resetFields();
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
            <Form
              form={form}
              name="normal_contact"
              className="contact-form"
              initialValues={{
                remember: true,
              }}
              onFinish={handleContact}
            >
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
                <Input placeholder="Email" size="large" />
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
                          reject("Nhập sai định dạng số điện thoại !");
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
                <TextArea placeholder="content" size="large" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="address"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ !",
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
                <TextArea placeholder="address" size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-4"
                >
                  GỬI LIÊN HỆ
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="p-8">
            <img src={contact} alt="contact" className="w-full" />
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}

export default ContactPage;
