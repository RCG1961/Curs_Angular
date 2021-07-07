-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2021 a las 19:23:05
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cuadros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers`
--

CREATE TABLE `buyers` (
  `id_buyer` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `dni` varchar(19) NOT NULL,
  `picture_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `buyers`
--

INSERT INTO `buyers` (`id_buyer`, `name`, `lastname`, `dni`, `picture_id`) VALUES
(1, 'Pepon', 'Nieto', '12345678U', 4),
(2, 'Mariano', 'Rajoy', '23400786U', 3),
(3, 'Jose Maria', 'Asnar', '34567832Y', 2),
(4, 'Juan Carlos', 'Borbin', '23400786U', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pictures`
--

CREATE TABLE `pictures` (
  `id_picture` int(11) NOT NULL,
  `prix` int(10) NOT NULL,
  `author` varchar(35) NOT NULL DEFAULT 'anónimo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pictures`
--

INSERT INTO `pictures` (`id_picture`, `prix`, `author`) VALUES
(1, 12000000, 'Vincent Van Gogh'),
(2, 3400000, 'Picasso'),
(3, 14000000, 'Vincent Van Gogh'),
(4, 1400000, 'Picasso'),
(5, 2100000, 'Miro'),
(6, 340000, 'Dali'),
(7, 4000000, 'Miquel Barcelo'),
(8, 100000, 'Miquel Barcelo'),
(9, 3400000, 'Picasso'),
(10, 2100000, 'Miro'),
(11, 4000000, 'Miquel Barcelo'),
(12, 14000, 'anónimo'),
(13, 40000, 'anónimo'),
(14, 3400000, 'anónimo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id_buyer`),
  ADD KEY `id_picture` (`picture_id`);

--
-- Indices de la tabla `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id_picture`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id_buyer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id_picture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `buyers_ibfk_1` FOREIGN KEY (`picture_id`) REFERENCES `pictures` (`id_picture`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
