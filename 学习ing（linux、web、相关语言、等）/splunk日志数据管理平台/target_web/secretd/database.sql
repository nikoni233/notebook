-- testdata_stu.sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS testdata_stu;
-- 使用该数据库
USE testdata_stu;
-- 创建 info_stu 表
CREATE TABLE IF NOT EXISTS info_stu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    sex VARCHAR(10),
    age INT,
    tel VARCHAR(20)
);
-- 创建 acct_stu 表
CREATE TABLE IF NOT EXISTS acct_stu (
    id INT PRIMARY KEY,
    acct VARCHAR(50),
    passwd VARCHAR(50),
    money DECIMAL(10, 2)
);
-- 插入 info_stu 表基础数据
INSERT INTO info_stu (name, sex, age, tel) VALUES
('John Doe', 'Male', 20, '1234567890'),
('Jane Smith', 'Female', 22, '2345678901'),
('Alice Johnson', 'Female', 21, '3456789012'),
('Bob Williams', 'Male', 23, '4567890123');
-- 插入 acct_stu 表基础数据
INSERT INTO acct_stu (id, acct, passwd, money) VALUES
(1, 'johndoe@testdata.cat', 'password123', 1000.00),
(2, 'janesmith@testdata.cat', 'password456', 1500.50),
(3, 'alicejohnson@testdata.cat', 'password789', 2000.00),
(4, 'bobwilliams@testdata.cat', 'password000', 500.75);