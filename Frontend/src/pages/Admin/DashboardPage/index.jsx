import statis from "~/assets/images/statis.svg";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "~/components/ChartJs/BarChart";

import {
  faSackDollar,
  faShirt,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllProduct } from "~/app/reducers/product";
import { getAllUser } from "~/app/reducers/user";
import { getAllOrderDetail } from "~/app/reducers/orderDetail";

function DashboardPage() {
  const products = useSelector((state) => state.product.products);
  const users = useSelector((state) => state.user.users);
  const statisByMonth = useSelector((state) => state.orderDetail.statisByMonth);
  const totalRevenue = useSelector((state) => state.orderDetail.totalRevenue);
  const dispatch = useDispatch();

  const monthData = {
    labels: statisByMonth.map((data) => data.month),
    datasets: [
      {
        label: "Sản phẩm bán trong tháng",
        data: statisByMonth.map((data) => data.numberProduct),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllUser());
    dispatch(getAllOrderDetail());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5">
        <div className="flex justify-center items-center">
          <img src={statis} alt="statis" className="h-36" />
        </div>
        <div className="border-2 p-2 border-gray-100 col-start-2 col-end-6 rounded-md">
          <div className="h-1/5 font-bold mb-1">Thông số thống kê</div>
          <div className="grid grid-cols-4 gap-2 h-4/5">
            <div className="bg-red-400 rounded-md p-2 text-white">
              <p>Tổng số sản phẩm</p>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faShirt} className="text-3xl pt-3" />
                </div>
                <div className="col-start-2 col-end-6 flex justify-center items-center text-xl">
                  {products.length}
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-md p-2 text-white">
              <p>Tổng doanh thu</p>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="text-3xl pt-3"
                  />
                </div>
                <div className="col-start-2 col-end-6 flex justify-center items-center text-xl">
                  {totalRevenue.toLocaleString()} VND
                </div>
              </div>
            </div>
            <div className="bg-green-400 rounded-md p-2 text-white">
              <p>Tổng số khách hàng</p>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faUser} className="text-3xl pt-3" />
                </div>
                <div className="col-start-2 col-end-6 flex justify-center items-center text-xl">
                  {
                    users.filter((x) =>
                      x.role.some((x) => x.name === "KHÁCH HÀNG")
                    ).length
                  }
                </div>
              </div>
            </div>
            <div className="bg-yellow-400 rounded-md p-2 text-white">
              <p>Tổng số nhân viên</p>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faUsers} className="text-3xl pt-3" />
                </div>
                <div className="col-start-2 col-end-6 flex justify-center items-center text-xl">
                  {
                    users.filter((x) =>
                      x.role.some(
                        (x) => x.name === "ADMIN" || x.name === "NHÂN VIÊN"
                      )
                    ).length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-4 font-bold grid grid-cols-2">
        <div>Số sản phẩm bán ra từng tháng theo năm</div>
        <div className="flex justify-end">
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">2023</option>
            <option value="">2022</option>
            <option value="">2021</option>
            <option value="">2020</option>
            <option value="">2019</option>
          </select>
        </div>
      </div>
      <div className="px-48 flex justify-center items-center">
        <BarChart chartData={monthData} />
      </div>
    </div>
  );
}

export default DashboardPage;
