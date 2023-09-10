import banner from "~/assets/images/banner.svg";

import logo from "../../../assets/images/logo-gym.png";

import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import http from "~/services/apiService";
import validators from "../../../services/validators";

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  function handleSubmit(value) {
    http
      .httpGet(`user/${value.username}/${value.password}`)
      .then((res) => {
        if (res.id > 0) {
          navigate("/");
          window.localStorage.setItem("username", value.username);
          window.localStorage.setItem("id", res.id);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        messageApi.error("Sai thông tin đăng nhập");
      });
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-screen p-10">
      {contextHolder}
      <div className="p-8">
        <div className="text-center text-3xl font-semibold">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </Link>
          <div className="mt-5">ĐĂNG NHẬP</div>
        </div>
        <div className="mt-8">
          <Form onFinish={handleSubmit}>
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                ĐĂNG NHẬP
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-6">
            <div className="text-center">
              Bạn chưa có tài khoản ?{" "}
              <span>
                <Link to={"/signup"} className="no-underline">
                  Đăng ký ngay
                </Link>
              </span>
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

export default LoginPage;
