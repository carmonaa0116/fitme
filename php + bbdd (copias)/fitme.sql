-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-03-2025 a las 14:18:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fitme`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `imagen`, `video`) VALUES
(11, 'Press Banca', 'http://localhost:4321/uploads/67e53a58d994a-png-clipart-bench-press-exercise-barbell-strength-training-barbell-angle-physical-fitness.png', 'https://www.youtube.com/watch?v=jlFl7WJ1TzI&t=11s&pp=ygULcHJlc3MgYmFuY2E%3D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio_musculo`
--

CREATE TABLE `ejercicio_musculo` (
  `ejercicio_id` int(11) NOT NULL,
  `musculo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicio_musculo`
--

INSERT INTO `ejercicio_musculo` (`ejercicio_id`, `musculo_id`) VALUES
(11, 1),
(11, 2),
(11, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `musculos`
--

CREATE TABLE `musculos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `musculos`
--

INSERT INTO `musculos` (`id`, `nombre`) VALUES
(1, 'Pecho'),
(2, 'Tríceps'),
(3, 'Espalda'),
(4, 'Bíceps'),
(5, 'Cuádriceps'),
(6, 'Glúteos'),
(7, 'Isquiotibiales'),
(8, 'Hombros');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejercicio_musculo`
--
ALTER TABLE `ejercicio_musculo`
  ADD PRIMARY KEY (`ejercicio_id`,`musculo_id`),
  ADD KEY `musculo_id` (`musculo_id`);

--
-- Indices de la tabla `musculos`
--
ALTER TABLE `musculos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `musculos`
--
ALTER TABLE `musculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ejercicio_musculo`
--
ALTER TABLE `ejercicio_musculo`
  ADD CONSTRAINT `ejercicio_musculo_ibfk_1` FOREIGN KEY (`ejercicio_id`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `ejercicio_musculo_ibfk_2` FOREIGN KEY (`musculo_id`) REFERENCES `musculos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
