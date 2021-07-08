-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2021 a las 19:05:44
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
-- Base de datos: `optica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `postal` int(5) NOT NULL,
  `telefon` int(9) NOT NULL,
  `correu` varchar(40) NOT NULL,
  `data` date NOT NULL,
  `recomanat` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id_client`, `nom`, `postal`, `telefon`, `correu`, `data`, `recomanat`) VALUES
(1, 'Albert Pla', 8150, 834567890, 'albert.pla@gmail.com', '2011-03-14', 'por el  churrero'),
(2, 'Maria Norajo', 27890, 91234567, 'maria@theboss.com', '2020-07-01', 'Pedro Sanchez'),
(3, 'Mariano Nometo', 17300, 972345678, 'gopl@hotmail.com', '2021-07-12', ''),
(4, 'Pepa Flowers', 43001, 965789098, 'marisol@solimar.com', '2020-07-01', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empeados`
--

CREATE TABLE `empeados` (
  `id_empleado` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empeados`
--

INSERT INTO `empeados` (`id_empleado`, `nom`) VALUES
(1, 'Facundo'),
(2, 'Mariano'),
(3, 'Paquita'),
(4, 'Amelia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monturas`
--

CREATE TABLE `monturas` (
  `id_montura` int(11) NOT NULL,
  `marca` varchar(25) NOT NULL,
  `grad1` varchar(15) NOT NULL,
  `grad2` varchar(15) NOT NULL,
  `tipus` varchar(10) NOT NULL,
  `color` varchar(15) NOT NULL,
  `color_vidre1` varchar(15) NOT NULL,
  `color_vidre2` varchar(15) NOT NULL,
  `preu` int(6) NOT NULL,
  `proveidor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `monturas`
--

INSERT INTO `monturas` (`id_montura`, `marca`, `grad1`, `grad2`, `tipus`, `color`, `color_vidre1`, `color_vidre2`, `preu`, `proveidor_id`) VALUES
(1, 'Paco Rabano', '+3.55', '-1.25', 'metal', 'negre', 'verd', 'verd', 1250, 2),
(2, 'Ray Ban', '0', '0', 'metal', 'dorado', 'groc', 'groc', 240, 1),
(3, 'Luxoptica', '-2.25', '--2.00', 'airel', 's/d', 'bifiltral', 'bifilral', 2500, 1),
(4, 'Vuarnet', '0.5', '0.5', 'pasta', 'negro', 'negro', 'negro', 365, 1),
(5, 'Alain Delon', '4', '3', 'pasta', 'blanca', 'antireflejante', 'antireflejante', 250, 2),
(6, 'New Vogue', '1.25', '1.50', 'metal', 'roja', 'groc', 'groc', 2140, 1),
(7, 'Carrefour', '0', '0', 'pasta', 'roja', 'bifiltral', 'bifilral', 2500, 1),
(8, 'Porsche', '0.5', '0.5', 'metal', 'negro', 'negro', 'negro', 365, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveidor`
--

CREATE TABLE `proveidor` (
  `id_pro` int(11) NOT NULL,
  `nom` varchar(90) NOT NULL,
  `carrer` varchar(50) NOT NULL,
  `num` varchar(10) NOT NULL,
  `pis` varchar(5) NOT NULL,
  `porta` varchar(5) NOT NULL,
  `ciutat` varchar(40) NOT NULL,
  `cpostal` int(5) NOT NULL,
  `pais` varchar(12) NOT NULL,
  `telefon` int(9) NOT NULL,
  `fax` int(9) NOT NULL,
  `nif` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveidor`
--

INSERT INTO `proveidor` (`id_pro`, `nom`, `carrer`, `num`, `pis`, `porta`, `ciutat`, `cpostal`, `pais`, `telefon`, `fax`, `nif`) VALUES
(1, 'Manufacturas opticas INDO', 'Acacias', '123', '4', 'A', 'L\'Hospitalet de LLobregat', 8120, 'España', 934567899, 934566790, 'A650873456'),
(2, 'VARILUX', 'Montmatre', '33', '1', 'F', 'Paris', 99999, 'France', 800345345, 800345350, 'F78998756Y');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `montura_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `empleado_id`, `montura_id`, `cliente_id`) VALUES
(1, 4, 3, 1),
(2, 4, 2, 3),
(3, 1, 5, 4),
(4, 3, 4, 1),
(5, 2, 8, 4),
(6, 1, 1, 4),
(7, 4, 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_client`);

--
-- Indices de la tabla `empeados`
--
ALTER TABLE `empeados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `monturas`
--
ALTER TABLE `monturas`
  ADD PRIMARY KEY (`id_montura`),
  ADD KEY `proveidor_id` (`proveidor_id`);

--
-- Indices de la tabla `proveidor`
--
ALTER TABLE `proveidor`
  ADD PRIMARY KEY (`id_pro`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `empleado_id` (`empleado_id`),
  ADD KEY `montura_id` (`montura_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `empeados`
--
ALTER TABLE `empeados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `monturas`
--
ALTER TABLE `monturas`
  MODIFY `id_montura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proveidor`
--
ALTER TABLE `proveidor`
  MODIFY `id_pro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `monturas`
--
ALTER TABLE `monturas`
  ADD CONSTRAINT `monturas_ibfk_1` FOREIGN KEY (`proveidor_id`) REFERENCES `proveidor` (`id_pro`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empeados` (`id_empleado`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`montura_id`) REFERENCES `monturas` (`id_montura`),
  ADD CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`cliente_id`) REFERENCES `clients` (`id_client`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
