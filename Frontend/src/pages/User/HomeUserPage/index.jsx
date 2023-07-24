import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authoService from "~/services/authoService";

import banner4 from "~/assets/images/banner-home-5.png";
import banner3 from "~/assets/images/banner-home-6.png";
import banner2 from "~/assets/images/banner-home-7.png";
import banner1 from "~/assets/images/banner-home-8.png";

import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "~/app/reducers/product";

import { Badge, Carousel, Input, Pagination } from "antd";
import { add, deleteById, getAllFavourite } from "~/app/reducers/favourite";
import { getAllColor } from "../../../app/reducers/color";
import { getAllSize } from "../../../app/reducers/size";

function HomeUserPage() {
  const [filterSize, setFilterSize] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.product.products);
  const sizes = useSelector((state) => state.size.sizes);
  const colors = useSelector((state) => state.color.colors);
  const favourites = useSelector((state) => state.favourite.favourites);
  const [currentUser, setCurrentUser] = useState({});
  const [valueSearch, setValueSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllFavourite());
    dispatch(getAllSize());
    dispatch(getAllColor());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === "size") {
        setFilterSize(value);
      } else if (key === "color") {
        setFilterColor(value);
      }
    });
  }, [searchParams]);

  const favo = favourites.filter((x) => x.user.id === currentUser?.id);
  const size = products.filter(
    (x) =>
      // x.category.name.includes(filter) &&
      x.status === 1
  ).length;
  const itemsPerPage = 16;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products
    .filter((x) => x.status === 1)
    .slice(itemOffset, endOffset);
  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) %
      products.filter((x) => x.status === 1).length;
    setItemOffset(newOffset);
  };

  function handleFilter(type, x) {
    if (type === "size") {
      searchParams.set("size", x);
    } else if (type === "color") {
      searchParams.set("color", x);
    }
    setSearchParams(searchParams);
  }

  function handleFavourite(id, isLike) {
    if (isLike) {
      const idLike = favo.find((x) => x.product.id === id).id;
      dispatch(deleteById(idLike));
    } else {
      dispatch(
        add({
          user: currentUser,
          product: products.find((x) => x.id === id),
        })
      );
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
      <div className="mb-10">
        <div className="h-56 sm:h-64 xl:h-96">
          <Carousel autoplay>
            <img src={banner1} alt="banner1" />
            <img src={banner2} alt="banner2" />
            <img src={banner3} alt="banner3" />
            <img src={banner4} alt="banner4" />
          </Carousel>
        </div>
        <div className="grid grid-cols-4 px-36 mt-24">
          <div>
            <aside className="w-64" aria-label="Sidebar">
              <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
                <div className="space-y-2 font-bold">Lọc sản phẩm</div>
                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                  <li
                    className="ml-3 cursor-pointer list-none"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Tất cả
                  </li>
                  <li className="ml-3 cursor-pointer list-none font-bold">
                    Theo kích cỡ
                  </li>
                  {sizes.map((x) => (
                    <li key={x.id} className="list-none">
                      <div
                        onClick={() => handleFilter("size", x.name)}
                        className="block p-1 cursor-pointer"
                      >
                        <span className="ml-3">{x.name}</span>
                      </div>
                    </li>
                  ))}
                  <li className="ml-3 cursor-pointer list-none font-bold">
                    Theo màu sắc
                  </li>
                  {colors.map((x) => (
                    <li key={x.id} className="list-none">
                      <div
                        onClick={() => handleFilter("color", x.name)}
                        className="block p-1 cursor-pointer"
                      >
                        <span className="ml-3">{x.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          <div className="col-start-2 col-end-5 grid grid-cols-4 gap-3">
            <div className="col-start-1 col-end-5 mb-4 flex justify-end">
              <Input.Search
                placeholder="Tìm kiếm sản phẩm..."
                onSearch={(value) => setValueSearch(value)}
                size="large"
                className="w-1/2"
              />
            </div>
            {currentItems
              .filter(
                (x) =>
                  x.color.some((y) => y.name.includes(filterColor)) &&
                  x.size.some((y) => y.name.includes(filterSize)) &&
                  x.name.toUpperCase().includes(valueSearch.toUpperCase())
              )
              .map((x) => (
                <Badge.Ribbon
                  key={x.id}
                  className={`${x.sale <= 0 && x.quantity > 0 ? "hidden" : ""}`}
                  color={x.sale > 0 ? "blue" : x.quantity <= 0 ? "red" : ""}
                  text={
                    <div>
                      {x.sale > 0 ? (
                        <p>Khuyến mãi - {x.sale}%</p>
                      ) : (
                        <div>{x.quantity <= 0 ? <p>Hết hàng</p> : ""}</div>
                      )}
                    </div>
                  }
                >
                  <div className="w-full h-96 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/product-detail/${x.id}/${x.name}`}>
                      <img
                        className="rounded-t-lg w-full transition duration-1000 h-64 hover:scale-105"
                        src={x.image}
                        alt={x.name}
                      />
                    </Link>
                    <div className="px-5 grid grid-rows-3 h-32 max-h-32">
                      <div className="row-start-1 row-end-3">
                        <Link
                          to={`/product-detail/${x.id}/${x.name}`}
                          className="no-underline"
                        >
                          <p className="font-bold text-gray-900 py-2">
                            {x.name}
                          </p>
                        </Link>
                        <div className="flex items-start gap-1">
                          {x.color.map((y, index) => (
                            <div
                              key={index}
                              style={{ backgroundColor: y.descriptions }}
                              className="w-4 h-4 border-2 border-white rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between gap-1">
                        <span className="text-2xl font-bold dark:text-white">
                          {(
                            x.price -
                            (x.price * x.sale) / 100
                          ).toLocaleString()}
                          đ
                        </span>
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            handleFavourite(
                              x.id,
                              favo.some((y) => y.product.id === x.id)
                            )
                          }
                        >
                          {favo.some((y) => y.product.id === x.id) ? (
                            <FontAwesomeIcon
                              icon={faHeartSolid}
                              className="text-red-600 text-xl"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="text-red-600 text-xl"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              ))}
            <div className="col-start-1 col-end-5 flex justify-center items-center mt-3">
              {/* Pagination */}
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                onChange={handlePageClick}
                pageSize={itemsPerPage}
                total={size}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}

export default HomeUserPage;
