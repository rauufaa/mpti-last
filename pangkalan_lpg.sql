-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2024 at 05:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pangkalan_lpg`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `id` int(11) NOT NULL,
  `id_pembelian` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `id_detail_pengiriman` int(11) DEFAULT NULL,
  `id_gas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pembelian`
--

INSERT INTO `detail_pembelian` (`id`, `id_pembelian`, `jumlah`, `id_detail_pengiriman`, `id_gas`) VALUES
(1, 1, 1, NULL, 1),
(2, 2, 0, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `detail_pengiriman`
--

CREATE TABLE `detail_pengiriman` (
  `id` int(11) NOT NULL,
  `nama_gas` set('LPG3KG','LPG5KG','LPG12KG') NOT NULL DEFAULT 'LPG3KG',
  `id_pengiriman` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `sisa` int(11) NOT NULL DEFAULT 0,
  `retur` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pengiriman`
--

INSERT INTO `detail_pengiriman` (`id`, `nama_gas`, `id_pengiriman`, `jumlah`, `sisa`, `retur`) VALUES
(2, 'LPG3KG', 3, 100, 0, 0),
(8, 'LPG3KG', 9, 100, 88, 89);

-- --------------------------------------------------------

--
-- Table structure for table `gas`
--

CREATE TABLE `gas` (
  `id` int(11) NOT NULL,
  `nama` set('LPG3KG','LPG5KG','LPG12KG','') NOT NULL,
  `harga_beli` int(11) NOT NULL,
  `harga_jual` int(11) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gas`
--

INSERT INTO `gas` (`id`, `nama`, `harga_beli`, `harga_jual`, `tanggal`) VALUES
(1, 'LPG3KG', 14500, 18000, '0000-00-00 00:00:00'),
(2, 'LPG3KG', 14500, 18000, '2024-06-13 14:53:00'),
(3, 'LPG3KG', 14500, 18000, '2024-06-13 14:55:00'),
(4, 'LPG3KG', 14500, 18000, '2024-06-13 14:55:00'),
(5, 'LPG3KG', 14500, 18000, '2024-06-13 14:57:00'),
(6, 'LPG3KG', 14500, 18000, '2024-06-13 15:13:00'),
(7, 'LPG3KG', 14500, 18000, '2024-06-13 15:14:00'),
(8, 'LPG3KG', 17000, 18000, '2024-06-13 15:17:00'),
(9, 'LPG3KG', 17000, 18000, '2024-06-23 13:20:00'),
(10, 'LPG3KG', 17000, 18000, '2024-06-23 13:21:00'),
(11, 'LPG3KG', 17000, 18000, '2024-06-23 14:38:00'),
(12, 'LPG3KG', 17000, 18000, '2024-06-23 14:40:00'),
(13, 'LPG3KG', 17000, 18000, '2024-06-23 14:43:00'),
(14, 'LPG3KG', 17000, 18000, '2024-06-23 14:47:00'),
(15, 'LPG3KG', 17000, 18000, '2024-06-23 15:00:00'),
(16, 'LPG3KG', 17000, 18000, '2024-06-23 15:14:00'),
(17, 'LPG3KG', 17000, 18000, '2024-06-23 15:15:00'),
(18, 'LPG3KG', 17000, 18002, '2024-06-23 15:16:00'),
(19, 'LPG3KG', 17000, 12000, '2024-06-23 15:16:00'),
(20, 'LPG3KG', 17000, 20000, '2024-06-23 17:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `konsumen`
--

CREATE TABLE `konsumen` (
  `id` int(11) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tipe` set('RUMAH_TANGGA','USAHA') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `konsumen`
--

INSERT INTO `konsumen` (`id`, `nik`, `nama`, `alamat`, `tipe`) VALUES
(1, '1810021306030001', 'Wali', 'Amerika', 'RUMAH_TANGGA'),
(2, '1810021306030002', 'Jeto', 'Wetan', 'USAHA');

-- --------------------------------------------------------

--
-- Table structure for table `pembelian_gas`
--

CREATE TABLE `pembelian_gas` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `id_konsumen` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pembelian_gas`
--

INSERT INTO `pembelian_gas` (`id`, `tanggal`, `id_konsumen`, `id_user`) VALUES
(1, '2024-06-13 02:01:22', 1, 1),
(2, '2024-06-13 02:02:02', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pengiriman_gas`
--

CREATE TABLE `pengiriman_gas` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `informasi` varchar(255) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengiriman_gas`
--

INSERT INTO `pengiriman_gas` (`id`, `tanggal`, `informasi`, `id_user`) VALUES
(2, '2024-06-13 01:54:18', 'Fresh', 1),
(3, '2024-06-13 07:46:00', 'Masi hangat', 1),
(9, '2024-06-23 14:33:00', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `password` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `admin` set('ADMIN','BASIC') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `nama`, `password`, `email`, `token`, `admin`) VALUES
(1, 'rauufaa', 'Rauuf Anugerah Akbar', '$2b$10$9xE9U4LBSv6Hn523XUrQ6e2IfbUQSCn7dNrUs7NzY/peUVqDYRtX6', 'rauufakbar03@gmail.com', 'a840c378-d809-41ca-bef7-33dde81bb2ec', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pembelian` (`id_pembelian`),
  ADD KEY `id_gas` (`id_gas`),
  ADD KEY `id_detail_pengiriman` (`id_detail_pengiriman`);

--
-- Indexes for table `detail_pengiriman`
--
ALTER TABLE `detail_pengiriman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pengiriman` (`id_pengiriman`);

--
-- Indexes for table `gas`
--
ALTER TABLE `gas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konsumen`
--
ALTER TABLE `konsumen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nik` (`nik`) USING BTREE;

--
-- Indexes for table `pembelian_gas`
--
ALTER TABLE `pembelian_gas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_konsumen` (`id_konsumen`) USING BTREE,
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Indexes for table `pengiriman_gas`
--
ALTER TABLE `pengiriman_gas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`,`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detail_pengiriman`
--
ALTER TABLE `detail_pengiriman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gas`
--
ALTER TABLE `gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `konsumen`
--
ALTER TABLE `konsumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pembelian_gas`
--
ALTER TABLE `pembelian_gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pengiriman_gas`
--
ALTER TABLE `pengiriman_gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD CONSTRAINT `detail_pembelian_ibfk_1` FOREIGN KEY (`id_pembelian`) REFERENCES `pembelian_gas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pembelian_ibfk_2` FOREIGN KEY (`id_gas`) REFERENCES `gas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pembelian_ibfk_3` FOREIGN KEY (`id_detail_pengiriman`) REFERENCES `detail_pengiriman` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detail_pengiriman`
--
ALTER TABLE `detail_pengiriman`
  ADD CONSTRAINT `detail_pengiriman_ibfk_2` FOREIGN KEY (`id_pengiriman`) REFERENCES `pengiriman_gas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembelian_gas`
--
ALTER TABLE `pembelian_gas`
  ADD CONSTRAINT `pembelian_gas_ibfk_1` FOREIGN KEY (`id_konsumen`) REFERENCES `konsumen` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelian_gas_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pengiriman_gas`
--
ALTER TABLE `pengiriman_gas`
  ADD CONSTRAINT `pengiriman_gas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
