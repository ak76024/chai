# ☕ Chai

A modern full-stack web application built with **Next.js**, allowing users to support creators by making payments through **Razorpay**. Users can create profiles, authenticate securely, and receive payments in a clean, responsive interface.

> **Live Demo:** https://ak76024-chai.vercel.app/

---

## ✨ Features

- 🔐 Secure Authentication
  - Google OAuth (NextAuth)
  - Session Management

- 👤 User Profiles
  - Custom username pages
  - Public creator profile
  - Personal dashboard

- 💳 Payment Integration
  - Razorpay Payment Gateway
  - Secure payment processing
  - Payment history

- 🎨 Modern UI
  - Responsive design
  - Mobile friendly
  - Clean and minimal interface

- ⚡ Optimized Performance
  - Server Components
  - Next.js App Router
  - Fast page loading

---

## 🛠 Tech Stack

### Frontend
- Next.js 15
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### Database
- MongoDB
- Mongoose

### Authentication
- NextAuth.js
- Google OAuth

### Payment Gateway
- Razorpay

### Deployment
- Vercel

---

## 📂 Folder Structure

```
app/
├── about/
├── api/
│   ├── auth/[...nextauth]/
│   └── razorpay/
├── login/
├── payments/
├── profile/
├── sUser/
├── user/[username]/
├── layout.js
├── page.js
└── globals.css

components/
├── Footer.js
├── Navbar.js
├── PaymentPage.js
└── SessionWrapper.js

actions/
└── useraction.js

models/
├── User.js
└── Payment.js

db/
public/
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/ak76024/chai.git
```

```bash
cd chai
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env.local` file in the root directory.

```env
MONGODB_URI=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Run Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## 📸 Screenshots

Add screenshots of

- Home Page
- Login
- Profile
- Payment Page
- Creator Page

---

## 🔮 Future Improvements

- Email Notifications
- Payment Analytics
- Dark Mode
- Creator Dashboard
- Monthly Memberships
- QR Code Payments
- Admin Panel

---

## 👨‍💻 Author

**Akash Burnwal**

- BCA Student
- Full Stack Developer
- Passionate about Web Development & Cybersecurity

---

## ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.
