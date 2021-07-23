-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2021 a las 15:41:16
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
-- Base de datos: `my_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `id_restaurant` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `address` varchar(80) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `kind_food` set('Mediterrani','Cuina Catalana','Tapes','Cuina Autor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`id_restaurant`, `name`, `address`, `lat`, `lng`, `kind_food`) VALUES
(1, 'ABaC', 'Av. del Tibidabo, 1, 08022 Barcelona', 41.4122, 2.13538, 'Cuina Autor'),
(2, 'Restaurante Jardín del Alma', 'Carrer de Mallorca, 271, 08008 Barcelona', 41.398, 2.16303, 'Mediterrani'),
(3, 'Nectari', 'Carrer de València, 28, 08015 Barcelona', 41.3825, 2.14637, 'Mediterrani'),
(4, 'Disfrutar', 'C. de Villarroel, 163, 08036 Barcelona', 41.3903, 2.1529, 'Mediterrani'),
(5, 'Barceloneta', 'Moll dels Pescador, Port Vell, Carrer de l\'Escar, 22, 08039 Barcelona', 41.379, 2.18774, 'Mediterrani'),
(6, 'Restaurante Més de Vi - Platil', 'Carrer de Marià Aguiló, 123, 08005 Barcelona', 41.4037, 2.2044, 'Tapes'),
(7, 'Alkimia', 'Ronda de Sant Antoni, 41, 08011 Barcelona', 41.3829, 2.16348, 'Cuina Autor'),
(8, 'Lasarte', 'Carrer de Mallorca, 259, 08008 Barcelona', 41.3938, 2.16197, 'Cuina Autor'),
(9, 'Via Veneto', 'Carrer de Ganduxer, 10, 08021 Barcelona', 41.3925, 2.1391, 'Cuina Catalana'),
(10, 'Can Travi Nou', 'Carrer de Jorge Manrique, s/n, 08035 Barcelona', 41.4314, 2.15238, 'Cuina Catalana'),
(11, 'Restaurant Can Sardà', 'Ctra. Cerdanyola-Horta, Km 4, 5, 08290, Barcelona', 41.4604, 2.12447, 'Cuina Catalana'),
(12, 'Bar Leopoldo', 'Carrer de Sant Rafael, 24, 08001 Barcelona', 41.3794, 2.16947, 'Tapes'),
(13, 'Restaurante Devesa', 'Ctra. Badalona a Montcada, Km 6, 08916 Barcelona', 41.4831, 2.2139, 'Cuina Catalana'),
(14, 'Can Carbonell', 'Ctra. De la Muntanya, s/n Carretera de la Muntanya S/N, 08960 Sant Just Desvern,', 41.4037, 2.08664, 'Cuina Catalana');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id_restaurant`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
