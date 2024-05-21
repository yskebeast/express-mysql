CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    pref VARCHAR(255)
);

INSERT INTO user (name, age, pref) VALUES ('田中太郎', 25, '北海道');
INSERT INTO user (name, age, pref) VALUES ('山田花子', 30, '東京');
INSERT INTO user (name, age, pref) VALUES ('佐藤三郎', 40, '福岡');
INSERT INTO user (name, age, pref) VALUES ('鈴木次郎', 35, '大阪');
INSERT INTO user (name, age, pref) VALUES ('高橋美咲', 28, '神奈川');
INSERT INTO user (name, age, pref) VALUES ('伊藤健太', 32, '埼玉');
INSERT INTO user (name, age, pref) VALUES ('渡辺さくら', 27, '愛知');
INSERT INTO user (name, age, pref) VALUES ('中村雅子', 45, '京都');
INSERT INTO user (name, age, pref) VALUES ('小林夏美', 31, '広島');
INSERT INTO user (name, age, pref) VALUES ('加藤健一', 37, '沖縄');
INSERT INTO user (name, age, pref) VALUES ('木村智子', 29, '北海道');