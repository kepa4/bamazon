DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255),
  price DECIMAL(2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);
