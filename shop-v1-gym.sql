-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2023 at 03:38 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop-v1-gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `authority`
--

CREATE TABLE `authority` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authority`
--

INSERT INTO `authority` (`id`, `user_id`, `role_id`) VALUES
(4, 3, 3),
(19, 4, 3),
(22, 5, 3),
(23, 7, 3),
(26, 10, 2),
(27, 8, 1),
(29, 9, 1),
(33, 3, 1),
(35, 10, 1),
(38, 1, 2),
(40, 9, 2),
(41, 1, 1),
(42, 11, 3),
(43, 12, 3),
(44, 13, 3),
(45, 3, 1),
(46, 7, 2),
(47, 3, 1),
(48, 8, 2),
(49, 7, 1),
(50, 14, 3),
(51, 15, 3),
(52, 16, 3);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `status`) VALUES
(1, 'Băng tay tập gym', 'Chất liệu mềm dẻo, thoải mái.', 1),
(2, 'Túi phụ kiện', 'Chất lượng thoải mái, mát mẻ.', 1),
(3, 'Dây tập gym', 'Bền đẹp', 1),
(4, 'Áo tập gym', 'Chất liệu cao cấp', 1),
(5, 'Găng tay tập gym', 'Xinh xắn', 1),
(6, 'Giày tập gym', 'Giày tập gym tiêu chuẩn đủ mọi kích cỡ', 1),
(7, 'Set quần áo tập gym', 'Bộ đồ tập gym set thoải mái, chất liệu đẹp', 1),
(9, 'Quần tập gym', 'Chất liệu bền đẹp thoải mái khi mặc', 1),
(11, 'Postgresq', 'ok', 1);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `descriptions` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `name`, `descriptions`) VALUES
(1, 'Xanh ngọc', '#7ed6df'),
(2, 'Hồng', '#ff7979'),
(3, 'Đen xám', '#57606f'),
(4, 'Xanh dương', '#1e90ff'),
(5, 'Xanh lá cây', '#2ed573'),
(6, 'Cam', '#ffa502'),
(7, 'Xám', '#f1f2f6'),
(8, 'Tím nhẹ', '#a55eea'),
(9, 'Vàng', '#fff200'),
(10, 'Đỏ', '#ff3838'),
(11, 'Đen', '#000000');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `address`, `title`, `status`, `content`, `phone`) VALUES
(1, 'Nguyễn Văn Nam', 'namg@gmail.com', 'Hà Nội', 'Cộng tác bán hàng', 0, 'Liên hệ trao đổi hợp tác', '032456859'),
(2, 'Kim Nam', 'namkim@gmail.com', 'Sơn Tây, Hà Nội', 'Liên kết quảng cáo', 1, 'Liên kết quảng bá sản phẩm', '0237547555'),
(3, 'abc', 'ac@gmail.com', 'mn', 'abc', 1, 'mn', '11111'),
(4, 'check', 'check@gmail.com', '', 'check', 0, 'check', '123456789'),
(5, 'check', 'check@gmail.com', '', 'check', 0, '', '123456789'),
(6, 'check', 'check@gmail.com', '', 'check', 0, '', '123456789'),
(7, 'abc', 'abc@gmail.com', 'oke', 'abc', 0, 'oke', '123456789'),
(8, 'abc', 'abc@gmail.com', 'oke', 'abc', 0, 'oke', '123456789'),
(9, 'abc', 'abc@gmail.com', 'oke', 'abc', 0, 'oke', '123456789'),
(10, 'oke', 'ok@gmail.com', 'checkk', 'okeok', 0, 'oke', '123456789'),
(11, 'chekc2', 'chekc2@gmail.com', 'chekc2', 'chekc2', 0, 'chekc2', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `favourite`
--

CREATE TABLE `favourite` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourite`
--

INSERT INTO `favourite` (`id`, `user_id`, `product_id`) VALUES
(2, 3, 3),
(11, 2, 1),
(12, 2, 3),
(15, 3, 6),
(16, 3, 17),
(17, 3, 18),
(18, 3, 5),
(19, 5, 1),
(20, 5, 3),
(24, 1, 2),
(25, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `quality` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `content`, `date`, `status`, `product_id`, `rate`, `quality`) VALUES
(1, 1, 'sản phẩm tốt', '2023-01-04 00:00:00', 1, 17, 4, 'Tốt'),
(2, 2, 'Chất liệu thoải mái, màu sắc hiện đại', '2023-01-01 00:00:00', 1, 1, 5, 'Tuyệt vời'),
(3, 1, 'Chất lượng tuyệt vời', '2023-02-10 17:31:45', 1, 1, 4, 'Tốt'),
(4, 1, 'Sản phẩm chất lượng, đúng mô tả.', '2023-02-21 23:14:11', 0, 12, 4, 'Tốt'),
(5, 1, 'Sản phẩm tốt 5 sao', '2023-06-30 18:46:17', 0, 6, 5, 'Tuyệt vời'),
(6, 1, 'CHECKKK', '2023-07-02 08:30:58', 0, 5, 4, 'Tốt'),
(7, 1, 'ok', '2023-07-02 22:08:07', 0, 5, 4, 'Tốt'),
(8, 12, 'ĐÁNH GIÁ 5 SAO', '2023-07-09 08:33:48', 0, 6, 4, 'Tốt');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `size` varchar(5) NOT NULL,
  `color` varchar(20) NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `code` int(11) NOT NULL,
  `selected` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `address`, `date`, `status`, `product_id`, `quantity`, `phone`, `size`, `color`, `date_end`, `code`, `selected`) VALUES
(15, 1, 'check voucher', '2023-02-01 10:00:00', 2, 5, 7, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(16, 2, 'check', '2023-01-03 00:00:00', 2, 6, 3, '123456789', 'L', '', '2023-07-05 21:47:58', 0, 0),
(17, 2, 'check', '2023-02-02 00:00:00', 2, 1, 1, '123456789', 'S', '', '2023-07-05 21:47:58', 0, 0),
(18, 2, 'pending', '2023-01-02 00:00:00', 0, 1, 1, '032457859', 'L', '', 'Đang giao', 0, 0),
(19, 2, 'check', '2023-02-02 00:00:00', 2, 9, 3, '123456789', 'XL', '', '2023-07-05 21:47:58', 0, 0),
(20, 1, 'check voucher', '2023-03-08 00:00:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(21, 1, 'check voucher', '2023-02-02 00:00:00', 2, 1, 1, '123456789', 'S', '', '2023-07-08 10:39:08', 20, 0),
(22, 1, 'check voucher', '2023-02-04 00:00:00', 2, 12, 3, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(23, 1, 'check voucher', '2023-02-04 00:00:00', 2, 9, 4, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(24, 1, 'check voucher', '2023-02-07 00:00:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(25, 1, 'check voucher', '2023-02-09 00:00:00', 2, 1, 5, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(32, 1, 'check voucher', '2023-02-11 00:00:00', 2, 13, 3, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(33, 1, 'check voucher', '2023-02-19 11:03:00', 2, 16, 2, '123456789', 'S', '', '2023-07-08 10:39:08', 20, 0),
(34, 2, 'check', '2023-02-22 21:24:00', 2, 1, 2, '123456789', 'L', '', '2023-07-05 21:47:58', 0, 0),
(35, 2, 'pending', '2023-02-22 21:40:00', 0, 3, 6, 'pending', '', '', 'pending', 0, 0),
(36, 1, 'check voucher', '2023-02-23 22:58:00', 2, 1, 2, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(39, 3, 'Long Biên, Hà Nội', '2023-02-28 22:19:00', 3, 7, 2, '123456789', 'XL', '', '2023-03-15 22:04:25', 3, 1),
(41, 3, 'Long Biên, Hà Nội', '2023-03-01 21:26:00', 3, 10, 9, '123456789', 'XL', '', '2023-03-15 22:04:25', 2, 1),
(42, 3, 'Long Biên, Hà Nội', '2023-03-01 21:28:00', 3, 1, 1, '123456789', 'M', '', '2023-03-15 22:04:25', 2, 1),
(43, 3, 'Long Biên, Hà Nội', '2023-03-04 19:46:00', 3, 1, 3, '123456789', 'XL', '', '2023-03-15 22:04:25', 0, 1),
(44, 3, 'Long Biên, Hà Nội', '2023-03-04 19:46:00', 3, 3, 2, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(45, 3, 'Long Biên, Hà Nội', '2023-03-11 21:51:00', 3, 18, 1, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(46, 3, 'Long Biên, Hà Nội', '2023-03-11 22:00:00', 3, 6, 1, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(47, 3, 'Long Biên, Hà Nội', '2023-03-11 22:00:00', 3, 15, 2, '123456789', 'XL', '', '2023-03-15 22:04:25', 0, 1),
(48, 3, 'Long Biên, Hà Nội', '2023-03-11 22:02:00', 3, 3, 1, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(49, 3, 'Long Biên, Hà Nội', '2023-03-11 22:02:00', 3, 6, 1, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(50, 3, 'pending', '2023-03-14 21:36:00', 0, 18, 1, 'pending', 'S', '', 'pending', 0, 0),
(51, 3, 'pending', '2023-03-14 21:38:00', 0, 18, 1, 'pending', 'S', '', 'pending', 0, 0),
(52, 3, 'pending', '2023-03-14 21:40:00', 0, 18, 1, 'pending', 'S', '', 'pending', 0, 0),
(53, 3, 'pending', '2023-03-14 21:42:00', 0, 18, 1, 'pending', 'S', '', 'pending', 0, 0),
(54, 3, 'Long Biên, Hà Nội', '2023-03-14 21:49:00', 3, 18, 2, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(55, 3, 'Long Biên, Hà Nội', '2023-03-14 22:33:00', 3, 17, 1, '123456789', 'M', '', '2023-03-15 22:04:25', 0, 1),
(56, 3, 'Long Biên, Hà Nội', '2023-03-14 22:33:00', 3, 9, 1, '123456789', 'M', '', '2023-03-15 22:04:25', 0, 1),
(57, 3, 'Long Biên, Hà Nội', '2023-03-14 22:33:00', 3, 7, 1, '123456789', 'XL', '', '2023-03-15 22:04:25', 0, 1),
(58, 3, 'Long Biên, Hà Nội', '2023-03-15 20:39:00', 3, 10, 1, '123456789', 'M', '', '2023-03-15 22:04:25', 0, 1),
(59, 3, 'Long Biên, Hà Nội', '2023-03-15 20:39:00', 3, 6, 1, '123456789', 'S', '', '2023-03-15 22:04:25', 0, 1),
(60, 5, 'Hà Nội', '2023-05-15 22:23:00', 3, 1, 5, '123456789', 'M', '', '2023-05-15 22:25:39', 0, 1),
(61, 1, 'check voucher', '2023-05-19 16:38:00', 2, 12, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(62, 5, 'pending', '2023-06-27 06:33:00', 1, 12, 3, 'pending', 'XL', '', 'pending', 0, 0),
(63, 1, 'check voucher', '2023-06-27 06:46:00', 2, 1, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(64, 1, 'check voucher', '2023-06-27 06:55:00', 2, 1, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(65, 1, 'check voucher', '2023-06-27 06:59:00', 2, 2, 32, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(66, 1, 'check voucher', '2023-06-27 06:59:00', 2, 3, 1, '123456789', 'S', '', '2023-07-08 10:39:08', 20, 0),
(67, 1, 'check voucher', '2023-06-27 21:39:00', 2, 1, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(68, 1, 'check voucher', '2023-06-27 21:45:00', 2, 1, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(69, 1, 'check voucher', '2023-06-28 14:11:00', 2, 9, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(70, 1, 'check voucher', '2023-06-28 14:11:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(71, 1, 'check voucher', '2023-06-28 14:12:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(72, 1, 'check voucher', '2023-06-30 10:17:00', 2, 2, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(73, 1, 'check voucher', '2023-06-30 10:31:00', 2, 1, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(74, 1, 'check voucher', '2023-06-30 10:34:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(75, 1, 'check voucher', '2023-06-30 10:35:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(76, 1, 'check voucher', '2023-06-30 10:38:00', 2, 12, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(77, 1, 'check voucher', '2023-06-30 10:38:00', 2, 19, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(78, 1, 'check voucher', '2023-06-30 10:41:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(79, 2, 'pending', '2023-07-01 16:33:00', 0, 6, 1, 'pending', 'S', '', 'pending', 0, 0),
(80, 2, 'pending', '2023-07-01 16:33:00', 0, 7, 1, 'pending', 'XL', '', 'pending', 0, 0),
(81, 2, 'pending', '2023-07-01 16:38:00', 0, 1, 1, 'pending', 'XL', '', 'pending', 0, 0),
(82, 2, 'pending', '2023-07-01 16:45:00', 0, 6, 1, 'pending', 'S', '', 'pending', 0, 0),
(83, 2, 'pending', '2023-07-01 16:54:00', 0, 1, 1, 'pending', 'XL', '', 'pending', 0, 0),
(84, 2, 'pending', '2023-07-01 16:56:00', 0, 6, 1, 'pending', 'S', '', 'pending', 0, 0),
(85, 2, 'pending', '2023-07-01 16:57:00', 0, 7, 1, 'pending', 'XL', '', 'pending', 0, 0),
(86, 2, 'pending', '2023-07-01 16:57:00', 0, 13, 1, 'pending', 'XL', '', 'pending', 0, 0),
(87, 2, 'pending', '2023-07-01 16:58:00', 0, 6, 1, 'pending', 'S', '', 'pending', 0, 0),
(88, 2, 'pending', '2023-07-01 16:58:00', 0, 5, 1, 'pending', 'M', '', 'pending', 0, 0),
(89, 1, 'check voucher', '2023-07-01 21:01:00', 2, 18, 1, '123456789', 'S', '', '2023-07-08 10:39:08', 20, 0),
(90, 1, 'check voucher', '2023-07-01 21:01:00', 2, 9, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(91, 1, 'check voucher', '2023-07-01 21:01:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(92, 1, 'check voucher', '2023-07-01 21:01:00', 2, 9, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(93, 1, 'check voucher', '2023-07-01 21:01:00', 2, 2, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(94, 1, 'check voucher', '2023-07-01 21:01:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(95, 1, 'check voucher', '2023-07-01 21:01:00', 2, 20, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(96, 1, 'check voucher', '2023-07-01 21:01:00', 2, 2, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(97, 1, 'check voucher', '2023-07-01 21:01:00', 2, 15, 2, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(98, 1, 'check voucher', '2023-07-01 21:01:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(99, 1, 'check voucher', '2023-07-01 21:18:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(100, 1, 'check voucher', '2023-07-01 21:24:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(101, 1, 'check voucher', '2023-07-01 21:24:00', 2, 10, 2, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(102, 1, 'check voucher', '2023-07-01 21:26:00', 2, 2, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(103, 1, 'check voucher', '2023-07-01 21:26:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(104, 10, 'pending', '2023-07-01 21:45:00', 1, 13, 2, 'pending', 'XL', '', 'pending', 0, 0),
(105, 10, 'pending', '2023-07-01 21:48:00', 0, 2, 2, 'pending', 'L', '', '2023-07-01 21:48', 0, 0),
(106, 9, 'pending', '2023-07-01 22:01:00', 0, 2, 2, 'pending', 'L', '', '2023-07-01 22:01', 0, 0),
(107, 9, 'pending', '2023-07-01 22:01:00', 0, 13, 1, 'pending', 'XL', '', '2023-07-01 22:01', 0, 0),
(108, 9, 'pending', '2023-07-01 22:01:00', 0, 10, 1, 'pending', 'M', '', '2023-07-01 22:01', 0, 0),
(109, 9, 'pending', '2023-07-01 22:10:00', 0, 20, 1, 'pending', 'L', '', '2023-07-01 22:10', 0, 0),
(110, 9, 'pending', '2023-07-01 22:12:00', 0, 6, 2, 'pending', 'S', '', '2023-07-01 22:12', 0, 1),
(111, 1, 'check voucher', '2023-07-01 22:14:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(112, 9, 'pending', '2023-07-01 22:14:00', 1, 13, 1, 'pending', 'XL', '', '2023-07-01 22:14', 0, 1),
(113, 8, 'MRT2', '2023-07-01 22:17:00', 3, 2, 1, 'MRT', 'L', '', '2023-07-01 22:19:44', 0, 0),
(114, 8, 'CHECKK', '2023-07-01 22:17:00', 3, 7, 1, '123456789', 'XL', '', '2023-07-01 22:37:55', 0, 0),
(115, 8, 'CHECKK', '2023-07-01 22:36:00', 3, 18, 1, '123456789', 'S', '', '2023-07-01 22:37:55', 0, 0),
(116, 8, 'HNNN', '2023-07-02 07:08:00', 3, 18, 1, '123456789', 'S', '', '2023-07-02 08:36:03', 0, 0),
(117, 8, 'CHECK CHECK', '2023-07-02 07:08:00', 3, 5, 3, '123456789', 'M', '', '2023-07-08 21:25:03', 20, 0),
(118, 1, 'check voucher', '2023-07-02 16:57:00', 2, 2, 8, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(119, 1, 'check voucher', '2023-07-05 07:58:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(120, 1, 'check voucher', '2023-07-05 07:58:00', 2, 13, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(121, 1, 'check voucher', '2023-07-05 07:58:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(122, 1, 'check voucher', '2023-07-05 08:39:00', 2, 19, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(123, 1, 'check voucher', '2023-07-05 08:39:00', 2, 15, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(124, 1, 'check voucher', '2023-07-05 08:39:00', 2, 2, 1, '123456789', 'L', '', '2023-07-08 10:39:08', 20, 0),
(125, 1, 'check voucher', '2023-07-05 08:39:00', 2, 5, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(126, 1, 'check voucher', '2023-07-05 08:39:00', 2, 9, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(127, 2, 'pending', '2023-07-05 09:02:00', 0, 17, 1, 'pending', 'M', '', '2023-07-05 09:02', 0, 0),
(128, 2, 'check', '2023-07-05 09:02:00', 2, 19, 4, '123456789', 'M', '', '2023-07-05 21:47:58', 0, 0),
(129, 1, 'check voucher', '2023-07-05 11:20:00', 2, 7, 1, '123456789', 'XL', '', '2023-07-08 10:39:08', 20, 0),
(130, 1, 'check voucher', '2023-07-05 11:20:00', 2, 17, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(131, 1, 'check voucher', '2023-07-05 11:20:00', 2, 19, 1, '123456789', 'M', '', '2023-07-08 10:39:08', 20, 0),
(132, 2, 'OKEEE', '2023-07-05 13:46:00', 2, 2, 1, '11111111111', 'L', '', '2023-07-05 21:53:24', 0, 0),
(133, 1, 'MISSING', '2023-07-08 13:25:00', 0, 9, 2, 'MISSING', 'M', '', '2023-07-08 13:25', 0, 1),
(134, 1, 'MISSING', '2023-07-09 08:26:00', 1, 6, 1, 'MISSING', 'S', 'Đỏ', '2023-07-09 08:26', 0, 1),
(135, 12, 'Hà Nội', '2023-07-09 08:28:00', 3, 6, 1, '123456789', 'S', 'Đỏ', '2023-07-09 08:30:27', 20, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `quantity`, `status`, `size`, `color`) VALUES
(1, 15, 7, 2, 'M', ''),
(2, 16, 3, 2, 'L', ''),
(3, 17, 1, 2, 'S', ''),
(4, 18, 1, 0, 'XL', ''),
(5, 19, 3, 2, 'L', ''),
(6, 20, 1, 2, 'M', ''),
(7, 21, 1, 2, 'S', ''),
(8, 22, 3, 2, 'M', ''),
(9, 23, 4, 2, 'L', ''),
(10, 24, 1, 2, 'M', ''),
(11, 25, 5, 2, 'L', ''),
(12, 32, 3, 2, 'M', ''),
(13, 33, 2, 2, 'M', ''),
(14, 34, 2, 2, 'XL', ''),
(15, 35, 6, 0, 'S', ''),
(16, 36, 2, 2, 'XL', ''),
(19, 39, 2, 3, 'XL', ''),
(21, 41, 9, 3, 'XL', ''),
(22, 42, 1, 3, 'M', ''),
(23, 43, 3, 3, 'XL', ''),
(24, 44, 2, 3, 'S', ''),
(25, 45, 1, 3, 'S', ''),
(26, 46, 1, 3, 'S', ''),
(27, 47, 2, 3, 'XL', ''),
(28, 48, 1, 3, 'S', ''),
(29, 49, 1, 3, 'S', ''),
(30, 50, 1, 0, 'S', ''),
(31, 51, 1, 0, 'S', ''),
(32, 52, 1, 0, 'S', ''),
(33, 53, 1, 0, 'S', ''),
(34, 54, 2, 3, 'S', ''),
(35, 55, 1, 3, 'M', ''),
(36, 56, 1, 3, 'M', ''),
(37, 57, 2, 3, 'XL', ''),
(38, 58, 1, 3, 'M', ''),
(39, 59, 1, 3, 'S', ''),
(40, 60, 5, 3, 'M', ''),
(41, 61, 1, 2, 'XL', ''),
(42, 62, 3, 1, 'XL', ''),
(43, 63, 1, 2, 'XL', ''),
(44, 64, 1, 2, 'XL', ''),
(45, 65, 32, 2, 'L', ''),
(46, 66, 1, 2, 'S', ''),
(47, 67, 1, 2, 'M', ''),
(48, 68, 1, 2, 'XL', ''),
(49, 69, 1, 2, 'M', ''),
(50, 70, 1, 2, 'XL', ''),
(51, 71, 1, 2, 'M', ''),
(52, 72, 1, 2, 'L', ''),
(53, 73, 1, 2, 'XL', ''),
(54, 74, 1, 2, 'M', ''),
(55, 75, 1, 2, 'M', ''),
(56, 76, 1, 2, 'XL', ''),
(57, 77, 1, 2, 'M', ''),
(58, 78, 1, 2, 'XL', ''),
(59, 79, 1, 1, 'S', ''),
(60, 80, 1, 1, 'XL', ''),
(61, 81, 1, 1, 'XL', ''),
(62, 82, 1, 1, 'S', ''),
(63, 83, 1, 1, 'XL', ''),
(64, 84, 1, 1, 'S', ''),
(65, 85, 1, 1, 'XL', ''),
(66, 86, 1, 1, 'XL', ''),
(67, 87, 1, 1, 'S', ''),
(68, 88, 1, 1, 'M', ''),
(69, 89, 1, 2, 'S', ''),
(70, 90, 1, 2, 'M', ''),
(71, 91, 1, 2, 'XL', ''),
(72, 92, 1, 2, 'M', ''),
(73, 93, 1, 2, 'L', ''),
(74, 94, 1, 2, 'XL', ''),
(75, 95, 1, 2, 'L', ''),
(76, 96, 1, 2, 'L', ''),
(77, 97, 2, 2, 'XL', ''),
(78, 98, 1, 2, 'M', ''),
(79, 99, 1, 2, 'M', ''),
(80, 100, 1, 2, 'XL', ''),
(81, 101, 2, 2, 'M', ''),
(82, 102, 1, 2, 'L', ''),
(83, 103, 1, 2, 'M', ''),
(84, 104, 2, 1, 'XL', ''),
(85, 105, 2, 1, 'L', ''),
(86, 106, 2, 1, 'L', ''),
(87, 107, 1, 1, 'XL', ''),
(88, 108, 1, 0, 'M', ''),
(89, 109, 1, 0, 'L', ''),
(90, 110, 2, 1, 'S', ''),
(91, 111, 1, 2, 'M', ''),
(92, 112, 1, 1, 'XL', ''),
(93, 113, 1, 3, 'L', ''),
(94, 114, 1, 3, 'XL', ''),
(95, 115, 1, 3, 'S', ''),
(96, 116, 1, 3, 'S', ''),
(97, 117, 3, 3, 'M', ''),
(98, 118, 8, 2, 'L', ''),
(99, 119, 1, 2, 'M', ''),
(100, 120, 1, 2, 'XL', ''),
(101, 121, 1, 2, 'M', ''),
(102, 122, 1, 2, 'M', ''),
(103, 123, 1, 2, 'XL', ''),
(104, 124, 1, 2, 'L', ''),
(105, 125, 1, 2, 'M', ''),
(106, 126, 1, 2, 'M', ''),
(107, 127, 1, 1, 'M', ''),
(108, 128, 4, 2, 'M', ''),
(109, 129, 1, 2, 'XL', ''),
(110, 130, 1, 2, 'M', ''),
(111, 131, 1, 2, 'M', ''),
(112, 132, 1, 2, 'L', ''),
(113, 133, 2, 1, 'M', ''),
(114, 134, 1, 1, 'S', 'Đỏ'),
(115, 135, 2, 3, 'S', 'Đỏ');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `sale` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `name`, `image`, `price`, `description`, `brand`, `status`, `sale`, `quantity`) VALUES
(1, 1, 'Băng Cổ Tay Xỏ Ngón HN3', 'https://thegioidotap.vn/wp-content/uploads/2023/06/3.png', 299000, 'Chất lượng cao, cotton.', 'UNISEX', 1, 40, 440),
(2, 3, 'Dây Kháng Lực Mini Band', 'https://thegioidotap.vn/wp-content/uploads/2022/04/day-khang-luc-4.png', 320000, 'Chất liệu mát, thoải mái.', 'Polo', 1, 20, 1197),
(3, 2, '\n\nTúi Trống Thể Thao ICADO HN2', 'https://thegioidotap.vn/wp-content/uploads/2020/12/tui-trong-the-thao-icado-hn2-5.png', 385000, 'Chất liệu cotton thoải mái.', 'Ideals', 1, 50, 492),
(5, 3, '\n\nDây Nhảy Tập Thể Dục ADIDAS ADRP-11017', 'https://thegioidotap.vn/wp-content/uploads/2023/03/209.png', 425000, 'Chất liệu jean thoải mái.', 'Slimfit', 1, 10, 390),
(6, 1, '\n\nBăng cổ tay tập gym PAVO AV', 'https://thegioidotap.vn/wp-content/uploads/2021/05/CNS8192.jpg', 285000, 'Chất liệu thoải mái.', 'Friends', 1, 20, 42),
(7, 1, 'Băng Bảo Vệ Đầu Gối ADIDAS Chính hãng ADSU-12423RD', 'https://thegioidotap.vn/wp-content/uploads/2020/12/Bang-Bao-Ve-Dau-Goi-ADIDAS-Chinh-hang-ADSU-12423RD-4.jpg', 365000, 'Chất liệu thoải mái.', 'Unisex', 1, 20, 67),
(8, 9, '\n\nQuần Dài Thể Thao Nam ICADO AA1', 'https://thegioidotap.vn/wp-content/uploads/2020/12/quan-dai-the-thao-nam-aa10.jpg', 450000, 'Chất lượng cao, cotton.', 'Xsport', 0, 20, 200),
(9, 9, '\n\nQuần Đùi Tập Gym Yoga Nam PAVO AT7', 'https://thegioidotap.vn/wp-content/uploads/2023/03/84.png', 600000, 'Chất lượng cao, cotton.', 'Xsport', 1, 0, 981),
(10, 9, '\n\nQuần Đùi Tập Gym Yoga Nam ICADO AT7', 'https://thegioidotap.vn/wp-content/uploads/2021/02/53-1.png', 385000, 'Chất liệu bền đẹp', 'FLANNEL', 1, 0, 554),
(12, 7, 'Set Tập Gym Yoga Nam Áo ICADO AT31 Quần ICADO AA1', 'https://thegioidotap.vn/wp-content/uploads/2023/06/z4434254817779_db63842948807f152f5de95a3c096714.jpg', 245000, 'Chất liệu len ấm áp', 'No brand', 1, 0, -6),
(13, 5, 'Găng Tay Thể Thao Phụ Kiện Tập Gym MOREOK HN1 – Xanh Neon', 'https://thegioidotap.vn/wp-content/uploads/2022/05/z3437816366023_1842cd18c8603cbab7b9dc8dba0c1b4f-768x625.jpg', 245000, 'Chất liệu cao cấp, bền đẹp', 'ADORABLE', 1, 0, 197),
(15, 2, '\n\nTúi Trống Thể Thao PAVO HN6', 'https://thegioidotap.vn/wp-content/uploads/2021/05/Artboard-5-3.jpg', 425000, 'Chất liệu cao cấp, thoải mái', 'STRAIGHT', 1, 0, 88),
(16, 1, 'Băng Gối Tập Gym IWIN KEEPA PRO', 'https://thegioidotap.vn/wp-content/uploads/2023/05/6-2.jpg', 205000, 'Chất liệu bền đẹp, thoải mái', 'W2ATN09205FOSHT', 1, 60, 80),
(17, 7, 'Set Tập Gym Yoga Nam Áo ICADO AT26 Quần Short ICADO AT19', 'https://thegioidotap.vn/wp-content/uploads/2023/03/63-1.png', 180000, 'Hàng chất lượng cao, bền đẹp', 'Unisex', 1, 0, 96),
(18, 4, '\n\nÁo Sát Nách Nam Tập Gym Yoga PAVO AT2', 'https://thegioidotap.vn/wp-content/uploads/2022/06/57.png', 130000, 'Màu sắc hiện đại, chất liệu cao cấp', 'Unisex', 1, 30, 86),
(19, 1, 'Băng Cổ Tay Dệt Xỏ Ngón HN4', 'https://thegioidotap.vn/wp-content/uploads/2023/06/15.png', 265000, 'Chất liệu cao cấp, bền đẹp', 'W2SMD05201FOSCR', 1, 0, 600),
(20, 9, '\r\n\r\nQuần Dài Tập Gym Yoga Nữ Viền Túi ICADO QD42', 'https://thegioidotap.vn/wp-content/uploads/2023/02/82.png', 295000, '88% Polyester, 12% spandex, co giãn 4 chiều', 'ICADO', 1, 20, 200);

-- --------------------------------------------------------

--
-- Table structure for table `product_color`
--

CREATE TABLE `product_color` (
  `id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_color`
--

INSERT INTO `product_color` (`id`, `color_id`, `product_id`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 4, 2),
(4, 5, 8),
(5, 4, 10),
(6, 7, 7),
(7, 3, 7),
(8, 5, 5),
(9, 9, 15),
(10, 6, 15),
(11, 1, 9),
(12, 2, 3),
(13, 10, 6),
(14, 5, 13),
(15, 3, 13),
(16, 11, 16),
(17, 3, 17),
(18, 8, 18),
(19, 11, 19),
(20, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_size`
--

INSERT INTO `product_size` (`id`, `id_product`, `id_size`) VALUES
(1, 8, 4),
(2, 8, 3),
(3, 17, 3),
(4, 18, 2),
(5, 15, 5),
(6, 5, 3),
(7, 7, 5),
(8, 9, 3),
(9, 3, 2),
(10, 12, 5),
(11, 2, 4),
(12, 10, 3),
(13, 1, 5),
(14, 1, 3),
(15, 16, 5),
(16, 16, 3),
(17, 13, 5),
(18, 6, 2),
(19, 20, 4),
(21, 19, 3);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'QUẢN LÝ'),
(2, 'NHÂN VIÊN'),
(3, 'KHÁCH HÀNG');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `descriptions` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `name`, `descriptions`) VALUES
(1, 'XS', 'Size XS (Extra Small): Kích thước quần áo siêu nhỏ'),
(2, 'S', 'Size S (Small): Kích thước quần áo nhỏ'),
(3, 'M', 'Size M (Medium): Kích thước quần áo vừa phải'),
(4, 'L', 'Size L (Large): Kích thước quần áo lớn'),
(5, 'XL', 'Size XL, XXL, XXXL: Kích thước quần áo cực lớn.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `username`, `email`, `password`, `status`, `avatar`) VALUES
(1, 'Lê Văn Nam', 'namlv', 'admin@gmail.com', '$2a$10$o1eBTGWx/ZyTmu7ua0kFHuK8wW6HrVQTvqzhjBwXKVSyZZqWkQ4aO', 1, 'https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-dai-dien-anime-cho-nam.jpg'),
(2, 'Văn Văn Hùng', 'hungnv', 'hungnv@gmail.com', '$2a$10$PnAz1zTRtTw./YNGf27tWOLQ9.QPVts8DLmxiDy6TYIUq9FqPuHq2', 1, 'https://tourchaua.net/wp-content/uploads/2021/12/avatar-buon-tam-trang-cho-nam.jpg'),
(3, 'Nguyễn Văn Lâm', 'lamnv', 'trinv@gmail.com', '$2a$10$wIqmicLd4oGqZcc3u59Mr.exzg35Vw/WDNIcoP6Bb/AD1ViOjiXEm', 1, 'https://anhdepfree.com/wp-content/uploads/2019/08/anh-dai-dien-boy.jpg'),
(4, 'Lê Thị Kim', 'kimlt', 'lekim@gmail.com', '$2a$12$XUuWbQTk25KqRukGlM63euTHHmwlkiImBYSXJAlCpNx7XOG87V8bG', 1, 'https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg'),
(5, 'Văn Phong', 'phongnv', 'phongnv@gmail.com', '$2a$10$SPd9CWZHDaRkN8BJ9SCu0e0udbhKxMugypA3JP.gsoNM/6h14YeOe', 1, 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'),
(7, 'Kiệt Nguyễn', 'kietnv', 'kietnv@gmail.com', '$2a$10$lklJFzd.6A2jhpz.3hKYmeEu9.5QHi8jh2wcbHPfLV4kd6Mw1bnyC', 1, 'https://antimatter.vn/wp-content/uploads/2023/01/hinh-anh-avatar-dep-cute-ngau.jpg'),
(8, 'Mr T', 'mrt', 'mrt@gmail.com', '$2a$10$s.qyYo0pJasbUGMbw75/ieiPDRT7j/jCBkrVlagQAsp0OCtXhPEWW', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(9, 'Mr T2', 'mrt2', 'mrt2@gmail.com', '$2a$10$hzpkihHMD/bDu/PwD2Yu2uXnXgzfYkayXhfAuNXo91Xy/3WSbrZSa', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(10, 'Mr T3', 'mrt3', 'mrt3@gmail.com', '$2a$10$i0QZWXzYXaZF/tB8.unvr.R24bqt.d3iUXI3u1lsLXqRJT2MY0oem', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(11, 'thanhyou00', 'namlv22222', 'oke@gmail.com', '$2a$10$IWBewV7lHLZjHXJA/g1ww.B7pzHjzuseI1Ss6NGb.YoojYMwzw1DG', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(12, 'thanhyou00', 'namlv2222', 'oke@gmail.com', '$2a$10$qwmX0SCTeBZ7jPKwjlqkWe0gswGGoNr/R1WFpG0bHV47i5JAj6XhC', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(13, 'Trinh Van Nam2', 'namlvokkk', 'keke@gmail.com', '$2a$10$kw9R4T9PCuABJQTKvB7HEOMJlZhG6zEAItzfcVJ6sbOopxR5QlqZW', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(14, 'thanhyou00222', 'thanhyou00222', 'thanhyou00@gmail.com', '$2a$10$Vun2JezPwTmrFlH4Kq5Za.txEUmycGSxGZ.8ILLWgQy.an31mATaS', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(15, 'thanhyou00222', 'thanhyou00222', 'thanhyou00@gmail.com', '$2a$10$2CRMQeTF0L/VlR/rpDhQ9epGRwXbSAjByA8Av6vub5283VCGesr/O', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),
(16, 'thanhyou00222', 'thanhyou00222', 'thanhyou00@gmail.com', '$2a$10$nJxE/UdIwwlyV3aFONfcdu77/f9vsorUJKD.kgpRcBoRQ1K43nI1i', 1, 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `code` varchar(12) NOT NULL,
  `sale` int(11) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `sale`, `date_start`, `date_end`, `user_id`, `quantity`, `status`) VALUES
(1, 'A2NCB56KMNM8', 40, '2023-02-27 11:07:00', '2023-05-28 11:07:00', 1, 100, 0),
(2, 'A4NCB56KKNM8', 20, '2023-02-27 16:33:00', '2023-03-08 16:33:00', 1, 2, 0),
(3, 'NV928CMNSJK2', 50, '2023-02-27 16:44:00', '2023-03-16 16:45:00', 1, 76, 0),
(4, 'ABCDEFGHJK12', 20, '2023-07-01 20:32:00', '2023-07-29 20:33:00', 1, 20, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `roles_id` (`role_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `u_id` (`user_id`),
  ADD KEY `p_id` (`product_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id2` (`user_id`),
  ADD KEY `product_id3` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id3` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product_fk` (`product_id`),
  ADD KEY `id_color` (`color_id`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id33` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authority`
--
ALTER TABLE `authority`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `favourite`
--
ALTER TABLE `favourite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product_color`
--
ALTER TABLE `product_color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authority`
--
ALTER TABLE `authority`
  ADD CONSTRAINT `roles_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `favourite`
--
ALTER TABLE `favourite`
  ADD CONSTRAINT `p_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `product_id3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `user_id2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `user_id3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `product_color`
--
ALTER TABLE `product_color`
  ADD CONSTRAINT `id_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `id_product_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product_size`
--
ALTER TABLE `product_size`
  ADD CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `id_size` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`);

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `user_id33` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
