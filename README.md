# Natours 🌍

A modern, full-stack web application for booking nature tours built with Node.js, Express, and MongoDB.

![Natours Banner](./docs/images/banner.png)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## ✨ Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Password reset functionality
  - Role-based access control (admin, lead-guide, guide, user)

- **Tour Management**
  - Browse and search tours
  - Detailed tour information with maps
  - Tour reviews and ratings
  - Image galleries

- **Booking System**
  - Secure payment processing with Stripe
  - Booking management
  - Email confirmations

- **User Dashboard**
  - Profile management
  - Booking history
  - Settings update

- **Security Features**
  - Data sanitization
  - Rate limiting
  - Security headers
  - XSS protection

![Features Overview](./docs/images/features.png)

## 🚀 Demo

**Live Demo:** [Your deployed app URL]

![Demo Screenshot](./docs/images/demo-screenshot.png)

### Test Accounts
- **Admin:** admin@natours.io / password123
- **User:** user@natours.io / password123

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Processing

**Frontend:**
- Pug Templates
- Vanilla JavaScript
- CSS3
- Mapbox GL JS

**Tools & Libraries:**
- Nodemailer (Email)
- Multer (File Upload)
- Sharp (Image Processing)
- Helmet (Security)
- Morgan (Logging)

![Tech Stack](./docs/images/tech-stack.png)

## 📦 Installation

### Prerequisites
- Node.js (>= 10.0.0)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/natours.git
   cd natours
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config.env.example config.env
   ```
   Fill in your environment variables (see [Environment Variables](#environment-variables))

4. **Import sample data (optional)**
   ```bash
   npm run import-data
   ```

5. **Start the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

The app will be running at `http://localhost:3000`

## 🎯 Usage

### Development Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm run start:prod

# Debug with ndb
npm run debug

# Build JavaScript bundle
npm run build:js

# Watch JavaScript files
npm run watch:js
```

### API Endpoints

Base URL: `http://localhost:3000/api/v1`

#### Authentication
- `POST /users/signup` - Register new user
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `POST /users/forgotPassword` - Request password reset
- `PATCH /users/resetPassword/:token` - Reset password

#### Tours
- `GET /tours` - Get all tours
- `GET /tours/:id` - Get single tour
- `POST /tours` - Create tour (admin only)
- `PATCH /tours/:id` - Update tour (admin only)
- `DELETE /tours/:id` - Delete tour (admin only)

#### Bookings
- `GET /bookings` - Get all bookings
- `POST /bookings` - Create booking
- `GET /bookings/checkout-session/:tourId` - Get Stripe checkout session

![API Documentation](./docs/images/api-docs.png)

## 📁 Project Structure

```
natours/
├── controllers/          # Route controllers
├── models/              # Database models
├── routes/              # Express routes
├── views/               # Pug templates
├── public/              # Static files
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   └── img/            # Images
├── utils/               # Utility functions
├── dev-data/           # Development data
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json        # Dependencies and scripts
```

![Project Structure](./docs/images/project-structure.png)

## 🔧 Environment Variables

Create a `config.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb://localhost:27017/natours
DATABASE_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (Nodemailer)
EMAIL_FROM=noreply@natours.com
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Mapbox
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```



## 👨‍💻 Author

**Shiva** - [Your GitHub Profile](https://github.com/yourusername)

![Footer](./docs/images/footer.png)

---