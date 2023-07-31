import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

import { Link } from "react-router-dom";
import authoService from "~/services/authoService";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "~/app/reducers/product";

import { Badge, Breadcrumb, Pagination } from "antd";
import { getAllCategory } from "~/app/reducers/category";
import { add, deleteById, getAllFavourite } from "~/app/reducers/favourite";

function FavouritePage() {
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.product.products);
  const favourites = useSelector((state) => state.favourite.favourites);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllFavourite());
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  const favo = favourites.filter((x) => x.user.id === currentUser.id);
  const size = favo.map((x) => x.product).length;
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = favo.map((x) => x.product).slice(itemOffset, endOffset);

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) % favo.map((x) => x.product).length;
    setItemOffset(newOffset);
  };

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
      <br />
      <div className="px-36">
        <div className="mt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Yêu thích</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="mt-6">
          <div className="text-center text-2xl font-bold">
            Sản phẩm yêu thích
          </div>
          <div className="grid grid-cols-5 gap-3 mt-6">
            {currentItems.map((x) => (
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
                        <p className="font-bold text-gray-900 py-2">{x.name}</p>
                      </Link>
                      <div className="flex items-start gap-1">
                        {x.color.map((y) => (
                          <div
                            style={{ backgroundColor: y.descriptions }}
                            className="w-4 h-4 border-2 border-white rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between gap-1">
                      <span className="text-2xl font-bold dark:text-white">
                        {x.price.toLocaleString()}đ
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
            <div className="col-start-1 col-end-6 flex justify-center items-center mt-3">
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

export default FavouritePage;
