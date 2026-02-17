# ☕ Flour Dude - Artisanal Coffee Shop Website

A modern, vintage-styled website for Flour Dude, an artisanal coffee shop in Galle, Sri Lanka. Built with Vue 3, PrimeVue, and Express.js with MySQL.

## 🎨 Features

### Frontend
- **Vue 3** with Composition API (Script Setup)
- **PrimeVue** components for modern UI
- **Primeflex** for responsive layouts
- **Tailwind CSS** for custom styling
- **GSAP** animations for smooth scroll effects
- **Vintage coffee shop aesthetic** with custom color palette

### Pages & Sections
- ✅ Sticky Navigation Bar
- ✅ Hero Section with vintage aesthetic
- ✅ Our Story Section
- ✅ Products Menu with category filters and search
- ✅ Gallery Section with lightbox
- ✅ Customer Testimonials
- ✅ Location & Hours with Google Maps
- ✅ Contact Form
- ✅ Footer with social media links
- ✅ Admin Panel with full CRUD operations

### Backend
- **Node.js** with Express
- **MySQL** database
- RESTful API endpoints
- CORS enabled
- Full CRUD operations for products and categories

## 🎨 Color Palette

```
Background:  #FFF1E8 (Primary canvas)
Accent:      #D39A6A (Hovers/Buttons)
Primary:     #9A5A2E (Headings/CTAs)
Text:        #3E1F0F (Body/Footer)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
cd c:\Mithuranga\flour-dude
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure database
# Edit .env file with your MySQL credentials
# Default configuration:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=flour_dude_db
# DB_PORT=3306
```

#### 3. Setup Database

Open MySQL and run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

Or open MySQL Workbench/phpMyAdmin and execute the SQL file located at:
`backend/database/schema.sql`

This will:
- Create the database `flour_dude_db`
- Create `categories` and `products` tables
- Insert sample data (5 categories, 25+ products)

#### 4. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

### Running the Application

#### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on: `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 📁 Project Structure

```
flour-dude/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.vue
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   └── AdminView.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── products.js
│   │   └── categories.js
│   ├── database/
│   │   └── schema.sql
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category
- `DELETE /api/categories/:id` - Delete category

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage

### Viewing the Website

1. Open `http://localhost:3000` in your browser
2. Navigate through different sections:
   - Home (Hero section)
   - Our Story
   - Menu (Products with filters)
   - Gallery
   - Testimonials
   - Visit Us (Location & Hours)
   - Contact Form

### Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Manage Products:
   - Add new products
   - Edit existing products
   - Delete products
   - Search and filter
3. Manage Categories:
   - Add new categories
   - Delete categories

**Note:** Currently there's no authentication. You can add password protection later.

## 🎨 Customization

### Changing Colors

Edit `frontend/tailwind.config.js`:

```javascript
colors: {
  vintage: {
    bg: '#FFF1E8',
    accent: '#D39A6A',
    primary: '#9A5A2E',
    text: '#3E1F0F',
  }
}
```

### Changing Fonts

Edit `frontend/index.html` to change Google Fonts imports, then update `tailwind.config.js`:

```javascript
fontFamily: {
  heading: ['"Playfair Display"', 'serif'],
  body: ['Inter', 'sans-serif'],
}
```

### Adding Categories

1. Go to Admin Panel → Categories Management
2. Click "Add Category"
3. Enter category name
4. Click "Create"

### Adding Products

1. Go to Admin Panel → Products Management
2. Click "Add Product"
3. Fill in all fields:
   - Product Name
   - Description
   - Price
   - Category
   - Image URL (use Unsplash for free images)
4. Click "Create"

## 📸 Using Images

The project uses [Unsplash](https://unsplash.com) for high-quality placeholder images. 

For coffee images, search for:
- Coffee: `https://unsplash.com/s/photos/coffee`
- Brownies: `https://unsplash.com/s/photos/brownies`
- Pastries: `https://unsplash.com/s/photos/pastries`
- Desserts: `https://unsplash.com/s/photos/desserts`

Right-click on any image → Copy Image Address → Use in product form

## 🛠️ Technologies Used

### Frontend
- Vue 3 (Composition API)
- Vue Router
- PrimeVue (UI Components)
- Primeflex (Grid System)
- PrimeIcons
- Tailwind CSS
- GSAP (Animations)
- Axios (HTTP Client)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MySQL2 (MySQL Driver)
- CORS
- dotenv
- body-parser

## 🔒 Security Notes

⚠️ **Important**: The admin panel currently has NO authentication. Before deploying to production:

1. Add authentication (JWT or session-based)
2. Change database credentials
3. Enable HTTPS
4. Add rate limiting
5. Validate and sanitize all inputs
6. Add CSRF protection

## 🚢 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting service

3. Update API URL in production:
   - Create `.env.production` file
   - Set `VITE_API_URL=https://your-backend-url.com/api`

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Update `.env` with production database credentials
2. Deploy using your preferred platform
3. Update CORS settings in `server.js` to allow your frontend domain

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Built with ❤️ by GitHub Copilot for Flour Dude Coffee Shop

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Enjoy your coffee! ☕**
