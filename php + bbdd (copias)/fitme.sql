-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2025 a las 17:47:24
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
(11, 'Press Banca', 'http://localhost:4321/uploads/67e53a58d994a-png-clipart-bench-press-exercise-barbell-strength-training-barbell-angle-physical-fitness.png', 'https://www.youtube.com/watch?v=jlFl7WJ1TzI&t=11s&pp=ygULcHJlc3MgYmFuY2E%3D'),
(16, 'Sentadillas', 'sentadillas.jpg', 'sentadillas.mp4'),
(17, 'Flexiones', 'flexiones.jpg', 'flexiones.mp4'),
(18, 'Plancha', 'plancha.jpg', 'plancha.mp4'),
(19, 'Pull-up', 'pull_up.jpg', 'pull_up.mp4'),
(20, 'Press de banca', 'press_banca.jpg', 'press_banca.mp4'),
(21, 'Peso muerto', 'peso_muerto.jpg', 'peso_muerto.mp4'),
(22, 'Curl de bíceps', 'curl_biceps.jpg', 'curl_biceps.mp4'),
(23, 'Tríceps en banco', 'triceps_banco.jpg', 'triceps_banco.mp4'),
(24, 'Ab twist', 'ab_twist.jpg', 'ab_twist.mp4'),
(25, 'Elevaciones de pierna', 'elevaciones_pierna.jpg', 'elevaciones_pierna.mp4'),
(26, 'Mountain climbers', 'mountain_climbers.jpg', 'mountain_climbers.mp4'),
(27, 'Zancadas', 'zancadas.jpg', 'zancadas.mp4'),
(28, 'Abdominales en bicicleta', 'ab_bicicleta.jpg', 'ab_bicicleta.mp4'),
(29, 'Push Press', 'push_press.jpg', 'push_press.mp4'),
(30, 'Jump Squats', 'jump_squats.jpg', 'jump_squats.mp4'),
(31, 'Burpees', 'burpees.jpg', 'burpees.mp4'),
(32, 'Superman', 'superman.jpg', 'superman.mp4'),
(33, 'Russian Twists', 'russian_twists.jpg', 'russian_twists.mp4'),
(34, 'Elevación de talones', 'elevacion_talones.jpg', 'elevacion_talones.mp4'),
(35, 'Lifting de hombros', 'lifting_hombros.jpg', 'lifting_hombros.mp4'),
(36, 'Cardio kickboxing', 'cardio_kickboxing.jpg', 'cardio_kickboxing.mp4'),
(37, 'Kettlebell swings', 'kettlebell_swings.jpg', 'kettlebell_swings.mp4'),
(38, 'Press militar', 'press_militar.jpg', 'press_militar.mp4'),
(39, 'Leg Press', 'leg_press.jpg', 'leg_press.mp4'),
(40, 'Chest Fly', 'chest_fly.jpg', 'chest_fly.mp4'),
(41, 'Lat Pulldown', 'lat_pulldown.jpg', 'lat_pulldown.mp4'),
(42, 'Face Pulls', 'face_pulls.jpg', 'face_pulls.mp4'),
(43, 'Hip Thrusts', 'hip_thrusts.jpg', 'hip_thrusts.mp4'),
(44, 'Sled Push', 'sled_push.jpg', 'sled_push.mp4'),
(45, 'Cable Rows', 'cable_rows.jpg', 'cable_rows.mp4'),
(46, 'Sentadillas', 'sentadillas.jpg', 'sentadillas.mp4'),
(47, 'Flexiones', 'flexiones.jpg', 'flexiones.mp4'),
(48, 'Plancha', 'plancha.jpg', 'plancha.mp4'),
(49, 'Pull-up', 'pull_up.jpg', 'pull_up.mp4'),
(50, 'Press de banca', 'press_banca.jpg', 'press_banca.mp4'),
(51, 'Peso muerto', 'peso_muerto.jpg', 'peso_muerto.mp4'),
(52, 'Curl de bíceps', 'curl_biceps.jpg', 'curl_biceps.mp4'),
(53, 'Tríceps en banco', 'triceps_banco.jpg', 'triceps_banco.mp4'),
(54, 'Ab twist', 'ab_twist.jpg', 'ab_twist.mp4'),
(55, 'Elevaciones de pierna', 'elevaciones_pierna.jpg', 'elevaciones_pierna.mp4'),
(56, 'Mountain climbers', 'mountain_climbers.jpg', 'mountain_climbers.mp4'),
(57, 'Zancadas', 'zancadas.jpg', 'zancadas.mp4'),
(58, 'Abdominales en bicicleta', 'ab_bicicleta.jpg', 'ab_bicicleta.mp4'),
(59, 'Push Press', 'push_press.jpg', 'push_press.mp4'),
(60, 'Jump Squats', 'jump_squats.jpg', 'jump_squats.mp4'),
(61, 'Burpees', 'burpees.jpg', 'burpees.mp4'),
(62, 'Superman', 'superman.jpg', 'superman.mp4'),
(63, 'Russian Twists', 'russian_twists.jpg', 'russian_twists.mp4'),
(64, 'Elevación de talones', 'elevacion_talones.jpg', 'elevacion_talones.mp4'),
(65, 'Lifting de hombros', 'lifting_hombros.jpg', 'lifting_hombros.mp4'),
(66, 'Cardio kickboxing', 'cardio_kickboxing.jpg', 'cardio_kickboxing.mp4'),
(67, 'Kettlebell swings', 'kettlebell_swings.jpg', 'kettlebell_swings.mp4'),
(68, 'Press militar', 'press_militar.jpg', 'press_militar.mp4'),
(69, 'Leg Press', 'leg_press.jpg', 'leg_press.mp4'),
(70, 'Chest Fly', 'chest_fly.jpg', 'chest_fly.mp4'),
(71, 'Lat Pulldown', 'lat_pulldown.jpg', 'lat_pulldown.mp4'),
(72, 'Face Pulls', 'face_pulls.jpg', 'face_pulls.mp4'),
(73, 'Hip Thrusts', 'hip_thrusts.jpg', 'hip_thrusts.mp4'),
(74, 'Sled Push', 'sled_push.jpg', 'sled_push.mp4'),
(75, 'Cable Rows', 'cable_rows.jpg', 'cable_rows.mp4');

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
(11, 8),
(16, 5),
(17, 1),
(18, 1),
(18, 8),
(19, 3),
(19, 4),
(20, 1),
(20, 8),
(21, 5),
(21, 6),
(22, 4),
(23, 2),
(23, 8),
(24, 1),
(25, 1),
(25, 6),
(26, 1),
(26, 7),
(27, 5),
(27, 6),
(28, 1),
(29, 8),
(30, 5),
(30, 6),
(31, 5),
(31, 7),
(32, 3),
(33, 1),
(34, 6),
(35, 8),
(36, 1),
(37, 6),
(37, 7),
(38, 8);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `rutina` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`rutina`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `sexo` enum('Hombre','Mujer','Otro') NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `experiencia` enum('Principiante','Intermedio','Avanzado') NOT NULL,
  `altura` float NOT NULL,
  `peso` float NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `contrasena`, `nombre`, `sexo`, `fecha_nacimiento`, `experiencia`, `altura`, `peso`, `fecha_registro`, `email`) VALUES
(1, 'carmonaa0116', '$2y$10$ls2CfjNhn2Rjea2ouwlOvOQRAseSM3W/Tb9nTI0Q1hqnHRpq.wQsm', 'Alejandro Carmona Rodero', 'Hombre', '2002-01-16', 'Avanzado', 186, 100, '2025-04-22 07:37:35', 'carmonaa0116@gmail.com');

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
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `musculos`
--
ALTER TABLE `musculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ejercicio_musculo`
--
ALTER TABLE `ejercicio_musculo`
  ADD CONSTRAINT `ejercicio_musculo_ibfk_1` FOREIGN KEY (`ejercicio_id`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `ejercicio_musculo_ibfk_2` FOREIGN KEY (`musculo_id`) REFERENCES `musculos` (`id`);

--
-- Filtros para la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD CONSTRAINT `rutinas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
