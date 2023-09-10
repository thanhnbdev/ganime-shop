import { useDispatch } from "react-redux";
import { add } from "~/app/reducers/user";
import banner from "~/assets/images/banner.svg";
import logo from "../../../assets/images/logo-gym.png";

import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import validators from "../../../services/validators";

function SignupPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function handleSubmit(value) {
    dispatch(
      add({
        username: value.username,
        fullname: value.fullname,
        phone: value.phone,
        password: value.password,
        email: value.email,
      })
    );
    messageApi.success("Đăng ký thành công !");
    form.resetFields();
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-screen p-10">
      {contextHolder}
      <div>
        <div className="text-center text-3xl font-semibold">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </Link>
          <div className="mt-5">ĐĂNG KÝ TÀI KHOẢN</div>
        </div>
        <div className="mt-8 mx-16">
          <Form
            form={form}
            name="normal_signup"
            className="signup-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
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
              label="Mật khẩu"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
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
              <Input.Password size="large" placeholder="Password" />
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
                  message: "Vui lòng nhập fullname !",
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                ĐĂNG KÝ
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-3 mb-6">
            <div className="text-center">
              <Link to={"/login"} className="no-underline">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 flex justify-center items-center">
        <img src={banner} alt="banner" className="h-96" />
      </div>
    </div>
  );
}

export default SignupPage;
