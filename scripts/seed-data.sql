-- Seed data for YanKapı

USE yankapi_db;

-- Insert sample neighborhoods
INSERT INTO neighborhoods (name, city, district, latitude, longitude) VALUES
('Kadıköy Merkez', 'İstanbul', 'Kadıköy', 40.9900, 29.0300),
('Beşiktaş Merkez', 'İstanbul', 'Beşiktaş', 41.0400, 29.0100),
('Çankaya Merkez', 'Ankara', 'Çankaya', 39.9200, 32.8600),
('Konak Merkez', 'İzmir', 'Konak', 38.4200, 27.1400),
('Üsküdar Merkez', 'İstanbul', 'Üsküdar', 41.0200, 29.0200);

-- Insert sample badges
INSERT INTO badges (name, description, icon, points_required) VALUES
('Yeni Komşu', 'İlk görevinizi tamamladınız', '🏠', 0),
('Yardımsever', '5 görevi tamamladınız', '🤝', 50),
('Mahalle Kahramanı', '20 görevi tamamladınız', '🦸', 200),
('Gıda Paylaşımcısı', '10 gıda paylaşımı yaptınız', '🍽️', 100),
('Güvenilir Komşu', '50 olumlu değerlendirme aldınız', '⭐', 500);

-- Insert sample users (passwords are hashed for 'password123')
INSERT INTO users (first_name, last_name, email, password, neighborhood, points, is_verified) VALUES
('Ahmet', 'Yılmaz', 'ahmet@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Kadıköy Merkez', 150, TRUE),
('Ayşe', 'Demir', 'ayse@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Kadıköy Merkez', 200, TRUE),
('Mehmet', 'Kaya', 'mehmet@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Beşiktaş Merkez', 75, TRUE),
('Fatma', 'Özkan', 'fatma@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Çankaya Merkez', 300, TRUE);

-- Insert sample tasks
INSERT INTO tasks (user_id, title, description, category, neighborhood, points_offered, deadline) VALUES
(1, 'Fazla Makarna Paylaşımı', 'Bugün çok makarna pişirdim, 2-3 kişilik porsiyon var. İsteyen komşum alabilir.', 'food_sharing', 'Kadıköy Merkez', 10, DATE_ADD(NOW(), INTERVAL 1 DAY)),
(2, 'Market Alışverişi Yardımı', 'Yaşlı annem için market alışverişi yapacak komşu arıyorum. Liste hazır.', 'daily_help', 'Kadıköy Merkez', 25, DATE_ADD(NOW(), INTERVAL 2 DAY)),
(3, 'Bilgisayar Kurulumu', 'Yeni aldığım bilgisayarın kurulumunda yardım lazım. Teknik bilgisi olan var mı?', 'micro_service', 'Beşiktaş Merkez', 50, DATE_ADD(NOW(), INTERVAL 3 DAY)),
(4, 'Köpek Gezdirme', 'Bu hafta sonu şehir dışındayım, köpeğimi gezdirecek komşu var mı?', 'daily_help', 'Çankaya Merkez', 30, DATE_ADD(NOW(), INTERVAL 5 DAY));

-- Assign badges to users
INSERT INTO user_badges (user_id, badge_id) VALUES
(1, 1), (1, 2),
(2, 1), (2, 2), (2, 4),
(3, 1),
(4, 1), (4, 2), (4, 3);
