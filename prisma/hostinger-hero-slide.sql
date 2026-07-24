-- Run in phpMyAdmin on database: u698171193_smilemedia
-- (SSH on Hostinger shared hosting has no npx — use this instead)

CREATE TABLE IF NOT EXISTS `HeroSlide` (
    `id` VARCHAR(191) NOT NULL,
    `titleLine1` VARCHAR(255) NOT NULL,
    `titleLine2` VARCHAR(255) NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `mediaId` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Ignore error if FK already exists
ALTER TABLE `HeroSlide`
  ADD CONSTRAINT `HeroSlide_mediaId_fkey`
  FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO `HeroSlide` (`id`, `titleLine1`, `titleLine2`, `imageUrl`, `sortOrder`, `createdAt`) VALUES
('hero01', 'CREATIVE', 'DEVELOPMENT', '/assets/images/hero-slides/01-creative-development.png', 0, NOW(3)),
('hero02', 'CREATIVE', 'STRATEGY', '/assets/images/hero-slides/02-creative-strategy.png', 1, NOW(3)),
('hero03', 'PRODUCTION', 'HOUSE', '/assets/images/hero-slides/03-production-house.png', 2, NOW(3)),
('hero04', 'BTL', 'ACTIVITIES', '/assets/images/hero-slides/04-btl-activities.jpg', 3, NOW(3)),
('hero05', 'WEB', 'DEVELOPMENT', '/assets/images/hero-slides/05-web-development.png', 4, NOW(3)),
('hero06', 'OTHER', 'SERVICES', '/assets/images/hero-slides/06-other-services.png', 5, NOW(3))
ON DUPLICATE KEY UPDATE
  `titleLine1` = VALUES(`titleLine1`),
  `titleLine2` = VALUES(`titleLine2`),
  `imageUrl` = VALUES(`imageUrl`),
  `sortOrder` = VALUES(`sortOrder`);
