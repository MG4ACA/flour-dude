# Database Setup & Seeding

This folder contains the database configuration and seeding scripts for Flour Dude.

## Files

- **`init.sql`** - Database and table creation SQL (schema only, no data)
- **`seed.js`** - Node.js script to create database, tables, and insert seed data
- **`schema.sql`** - Original combined schema + seed data (kept for reference)

## Usage

### Recommended: Use the Seed Script

The seed script automates the entire database setup process:

```bash
# From the backend folder
npm run seed
```

This will:

1. ✅ Create the database `flour_dude_db` if it doesn't exist
2. ✅ Create tables (`categories`, `products`) with proper schema
3. ✅ Clear existing data (if any)
4. ✅ Insert seed data:
   - 5 categories (Coffee, Brownies, Pastries, Desserts, Beverages)
   - 25+ products with images from Unsplash
5. ✅ Show you a summary of what was created

### Reset Database

To clear and reseed the entire database:

```bash
npm run db:reset
```

This is the same as `npm run seed` - it will drop all data and start fresh.

### Manual SQL Import

If you prefer to use SQL directly:

#### Option 1: MySQL Command Line

```bash
mysql -u root -p < database/init.sql
```

#### Option 2: MySQL Workbench

1. Open MySQL Workbench
2. File → Open SQL Script → Select `init.sql`
3. Execute

#### Option 3: phpMyAdmin

1. Go to http://localhost/phpmyadmin
2. Import → Choose `init.sql`
3. Execute

**Note**: Manual import only creates schema. You'll need to run `npm run seed` to insert data.

## Seed Data Details

### Categories (5)

- Coffee
- Brownies
- Pastries
- Desserts
- Beverages

### Products (25+)

Each product includes:

- Name
- Description
- Price (in LKR)
- Category association
- Image URL (from Unsplash)

Sample products include:

- **Coffee**: Espresso, Cappuccino, Latte, Americano, Mocha, Flat White
- **Brownies**: Dark Chocolate, Salted Caramel, Nutella, Triple Chocolate
- **Pastries**: Croissant, Almond Croissant, Cinnamon Roll, Pain au Chocolat, Apple Danish
- **Desserts**: Tiramisu, Cheesecake, Lava Cake, Banoffee Pie, Panna Cotta
- **Beverages**: Iced Coffee, Frappe, Hot Chocolate, Chai Latte, Matcha Latte

## Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table

```sql
CREATE TABLE products (
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
```

## Troubleshooting

### "Error: ER_ACCESS_DENIED_ERROR"

- Check your `.env` file has correct MySQL credentials
- Default XAMPP password is usually empty: `DB_PASSWORD=`

### "Error: ER_DBACCESS_DENIED_ERROR"

- Your MySQL user doesn't have permission to create databases
- Try running as root or grant privileges:
  ```sql
  GRANT ALL PRIVILEGES ON *.* TO 'your_user'@'localhost';
  ```

### "Error: Cannot find module"

- Make sure you ran `npm install` in the backend folder
- Make sure you're running the command from the `backend/` directory

### "Connection refused"

- MySQL server is not running
- Start MySQL from XAMPP Control Panel or Services

### "Foreign key constraint fails"

- This shouldn't happen with the seed script
- If you're modifying data manually, ensure categories exist before adding products

## Customizing Seed Data

To add your own seed data, edit `seed.js`:

1. **Add categories**: Add to the `categories` array

   ```javascript
   const categories = [
     { name: 'Coffee' },
     { name: 'Your Category' }, // Add here
   ];
   ```

2. **Add products**: Add to the `products` array

   ```javascript
   const products = [
     {
       name: 'Your Product',
       description: 'Product description',
       price: 500.0,
       category_name: 'Coffee',
       image_url: 'https://images.unsplash.com/photo-...',
     },
   ];
   ```

3. **Run the seed script again**:
   ```bash
   npm run seed
   ```

## Notes

- The seed script is **idempotent** - it clears existing data before inserting
- If you want to _keep_ existing data, comment out the `TRUNCATE` queries in `seed.js`
- Product images are from Unsplash and are free to use
- Prices are in Sri Lankan Rupees (LKR)
