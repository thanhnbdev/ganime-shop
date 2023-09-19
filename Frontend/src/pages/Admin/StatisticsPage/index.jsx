import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "~/app/reducers/category";
import { getAllFeedback } from "~/app/reducers/feedback";
import { getAllOrder } from "~/app/reducers/order";
import { getAllProduct } from "~/app/reducers/product";
import PieChart from "~/components/ChartJs/PieChart";

import { Progress } from "antd";
import { getAllContact } from "~/app/reducers/contact";
import { ExportExcel } from "../../../components/Export/ExportExcel";

function StatisticsPage() {
  const products = useSelector((state) => state.product.products);
  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const contacts = useSelector((state) => state.contact.contacts);
  const ordersOg = useSelector((state) => state.order.ordersOg);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllOrder());
    dispatch(getAllFeedback());
    dispatch(getAllContact());
    // eslint-disable-next-line
  }, []);

  const arrCategory = [];
  const arrName = [];
  categories.forEach((element) => {
    arrName.push(element.name);
    arrCategory.push(
      products.find((x) => x.category.id === element.id)?.quantity
    );
  });

  let fbSum = 0;
  feedbacks.forEach((x) => {
    fbSum += x.rate;
  });

  const data = {
    labels: arrName,
    datasets: [
      {
        label: "Số sản phẩm",
        data: arrCategory,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255,255,0)",
          "rgb(255,0,0)",
          "rgb(218,112,214)",
          "rgb(0,139,139)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  function getProductQuantity(product) {
    let sum = 0;
    ordersOg
      .filter((x) => x.product.id === product.id)
      .forEach((y) => {
        sum += y.quantity;
      });
    return sum;
  }

  const result = products.map((x) => ({
    id: x.id,
    product: x.name,
    category: x.category.name,
    price: x.price,
    sold: getProductQuantity(x),
    quantity: x.quantity,
  }));
  const dataCsv = products.map(
    (x, index) =>
      index <= 9 && {
        "Mã sản phẩm": x.id,
        "Tên sản phẩm": x.name,
        "Loại sản phẩm": x.category.name,
        Giá: x.price,
        "Số lượng đã bán": getProductQuantity(x),
        "Số lượng còn": x.quantity,
      }
  );

  return (
    <div>
      <div className="font-bold">Trang thống kê</div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        <div className="border bottom-2 rounded-md flex justify-center items-center">
          <PieChart chartData={data} />
        </div>
        <div className="p-4 border bottom-2 rounded-md col-start-2 col-end-5">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-4">
              <p className="pb-3">Đánh giá chất lượng sản phẩm</p>
              <div className="flex items-center">
                <Progress
                  type="dashboard"
                  percent={(fbSum * 100) / (feedbacks.length * 5)}
                />
              </div>
            </div>
            <div className="col-start-2 col-end-4 p-4">
              <p className="pb-4">Tổng quan số liệu</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-md p-2 h-28">
                  <p>Số lượt phản hồi</p>
                  <div className="flex justify-center items-center text-2xl font-bold text-green-500">
                    {contacts.length}+
                  </div>
                </div>
                <div className="border rounded-md p-2 h-28">
                  <p>Số lượt đánh giá</p>
                  <div className="flex justify-center items-center text-2xl font-bold text-red-500">
                    {feedbacks.length}+
                  </div>
                </div>
                <div className="border rounded-md p-2 h-28">
                  <p>Tổng số đơn hàng</p>
                  <div className="flex justify-center items-center text-2xl font-bold text-blue-500">
                    {ordersOg.filter((x) => x.status === 2).length}+
                  </div>
                </div>
                <div className="border rounded-md p-2 h-28">
                  <p>Tổng số hóa đơn</p>
                  <div className="flex justify-center items-center text-2xl font-bold text-yellow-500">
                    {ordersOg.filter((x) => x.status === 3).length}+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border bottom-2 rounded-md col-start-1 col-end-5">
          <div className="py-2 font-bold mb-6 grid grid-cols-2">
            <div>Top 10 sản phẩm bán chạy</div>
            <div className="flex justify-end">
              <ExportExcel apiData={dataCsv} fileName={"statitics"} />
            </div>
          </div>
          <div className="relative overflow-x-auto overflow-y-auto h-80 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng đã bán
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng còn
                  </th>
                </tr>
              </thead>
              <tbody>
                {result
                  .slice()
                  .sort((a, b) => b.sold - a.sold)
                  .map(
                    (x, index) =>
                      index <= 9 && (
                        <tr
                          key={x.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">{x.id}</td>
                          <td className="px-6 py-4">{x.product}</td>
                          <td className="px-6 py-4">{x.category}</td>
                          <td className="px-6 py-4">
                            {x.price.toLocaleString()}đ
                          </td>
                          <td className="px-6 py-4 text-center">{x.sold}</td>
                          <td className="px-6 py-4 text-center">
                            {x.quantity}
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
