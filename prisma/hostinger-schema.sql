-- Smile Media — Hostinger MySQL schema + seed
-- Import in phpMyAdmin: select database u698171193_smilemedia → Import → choose this file

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `Media` (
    `id` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `filename` VARCHAR(500) NOT NULL,
    `alt` VARCHAR(500) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `SiteSettings` (
    `id` VARCHAR(64) NOT NULL,
    `heroEyebrow` TEXT NOT NULL,
    `heroHeadline1` VARCHAR(500) NOT NULL,
    `heroHeadline2` VARCHAR(500) NOT NULL,
    `heroSub` TEXT NOT NULL,
    `portfolioEyebrow` VARCHAR(255) NOT NULL DEFAULT 'Creative Work',
    `portfolioTitle` VARCHAR(255) NOT NULL DEFAULT 'OUR ARTISTRY',
    `portfolioSub` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Service` (
    `id` VARCHAR(191) NOT NULL,
    `num` VARCHAR(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `mediaId` VARCHAR(191) NULL,
    `itemsJson` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Design` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(64) NOT NULL DEFAULT 'Digital',
    `imageUrl` TEXT NOT NULL,
    `mediaId` VARCHAR(191) NULL,
    `showInPortfolio` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `CampaignSlide` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `mediaId` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `WebSite` (
    `id` VARCHAR(191) NOT NULL,
    `num` VARCHAR(16) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `domain` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `mediaId` VARCHAR(191) NULL,
    `desc` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Service` ADD CONSTRAINT `Service_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `Design` ADD CONSTRAINT `Design_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `CampaignSlide` ADD CONSTRAINT `CampaignSlide_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `WebSite` ADD CONSTRAINT `WebSite_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;

-- Seed: site settings
INSERT INTO `SiteSettings` (`id`, `heroEyebrow`, `heroHeadline1`, `heroHeadline2`, `heroSub`, `portfolioEyebrow`, `portfolioTitle`, `portfolioSub`, `updatedAt`)
VALUES (
  'main',
  'Digital Marketing Agency · Colombo, Sri Lanka',
  'WE BUILD.',
  'WE CREATE.',
  'Transforming ideas into powerful designs and strategies that make brands unforgettable.',
  'Creative Work',
  'OUR ARTISTRY',
  'Flyers, banners, brand identities & digital campaigns — crafted to stop the scroll.',
  NOW(3)
) ON DUPLICATE KEY UPDATE `updatedAt` = NOW(3);

-- Seed: services
INSERT INTO `Service` (`id`, `num`, `name`, `imageUrl`, `itemsJson`, `sortOrder`, `createdAt`, `updatedAt`) VALUES
('svc01', '01', 'Creative Development', '/assets/images/modern-workspace-setup.png', '["Campaign Development","Copywriting & Content","Graphic Design","Brand Identity & Design","Script Writing"]', 0, NOW(3), NOW(3)),
('svc02', '02', 'Creative Strategy', '/assets/images/creative-workspace-scene.png', '["Social Media Strategy","Communication Strategy","Content Strategy"]', 1, NOW(3), NOW(3)),
('svc03', '03', 'Production House', '/assets/images/studio-cameraman-scene.png', '["TV Commercials","Product Demos","Corporate Videos","Social Media Video Ads"]', 2, NOW(3), NOW(3)),
('svc04', '04', 'BTL Activities', '/assets/images/disco-ball-celebration.png', '["Corporate Events","Exhibitions","BTL Activations","Street Promotions"]', 3, NOW(3), NOW(3)),
('svc05', '05', 'Web Development', '/assets/images/coding-workspace-setup.png', '["Website Development","Landing Pages","E-Commerce Sites","Web Applications","SEO Optimization"]', 4, NOW(3), NOW(3)),
('svc06', '06', 'Other Services', '/assets/images/stack-of-gift-boxes.png', '["Corporate Gifts","Branding","Offset & Digital Printing","OOH"]', 5, NOW(3), NOW(3));

-- Seed: web projects
INSERT INTO `WebSite` (`id`, `num`, `url`, `domain`, `tag`, `imageUrl`, `desc`, `sortOrder`, `createdAt`, `updatedAt`) VALUES
('web01', '01', 'https://baseussl.lk', 'baseussl.lk', 'E-Commerce · Mobile Accessories', '/assets/images/Web_snaps/baseus_snap.png', 'Official Baseus storefront for Sri Lanka — premium mobile accessories with a seamless shopping experience.', 0, NOW(3), NOW(3)),
('web02', '02', 'https://ultracare.lk', 'ultracare.lk', 'IT Services · Repairs & Accessories', '/assets/images/Web_snaps/ultra.png', 'An IT service center website for device repairs and accessory sales — built to showcase services and drive in-store visits.', 1, NOW(3), NOW(3)),
('web03', '03', 'https://farbe.lk', 'farbe.lk', 'AI Technologies · Computer Vision', '/assets/images/Web_snaps/farbe.png', 'Corporate site for an AI-focused tech startup — showcasing R&D across computer vision, remote sensing, multispectral imaging, and intelligent automation.', 2, NOW(3), NOW(3)),
('web04', '04', 'https://colombocolts.lk', 'colombocolts.lk', 'Sports Club · Cricket', '/assets/images/Web_snaps/colombo_colts.png', 'Official website for Colombo Colts Cricket Club — heritage, fixtures, academy, and membership for a premier League Division A club.', 3, NOW(3), NOW(3));
