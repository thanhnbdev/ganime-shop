import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import { Breadcrumb, Button, InputNumber, Rate, message } from "antd";

import { useEffect, useState } from "react";
import { getProductById } from "~/app/reducers/product";

import {
  add as addDetail,
  getAllOrderDetail,
  update,
} from "~/app/reducers/orderDetail";
import authoService from "~/services/authoService";
import { getAllFeedback } from "~/app/reducers/feedback";
import { getAllOrder } from "~/app/reducers/order";

const now = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .replace("T", " ")
  .slice(0, 16);

function ProductDetail() {
  const [messageApi, contextHolder] = message.useMessage();
  const [quantity, setQuantity] = useState(1);
  const [countBuy, setCountBuy] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const { idProduct, nameProduct } = useParams();
  const product = useSelector((state) => state.product.product);
  const orders = useSelector((state) => state.order.orders);
  const orderQuantity = useSelector((state) => state.order.orderQuantity);
  const ordersDetail = useSelector((state) => state.orderDetail.ordersDetail);
  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const dispatch = useDispatch();
  const desc = ["Tệ", "Kém", "Bình thường", "Tốt", "Tuyệt vời"];

  useEffect(() => {
    dispatch(getAllFeedback());
    dispatch(getAllOrder());
    dispatch(getAllOrderDetail());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getProductById(idProduct));
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  function handleAddToCard() {
    if (currentUser?.id > 0 && currentUser?.role?.some((x) => x.id === 3)) {
      if (size.length === 0) {
        messageApi.error("Vui lòng chọn kích cỡ sản phẩm");
      } else if (color.length === 0) {
        messageApi.error("Vui lòng chọn màu sắc sản phẩm");
      } else {
        // check duplicate product
        const check = orders
          .filter((x) => x.status === 1)
          .some((x) => x.product.id === product.id && x.size === size);
        const odetail = ordersDetail.find(
          (x) => x.orders.product.id === product.id
        );
        if (check) {
          dispatch(
            update({
              ...odetail,
              orders: {
                ...odetail.orders,
                quantity: odetail.orders.quantity + Number(quantity),
              },
              quantity: odetail.quantity + Number(quantity),
            })
          );
          messageApi.success("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
          if (countBuy === 0) {
            dispatch(
              addDetail({
                orders: {
                  user: currentUser,
                  product: product,
                  address: "MISSING",
                  phone: "MISSING",
                  dateEnd: now,
                  quantity: Number(quantity),
                  date: now,
                  code: 0,
                  status: 1,
                  size: size,
                  color: color,
                },
                quantity: Number(quantity),
                size: size,
                color: color,
              })
            );
            setCountBuy(countBuy + 1);
            setCnt(cnt + 1);
          }
          messageApi.success("Thêm vào giỏ hàng thành công");
        }
      }
    } else if (currentUser?.role?.some((x) => x.id !== 3)) {
      messageApi.error("Vui lòng đăng nhập tài khoản khách hàng để mua hàng");
    } else {
      messageApi.error("Vui lòng đăng nhập để mua hàng");
    }
  }

  function totalProduct(id) {
    let total = 0;
    orderQuantity
      .filter((x) => x.product.id === id)
      .map((x) => (total += x.quantity));
    return total;
  }

  function averageRate(id) {
    let rate = 0;
    const arr = feedbacks.filter((x) => x.product.id === id);
    arr.map((x) => (rate += x.rate));
    return arr.length > 0 ? rate / arr.length : 0;
  }

  return (
    <div className="text-slate-800">
      {contextHolder}
      <HeaderLayout count={cnt} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="bg-slate-100 py-4 px-44">
        <div className="h-10 p-3">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{nameProduct}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="bg-white mt-4 p-4 grid grid-cols-5 gap-4">
          <div className="col-start-1 col-end-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full"
              style={{ height: "500px" }}
            />
          </div>
          <div className="col-start-3 col-end-6 px-16 pt-6">
            <div className="font-bold text-xl">
              {product.name}
              {product.sale ? (
                <span className="bg-yellow-200 py-2 px-3 mx-2 rounded-md">
                  Giảm giá {product.sale}%
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              {averageRate(product.id)}{" "}
              <Rate tooltips={desc} disabled value={averageRate(product.id)} />{" "}
              | {totalProduct(product.id)} sản phẩm đã bán
            </div>
            <div className="font-bold mt-2">
              {product.sale > 0 ? (
                <p>
                  Giá chỉ :{" "}
                  <strike className="text-slate-400">
                    {product.price?.toLocaleString()} VNĐ
                  </strike>
                  <span className="px-2 text-red-600 ">
                    {(
                      product.price -
                      (product.price * product.sale) / 100
                    ).toLocaleString()}{" "}
                    VND
                  </span>
                </p>
              ) : (
                <div>
                  Giá chỉ :{" "}
                  <span className="text-red-600">
                    {product.price?.toLocaleString()} VNĐ
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4">{product.description}</div>
            <div>
              <span className="font-bold">Loại sản phẩm</span> :{" "}
              {product.category?.name}
            </div>
            <div className="mb-6 mt-4">
              <span className="flex gap-2">
                <span className="font-bold">Màu sắc</span> :{" "}
                {product.color?.map((x) => (
                  <span key={x.descriptions}>
                    <input
                      type="radio"
                      id={x.descriptions}
                      onChange={(e) => setColor(e.target.value)}
                      name="color"
                      className="hidden peer"
                      value={x.name}
                    />
                    <label
                      htmlFor={x.descriptions}
                      className="p-2 border border-solid border-slate-400 rounded-md cursor-pointer 
                      peer-checked:border-2
                      peer-checked:border-[#1e90ff]"
                    >
                      {x.name}
                    </label>
                  </span>
                ))}
              </span>
            </div>
            <div className="my-4">
              <span className="font-bold">
                Kích cỡ :{" "}
                {product.size?.map((x) => (
                  <span key={x.id} className="px-2">
                    <input
                      type="radio"
                      id={x.id}
                      onChange={(e) => setSize(e.target.value)}
                      name="size"
                      className="hidden peer"
                      value={x.name}
                    />
                    <label
                      htmlFor={x.id}
                      className="w-1/2 p-2 text-black border border-solid border-slate-400 rounded-lg cursor-pointer
                      peer-checked:border-2
                      peer-checked:border-[#1e90ff]"
                    >
                      {x.name}
                    </label>
                  </span>
                ))}
              </span>
            </div>
            <div>
              <span className="font-bold">Tình trạng</span> :{" "}
              {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
            </div>
            <div className="mt-3 grid grid-cols-2">
              <div>
                <span className="font-bold">Số lượng</span> :{" "}
                <InputNumber
                  size="large"
                  className="w-full"
                  defaultValue={1}
                  min={1}
                  max={product.quantity}
                  onChange={(value) => setQuantity(value)}
                />
              </div>
              <div className="flex justify-center items-center">
                {product.quantity} sản phẩm có sẵn
              </div>
            </div>
            <div className="mt-6">
              <Button
                disabled={product.quantity <= 0 ? true : false}
                type="primary"
                size="large"
                className={`${
                  product.quantity <= 0
                    ? "cursor-not-allowed text-white bg-slate-400 font-medium rounded-lg text-sm w-full"
                    : "text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none"
                } `}
                onClick={() => handleAddToCard()}
              >
                {product.quantity <= 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white p-5">
          <div className="font-bold">Đánh giá sản phẩm</div>
          <div className="mt-6">
            {feedbacks.filter((x) => x.product.id === product.id).length > 0 ? (
              feedbacks
                .filter((x) => x.product.id === product.id)
                .map((x) => (
                  <div key={x.id}>
                    <div className="flex">
                      <img
                        src={x.user.avatar}
                        alt={x.user.fullname}
                        className="rounded-full w-14 h-14"
                      />
                      <div className="px-2">
                        {x.user.fullname} | {x.date} |{" "}
                        <span>
                          <Rate tooltips={desc} value={x.rate} />
                          {x.rate ? (
                            <span className="ant-rate-text">
                              {desc[x.rate - 1]}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-400">Chất lượng sản phẩm</span>{" "}
                      : {x.quality}
                    </div>
                    <div className="mt-2 bg-slate-100 p-3 rounded-md">
                      <div className="text-black-400 font-bold">
                        Đánh giá sản phẩm
                      </div>
                      <div className="mt-2">{x.content}</div>
                    </div>
                    <div className="py-3"></div>
                  </div>
                ))
            ) : (
              <div className="font-bold text-center">
                Sản phẩm chưa có đánh giá !
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}

export default ProductDetail;
