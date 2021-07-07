-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2021 a las 20:03:04
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
-- Base de datos: `stube`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `email`, `password`) VALUES
(1, 'mariano@gmail.com', '12345678'),
(2, 'paco@outlook.es', 'asdermrr'),
(3, 'mariadelao@gmail.com', 'ASE5678'),
(4, 'Rouco@outlook.es', 'talisrmrr'),
(5, 'mariano.rajoy@gmail.com', '1111111'),
(6, 'abacus@outlook.es', 'Rocadur'),
(7, 'maro@gmail.com', 'abcd678'),
(8, 'paco.perez@outlook.es', 'voldemor'),
(9, 'saco@outlook.es', 'qwmrr'),
(10, 'luiso@gmail.com', '123678'),
(11, 'parico@outlook.es', '3345mrr'),
(12, 'Aramarano@gmail.com', '12345678'),
(13, 'polo@outlook.es', 'aaaaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id_video` int(11) NOT NULL,
  `descripcio` varchar(255) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `url` varchar(50) NOT NULL,
  `identificador` varchar(40) NOT NULL,
  `usuari_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id_video`, `descripcio`, `titulo`, `url`, `identificador`, `usuari_id`) VALUES
(1, 'Es un rollo patatero como los demas videos de esta serie', 'Star Wars', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 12),
(2, 'muy buena', 'Rambo', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 3),
(3, 'Es un rollo patatero como los demas videos de esta serie', 'Star Wars 2', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 10),
(4, 'muy buena', 'Rambo 2', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 3),
(5, 'Es un rollo patatero como los demas videos de esta serie', 'Star Wars 3', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 1),
(6, 'muy buena', 'Rambo 3', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 11),
(7, 'Es un rollo patatero como los demas videos de esta serie', 'Star Wars 4', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 10),
(8, 'muy buena', 'Rambo 4', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 5),
(9, 'Es un rollo patatero como los demas videos de esta serie', 'Terminator', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 2),
(10, 'muy buena', 'Terminator 2', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 9),
(11, 'Es un rollo patatero como los demas videos de esta serie', 'El Rey Escorpion', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 10),
(12, 'muy buena', 'El Rey Escorpion 2', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 2),
(13, 'Es un rollo patatero como los demas videos de esta serie', 'Mision Imposible', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 1),
(14, 'muy buena', 'Mision Imposible 2', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 4),
(15, 'Es un rollo patatero como los demas videos de esta serie', 'Men in black', 'https://www.youtube.com/watch?v=sJ7dd9qepnU&list=P', 'v=sJ7dd9qepnU&list=PLMZyn4ePUSpIAocDR7vi', 6),
(16, 'muy buena', 'Men in Black 2', 'https://www.youtube.com/watch?v=DwY9-XG51J8&list=P', 'https://www.youtube.com/watch?v=DwY9-XG5', 13);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id_video`),
  ADD KEY `id_usuari` (`usuari_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
