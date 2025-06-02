-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 18:21:37
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
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `id_usuario1` int(11) NOT NULL,
  `id_usuario2` int(11) NOT NULL,
  `fecha_amistad` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`id_usuario1`, `id_usuario2`, `fecha_amistad`) VALUES
(8, 10, '2025-06-02 17:49:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `user1_id` int(11) NOT NULL,
  `user2_id` int(11) NOT NULL,
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(16, 'Sentadillas', 'sentadillas.jpg', 'https://www.youtube.com/watch?v=aclHkVaku9U'),
(17, 'Flexiones', 'flexiones.jpg', 'https://www.youtube.com/watch?v=IODxDxX7oi4'),
(18, 'Plancha', 'plancha.jpg', 'https://www.youtube.com/watch?v=pSHjTRCQxIw'),
(19, 'Pull-up', 'pull_up.jpg', 'https://www.youtube.com/watch?v=eGo4IYlbE5g'),
(20, 'Press de banca', 'press_banca.jpg', 'https://www.youtube.com/watch?v=rT7DgCr-3pg'),
(21, 'Peso muerto', 'peso_muerto.jpg', 'https://www.youtube.com/watch?v=op9kVnSso6Q'),
(22, 'Curl de bíceps', 'curl_biceps.jpg', 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo'),
(23, 'Tríceps en banco', 'triceps_banco.jpg', 'https://www.youtube.com/watch?v=6kALZikXxLc'),
(24, 'Ab twist', 'ab_twist.jpg', 'https://www.youtube.com/watch?v=wkD8rjkodUI'),
(25, 'Elevaciones de pierna', 'elevaciones_pierna.jpg', 'https://www.youtube.com/watch?v=l4kQd9eWclE'),
(26, 'Mountain climbers', 'mountain_climbers.jpg', 'https://www.youtube.com/watch?v=nmwgirgXLYM'),
(27, 'Zancadas', 'zancadas.jpg', 'https://www.youtube.com/watch?v=QOVaHwm-Q6U'),
(28, 'Abdominales en bicicleta', 'ab_bicicleta.jpg', 'https://www.youtube.com/watch?v=9FGilxCbdz8'),
(29, 'Push Press', 'push_press.jpg', 'https://www.youtube.com/watch?v=LkJUNR9pD9M'),
(30, 'Jump Squats', 'jump_squats.jpg', 'https://www.youtube.com/watch?v=U4s4mEQ5VqU'),
(31, 'Burpees', 'burpees.jpg', 'https://www.youtube.com/watch?v=TU8QYVW0gDU'),
(32, 'Superman', 'superman.jpg', 'https://www.youtube.com/watch?v=z6PJMT2y8GQ'),
(33, 'Russian Twists', 'russian_twists.jpg', 'https://www.youtube.com/watch?v=NeAtimSCxsY'),
(34, 'Elevación de talones', 'elevacion_talones.jpg', 'https://www.youtube.com/watch?v=ROJ1zJzDlP4'),
(35, 'Lifting de hombros', 'lifting_hombros.jpg', 'https://www.youtube.com/watch?v=LIQ9Uxz8tVQ'),
(36, 'Cardio kickboxing', 'cardio_kickboxing.jpg', 'https://www.youtube.com/watch?v=9Z9gJ3oB8tM'),
(37, 'Kettlebell swings', 'kettlebell_swings.jpg', 'https://www.youtube.com/watch?v=YSx8tZLrAJo'),
(38, 'Press militar', 'press_militar.jpg', 'https://www.youtube.com/watch?v=Mq4A0vAQL1s'),
(39, 'Leg Press', 'leg_press.jpg', 'https://www.youtube.com/watch?v=IZxyjW7MPJQ'),
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
-- Estructura de tabla para la tabla `ejercicios_rutina`
--

CREATE TABLE `ejercicios_rutina` (
  `id` int(11) NOT NULL,
  `idRutina` int(11) DEFAULT NULL,
  `dia_semana` enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `idEjercicio` int(11) DEFAULT NULL,
  `series` int(11) NOT NULL,
  `repeticionesInicio` int(11) NOT NULL DEFAULT 10,
  `repeticionesFin` int(11) NOT NULL DEFAULT 12,
  `peso` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios_rutina`
--

INSERT INTO `ejercicios_rutina` (`id`, `idRutina`, `dia_semana`, `idEjercicio`, `series`, `repeticionesInicio`, `repeticionesFin`, `peso`) VALUES
(20, 27, 'Lunes', 11, 3, 12, 20, 50);

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
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `emisor_id` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `enviado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `idUsuario` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `dias` varchar(255) DEFAULT NULL,
  `privacidad` enum('privado','publico') NOT NULL DEFAULT 'privado',
  `visitas` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `idUsuario`, `nombre`, `dias`, `privacidad`, `visitas`) VALUES
(24, 8, 'Rutina 1', 'Lunes,Miércoles,Viernes', 'privado', 32),
(27, 9, 'Rutina Alejandro', 'Lunes,Miércoles,Viernes', 'privado', 1),
(29, 8, 'Rutina Alejandro', 'Lunes,Jueves,Sábado', 'privado', 0);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `rutinas_usuario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `rutinas_usuario` (
`id_usuario` int(11)
,`total_rutinas` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_amistad`
--

CREATE TABLE `solicitudes_amistad` (
  `id` int(11) NOT NULL,
  `id_remitente` int(11) NOT NULL,
  `id_destinatario` int(11) NOT NULL,
  `estado` enum('Pendiente','Aceptada','Rechazada') NOT NULL DEFAULT 'Pendiente',
  `fecha_solicitud` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_respuesta` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_amistad`
--

INSERT INTO `solicitudes_amistad` (`id`, `id_remitente`, `id_destinatario`, `estado`, `fecha_solicitud`, `fecha_respuesta`) VALUES
(6, 10, 9, 'Pendiente', '2025-06-02 17:40:09', NULL),
(7, 10, 9, 'Pendiente', '2025-06-02 17:40:11', NULL),
(8, 10, 9, 'Pendiente', '2025-06-02 17:40:13', NULL),
(9, 10, 8, 'Aceptada', '2025-06-02 17:40:17', '2025-06-02 17:49:22');

--
-- Disparadores `solicitudes_amistad`
--
DELIMITER $$
CREATE TRIGGER `insertar_amigos_tras_aceptar` AFTER UPDATE ON `solicitudes_amistad` FOR EACH ROW BEGIN
  -- Solo si el estado cambió a 'Aceptada'
  IF NEW.estado = 'Aceptada' AND OLD.estado <> 'Aceptada' THEN
    -- Insertar la relación de amistad (id_remitente < id_destinatario para evitar duplicados)
    IF NEW.id_remitente < NEW.id_destinatario THEN
      INSERT IGNORE INTO amigos (id_usuario1, id_usuario2, fecha_amistad)
      VALUES (NEW.id_remitente, NEW.id_destinatario, NOW());
    ELSE
      INSERT IGNORE INTO amigos (id_usuario1, id_usuario2, fecha_amistad)
      VALUES (NEW.id_destinatario, NEW.id_remitente, NOW());
    END IF;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `sexo` enum('Hombre','Mujer','Otro') NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `experiencia` enum('Principiante','Intermedio','Avanzado') NOT NULL,
  `altura` float NOT NULL,
  `peso` float NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL,
  `foto_perfil` mediumblob DEFAULT NULL,
  `n_registros` int(11) NOT NULL DEFAULT 1,
  `uid` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `nombre`, `sexo`, `fecha_nacimiento`, `experiencia`, `altura`, `peso`, `fecha_registro`, `email`, `foto_perfil`, `n_registros`, `uid`, `provider`, `password`) VALUES
(8, 'carmonac14', 'carmonac14', '', '2002-01-16', 'Principiante', 180, 90, '2025-06-02 14:29:07', 'carmonac14@gmail.com', NULL, 3, 'g1dNJfBlz8Ns1BmQh4SxugzblW73', 'email', '$2y$10$c0hZsow/u4igFVoyyqFKGuFAq4mf3fKcekTnY4d2N2p720h50jG8m'),
(9, 'carmonaa1601', 'Alejandro Carmona Rodero', '', '2002-01-16', 'Intermedio', 186, 95, '2025-06-02 14:36:41', 'alejandrocarmonarodero@gmail.com', NULL, 3, 'ck8moO1MnJdJrY3MsC1diP5LhMx2', '', ''),
(10, 'carmonaa0116', 'Alejandro Carmona', '', '2002-01-16', 'Intermedio', 186, 95, '2025-06-02 15:40:04', 'carmonaa0116@gmail.com', NULL, 1, 'otOULNpKm3Xv5VuHoA4LILYwKBx1', '', '');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_usuarios`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_usuarios` (
`id` int(11)
,`n_amigos` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `rutinas_usuario`
--
DROP TABLE IF EXISTS `rutinas_usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `rutinas_usuario`  AS SELECT `u`.`id` AS `id_usuario`, count(`r`.`id`) AS `total_rutinas` FROM (`usuarios` `u` left join `rutinas` `r` on(`u`.`id` = `r`.`idUsuario`)) GROUP BY `u`.`id` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_usuarios`
--
DROP TABLE IF EXISTS `vista_usuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuarios`  AS SELECT `u`.`id` AS `id`, (select count(0) from `amigos` `a` where `a`.`id_usuario1` = `u`.`id` or `a`.`id_usuario2` = `u`.`id`) AS `n_amigos` FROM `usuarios` AS `u` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`id_usuario1`,`id_usuario2`),
  ADD KEY `id_usuario2` (`id_usuario2`);

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejercicios_rutina`
--
ALTER TABLE `ejercicios_rutina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEjercicio` (`idEjercicio`),
  ADD KEY `fk_ejercicios_rutina_rutinas` (`idRutina`);

--
-- Indices de la tabla `ejercicio_musculo`
--
ALTER TABLE `ejercicio_musculo`
  ADD PRIMARY KEY (`ejercicio_id`,`musculo_id`),
  ADD KEY `musculo_id` (`musculo_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `emisor_id` (`emisor_id`);

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
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_remitente` (`id_remitente`),
  ADD KEY `id_destinatario` (`id_destinatario`);

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
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `ejercicios_rutina`
--
ALTER TABLE `ejercicios_rutina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `musculos`
--
ALTER TABLE `musculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`id_usuario1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`id_usuario2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ejercicios_rutina`
--
ALTER TABLE `ejercicios_rutina`
  ADD CONSTRAINT `ejercicios_rutina_ibfk_2` FOREIGN KEY (`idEjercicio`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `fk_ejercicios_rutina_rutinas` FOREIGN KEY (`idRutina`) REFERENCES `rutinas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ejercicio_musculo`
--
ALTER TABLE `ejercicio_musculo`
  ADD CONSTRAINT `ejercicio_musculo_ibfk_1` FOREIGN KEY (`ejercicio_id`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `ejercicio_musculo_ibfk_2` FOREIGN KEY (`musculo_id`) REFERENCES `musculos` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`emisor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD CONSTRAINT `rutinas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  ADD CONSTRAINT `solicitudes_amistad_ibfk_1` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_amistad_ibfk_2` FOREIGN KEY (`id_destinatario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
