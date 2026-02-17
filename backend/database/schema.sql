-- Create Database
CREATE DATABASE IF NOT EXISTS flour_dude_db;
USE flour_dude_db;

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert Sample Categories
INSERT INTO categories (name) VALUES
('Coffee'),
('Brownies'),
('Pastries'),
('Desserts'),
('Beverages');

-- Insert Sample Products
INSERT INTO products (name, description, price, category_id, image_url) VALUES
-- Coffee Items
('Espresso', 'Rich and bold espresso shot, crafted from premium beans sourced from local estates', 350.00, 1, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800'),
('Cappuccino', 'Perfectly balanced espresso with steamed milk and velvety foam, topped with a dusting of cocoa', 450.00, 1, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800'),
('Latte', 'Smooth and creamy latte with beautiful art, made with our signature espresso blend', 500.00, 1, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800'),
('Americano', 'Classic espresso diluted with hot water for a smooth, rich flavor', 400.00, 1, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800'),
('Mocha', 'Decadent blend of espresso, chocolate, and steamed milk topped with whipped cream', 550.00, 1, 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800'),
('Flat White', 'Velvety microfoam over a double shot of espresso - a coffee lover''s dream', 480.00, 1, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800'),

-- Brownies
('Dark Chocolate Brownie', 'Decadent double chocolate brownie with premium cocoa and walnuts, served warm', 400.00, 2, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=800'),
('Salted Caramel Brownie', 'Rich fudgy brownie with salted caramel swirls and sea salt flakes', 450.00, 2, 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800'),
('Nutella Brownie', 'Gooey brownie with Nutella swirls and hazelnut chunks', 480.00, 2, 'https://images.unsplash.com/photo-1564355808853-1ce3e0915b50?q=80&w=800'),
('Triple Chocolate Brownie', 'Ultimate chocolate experience with dark, milk, and white chocolate', 500.00, 2, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800'),

-- Pastries
('Butter Croissant', 'Buttery, flaky French croissant, baked fresh daily with layers of perfection', 300.00, 3, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800'),
('Almond Croissant', 'Classic croissant filled with sweet almond cream and topped with sliced almonds', 380.00, 3, 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=800'),
('Cinnamon Roll', 'Warm cinnamon roll with cream cheese frosting, a sweet spiral of happiness', 350.00, 3, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800'),
('Pain au Chocolat', 'Flaky pastry with rich dark chocolate batons inside', 320.00, 3, 'https://images.unsplash.com/photo-1623334045539-f2af7d733e0d?q=80&w=800'),
('Apple Danish', 'Sweet pastry with cinnamon-spiced apple filling and vanilla glaze', 340.00, 3, 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800'),

-- Desserts
('Tiramisu', 'Classic Italian tiramisu with mascarpone, espresso-soaked ladyfingers, and cocoa', 600.00, 4, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800'),
('New York Cheesecake', 'Creamy New York style cheesecake with graham cracker crust and berry compote', 550.00, 4, 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800'),
('Chocolate Lava Cake', 'Warm chocolate cake with a molten center, served with vanilla ice cream', 650.00, 4, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800'),
('Banoffee Pie', 'Indulgent pie with banana, toffee, and fresh whipped cream on a biscuit base', 580.00, 4, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=800'),
('Panna Cotta', 'Silky smooth vanilla panna cotta with mixed berry coulis', 520.00, 4, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800'),

-- Beverages
('Iced Coffee', 'Smooth cold brew served over ice with your choice of milk', 450.00, 5, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800'),
('Frappe', 'Blended iced coffee with whipped cream and caramel drizzle', 520.00, 5, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800'),
('Hot Chocolate', 'Rich Belgian chocolate melted into steamed milk, topped with marshmallows', 480.00, 5, 'https://images.unsplash.com/photo-1542990253-a781e04c0082?q=80&w=800'),
('Chai Latte', 'Aromatic blend of black tea and spices with steamed milk and honey', 420.00, 5, 'https://images.unsplash.com/photo-1597318252337-b869c157d6d5?q=80&w=800'),
('Matcha Latte', 'Premium Japanese matcha whisked with steamed milk and sweetened to perfection', 550.00, 5, 'https://images.unsplash.com/photo-1536013634175-72f77e04ff68?q=80&w=800');

-- Display confirmation
SELECT 'Database setup completed successfully!' AS Status;
SELECT COUNT(*) AS Total_Categories FROM categories;
SELECT COUNT(*) AS Total_Products FROM products;
