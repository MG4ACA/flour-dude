import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Load environment variables
dotenv.config();

// Categories seed data
const categories = [
  { name: 'Coffee' },
  { name: 'Brownies' },
  { name: 'Pastries' },
  { name: 'Desserts' },
  { name: 'Beverages' },
];

// Products seed data
const products = [
  // Coffee Items
  {
    name: 'Espresso',
    description:
      'Rich and bold espresso shot, crafted from premium beans sourced from local estates',
    price: 350.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800',
  },
  {
    name: 'Cappuccino',
    description:
      'Perfectly balanced espresso with steamed milk and velvety foam, topped with a dusting of cocoa',
    price: 450.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800',
  },
  {
    name: 'Latte',
    description:
      'Smooth and creamy latte with beautiful art, made with our signature espresso blend',
    price: 500.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800',
  },
  {
    name: 'Americano',
    description: 'Classic espresso diluted with hot water for a smooth, rich flavor',
    price: 400.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
  },
  {
    name: 'Mocha',
    description:
      'Decadent blend of espresso, chocolate, and steamed milk topped with whipped cream',
    price: 550.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800',
  },
  {
    name: 'Flat White',
    description: "Velvety microfoam over a double shot of espresso - a coffee lover's dream",
    price: 480.0,
    category_name: 'Coffee',
    image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
  },
  // Brownies
  {
    name: 'Dark Chocolate Brownie',
    description: 'Decadent double chocolate brownie with premium cocoa and walnuts, served warm',
    price: 400.0,
    category_name: 'Brownies',
    image_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=800',
  },
  {
    name: 'Salted Caramel Brownie',
    description: 'Rich fudgy brownie with salted caramel swirls and sea salt flakes',
    price: 450.0,
    category_name: 'Brownies',
    image_url: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800',
  },
  {
    name: 'Nutella Brownie',
    description: 'Gooey brownie with Nutella swirls and hazelnut chunks',
    price: 480.0,
    category_name: 'Brownies',
    image_url: 'https://images.unsplash.com/photo-1564355808853-1ce3e0915b50?q=80&w=800',
  },
  {
    name: 'Triple Chocolate Brownie',
    description: 'Ultimate chocolate experience with dark, milk, and white chocolate',
    price: 500.0,
    category_name: 'Brownies',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800',
  },
  // Pastries
  {
    name: 'Butter Croissant',
    description: 'Buttery, flaky French croissant, baked fresh daily with layers of perfection',
    price: 300.0,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800',
  },
  {
    name: 'Almond Croissant',
    description: 'Classic croissant filled with sweet almond cream and topped with sliced almonds',
    price: 380.0,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=800',
  },
  {
    name: 'Cinnamon Roll',
    description: 'Warm cinnamon roll with cream cheese frosting, a sweet spiral of happiness',
    price: 350.0,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800',
  },
  {
    name: 'Pain au Chocolat',
    description: 'Flaky pastry with rich dark chocolate batons inside',
    price: 320.0,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1623334045539-f2af7d733e0d?q=80&w=800',
  },
  {
    name: 'Apple Danish',
    description: 'Sweet pastry with cinnamon-spiced apple filling and vanilla glaze',
    price: 340.0,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800',
  },
  // Desserts
  {
    name: 'Tiramisu',
    description: 'Classic Italian tiramisu with mascarpone, espresso-soaked ladyfingers, and cocoa',
    price: 600.0,
    category_name: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800',
  },
  {
    name: 'New York Cheesecake',
    description: 'Creamy New York style cheesecake with graham cracker crust and berry compote',
    price: 550.0,
    category_name: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800',
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 650.0,
    category_name: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800',
  },
  {
    name: 'Banoffee Pie',
    description: 'Indulgent pie with banana, toffee, and fresh whipped cream on a biscuit base',
    price: 580.0,
    category_name: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=800',
  },
  {
    name: 'Panna Cotta',
    description: 'Silky smooth vanilla panna cotta with mixed berry coulis',
    price: 520.0,
    category_name: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800',
  },
  // Beverages
  {
    name: 'Iced Coffee',
    description: 'Smooth cold brew served over ice with your choice of milk',
    price: 450.0,
    category_name: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
  },
  {
    name: 'Frappe',
    description: 'Blended iced coffee with whipped cream and caramel drizzle',
    price: 520.0,
    category_name: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
  },
  {
    name: 'Hot Chocolate',
    description: 'Rich Belgian chocolate melted into steamed milk, topped with marshmallows',
    price: 480.0,
    category_name: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?q=80&w=800',
  },
  {
    name: 'Chai Latte',
    description: 'Aromatic blend of black tea and spices with steamed milk and honey',
    price: 420.0,
    category_name: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1597318252337-b869c157d6d5?q=80&w=800',
  },
  {
    name: 'Matcha Latte',
    description: 'Premium Japanese matcha whisked with steamed milk and sweetened to perfection',
    price: 550.0,
    category_name: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1536013634175-72f77e04ff68?q=80&w=800',
  },
];

async function seedDatabase() {
  let connection = null;

  try {
    console.log('🌱 Starting database seeding process...\n');

    // Step 1: Create connection WITHOUT specifying database (so we can create it)
    console.log('🔌 Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
    });
    console.log('✅ Connected to MySQL server\n');

    // Step 2: Create database if not exists
    const dbName = process.env.DB_NAME || 'flour_dude_db';
    console.log(`📦 Creating database '${dbName}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);
    console.log('✅ Database ready\n');

    // Step 3: Create tables
    console.log('🔨 Creating tables...');

    // Create categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await connection.query(`
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
      )
    `);

    console.log('✅ Tables created\n');

    // Step 4: Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE products');
    await connection.query('TRUNCATE TABLE categories');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Existing data cleared\n');

    // Step 5: Insert categories
    console.log('📁 Inserting categories...');
    const categoryMap = {};

    for (const category of categories) {
      const [result] = await connection.query('INSERT INTO categories (name) VALUES (?)', [
        category.name,
      ]);
      categoryMap[category.name] = result.insertId;
      console.log(`  ✓ ${category.name} (ID: ${result.insertId})`);
    }

    console.log(`✅ ${categories.length} categories inserted\n`);

    // Step 6: Insert products
    console.log('🛍️  Inserting products...');
    let productCount = 0;

    for (const product of products) {
      const categoryId = categoryMap[product.category_name];

      await connection.query(
        'INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, categoryId, product.image_url],
      );

      productCount++;
      console.log(`  ✓ ${product.name} (${product.category_name})`);
    }

    console.log(`✅ ${productCount} products inserted\n`);

    // Step 7: Verify data
    console.log('🔍 Verifying seeded data...');
    const [categoryCount] = await connection.query('SELECT COUNT(*) as count FROM categories');
    const [productCountResult] = await connection.query('SELECT COUNT(*) as count FROM products');

    console.log(`  📊 Total Categories: ${categoryCount[0].count}`);
    console.log(`  📊 Total Products: ${productCountResult[0].count}`);

    console.log('\n✨ Database seeding completed successfully! ✨\n');
  } catch (error) {
    console.error('\n❌ Error during seeding:');
    console.error(error.message);
    console.error('\nPlease check:');
    console.error('1. MySQL server is running');
    console.error('2. Database credentials in .env are correct');
    console.error('3. User has permission to create database and tables\n');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seed function
seedDatabase();
