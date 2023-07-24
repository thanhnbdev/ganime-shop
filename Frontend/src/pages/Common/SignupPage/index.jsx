import { useEffect, useState } from "react";
import banner from "~/assets/images/banner.svg";

import { useDispatch, useSelector } from "react-redux";
import { add, getAllUser } from "~/app/reducers/user";

import logo from "../../../assets/images/logo-gym.png";

import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  function handleSubmit() {
    if (username && fullname && password && email) {
      dispatch(
        add({
          username: username,
          fullname: fullname,
          password: password,
          email: email,
        })
      );
      setUsername("");
      setFullname("");
      setPassword("");
      setEmail("");
      messageApi.success("Đăng ký thành công !");
    } else {
      messageApi.error("Không được để trống !");
    }
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Họ và tên
            </label>
            <Input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Họ và tên"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <Input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            className="w-full"
            onClick={() => handleSubmit()}
          >
            Đăng ký
          </Button>
          <div className="mt-6">
            <div className="text-center">
              <Link to={"/login"}>Đăng nhập ngay</Link>
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
