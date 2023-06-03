-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 03, 2023 lúc 06:17 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `datn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(10) NOT NULL,
  `hoten` varchar(225) DEFAULT NULL,
  `gioi_tinh` bit(10) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `dia_chi` varchar(225) DEFAULT NULL,
  `ngay_sinh` datetime DEFAULT NULL,
  `mat_khau` varchar(225) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account_role`
--

CREATE TABLE `account_role` (
  `id` int(10) NOT NULL,
  `id_role` int(10) DEFAULT NULL,
  `id_account` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_detail`
--

CREATE TABLE `cart_detail` (
  `id` int(10) NOT NULL,
  `ten_san_pham` varchar(225) DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `so_luong` int(10) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `anh` varchar(225) DEFAULT NULL,
  `mau` varchar(22) DEFAULT NULL,
  `size` varchar(225) DEFAULT NULL,
  `trang-thai` int(10) DEFAULT NULL,
  `id_khach_hang` int(10) DEFAULT NULL,
  `id_san_pham_chi_tiet` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `color`
--

CREATE TABLE `color` (
  `id` int(10) NOT NULL,
  `ten_mau` varchar(225) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` int(10) NOT NULL,
  `ten_khach_hang` varchar(225) DEFAULT NULL,
  `username` varchar(225) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL,
  `dia_chi` varchar(225) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `delete` int(11) DEFAULT NULL,
  `ma_phuong` int(10) DEFAULT NULL,
  `ten_phuong` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gender`
--

CREATE TABLE `gender` (
  `id` int(10) NOT NULL,
  `ten` varchar(225) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image` (
  `id` int(10) NOT NULL,
  `photo` varchar(225) DEFAULT NULL,
  `trang_thai` varchar(10) DEFAULT NULL,
  `isdefault` tinyint(1) DEFAULT NULL,
  `id_san_pham` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `material`
--

CREATE TABLE `material` (
  `id` int(10) NOT NULL,
  `ten` varchar(225) DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oder`
--

CREATE TABLE `oder` (
  `id` int(10) NOT NULL,
  `ten_nguoi_nhan` varchar(225) DEFAULT NULL,
  `sdt_nguoi_nhan` int(11) DEFAULT NULL,
  `dia_chi_nguoi_nhan` varchar(225) DEFAULT NULL,
  `ngay_ship` datetime DEFAULT NULL,
  `ngay_nhan` datetime DEFAULT NULL,
  `ghi_chu` varchar(225) DEFAULT NULL,
  `giá_ship` double DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `tien_khuyen_mai` double DEFAULT NULL,
  `tien_thanh_toan` double DEFAULT NULL,
  `ten_nguoi_tao` varchar(225) DEFAULT NULL,
  `kieu_hoa_don` int(10) DEFAULT NULL,
  `id_khach_hang` int(10) DEFAULT NULL,
  `id_account` int(10) DEFAULT NULL,
  `id_vocher` int(10) DEFAULT NULL,
  `is_status` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oder_detail`
--

CREATE TABLE `oder_detail` (
  `id` int(10) NOT NULL,
  `ten_san_pham` varchar(225) DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `so_luong` int(225) DEFAULT NULL,
  `anh` varchar(225) DEFAULT NULL,
  `mau` varchar(225) DEFAULT NULL,
  `size` varchar(225) DEFAULT NULL,
  `chat_lieu` varchar(225) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `gioi_tinh` varchar(225) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `id_san_pham_chi_tiet` int(10) DEFAULT NULL,
  `id_oder` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oder_history`
--

CREATE TABLE `oder_history` (
  `id` int(10) NOT NULL,
  `ten` varchar(225) DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `kieu_trang_thai` int(10) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `id_status` int(10) DEFAULT NULL,
  `id_oder` int(10) DEFAULT NULL,
  `id_account` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `ten_san_pham` varchar(225) DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `so_luong` int(10) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `anh` varchar(225) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `id_gender` int(10) DEFAULT NULL,
  `id_material` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_detail`
--

CREATE TABLE `product_detail` (
  `id` int(10) NOT NULL,
  `ten_san_pham` varchar(225) DEFAULT NULL,
  `so_luong` int(10) DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `anh` varchar(225) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `id_san_pham` int(10) DEFAULT NULL,
  `id_size` int(10) DEFAULT NULL,
  `id_color` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion`
--

CREATE TABLE `promotion` (
  `id` int(10) NOT NULL,
  `ten_khuyen_mai` varchar(225) DEFAULT NULL,
  `gia_tri` int(10) DEFAULT NULL,
  `ngay_bat_dau` datetime DEFAULT NULL,
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `so_luong` int(10) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion_detail`
--

CREATE TABLE `promotion_detail` (
  `id` int(10) NOT NULL,
  `id_promotion` int(10) DEFAULT NULL,
  `id_san_pham` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(10) NOT NULL,
  `ten_role` varchar(225) DEFAULT NULL,
  `trang-thai` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `size`
--

CREATE TABLE `size` (
  `id` int(10) NOT NULL,
  `ten` varchar(225) NOT NULL,
  `trang_thai` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status`
--

CREATE TABLE `status` (
  `id` int(10) NOT NULL,
  `title` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `voucher`
--

CREATE TABLE `voucher` (
  `id` int(10) NOT NULL,
  `ten_voucher` varchar(225) DEFAULT NULL,
  `gia_tri` int(10) DEFAULT NULL,
  `ngay_bat_dau` datetime DEFAULT NULL,
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `dieu_kien` double DEFAULT NULL,
  `so_luong` int(10) DEFAULT NULL,
  `trang_thai` int(10) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `account_role`
--
ALTER TABLE `account_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_role_ibfk_1` (`id_account`),
  ADD KEY `account_role_ibfk_2` (`id_role`);

--
-- Chỉ mục cho bảng `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_san_pham_chi_tiet` (`id_san_pham_chi_tiet`),
  ADD KEY `id_khach_hang` (`id_khach_hang`);

--
-- Chỉ mục cho bảng `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_san_pham` (`id_san_pham`);

--
-- Chỉ mục cho bảng `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `oder`
--
ALTER TABLE `oder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vocher` (`id_vocher`),
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_khach_hang` (`id_khach_hang`),
  ADD KEY `is_status` (`is_status`);

--
-- Chỉ mục cho bảng `oder_detail`
--
ALTER TABLE `oder_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_oder` (`id_oder`),
  ADD KEY `id_san_pham_chi_tiet` (`id_san_pham_chi_tiet`);

--
-- Chỉ mục cho bảng `oder_history`
--
ALTER TABLE `oder_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_status` (`id_status`),
  ADD KEY `id_oder` (`id_oder`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_material` (`id_material`),
  ADD KEY `id_gender` (`id_gender`);

--
-- Chỉ mục cho bảng `product_detail`
--
ALTER TABLE `product_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_san_pham` (`id_san_pham`),
  ADD KEY `id_size` (`id_size`);

--
-- Chỉ mục cho bảng `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotion_detail`
--
ALTER TABLE `promotion_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promotion` (`id_promotion`),
  ADD KEY `id_san_pham` (`id_san_pham`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account_role`
--
ALTER TABLE `account_role`
  ADD CONSTRAINT `account_role_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `account_role_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`);

--
-- Các ràng buộc cho bảng `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD CONSTRAINT `cart_detail_ibfk_1` FOREIGN KEY (`id_san_pham_chi_tiet`) REFERENCES `product_detail` (`id`),
  ADD CONSTRAINT `cart_detail_ibfk_2` FOREIGN KEY (`id_khach_hang`) REFERENCES `customer` (`id`);

--
-- Các ràng buộc cho bảng `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_san_pham`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `oder`
--
ALTER TABLE `oder`
  ADD CONSTRAINT `oder_ibfk_1` FOREIGN KEY (`id_vocher`) REFERENCES `voucher` (`id`),
  ADD CONSTRAINT `oder_ibfk_2` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `oder_ibfk_3` FOREIGN KEY (`id_khach_hang`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `oder_ibfk_4` FOREIGN KEY (`is_status`) REFERENCES `status` (`id`);

--
-- Các ràng buộc cho bảng `oder_detail`
--
ALTER TABLE `oder_detail`
  ADD CONSTRAINT `oder_detail_ibfk_1` FOREIGN KEY (`id_oder`) REFERENCES `oder` (`id`),
  ADD CONSTRAINT `oder_detail_ibfk_2` FOREIGN KEY (`id_san_pham_chi_tiet`) REFERENCES `product_detail` (`id`);

--
-- Các ràng buộc cho bảng `oder_history`
--
ALTER TABLE `oder_history`
  ADD CONSTRAINT `oder_history_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `oder_history_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `oder_history_ibfk_3` FOREIGN KEY (`id_oder`) REFERENCES `oder` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `material` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_gender`) REFERENCES `gender` (`id`);

--
-- Các ràng buộc cho bảng `product_detail`
--
ALTER TABLE `product_detail`
  ADD CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `product_detail_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_detail_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`);

--
-- Các ràng buộc cho bảng `promotion_detail`
--
ALTER TABLE `promotion_detail`
  ADD CONSTRAINT `promotion_detail_ibfk_1` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `promotion_detail_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
