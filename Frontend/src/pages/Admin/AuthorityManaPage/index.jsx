import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Button, Checkbox, Input, Modal, Pagination, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, deleteById, getAllAuthority } from "~/app/reducers/authority";
import { getAllRole } from "~/app/reducers/role";
import { getAllUser, getUserById } from "~/app/reducers/user";

function AuthorityManaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [personId, setPersonId] = useState(-1);
  const [roleId, setRoleId] = useState(-1);
  const [autho, setAutho] = useState({});
  const [itemOffset, setItemOffset] = useState(0);
  const [visibleCheckAdmin, setVisibleCheckAdmin] = useState(false);
  const [visibleUnCheckAdmin, setVisibleUnCheckAdmin] = useState(false);
  const [visibleCheckEmployee, setVisibleCheckEmployee] = useState(false);
  const [visibleUnCheckEmployee, setVisibleUnCheckEmployee] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const personnels = useSelector((state) => state.user.users);
  const authorities = useSelector((state) => state.authority.authorities);
  const roles = useSelector((state) => state.role.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRole());
  }, []);

  useEffect(() => {
    dispatch(getAllAuthority());
    dispatch(getAllUser());
  }, [
    visibleCheckEmployee,
    visibleCheckAdmin,
    visibleUnCheckAdmin,
    visibleUnCheckEmployee,
  ]);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = personnels
    .filter((x) => x.role.some((x) => x.name !== "KHÁCH HÀNG"))
    .slice(itemOffset, endOffset);
  const size = personnels.filter((x) =>
    x.role.some((x) => x.name !== "KHÁCH HÀNG")
  ).length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset =
      ((page - 1) * itemsPerPage) %
      personnels.filter((x) => x.role.some((x) => x.name !== "KHÁCH HÀNG"))
        .length;
    setItemOffset(newOffset);
  };

  const listUser = personnels.filter(
    (x) =>
      x.role.some((x) => x.name !== "NHÂN VIÊN" && x.name !== "QUẢN LÝ") &&
      x.role.length === 1
  );

  function getIdEmployee(id, e) {
    const auth = authorities.find((x) => x.user.id === id);
    dispatch(getUserById(id));
    if (e.target.checked === false) {
      setVisibleCheckEmployee(true);
    } else {
      setVisibleUnCheckEmployee(true);
    }
    setAutho(auth.user);
  }
  function getIdAdmin(id, e) {
    const auth = authorities.find((x) => x.user.id === id);
    dispatch(getUserById(id));
    if (e.target.checked === false) {
      setVisibleCheckAdmin(true);
    } else {
      setVisibleUnCheckAdmin(true);
    }
    setAutho(auth.user);
  }

  function handleRoleChangeAdmin() {
    if (visibleCheckAdmin) {
      dispatch(
        deleteById(
          authorities
            .filter((x) => x.user.id === autho.id)
            .find((x) => x.role.name === "QUẢN LÝ").id
        )
      );
      window.location.reload();
      setVisibleCheckAdmin(false);
    } else {
      dispatch(
        add({
          role: {
            id: 1,
            name: "QUẢN LÝ",
          },
          user: autho,
        })
      );
      setVisibleUnCheckAdmin(false);
    }
    messageApi.success("Thay đổi quyền thành công");
  }

  function handleRoleChangeEmployee() {
    if (visibleCheckEmployee) {
      dispatch(
        deleteById(
          authorities
            .filter((x) => x.user.id === autho.id)
            .find((x) => x.role.name === "NHÂN VIÊN").id
        )
      );
      window.location.reload();
      setVisibleCheckEmployee(false);
    } else {
      dispatch(
        add({
          role: {
            id: 2,
            name: "NHÂN VIÊN",
          },
          user: autho,
        })
      );
      setVisibleUnCheckEmployee(false);
    }
    messageApi.success("Thay đổi quyền thành công");
  }

  function handleAddAutho() {
    const perId =
      personId === -1
        ? personnels.filter((x) =>
            x.role.some((x) => x.name === "KHÁCH HÀNG")
          )[0].id
        : personId;
    const roId =
      roleId === -1
        ? roles.filter((x) => x.name !== "KHÁCH HÀNG")[0].id
        : roleId;
    dispatch(
      add({
        user: personnels.find((x) => x.id === Number(perId)),
        role: roles.find((x) => x.id === Number(roId)),
      })
    );
    setVisibleAdd(false);
    messageApi.success("Thêm quyền thành công");
  }

  return (
    <div className="text-black pt-6 p-4">
      {contextHolder}
      <div className="font-bold mb-3">Quản lý hóa đơn</div>
      <div>
        <div className="mb-6 grid grid-cols-2">
          <div>
            <Input.Search
              onSearch={(value) =>
                setTimeout(() => setValueSearch(value), 1000)
              }
              size="large"
              allowClear
              placeholder="Tìm kiếm..."
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => setVisibleAdd(true)}
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              Thêm quyền nhân viên
            </Button>
          </div>
        </div>
        <div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Họ tên
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Nhân viên
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Quản lý
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter((x) => x.fullname.toLowerCase().includes(valueSearch))
                .map((x) => (
                  <tr className="bg-white" key={x.id}>
                    <td className="py-4 px-6">{x.fullname}</td>
                    <td className="py-4 px-6 text-center">
                      <Checkbox
                        checked={
                          x.role.some((x) => x.name === "NHÂN VIÊN")
                            ? true
                            : false
                        }
                        id={x.id}
                        value="NHÂN VIÊN"
                        onChange={(e) => getIdEmployee(x.id, e)}
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Checkbox
                        checked={
                          x.role.some((x) => x.name === "QUẢN LÝ")
                            ? true
                            : false
                        }
                        id={x.id}
                        value="QUẢN LÝ"
                        onChange={(e) => getIdAdmin(x.id, e)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Modal check admin */}
          <Modal
            open={visibleCheckAdmin}
            title="Xác nhận thay đổi quyền quản lý"
            onOk={handleRoleChangeAdmin}
            onCancel={() => setVisibleCheckAdmin(false)}
          >
            <h3 className="text-lg font-normal text-gray-500">
              Bạn chắc muốn xóa quyền quản lý ?
            </h3>
          </Modal>
          {/* Modal uncheck admin */}
          <Modal
            open={visibleUnCheckAdmin}
            title="Xác nhận thay đổi quyền quản lý"
            onOk={handleRoleChangeAdmin}
            onCancel={() => setVisibleUnCheckAdmin(false)}
          >
            <h3 className="text-lg font-normal text-gray-500">
              Bạn chắc muốn thêm quyền quản lý ?
            </h3>
          </Modal>
          {/* Modal check Employee */}
          <Modal
            open={visibleCheckEmployee}
            title="Xác nhận thay đổi quyền nhân viên"
            onOk={handleRoleChangeEmployee}
            onCancel={() => setVisibleCheckEmployee(false)}
          >
            <h3 className="text-lg font-normal text-gray-500">
              Bạn chắc muốn xóa quyền nhân viên ?
            </h3>
          </Modal>
          {/* Modal uncheck Employee */}
          <Modal
            open={visibleUnCheckEmployee}
            title="Xác nhận thay đổi quyền nhân viên"
            onOk={handleRoleChangeEmployee}
            onCancel={() => setVisibleUnCheckEmployee(false)}
          >
            <h3 className="font-normal text-gray-500 ">
              Bạn chắc muốn thêm quyền nhân viên ?
            </h3>
          </Modal>
          {/* Modal add */}
          <Modal
            open={visibleAdd}
            title="Thêm quyền nhân viên"
            onCancel={() => setVisibleAdd(false)}
            onOk={handleAddAutho}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>Người dùng</div>
                <select
                  onChange={(e) => setPersonId(e.target.value)}
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {listUser.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.fullname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div>Quyền nhân viên</div>
                <select
                  onChange={(e) => setRoleId(e.target.value)}
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {roles
                    .filter((x) => x.name !== "KHÁCH HÀNG")
                    .map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="text-red-600">
              {listUser.length === 0 ? "Danh sách người dùng trống" : ""}
            </div>
          </Modal>
        </div>
        <div className="flex justify-center items-center mt-3">
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
  );
}

export default AuthorityManaPage;
