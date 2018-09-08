DROP DATABASE IF EXISTS glamazon;
CREATE DATABASE glamazon;

USE glamazon;

CREATE TABLE inventory (
    product_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (product_id)
);

SELECT * FROM inventory;

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ('Blush', 'Makeup', 15.00, 30),
	('Mascara', 'Makeup', 23.00, 30),
	('Foundation', 'Makeup', 32.00, 30),
    ('Eye Pencil', 'Makeup', 18.00, 30),
    ('Coverup', 'Makeup', 25.00, 30),
    ('Eye Night Cream', 'Skincare', 43.00, 30),
    ('Facial Scrum', 'Skincare', 34.00, 30),
    ('Anti-Wrinkle Cream', 'Skincare', 109.00, 30),
    ('Sunscreen', 'Skincare', 23.00, 30),
    ('Skin Match Daytime Cream', 'Skincare', 63.00, 30);
    


