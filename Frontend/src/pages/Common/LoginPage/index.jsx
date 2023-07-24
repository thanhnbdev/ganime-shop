import { useState } from "react";
import banner from "~/assets/images/banner.svg";

import logo from "../../../assets/images/logo-gym.png";

import { Link, useNavigate } from "react-router-dom";
import http from "~/services/apiService";
import { Button, Input, message } from "antd";

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    http
      .httpGet(`user/${username}/${password}`)
      .then((res) => {
        if (res.id > 0) {
          navigate("/");
          window.localStorage.setItem("username", username);
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
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên đăng nhập
            </label>
            <Input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mật khẩu
            </label>
            <Input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            className="w-full"
            onClick={() => handleSubmit()}
          >
            Đăng nhập
          </Button>
          <div className="mt-6">
            <div className="text-center">
              Bạn chưa có tài khoản ?{" "}
              <span>
                <Link to={"/signup"}>Đăng ký ngay</Link>
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
