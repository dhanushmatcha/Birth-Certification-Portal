# Digital Birth Certificate Management System

A comprehensive full-stack application for managing digital birth certificates with separate portals for Parents, Doctors, and Administrators.

## 🚀 Features

### 👨‍👩‍👧 Parent / User Portal
- Secure registration and login with JWT authentication
- Multi-step application form for birth certificate requests
- Upload supporting documents
- Track application status in real-time
- Download verified certificates as PDF with QR code

### 🧑‍⚕️ Doctor Portal
- Secure login with JWT authentication
- View all pending certificate applications
- Verify, reject, or request changes to applications
- Add digital signature to verified applications
- View verification history and performance stats

### 👨‍💼 Admin Dashboard
- Manage users, doctors, and applications
- Approve or revoke doctor accounts
- View analytics and statistics
- Generate reports (CSV/PDF)
- Complete application oversight

### 🧾 Certificate System
- Auto-generated unique certificate numbers
- PDF certificates with QR codes for verification
- Public certificate verification page
- Digital signatures and timestamps

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** with GridFS for file uploads
- **PDFKit** for certificate generation
- **QRCode** for certificate verification

### Frontend
- **React** with React Router
- **Bootstrap 5** for styling
- **React Bootstrap** components
- **Axios** for API calls (or fetch API)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cerf
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://127.0.0.1:27017/birth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or manually start:
mongod

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 5. Run the Application

#### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
# or
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
cerf/
├── backend/
│   ├── index.js                 # Main server file
│   ├── models/                  # MongoDB models
│   │   ├── User.js
│   │   └── Application.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── applications.js
│   │   ├── certificate.js
│   │   ├── upload.js
│   │   └── users.js
│   ├── middleware/              # Custom middleware
│   │   └── authMiddleware.js
│   └── uploads/                 # Uploaded files (GridFS)
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   │   ├── authentication/
│   │   │   ├── admin-dashboard/
│   │   │   ├── doctor-dashboard/
│   │   │   ├── parent-dashboard/
│   │   │   └── ...
│   │   ├── App.jsx              # Main app component
│   │   └── index.js            # Entry point
│   └── public/
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Applications
- `POST /api/applications` - Create new application (Parent only)
- `GET /api/applications/my` - Get user's applications (Parent only)
- `GET /api/applications/all` - Get all applications (Admin only)
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/verify/:id` - Verify application (Doctor only)
- `PUT /api/applications/approve/:id` - Approve application (Admin only)
- `PUT /api/applications/reject/:id` - Reject application (Admin only)
- `GET /api/applications/doctor/pending` - Get pending applications (Doctor only)
- `GET /api/applications/doctor/stats` - Get doctor stats (Doctor only)
- `GET /api/applications/admin/stats` - Get admin stats (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/doctors` - Get all doctors (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Certificate
- `GET /api/certificate/:applicationId` - Download certificate PDF
- `GET /api/certificate/verify/:certificateId` - Verify certificate (Public)

### Upload
- `POST /api/upload` - Upload document
- `GET /api/upload/files/:filename` - Get uploaded file

## 🎯 User Roles

1. **Parent** - Can apply for birth certificates and track status
2. **Doctor** - Can verify applications and add digital signatures
3. **Admin** - Full access to manage users, applications, and system

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected API routes
- Secure file uploads

## 📝 Application Status Flow

1. **pending** - Application submitted, awaiting doctor review
2. **verified** - Doctor has verified the application
3. **approved** - Admin approved, certificate issued
4. **rejected** - Application rejected
5. **requires-more-info** - More information needed

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in `.env` file
- Check if MongoDB is accessible on default port 27017

### Port Already in Use
- Change PORT in `.env` file if 5000 is already in use
- Update CORS settings if using different ports

### JWT Token Issues
- Ensure JWT_SECRET is set in `.env` file
- Clear browser localStorage and login again
- Check token expiration (default: 1 hour)

## 📄 License

This project is for educational/demo purposes.

## 👥 Contributing

This is a demo project. Contributions and suggestions are welcome!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Note**: This is a demo project. For production use, please:
- Use strong JWT secrets
- Implement proper error handling
- Add input validation
- Set up proper security headers
- Use HTTPS
- Implement rate limiting
- Add proper logging
- Set up database backups
