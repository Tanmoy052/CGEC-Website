<div align="center">

<img src="frontend/public/cgec_round_logo.ico" alt="CGEC Logo" width="96" height="96" />

# Cooch Behar Government Engineering College (CGEC)
### Official Institutional Web Portal & Content Management System

[![Release](https://img.shields.io/badge/Release-v1.0.0%20(Initial%20Production)-blue.svg?style=flat-square&logo=github)](https://github.com/Tanmoy052/CGEC-Website/releases)
[![Status](https://img.shields.io/badge/Status-Stable%20Production-success?style=flat-square)](https://github.com/Tanmoy052/CGEC-Website)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)

<p align="center">
  <b>A modern, enterprise-grade digital portal for Cooch Behar Government Engineering College (Govt. of West Bengal, AICTE Approved, MAKAUT Affiliated).</b>
</p>

[🚀 Quick Start](#-quick-start) • [✨ Key Features](#-key-features) • [🏛️ Architecture](#-system-architecture) • [📖 Technical Documentation](TECHNICAL_DOCUMENTATION.md) • [🔐 Admin Portal](#-admin-portal) • [👥 Developer Team](#-developers--contributors)

</div>

---

## 🌟 Welcome to Version 1.0.0 (Initial Official Release)

Welcome to the **v1.0.0 initial production release** of the **CGEC Web Platform**. This project establishes an authoritative, centralized digital ecosystem for Cooch Behar Government Engineering College, replacing scattered web resources with a cohesive, high-performance web platform.

### Release Highlights
- 🏛️ **6 Dynamic Department Portals**: Dedicated portals for CSE, ECE, EE, ME, CE, and BSH with dynamic HOD addresses, faculty rosters, lab facilities, semester syllabi, and wall magazines.
- 🎨 **Dynamic Hero Banner & Event CMS**: Full admin control over homepage slides for hackathons, tech fests, and announcements with custom background uploads, event dates, venues, glowing badges, and interactive registration QR codes.
- 🛡️ **Comprehensive Admin CMS**: Real-time management across 16 institutional data models with JWT token security, salted password hashing, and zero-orphaned-media cleanup via Cloudinary.
- 📜 **Admissions & Fee Portal**: Live admission circulars, helpdesk contacts, and structured regular (1st sem) vs. lateral (3rd sem) fee breakdown tables.
- 🤖 **CGEC AI Campus Assistant**: Embedded floating chatbot providing immediate answers to prospective and current student inquiries.
- 👥 **Open Developer Directory (`/developers`)**: A fast, hardcoded contributor showcase allowing student developers to add their profiles via simple Git Pull Requests with zero database overhead.

---

## 🏛️ System Architecture

The platform operates across a high-performance decoupled client-server architecture:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Client Layer (Next.js 16 App Router · Port 3000)            │
│   Public Portal · Dynamic Academics · Smart ChatBot · CMS Dashboard        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / REST & Bearer JWT
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                   Express.js 5 REST API Gateway (Port 5000)                  │
│       JWT Auth Guards · Router Modules · Multer Memory Buffer Streamer      │
└──────────────────────┬───────────────────────────────┬──────────────────────┘
                       │ Prisma ORM 6                  │ Cloudinary SDK
        ┌──────────────▼─────────────┐   ┌─────────────▼──────────────┐
        │    MongoDB Atlas Cluster   │   │     Cloudinary Media CDN   │
        │  (17 Institutional Models) │   │   (Images, PDFs, Documents)│
        └────────────────────────────┘   └────────────────────────────┘
```

> **For the complete architecture, unified single-diagram ER schema, and UI/UX design specifications, please review the [Comprehensive Technical Documentation (TECHNICAL_DOCUMENTATION.md)](TECHNICAL_DOCUMENTATION.md).**

---

## ✨ Key Features

### 🌐 Public Experience
- **Interactive Central Notice Board**: Filter circulars by category (General, Academic, Tender, Recruitment) and priority with direct PDF attachments.
- **Dynamic Hero Carousel**: Beautiful cinematic Ken Burns transitions with custom event banners, hackathon announcements, and instant phone-scannable QR lightbox modal.
- **Academic Ecosystem**: Full coverage of all 6 engineering departments, semester-wise syllabus downloads, lab directories, and faculty credentials.
- **Admissions & Fees Structure**: Official admission circulars, convener contact directories, and comprehensive tuition/caution deposit tables.
- **Training & Placement Cell**: Placement statistics, corporate recruiter logo marquee, and dynamic placement brochure PDF viewer/downloader.
- **Statutory Regulatory Bodies**: Detailed directories for all 10 mandated committees (Anti-Ragging, ICC, IQAC, GRC, SC/ST Cell, etc.).
- **Campus Gallery & Wall Magazine**: Digital student wall magazines and multi-category high-resolution campus photo albums.

### 🛡️ Administrative Management CMS
- **Hero Slider Manager**: Upload custom banners, set titles, event dates, venues, CTA buttons, and upload registration QR codes.
- **Faculty Directory CMS**: Upload faculty photos, update research domains, and attach downloadable CV PDFs.
- **Curriculum & Syllabus CMS**: Deploy semester-wise curriculum PDFs directly through Cloudinary memory streaming.
- **Notice & Tender Publisher**: Publish urgent alerts, institutional circulars, and government tenders with attachments.
- **Admission & Fee Manager**: Update annual fee heads and admission guidelines in real time.
- **Inquiry Inbox**: Review, process, and batch-delete student inquiries and grievance submissions.
- **Account & Security Settings**: Secure superadmin username and password updates with Bcrypt salted encryption.

---

## 🛠️ Technology Stack Matrix

| Domain | Technologies | Version |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | `16.1.6` |
| **Client Core** | React & TypeScript | `19.x` / `5.x` |
| **Styling & Design** | Tailwind CSS v4, Vanilla CSS | `4.x` |
| **Micro-Animations** | Framer Motion | `12.x` |
| **Icons** | Lucide React | `1.x` |
| **Backend Gateway** | Express.js & Node.js | `5.2.1` / `18+` |
| **Database** | MongoDB Atlas Document DB | Cloud |
| **Database Client** | Prisma ORM | `6.19.2` |
| **Media Delivery** | Cloudinary Cloud Storage SDK | `2.11.0` |
| **File Buffer Handling**| Multer (In-Memory Buffer) | `2.3.0` |
| **Authentication** | JSON Web Tokens (JWT) & Bcrypt.js | `9.0.3` / `3.0.3` |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **npm**: `v9.0.0` or higher
- **MongoDB Atlas**: An active connection string
- **Cloudinary**: Cloud name, API key, and API secret

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Tanmoy052/CGEC-Website.git
cd CGEC-Website

# Install root and workspace packages
npm run install:all
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cgec_website?retryWrites=true&w=majority"
JWT_SECRET="your-cryptographically-secure-random-key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_PORTAL_URL="https://cgec-sms-portal.vercel.app/"
```

### 3. Synchronize Database & Generate Prisma Client
```bash
cd backend
npx prisma generate
npx prisma db push
cd ..
```

### 4. Run Development Servers
```bash
# Concurrently launches Next.js (port 3000) and Express (port 5000)
npm run dev
```

- **Frontend Portal**: [http://localhost:3000](http://localhost:3000)
- **Backend API Gateway**: [http://localhost:5000](http://localhost:5000)
- **Developer Team Page**: [http://localhost:3000/developers](http://localhost:3000/developers)

---

## 🔐 Admin Portal Access

To protect against automated bot crawlers and brute force scripts, the administrator access portal is located on an intentionally unadvertised route:

- **Portal URL**: `http://localhost:3000/admin/login/cgec`
- **Default Seed Credentials**:
  - **Email**: `admin@cgec.org.in`
  - **Password**: `Admin@cgec2026`
  *(Change this immediately upon deployment under the Admin Account & Security Settings tab).*

---

## 👥 Developers & Contributors

The CGEC Web Platform is engineered and maintained by student engineers of Cooch Behar Government Engineering College:

- **Tanmoy Pal** — *Main Developer & Lead Architect* (CSE, Class of 2027) • [GitHub](https://github.com/Tanmoy052/) • [LinkedIn](https://www.linkedin.com/in/tanmoy-pal-755611294/)
- **Sabir Ali Mondal** — *Development Contributor* (CSE, Class of 2027) • [GitHub](https://github.com/Sabir-Ali-Mondal) • [LinkedIn](https://www.linkedin.com/in/sabir-ali-mondal/)

### Want to contribute?
Check out **Section 8 of [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)** for instructions on how to add your name to the [`/developers`](http://localhost:3000/developers) page via a simple Pull Request!

---

## 📄 License & Institutional Copyright

© 2026 **Cooch Behar Government Engineering College**. All Rights Reserved.  
Designed & Developed by **CGEC Team**.
