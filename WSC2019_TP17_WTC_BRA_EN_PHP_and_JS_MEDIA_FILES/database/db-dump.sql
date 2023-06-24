
DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `duration_days` smallint(5) UNSIGNED NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seats` int(10) UNSIGNED NOT NULL,
  `instructor_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `courses` (`id`, `title`, `description`, `date_time`, `duration_days`, `location`, `seats`, `instructor_name`) VALUES
(1, 'HTML5, CSS3 Basics', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.', '2019-08-15 08:00:00', 3, 'Floor1', 15, 'Aleksey Abramov'),
(2, 'Web conference', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi maiores praesentium vel voluptatum! A alias facilis id in necessitatibus, nobis non odio possimus, quisquam quo saepe sapiente sint, ullam!', '2019-09-12 08:00:00', 2, 'Floor3', 10, 'Pavel Zajec');


ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `courses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

