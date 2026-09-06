<div align="center">

<img src="frontend/public/cgec_round_logo.ico" alt="CGEC Logo" width="100" height="100" />

# Cooch Behar Government Engineering College
### Official Institutional Web Portal & Content Management System

[![Release](https://img.shields.io/badge/Release-v1.0.0-blue.svg?style=flat-square&logo=github)](https://github.com/Tanmoy052/CGEC-Website/releases)
[![Status](https://img.shields.io/badge/Status-Stable%20Production-success?style=flat-square)](https://github.com/Tanmoy052/CGEC-Website)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)

<p align="center">
  <b>A modern, full-stack digital portal for Cooch Behar Government Engineering College (Govt. of West Bengal, AICTE Approved, MAKAUT Affiliated).</b>
</p>

[🚀 Quick Start](#-quick-start) • [✨ Key Features](#-key-features) • [🏛️ Architecture](#-system-architecture) • [📖 Technical Docs](TECHNICAL_DOCUMENTATION.md) • [🔐 Admin Access](#-admin-portal)

</div>

---

## 🌟 Release Highlights (v1.0.0)

Welcome to the **v1.0.0 first official release** of the CGEC Web Platform. This release delivers an end-to-end modernized digital presence, unifying public academic resources with a centralized administrative management system:

- 🏛️ **Dynamic Academic Departments**: Full coverage for CSE, ECE, EE, ME, CE, and BSH with dedicated HOD messages, faculty rosters, lab facilities, syllabus PDFs, and wall magazines.
- 🔐 **Comprehensive Admin CMS**: Centralized management across 15 institutional data models with secure JWT authentication and bcrypt credential encryption.
- ☁️ **Cloudinary-First Media Management**: In-memory streaming uploads with automated remote cleanup upon deletion to eliminate orphaned assets.
- 🤖 **CGEC Smart Assistant**: Built-in institutional knowledge chatbot answering student inquiries regarding admissions, exams, departments, faculty, and campus amenities.
- ⚡ **Next.js 16 + Tailwind CSS v4**: Blazing-fast page loads, fluid responsive design, accessible typography, and smooth micro-animations.

---

## ✨ Key Features

### 🌐 Public Experience
- **Interactive Notice Board**: Categorized circulars (General, Academic, Tender, Recruitment) with priority tags and direct PDF attachments.
- **Academic Ecosystem**: Live semester-wise syllabus downloads, lab directories, and faculty credentials with published research.
- **Admissions & Fee Portal**: Centralized admission notices, official documents, contact directories, and detailed regular/lateral fee breakdowns.
- **Training & Placement Center**: Placement records, recruiter showcases, and dynamic PDF brochure downloads.
- **Institutional Governance**: Anti-Ragging, ICC, IQAC, GRC, and SC/ST committee directories with official contact channels.
- **Contact & Inquiries**: Direct messaging pipeline with integrated administrative moderation.

### 🛡️ Administrative CMS Dashboard
- **Faculty Directory Management**: Upload profile photos, update designations, research specializations, and attach curriculum vitae.
- **Syllabus & Document Manager**: Organize and deploy semester-wise curriculum PDFs.
- **Media & Gallery Management**: Multi-category image upload pipeline served via high-speed global CDN.
- **Institutional Messaging**: Manage Principal & Registrar leadership messages and department HOD notes.
- **Inquiry Inbox**: Review, batch-delete, and process contact inquiries submitted through the public portal.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Client Layer (Next.js 16)                   │
│   Public Portal · Academics · Smart ChatBot · Admin CMS    │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST & Bearer JWT
┌──────────────────────────────▼──────────────────────────────┐
│           Express 5 REST API Gateway (Port 5000)            │
│   Auth Middleware · Router Modules · Multer Memory Buffers  │
└──────────────┬───────────────────────────────┬──────────────┘
               │ Prisma ORM 6                  │ Cloudinary SDK
┌──────────────▼─────────────┐   ┌─────────────▼──────────────┐
│    MongoDB Atlas Cluster   │   │     Cloudinary Media CDN   │
│  (15 Institutional Models) │   │   (Images, PDFs, Documents)│
└────────────────────────────┘   └────────────────────────────┘
```

> For comprehensive architecture diagrams, database entity-relationship models, and in-depth data flows, view the **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)**.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React |
| **Backend** | Node.js, Express.js 5, TypeScript, Multer, Bcrypt.js, JSON Web Tokens (JWT) |
| **Database** | MongoDB Atlas, Prisma ORM 6 |
| **Media & CDN** | Cloudinary Cloud Storage SDK |
| **Tooling** | Concurrently, ts-node-dev, ESLint |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher
- An active **MongoDB Atlas** database URI
- A **Cloudinary** account (Cloud Name, API Key, API Secret)

### 1. Clone & Install
```bash
git clone https://github.com/Tanmoy052/CGEC-Website.git
cd CGEC-Website

# Install root and workspace dependencies
npm run install:all
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cgec_website?retryWrites=true&w=majority"
JWT_SECRET="your-secure-random-jwt-secret-key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_PORTAL_URL="https://cgec-sms-portal.vercel.app/"
```

### 3. Initialize Database
```bash
cd backend
npx prisma generate
npx prisma db push
cd ..
```

### 4. Start Development Servers
```bash
# Starts both frontend (port 3000) and backend (port 5000) concurrently
npm run dev
```

- **Frontend Portal**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 🔐 Admin Portal

The Administrative Management System is secured behind an intentionally obscured route to minimize unauthorized exposure:

- **Login URL**: `http://localhost:3000/admin/login/cgec`
- **Default Superadmin Seed**:
  - **Email**: `admin@cgec.org.in`
  - **Password**: `Admin@cgec2026`

*(Default credentials are auto-seeded on first server boot if no administrator exists. Remember to update the password in production via the Account Settings tab).*

---

## 📂 Project Structure

```
CGEC-Website/
├── package.json               # Root monorepo configuration (concurrently runner)
├── TECHNICAL_DOCUMENTATION.md # In-depth technical specifications and diagrams
├── README.md                  # Project overview and first-release notes
│
├── frontend/                  # Next.js 16 Web Application
│   ├── src/
│   │   ├── app/               # App Router pages & routes
│   │   │   ├── academics/     # Dynamic department hubs ([dept])
│   │   │   ├── admin/         # Authenticated CMS dashboard & tabs
│   │   │   ├── admission/     # Admission circulars & fee structures
│   │   │   ├── committee/     # Statutory institutional committees
│   │   │   ├── gallery/       # Campus photo gallery
│   │   │   ├── notices/       # Official college circulars
│   │   │   └── placement/     # TPO records, recruiters, brochure
│   │   ├── components/        # Reusable UI components & ChatBot
│   │   └── lib/               # Utility functions & navigation constants
│   └── public/                # Static assets, institutional icons & logos
│
└── backend/                   # Express 5 REST API Server
    ├── prisma/
    │   └── schema.prisma      # MongoDB schema models & definitions
    └── src/
        ├── controllers/       # Admin, Auth, and Upload logic
        ├── middleware/        # JWT verification and RBAC guards
        ├── routes/            # Admin, Public, and Auth routes
        └── lib/               # Prisma and Cloudinary client instances
```

---

## 📚 Technical Documentation

For detailed architectural diagrams, schema breakdowns, API endpoint listings, and operational policies, refer to the full **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)**.

---

## 📄 License & Attribution

This project is developed for **Cooch Behar Government Engineering College**, Government of West Bengal.  
All institutional emblems, logos, and academic documents are proprietary property of CGEC.
