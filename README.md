<div align="center">

<img src="frontend/public/cgec_round_logo.ico" alt="CGEC Logo" width="80" />

# 🎓 CGEC Website — Official College Portal

### Cooch Behar Government Engineering College

**A modern, full-stack college management system with AI chatbot, admin CMS, Cloudinary media management, and role-based access control.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

[🌐 Live Website](https://cgec.org.in) · [📋 Admin Panel](#admin-panel) · [🤖 AI Chatbot](#ai-chatbot) · [🚀 Quick Start](#quick-start)

</div>

---

## 📌 Overview

The **CGEC Website** is the official web portal for [Cooch Behar Government Engineering College](https://cgec.org.in) — a premier government engineering institution in West Bengal, India, established in 2016 and affiliated with MAKAUT (Maulana Abul Kalam Azad University of Technology).

This full-stack application features:
- 🎨 **Modern, responsive UI** built with Next.js 15 + Framer Motion animations
- 🔐 **Secure Admin CMS** with JWT-based authentication
- ☁️ **Cloudinary-first media pipeline** with automatic cleanup on delete
- 🤖 **CGEC Smart Assistant** — an AI-powered institutional chatbot
- 📢 **Dynamic content management** for Faculty, Syllabus, Notices, Gallery, Wall Magazine, and Labs

---

## ✨ Key Features

### 🌐 Public Website
| Feature | Details |
|---|---|
| **Home Page** | Hero slider, notice board, quick links, college stats |
| **About Page** | Principal's message, vision, mission, college history |
| **Department Pages** | 6 departments: CSE, ECE, EE, ME, CE, BSH — with faculty, labs, syllabus, HOD message, wall magazine |
| **Placement Page** | TPO message, top recruiters, package records, contact details |
| **Notices Page** | Categorized notices with priority filter (General, Exam, Recruitment, Scholarship) |
| **Gallery Page** | Campus photo gallery with Cloudinary-hosted images |
| **Chatbot** | CGEC Smart Assistant — 30+ topic handlers with rich markdown rendering |

### 🔐 Admin CMS
| Module | Capabilities |
|---|---|
| **Faculty Directory** | Add/Edit/Delete faculty with photo + CV upload |
| **Syllabus Manager** | Upload department-wise PDF syllabi per semester |
| **Notices Manager** | Create/edit notices with PDF attachments, priority, and category |
| **Campus Gallery** | Upload and manage campus photos by category |
| **Wall Magazine** | Upload cover image + PDF per department edition |
| **Lab Details** | Manage lab name & description table per department |

### 🤖 AI Chatbot
The **CGEC Smart Assistant** covers:
- College profile, vision, mission, history
- All 6 departments with HOD names, faculty details, lab specs
- WBJEE/JELET admission process and seat matrix
- Fee structure and 6 government scholarship portals
- Placement stats (21 LPA highest), top recruiters, TPO contacts
- Exam system (CA1–CA4, MAKAUT), academic calendar
- Transport & directions (train, bus, air)
- Committee info (Anti-ragging, IQAC, GRC, ICC)
- Faculty name lookup across all departments

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Framer Motion** | Smooth animations & transitions |
| **Lucide React** | Icon library |
| **Vanilla CSS** | Custom styling (no Tailwind) |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **TypeScript** | Type-safe server code |
| **Prisma ORM** | Database access layer |
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Image/PDF cloud storage |
| **Multer** | File upload middleware (memory storage) |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |

---

## 📁 Project Structure

```
CGEC-Website/
├── frontend/                   # Next.js App (port 3000)
│   ├── public/
│   │   ├── img/                # Static images (faculty, hero, labs)
│   │   ├── uploads/            # Runtime uploaded files (gitignored)
│   │   └── cgec_round_logo.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── about/          # About page
│   │   │   ├── academics/[dept]/ # Department pages (CSE, ECE, EE, ME, CE, BSH)
│   │   │   ├── admin/          # Admin dashboard (protected)
│   │   │   │   └── login/cgec/ # Admin login route
│   │   │   ├── gallery/        # Campus gallery
│   │   │   ├── notices/        # Notices & circulars
│   │   │   └── placement/      # Placement & TPO
│   │   ├── components/
│   │   │   ├── common/ChatBot.tsx  # CGEC Smart Assistant
│   │   │   ├── home/           # Hero, NoticeBoard, etc.
│   │   │   └── layout/         # Navbar, Footer, MainLayout
│   │   ├── data/departments.ts # All department data (faculty, labs, syllabus)
│   │   └── lib/constants.ts    # Navigation links, API URL
│
├── backend/                    # Express API (port 5000)
│   ├── prisma/
│   │   └── schema.prisma       # MongoDB schema (Faculty, Notice, Syllabus, Gallery, WallMagazine, Lab)
│   └── src/
│       ├── controllers/
│       │   ├── adminController.ts  # CRUD + Cloudinary-first delete
│       │   ├── authController.ts   # JWT login/register
│       │   └── uploadController.ts # Multer + Cloudinary upload handler
│       ├── lib/
│       │   ├── cloudinary.ts   # Cloudinary SDK config
│       │   └── seedAllData.ts  # Database seeder
│       ├── routes/
│       │   ├── adminRoutes.ts  # Protected admin routes
│       │   ├── authRoutes.ts   # Auth routes
│       │   └── publicRoutes.ts # Public API endpoints
│       └── index.ts            # Express server entry point
│
├── package.json                # Root: runs frontend + backend concurrently
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB Atlas** account (free tier works)
- **Cloudinary** account (free tier works)

### 1. Clone the Repository
```bash
git clone https://github.com/Tanmoy052/CGEC-Website.git
cd CGEC-Website
```

### 2. Install All Dependencies
```bash
# Install root + frontend + backend deps in one command
npm install
```

### 3. Configure Environment Variables

Create `backend/.env`:
```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/cgec_website"
JWT_SECRET="your_super_secret_jwt_key_here"
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Set Up Database (Prisma)
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 5. Seed Initial Data (Optional)
```bash
cd backend
npx ts-node src/lib/seedAllData.ts
```

### 6. Start Development Servers
```bash
# From root — starts both frontend & backend concurrently
npm run dev
```

| Server | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:5000 |

---

## 🔐 Admin Panel

The admin panel is accessible at:
```
http://localhost:3000/admin/login/cgec
```

> ⚠️ The admin login route is intentionally obscured (`/admin/login/cgec`) for security. The route is not linked from the public website.

**Admin Capabilities:**
- Manage Faculty (photo + CV upload with Cloudinary)
- Manage Syllabus PDFs per department & semester
- Manage Notices & Circulars (with PDF attachments)
- Manage Campus Gallery photos
- Manage Wall Magazine (cover image + full issue PDF)
- Manage Department Lab details (name & description table)

---

## ☁️ Media Management Architecture

This project follows a **Cloudinary-first delete strategy** to prevent orphaned files:

```
UPLOAD FLOW:                        DELETE FLOW:
Admin → Multer (Memory)             Admin → Find MongoDB doc
      → Cloudinary Upload                 → Get all publicIds
      → Get { url, publicId }            → Destroy Cloudinary assets
      → Save to MongoDB                  → Delete MongoDB document
                                         → Return success
```

All uploaded files (images, PDFs) are stored in Cloudinary with public IDs saved in the database. On delete, Cloudinary assets are destroyed **before** the database document — ensuring zero orphaned media.

Local disk files in `frontend/public/uploads/` serve as fallback storage when Cloudinary upload fails, and are also cleaned up on delete.

---

## 📊 Database Schema (Prisma/MongoDB)

```prisma
model Faculty { id, name, designation, department, email, image, imagePublicId, cvLink, cvPublicId }
model Syllabus { id, department, semester, title, pdfLink, pdfPublicId }
model Notice { id, title, content, category, priority, department, attachment, attachmentPublicId }
model GalleryItem { id, title, category, imageUrl, imagePublicId }
model WallMagazine { id, title, edition, year, imageUrl, imagePublicId, pdfLink, pdfPublicId, department }
model Lab { id, name, description, roomNo, department }
model Admin { id, email, password, name, role }
```

---

## 🧪 QA & Testing

A full automated test suite covers all 6 admin modules:

```
✅ Super Admin Authentication
✅ Faculty photo & CV upload → create → delete → disk cleanup
✅ Syllabus PDF upload → create → delete → disk cleanup
✅ Notice attachment upload → create → delete → disk cleanup
✅ Gallery photo upload → create → delete → disk cleanup
✅ Wall Magazine cover+PDF upload → create → delete → disk cleanup
✅ Department Lab create → delete (text-only, no media)

📊 Total: 23/23 Tests Passed (100%)
```

---

## 🗺️ Public Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About CGEC |
| `/academics/cse` | CSE Department |
| `/academics/ece` | ECE Department |
| `/academics/ee` | EE Department |
| `/academics/me` | ME Department |
| `/academics/ce` | CE Department |
| `/academics/bsh` | BSH Department |
| `/placement` | Training & Placement |
| `/gallery` | Campus Gallery |
| `/notices` | Notices & Circulars |
| `/contact` | Contact CGEC |
| `/committee/*` | Various Committees |
| `/admin/login/cgec` | Admin Login (protected) |

---

## 🏫 About CGEC

**Cooch Behar Government Engineering College (CGEC)**
- **Established:** 16th August 2016
- **Governed by:** Higher Education Department, Government of West Bengal
- **Affiliation:** MAKAUT (Maulana Abul Kalam Azad University of Technology)
- **Approval:** AICTE Approved
- **Campus:** 21-acre green campus, Harinchawra, Cooch Behar — 736101, West Bengal
- **Motto:** *"तमसो मा ज्योतिर्गमय"* — From darkness, lead me to enlightenment
- **Departments:** CSE · ECE · EE · ME · CE · BSH
- **Phone:** 03582-233040 | **Email:** principalofficecgec@gmail.com

---

## 📜 License

This project is developed for **Cooch Behar Government Engineering College** and is not open-source. All rights reserved.

---

<div align="center">

Made with ❤️ for CGEC · [cgec.org.in](https://cgec.org.in)

</div>
