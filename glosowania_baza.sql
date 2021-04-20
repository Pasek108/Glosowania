-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 20 Kwi 2021, 20:25
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `votings`
--
CREATE DATABASE IF NOT EXISTS `votings` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
USE `votings`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `votings`
--

CREATE TABLE `votings` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `question` varchar(256) COLLATE utf8mb4_polish_ci NOT NULL,
  `passwd` varchar(33) COLLATE utf8mb4_polish_ci NOT NULL,
  `admin_passwd` varchar(33) COLLATE utf8mb4_polish_ci NOT NULL,
  `private` tinyint(1) NOT NULL,
  `many_options` tinyint(1) NOT NULL,
  `date` varchar(16) COLLATE utf8mb4_polish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `ip_list` longtext COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `votings`
--

INSERT INTO `votings` (`id`, `name`, `question`, `passwd`, `admin_passwd`, `private`, `many_options`, `date`, `deleted`, `ip_list`) VALUES
(1, 'fhs34irm9twajzm4n2y4', 'hjhjhjhj', 'd41d8cd98f00b204e9800998ecf8427e', 'ba984cb106d5bcead9bfe67344b89a2a', 0, 0, '', 0, ';Array;Array;Array;Array;;213.136.254.63'),
(2, 'o9xa7prex7ik6qe00pcu', 'jkjkjkjkj', '9743a66f914cc249efca164485a19c5c', 'dfa5be2e7aabe71732a4a7a6e38f81d4', 1, 1, '1634455667800', 0, ''),
(3, 'gwyabg69zewb3c1td9vx', 'Test%20dzia%C5%82ania%20tworzenia%20g%C5%82osowania', 'd41d8cd98f00b204e9800998ecf8427e', '21232f297a57a5a743894a0e4a801fc3', 0, 1, '1618794600000', 0, '');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `votings`
--
ALTER TABLE `votings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `votings`
--
ALTER TABLE `votings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
