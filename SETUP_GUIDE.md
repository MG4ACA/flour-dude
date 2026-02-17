# 🚀 Flour Dude - Complete Setup Guide

This guide will walk you through setting up the Flour Dude coffee shop website from scratch.

## 📋 Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** (v18+) - [Download here](https://nodejs.org/)
- ✅ **MySQL** (v8+) - [Download here](https://dev.mysql.com/downloads/mysql/) or use XAMPP/WAMP
- ✅ **Code Editor** - VS Code recommended
- ✅ **Terminal/Command Prompt**

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MySQL
mysql --version
```

---

## 🗄️ Step 1: Database Setup

### Easy Setup with Seed Script (Recommended)

The easiest way to set up your database is using our automated seed script!

1. **Start MySQL Server**
   - Windows (XAMPP): Start MySQL from XAMPP Control Panel
   - Windows (Standalone): MySQL should auto-start, or start from Services
   - Mac: `mysql.server start`

2. **Configure Database Credentials**

   Navigate to backend folder and edit `.env` file:

   ```bash
   cd c:\Mithuranga\flour-dude\backend
   ```

   Update these values in `.env`:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=flour_dude_db
   DB_PORT=3306
   ```

   **Important**: Replace `your_mysql_password` with your actual password!
   - XAMPP default: usually empty (leave as `DB_PASSWORD=`)
   - Custom MySQL: enter your password

3. **Install Backend Dependencies** (if not done yet)

   ```bash
   npm install
   ```

4. **Run the Seed Script**

   ```bash
   npm run seed
   ```

   This will:
   - ✅ Create the database (`flour_dude_db`)
   - ✅ Create tables (`categories`, `products`)
   - ✅ Insert 5 categories
   - ✅ Insert 25+ sample products with images
   - ✅ Show you a summary of what was created

   You should see output like:

   ```
   🌱 Starting database seeding process...
   ✅ Database ready
   ✅ Tables created
   ✅ 5 categories inserted
   ✅ 25 products inserted
   ✨ Database seeding completed successfully! ✨
   ```

5. **Reset Database Anytime**

   To clear and reseed the database:

   ```bash
   npm run db:reset
   ```

### Alternative: Manual SQL Setup

If you prefer to use SQL directly:

#### Option A: MySQL Command Line

```bash
mysql -u root -p
```

Then inside MySQL:

```sql
source c:/Mithuranga/flour-dude/backend/database/schema.sql
```

#### Option B: MySQL Workbench

1. Open MySQL Workbench
2. File → Open SQL Script → Select `backend/database/schema.sql`
3. Execute (⚡ icon)

#### Option C: phpMyAdmin (XAMPP)

1. Visit `http://localhost/phpmyadmin`
2. Import → Choose `backend/database/schema.sql`
3. Click "Go"

---

## ⚙️ Step 2: Backend Setup

1. **Navigate to Backend Directory**

   ```bash
   cd c:\Mithuranga\flour-dude\backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install:
   - express (Web framework)
   - mysql2 (MySQL driver)
   - cors (Cross-origin support)
   - dotenv (Environment variables)
   - body-parser (Request parsing)
   - nodemon (Auto-restart server)

3. **Test Backend Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   ✅ MySQL Database Connected Successfully
   🚀 Server running on http://localhost:5000
   📊 API endpoints available at http://localhost:5000/api
   🏥 Health check: http://localhost:5000/api/health
   ```

4. **Test API Endpoints**

   Open browser and visit:
   - `http://localhost:5000/api/health` - Should show status OK
   - `http://localhost:5000/api/products` - Should show products JSON
   - `http://localhost:5000/api/categories` - Should show categories JSON

---

## 🎨 Step 3: Frontend Setup

**Keep the backend server running!** Open a new terminal.

1. **Navigate to Frontend Directory**

   ```bash
   cd c:\Mithuranga\flour-dude\frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install:
   - Vue 3
   - Vue Router
   - PrimeVue (UI components)
   - Primeflex (CSS utilities)
   - Tailwind CSS
   - GSAP (Animations)
   - Axios (HTTP client)
   - Vite (Build tool)

   ⏱️ This might take 2-5 minutes

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

4. **Open in Browser**

   Visit: `http://localhost:3000`

   You should see:
   - ✅ Flour Dude homepage with hero section
   - ✅ Navigation bar
   - ✅ Products section with filters
   - ✅ Gallery, testimonials, contact form
   - ✅ Smooth scroll animations

---

## ✅ Step 4: Verification Checklist

Test these features:

### Homepage (`http://localhost:3000`)

- [ ] Hero section displays with coffee image
- [ ] Navigation bar is sticky
- [ ] "Our Story" section loads
- [ ] Products display in grid
- [ ] Category filter works (try selecting "Coffee")
- [ ] Search works (try searching "brownie")
- [ ] Gallery opens lightbox when clicked
- [ ] Testimonials display
- [ ] Location section shows map
- [ ] Contact form submits (shows success toast)
- [ ] Footer has social links

### Admin Panel (`http://localhost:3000/admin`)

- [ ] Products DataTable loads
- [ ] "Add Product" button works
- [ ] Can create a new product
- [ ] Can edit existing product
- [ ] Can delete a product
- [ ] Categories tab works
- [ ] Can add new category
- [ ] Can delete category (if no products use it)

### Backend API

- [ ] `http://localhost:5000/api/health` returns status OK
- [ ] `http://localhost:5000/api/products` returns products array
- [ ] `http://localhost:5000/api/categories` returns categories array

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Access denied for user"**

- Solution: Check your MySQL username/password in `.env`
- Verify MySQL is running: Check XAMPP Control Panel or Services

**Error: "ECONNREFUSED"**

- Solution: MySQL server is not running
- Start MySQL from XAMPP/Services

**Error: "Unknown database 'flour_dude_db'"**

- Solution: Database not created
- Run the schema.sql file again

**Port 5000 already in use**

- Solution: Change PORT in `.env` to 5001 or any available port
- Update proxy in `frontend/vite.config.js` accordingly

### Frontend Issues

**Blank white page**

- Check browser console for errors (F12 → Console)
- Verify backend is running on port 5000
- Check network tab for failed API calls

**Styles not loading**

- Clear browser cache (Ctrl + Shift + Delete)
- Stop dev server (Ctrl + C) and restart: `npm run dev`

**Products not loading**

- Check backend is running: `http://localhost:5000/api/products`
- Check browser console for CORS errors
- Verify database has data: `SELECT * FROM products;` in MySQL

**npm install fails**

- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Try using Node.js v18 or v20

---

## 📝 Quick Commands Reference

### Backend

```bash
# Navigate to backend
cd c:\Mithuranga\flour-dude\backend

# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Frontend

```bash
# Navigate to frontend
cd c:\Mithuranga\flour-dude\frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database

```bash
# Login to MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use flour_dude_db
USE flour_dude_db;

# Show tables
SHOW TABLES;

# View products
SELECT * FROM products;

# View categories
SELECT * FROM categories;
```

---

## 🎯 Next Steps

Now that your site is running:

1. **Customize Content**
   - Update "Our Story" section in `frontend/src/views/HomeView.vue`
   - Change location details to your actual address
   - Update contact information

2. **Add Your Products**
   - Go to Admin Panel
   - Add your real coffee menu items
   - Use your own product images

3. **Customize Styling**
   - Edit colors in `frontend/tailwind.config.js`
   - Change fonts in `frontend/index.html`

4. **Add Authentication** (before going live!)
   - Protect `/admin` route
   - Add login system
   - Implement JWT or session auth

5. **Deploy to Production**
   - Follow deployment instructions in main README.md
   - Consider Netlify/Vercel for frontend
   - Consider Railway/Heroku for backend

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Review the troubleshooting section above
3. Verify all prerequisites are installed
4. Ensure both backend AND frontend servers are running simultaneously
5. Check browser console for JavaScript errors (F12)

---

**Happy Coding! ☕**

Enjoy building your coffee shop website!
