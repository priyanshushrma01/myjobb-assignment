# myjobb AI Full Stack Developer Assignment

## 🚀 Project Overview
This is a full-stack dashboard application built as part of the myjobb AI Full Stack Developer Intern assignment.  
It features secure email OTP authentication, a polished dashboard UI, and interactive analytics visualizations.

## ✨ Features
- **Email OTP Authentication:** Secure login via email OTP, with confirmation emails and resend OTP support.
- **Professional Responsive Emails:** All emails are rendered using `react-email` for mobile and desktop compatibility.
- **Dashboard UI:** Built with Next.js (App Router), TailwindCSS, and `shadcn/ui` for a modern, responsive interface.
- **Sidebar Navigation:** Clean sidebar navigation using `shadcn/ui` components.
- **Products Table:** Fetches and displays product data from `dummyjson.com/products`.
- **Interactive Analytics:** Visual analytics (category and price distribution) using `Recharts`.
- **JWT-Protected Routes:** Dashboard access is protected by JWT authentication.
- **Bonus:** Polished UI/UX, error handling, and clear feedback for all actions.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), TailwindCSS, shadcn/ui, Recharts  
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, react-email  
- **Other:** JWT for authentication, Axios for API calls

## 📦 Folder Structure
```
myjobb-dashboard/
├── client/         # Next.js frontend
│   ├── app/
│   ├── components/
│   └── ...
├── server/         # Express backend
│   ├── controllers/
│   ├── emails/
│   ├── models/
│   ├── routes/
│   └── ...
├── README.md
└── ...
```

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/priyanshushrma01/myjobb-assignment.git
cd myjobb-assignment
```

### 2. Backend Setup
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:3000
```


#### Start the Backend
```bash
node index.js
```
Backend will run at `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd ../client
npm install
```

#### Start the Frontend
```bash
npm run dev
```
Frontend will run at `http://localhost:3000`.



## 🔒 Security & Best Practices
- OTPs expire after 10 minutes and are single-use.
- All dashboard routes are JWT-protected.
- Emails are sent securely using SMTP with environment-based credentials.

## 🎁 Bonus Features
- **Interactive Analytics:** Recharts-based dynamic charts.
- **Responsive UI:** Mobile-friendly and accessible components.
- **Resend OTP:** Option to resend OTP if needed.
- **Confirmation Email:** Sent after successful login.



## 📚 Assignment Requirements Checklist
- ✅ Next.js + TailwindCSS + shadcn/ui frontend  
- ✅ Node.js + MongoDB backend  
- ✅ Email OTP authentication with Nodemailer  
- ✅ Responsive, professional emails via react-email  
- ✅ Confirmation email on successful login  
- ✅ Resend OTP functionality  
- ✅ Dashboard with sidebar and products table  
- ✅ Data fetched from dummyjson.com/products  
- ✅ Interactive analytics visualizations (Recharts)  
- ✅ JWT-protected dashboard routes  
- ✅ Clear documentation


