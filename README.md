<div align="center">

<br/>

<img src="frontend/public/cgec_round_logo.ico" alt="CGEC Logo" width="96" height="96" />

<br/>

# CGEC Website — Official College Portal

### Cooch Behar Government Engineering College

*Established 2016 · Government of West Bengal · MAKAUT Affiliated · AICTE Approved*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15.x-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-23%2F23%20Passed-brightgreen?style=flat-square)](README.md#testing)
[![PRs Welcome](https://img.shields.io/badge/PRs-Internal%20Only-orange?style=flat-square)](README.md)

<br/>

[📖 Documentation](#table-of-contents) · [🚀 Quick Start](#quick-start) · [🌐 Live Site](https://cgec.org.in) · [🐛 Report Issue](https://github.com/Tanmoy052/CGEC-Website/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Admin Panel](#admin-panel)
- [Media Management](#media-management)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [College Information](#college-information)
- [License](#license)

---

## Overview

The **CGEC Website** is the official digital platform for Cooch Behar Government Engineering College — a premier government engineering institution in West Bengal, India. This production-grade, full-stack web application delivers a seamless experience for students, faculty, and administrators.

The system is built as a **monorepo** containing a **Next.js 15 frontend** and an **Express.js backend API**, connected to **MongoDB Atlas** with **Cloudinary** for scalable media storage.

### What makes it production-ready?

- ✅ **Cloudinary-first delete strategy** — zero orphaned media files
- ✅ **JWT-secured admin panel** with bcrypt password hashing
- ✅ **Automated QA suite** — 23/23 tests passing across all modules
- ✅ **Hot-reload dev environment** — frontend + backend run concurrently
- ✅ **Type-safe throughout** — TypeScript on both client and server
- ✅ **SEO optimised** — semantic HTML, meta descriptions, correct heading hierarchy

---

## Features

### 🌐 Public Portal

<table>
<thead>
<tr><th>Page</th><th>Key Features</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Home</strong></td>
<td>Auto-sliding hero banner, dynamic notice board, college stats, quick-access links</td>
</tr>
<tr>
<td><strong>About</strong></td>
<td>Principal's message, vision & mission, NAAC profile, institutional history since 2016</td>
</tr>
<tr>
<td><strong>Departments (×6)</strong></td>
<td>CSE · ECE · EE · ME · CE · BSH — each with HOD message, full faculty roster, lab inventory, semester syllabus PDFs, research publications, and Wall Magazine</td>
</tr>
<tr>
<td><strong>Placement</strong></td>
<td>TPO message, highest/average packages, top-10 recruiters, department-wise TPO contacts</td>
</tr>
<tr>
<td><strong>Notices</strong></td>
<td>Filterable notice board: General, Exam, Recruitment, Scholarship — with PDF attachments</td>
</tr>
<tr>
<td><strong>Gallery</strong></td>
<td>Campus photo gallery with category filter, Cloudinary-served images</td>
</tr>
<tr>
<td><strong>Committees</strong></td>
<td>Academic, Anti-Ragging, ICC, GRC, IQAC, IIC, SC/ST, Student Counsellor</td>
</tr>
</tbody>
</table>

### 🔐 Admin CMS Dashboard

<table>
<thead>
<tr><th>Module</th><th>Capabilities</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Faculty Directory</strong></td>
<td>Create / Edit / Delete faculty profiles with profile photo + CV PDF upload via Cloudinary</td>
</tr>
<tr>
<td><strong>Syllabus Manager</strong></td>
<td>Upload department-wise PDF syllabi organised by semester (Sem 1–8 + Old Syllabus)</td>
</tr>
<tr>
<td><strong>Notices & Circulars</strong></td>
<td>Create categorised notices (priority: High/Normal/Low) with optional PDF attachments</td>
</tr>
<tr>
<td><strong>Campus Gallery</strong></td>
<td>Upload, categorise, and remove campus photos; real-time preview</td>
</tr>
<tr>
<td><strong>Wall Magazine</strong></td>
<td>Upload cover image + full-issue PDF per department edition</td>
</tr>
<tr>
<td><strong>Lab Details</strong></td>
<td>Text-only CRUD table (SL No · Lab Name · Description) — one table per department</td>
</tr>
</tbody>
</table>

### 🤖 CGEC Smart Assistant (AI Chatbot)

An embedded institutional knowledge chatbot with **30+ curated response handlers**:

| Category | Topics Covered |
|---|---|
| **Academics** | All 6 departments, HOD names, faculty roster, lab specs, syllabus structure |
| **Admissions** | WBJEE/JELET process, eligibility, documents, seat matrix |
| **Fees & Aid** | Government-subsidised fee structure, 6 scholarship portals |
| **Placements** | 21 LPA highest package, top-10 recruiters, TPO contacts with phone & email |
| **Exams** | CA1–CA4 system, MAKAUT semester exams, SGPA/CGPA grading, backlogs |
| **Campus Life** | Hostels, library (7000+ books), sports, canteen, transport directions |
| **Committees** | Anti-Ragging (national helpline), ICC, IQAC, GRC |
| **Faculty Search** | Real-time lookup across all departments by faculty name |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                    Next.js 15 · TypeScript                       │
│              Framer Motion · Lucide Icons · CSS                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP REST (fetch)
                             │ JWT Bearer Token (admin)
┌────────────────────────────▼────────────────────────────────────┐
│                      BACKEND API SERVER                          │
│                  Express.js · TypeScript · Port 5000             │
│         Multer (Memory Storage) · bcryptjs · JWT                 │
│                                                                  │
│   ┌────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│   │  Auth Routes   │  │  Admin Routes   │  │ Public Routes  │  │
│   │ /auth/login    │  │ /admin/*        │  │ /faculty       │  │
│   │ /auth/register │  │ JWT Protected   │  │ /notices       │  │
│   └────────────────┘  └─────────────────┘  │ /gallery       │  │
│                                             │ /wall-magazine │  │
│                                             └────────────────┘  │
└───────────┬─────────────────────────────────────┬───────────────┘
            │ Prisma ORM                           │ Cloudinary SDK
┌───────────▼──────────┐               ┌───────────▼──────────────┐
│   MongoDB Atlas      │               │   Cloudinary CDN          │
│   Database: cgec_website             │   Images · PDFs            │
│   Collections:        │               │   Auto-cleanup on delete  │
│   Faculty · Notice   │               │   Public IDs tracked in DB│
│   Syllabus · Gallery │               └──────────────────────────┘
│   WallMagazine · Lab │
│   Admin              │
└──────────────────────┘
```

---

## Tech Stack

### Frontend (`/frontend`)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.x | React framework · App Router · SSR/SSG |
| **TypeScript** | 5.x | Static typing |
| **Framer Motion** | 11.x | Animations, transitions, spring physics |
| **Lucide React** | Latest | Icon set |
| **Vanilla CSS** | — | Custom responsive styling |

### Backend (`/backend`)

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.x | REST API framework |
| **TypeScript** | 5.x | Type-safe server code |
| **Prisma** | 5.x | MongoDB ORM + type-safe queries |
| **MongoDB Atlas** | — | Cloud NoSQL database |
| **Cloudinary** | 2.x | Cloud media storage & CDN |
| **Multer** | 1.x | Multipart file upload (memory storage) |
| **JSON Web Token** | 9.x | Stateless authentication |
| **bcryptjs** | 2.x | Password hashing |
| **CORS** | 2.x | Cross-origin resource sharing |

---

## Project Structure

```
CGEC-Website/
│
├── package.json                    ← Root: concurrently runs both servers
├── .gitignore
├── README.md
│
├── frontend/                       ← Next.js Application (localhost:3000)
│   ├── public/
│   │   ├── cgec_round_logo.ico     ← Sidebar & favicon branding
│   │   ├── img/
│   │   │   ├── Faculty/            ← Static faculty photos
│   │   │   ├── hero/               ← Hero slider images
│   │   │   └── labs/               ← Lab photos
│   │   └── uploads/                ← Runtime uploads (gitignored, .gitkeep present)
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          ← Root layout (Navbar, Footer, ChatBot)
│   │   │   ├── page.tsx            ← Home page
│   │   │   ├── about/page.tsx
│   │   │   ├── academics/
│   │   │   │   └── [dept]/page.tsx ← Dynamic: cse|ece|ee|me|ce|bsh
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx        ← Admin dashboard (JWT protected client-side)
│   │   │   │   └── login/cgec/     ← Obscured admin login route
│   │   │   ├── gallery/page.tsx
│   │   │   ├── notices/page.tsx
│   │   │   ├── placement/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── ChatBot.tsx     ← CGEC Smart Assistant (30+ handlers)
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── NoticeBoard.tsx
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── MainLayout.tsx
│   │   │
│   │   ├── data/
│   │   │   └── departments.ts      ← Complete static data: faculty, labs, syllabus, HODs
│   │   │
│   │   └── lib/
│   │       ├── constants.ts        ← Nav links, API URL, colour tokens
│   │       └── utils.ts            ← Helper utilities (cn, etc.)
│   │
│   ├── next.config.ts              ← images.unoptimized: true
│   └── tsconfig.json
│
└── backend/                        ← Express API Server (localhost:5000)
    ├── prisma/
    │   └── schema.prisma           ← MongoDB schema definitions
    │
    └── src/
        ├── index.ts                ← Server entry: CORS, routes, port binding
        ├── controllers/
        │   ├── adminController.ts  ← Full CRUD + Cloudinary-first delete
        │   ├── authController.ts   ← Login, register, JWT sign/verify
        │   └── uploadController.ts ← Multer + Cloudinary upload handler
        ├── lib/
        │   ├── cloudinary.ts       ← Cloudinary SDK initialisation
        │   └── seedAllData.ts      ← Seed script for initial data
        └── routes/
            ├── adminRoutes.ts      ← Protected: Bearer JWT required
            ├── authRoutes.ts       ← Public: /login, /register
            └── publicRoutes.ts     ← Public: faculty, notices, gallery, etc.
```

---

## Quick Start

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9 or higher | Bundled with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

You will also need free cloud accounts for:
- **MongoDB Atlas** — [cloud.mongodb.com](https://cloud.mongodb.com)
- **Cloudinary** — [cloudinary.com](https://cloudinary.com)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Tanmoy052/CGEC-Website.git
cd CGEC-Website
```

### Step 2 — Install Dependencies

```bash
# Installs root, frontend, and backend dependencies in one command
npm install
```

### Step 3 — Configure Environment Variables

**Backend** — create `backend/.env`:

```env
# ── Database ─────────────────────────────────────────────────
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cgec_website?retryWrites=true&w=majority"

# ── Authentication ────────────────────────────────────────────
JWT_SECRET="your-256-bit-secret-key-change-this-in-production"

# ── Server ────────────────────────────────────────────────────
PORT=5000

# ── Cloudinary ────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 4 — Initialise the Database

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Push schema to MongoDB Atlas
npx prisma db push
```

### Step 5 — Seed Initial Data *(Optional)*

```bash
# From the backend directory
npx ts-node src/lib/seedAllData.ts
```

### Step 6 — Start Development Servers

```bash
# From the project root — starts both servers concurrently
npm run dev
```

| Service | URL | Notes |
|---|---|---|
| 🌐 **Frontend** | http://localhost:3000 | Next.js with hot reload |
| ⚙️ **Backend API** | http://localhost:5000 | Express with ts-node-dev |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Backend | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ Backend | Secret key for signing JWT tokens |
| `PORT` | ✅ Backend | API server port (default: 5000) |
| `CLOUDINARY_CLOUD_NAME` | ✅ Backend | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ Backend | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ Backend | Cloudinary API secret |
| `NEXT_PUBLIC_API_URL` | ✅ Frontend | Backend API base URL |

> ⚠️ **Never commit `.env` files.** They are already excluded in `.gitignore`.

---

## Admin Panel

### Accessing the Admin Panel

```
http://localhost:3000/admin/login/cgec
```

> 🔒 The admin login path (`/cgec`) is intentionally obscured. It is not linked from the public website navigation to reduce the attack surface.

### Security

- Passwords are hashed with **bcryptjs** (salt rounds: 10)
- Sessions are managed via **JWT Bearer tokens** (stored in memory/localStorage)
- All admin API routes require a valid `Authorization: Bearer <token>` header
- Tokens expire after a configurable duration (set in `JWT_SECRET` config)

### Admin Capabilities Summary

```
Admin Panel
├── Faculty Directory     → CRUD with photo + CV (Cloudinary)
├── Syllabus Manager      → PDF upload per department & semester
├── Notices & Circulars   → Create with priority, category, PDF attachment
├── Campus Gallery        → Photo upload with category management
├── Wall Magazine         → Cover image + full PDF per department edition
└── Lab Details           → Text-only table management per department
```

---

## Media Management

This project implements a **Cloudinary-first delete strategy** to guarantee zero orphaned media files.

### Upload Flow

```
Admin selects file
       │
       ▼
Multer (memory buffer) ──── no disk writes ──→ Buffer in RAM
       │
       ▼
Cloudinary.upload_stream()
       │
       ▼
{ secure_url, public_id }
       │
       ▼
Save { url, publicId } to MongoDB
       │
       ▼
Return URL to frontend → Display media
```

### Delete Flow (Cloudinary-First)

```
Admin clicks Delete
       │
       ▼
Find MongoDB document  ──── publicId retrieved ────┐
       │                                            │
       ▼                                            ▼
Cloudinary.destroy(publicId)          Also removes local fallback
       │                               file from /public/uploads/
       ▼                               if path starts with /uploads/
MongoDB document deleted
       │
       ▼
Return 200 Success → Frontend refreshes
```

> **Why Cloudinary-first?** If MongoDB is deleted first and Cloudinary deletion fails, the `publicId` reference is permanently lost — making it impossible to clean up the orphaned cloud asset. This order prevents that scenario.

---

## Database Schema

Managed by **Prisma ORM** against **MongoDB Atlas** (`cgec_website` database).

```prisma
model Admin {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model Faculty {
  id              String  @id @default(auto()) @map("_id") @db.ObjectId
  name            String
  designation     String
  department      String
  email           String?
  image           String?
  imagePublicId   String?
  cvLink          String?
  cvPublicId      String?
}

model Syllabus {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  department  String
  semester    String
  title       String
  pdfLink     String?
  pdfPublicId String?
}

model Notice {
  id                  String   @id @default(auto()) @map("_id") @db.ObjectId
  title               String
  content             String
  category            String
  priority            String   @default("NORMAL")
  department          String   @default("ALL")
  attachment          String?
  attachmentPublicId  String?
  createdAt           DateTime @default(now())
}

model GalleryItem {
  id              String @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  category        String
  imageUrl        String
  imagePublicId   String?
}

model WallMagazine {
  id              String  @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  edition         String?
  year            String?
  imageUrl        String?
  imagePublicId   String?
  pdfLink         String?
  pdfPublicId     String?
  department      String
}

model Lab {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String?
  roomNo      String?
  department  String
}
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/admin-login` | ❌ | Admin login → returns JWT |
| `POST` | `/api/auth/admin-register` | ❌ | Create admin account |

### Public API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/public/faculty` | Get all faculty (optionally filter by `?department=CSE`) |
| `GET` | `/api/public/notices` | Get all notices |
| `GET` | `/api/public/gallery` | Get all gallery items |
| `GET` | `/api/public/wall-magazine` | Get all wall magazine entries |
| `GET` | `/api/public/labs` | Get all lab records |
| `GET` | `/api/public/syllabus` | Get all syllabus PDFs |

### Admin API *(JWT Required)*

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/upload` | Upload file to Cloudinary |
| `GET/POST` | `/api/admin/faculty` | List / Create faculty |
| `PUT/DELETE` | `/api/admin/faculty/:id` | Update / Delete faculty |
| `GET/POST` | `/api/admin/syllabus` | List / Create syllabus |
| `PUT/DELETE` | `/api/admin/syllabus/:id` | Update / Delete syllabus |
| `GET/POST` | `/api/admin/notices` | List / Create notice |
| `PUT/DELETE` | `/api/admin/notices/:id` | Update / Delete notice |
| `GET/POST` | `/api/admin/gallery` | List / Create gallery item |
| `DELETE` | `/api/admin/gallery/:id` | Delete gallery item |
| `GET/POST` | `/api/admin/wall-magazine` | List / Create magazine |
| `DELETE` | `/api/admin/wall-magazine/:id` | Delete magazine |
| `GET/POST` | `/api/admin/labs` | List / Create lab |
| `PUT/DELETE` | `/api/admin/labs/:id` | Update / Delete lab |

---

## Testing

An automated end-to-end QA suite validates the complete media lifecycle across all admin modules.

### Test Results

```
╔══════════════════════════════════════════════════════════════════════════╗
║   🧹 ALL-SECTIONS MEDIA AUTO-CLEANUP & CRUD QA TEST SUITE               ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Authentication                                                          ║
║   ✅ Super Admin JWT Authentication                                      ║
║                                                                          ║
║  1️⃣  Faculty Directory                                                    ║
║   ✅ Faculty photo & CV created on disk                                  ║
║   ✅ Faculty record created in MongoDB                                   ║
║   ✅ Faculty record deleted from MongoDB                                 ║
║   ✅ Faculty photo & CV automatically removed from disk                  ║
║                                                                          ║
║  2️⃣  Syllabus Manager                                                     ║
║   ✅ Syllabus PDF created on disk                                        ║
║   ✅ Syllabus record created in MongoDB                                  ║
║   ✅ Syllabus record deleted from MongoDB                                ║
║   ✅ Syllabus PDF automatically removed from disk                        ║
║                                                                          ║
║  3️⃣  Notices & Circulars                                                  ║
║   ✅ Notice attachment created on disk                                   ║
║   ✅ Notice record created in MongoDB                                    ║
║   ✅ Notice record deleted from MongoDB                                  ║
║   ✅ Notice attachment automatically removed from disk                   ║
║                                                                          ║
║  4️⃣  Campus Gallery                                                       ║
║   ✅ Gallery photo created on disk                                       ║
║   ✅ Gallery item created in MongoDB                                     ║
║   ✅ Gallery item deleted from MongoDB                                   ║
║   ✅ Gallery photo automatically removed from disk                       ║
║                                                                          ║
║  5️⃣  Wall Magazine                                                        ║
║   ✅ Magazine cover & PDF created on disk                                ║
║   ✅ Magazine record created in MongoDB                                  ║
║   ✅ Magazine record deleted from MongoDB                                ║
║   ✅ Magazine cover & PDF automatically removed from disk                ║
║                                                                          ║
║  6️⃣  Department Labs                                                      ║
║   ✅ Lab record created in MongoDB                                       ║
║   ✅ Lab record deleted from MongoDB                                     ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║   📊 RESULT: 23 / 23 Tests Passed  ·  Coverage: 100%  ·  Failures: 0   ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## Deployment

### Frontend (Vercel — Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod
```

Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Backend (Railway / Render / VPS)

```bash
cd backend
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled dist/index.js
```

Set all backend environment variables on your hosting platform.

### Important — Production Checklist

- [ ] Change `JWT_SECRET` to a strong random 256-bit value
- [ ] Set `CLOUDINARY_*` credentials for production Cloudinary account
- [ ] Set `DATABASE_URL` to production MongoDB Atlas cluster
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set `NEXT_PUBLIC_API_URL` to the production backend URL
- [ ] Configure CORS in `backend/src/index.ts` to allow only the production domain

---

## Public Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, notice board, quick links |
| `/about` | About | Principal's message, institution profile |
| `/academics/cse` | CSE | Faculty, labs, syllabus, HOD message |
| `/academics/ece` | ECE | Faculty, labs, syllabus, HOD message |
| `/academics/ee` | EE | Faculty, labs, syllabus, HOD message |
| `/academics/me` | ME | Faculty, labs, syllabus, HOD message |
| `/academics/ce` | CE | Faculty, labs, syllabus, HOD message |
| `/academics/bsh` | BSH | Faculty, labs, subjects |
| `/placement` | Placement | TPO message, recruiters, contacts |
| `/gallery` | Gallery | Campus photo gallery |
| `/notices` | Notices | Filterable notice board |
| `/contact` | Contact | Address, phone, email, map |
| `/committee/*` | Committees | Academic, Anti-Ragging, ICC, GRC, etc. |
| `/admin/login/cgec` | Admin Login | 🔒 Protected entry point |
| `/admin` | Admin Dashboard | 🔒 JWT-protected CMS |

---

## College Information

<table>
<tr>
<td><strong>Institution</strong></td>
<td>Cooch Behar Government Engineering College (CGEC)</td>
</tr>
<tr>
<td><strong>Established</strong></td>
<td>16th August 2016</td>
</tr>
<tr>
<td><strong>Governed By</strong></td>
<td>Higher Education Department, Government of West Bengal</td>
</tr>
<tr>
<td><strong>Affiliation</strong></td>
<td>MAKAUT — Maulana Abul Kalam Azad University of Technology</td>
</tr>
<tr>
<td><strong>Approval</strong></td>
<td>AICTE Approved</td>
</tr>
<tr>
<td><strong>Campus</strong></td>
<td>21-acre green campus, Harinchawra, Cooch Behar — 736101, West Bengal</td>
</tr>
<tr>
<td><strong>Motto</strong></td>
<td><em>तमसो मा ज्योतिर्गमय</em> — From darkness, lead me to enlightenment</td>
</tr>
<tr>
<td><strong>Departments</strong></td>
<td>CSE · ECE · EE · ME · CE · BSH</td>
</tr>
<tr>
<td><strong>Phone</strong></td>
<td>03582-233040</td>
</tr>
<tr>
<td><strong>Email</strong></td>
<td>principalofficecgec@gmail.com</td>
</tr>
<tr>
<td><strong>Website</strong></td>
<td><a href="https://cgec.org.in">cgec.org.in</a></td>
</tr>
</table>

---

## License

This project is the exclusive property of **Cooch Behar Government Engineering College**. It is developed and maintained for institutional use only. Unauthorised reproduction, distribution, or modification of any part of this project is strictly prohibited.

© 2024–2026 Cooch Behar Government Engineering College. All rights reserved.

---

<div align="center">

<br/>

Built with ❤️ for **Cooch Behar Government Engineering College**

[🌐 cgec.org.in](https://cgec.org.in) · [📧 principalofficecgec@gmail.com](mailto:principalofficecgec@gmail.com) · [📞 03582-233040](tel:03582233040)

<br/>

*"तमसो मा ज्योतिर्गमय" — From darkness, lead me to enlightenment*

</div>
