# Heavens Gate Prayer Mountain — Digital Platform (Frontend Web Portal)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-v8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

A responsive, high-performance web application and Progressive Web App (PWA) for **Heavens Gate Prayer Mountain** in Gilgil, Nakuru County, Kenya.

Designed with a **clean light theme** featuring **vivid orange** branding, glassmorphism, and a robust 2-tier navigation structure engineered to prevent layout collisions across desktop, tablet, and mobile displays.

---

## 🏛️ About Heavens Gate Prayer Mountain
Located in Gilgil, Nakuru County, Kenya, along the Nairobi-Nakuru Highway, Heavens Gate Prayer Mountain was founded under the vision of **Apostle John Kimani William** (Kingdom Seekers Fellowship). It serves thousands of believers who gather for solemn prayer, worship, and fasting.

---

## 🌟 Key Application Features

### 1. Public & Pilgrim Experience
- **Responsive 2-Tier Navigation:** Prevents header collisions and wrapping, housing brand identity, quick actions, role selector, and full module tabs.
- **Online Accommodation Booking:** Multi-step wizard calculating real-time capacity and duration snapshots in KES (Single Rooms, Double Sharing, 4-Bed Dorms, and 6-Bed General Halls).
- **M-Pesa Checkout & Developer Sandbox Simulator:** Seamless integration with Safaricom Daraja STK Push plus an instant simulator for immediate end-to-end testing without real money.
- **Cryptographic Digital QR Tickets:** Generates tamper-proof QR passes with HMAC signatures, assigned room & bed numbers, arrival checklists, and print-ready formatting.
- **Interactive 2D Campus Map:** Vector SVG layout of the Gilgil grounds with landmark details and turn-by-turn routing from the gate to the pilgrim's assigned room.
- **Live Services & 3-Hour Prayer Watches:** Shiloh Main Sanctuary live stream feed with signups for 24-hour continuous night prayer watches.
- **Praise Testimonies & Replies:** Chronological testimonies feed with category filtering, like counters, and threaded comments.
- **Confidential Prayer Requests:** Secure submission form restricted exclusively to authorized pastoral intercessors (Rule BR-11).
- **Transport Estimator & Packing Checklist:** Accurate stage directions, matatu fares from Nairobi / Nakuru, boda-boda costs, and an interactive packing checklist.
- **"Ask Heavens Gate" AI Assistant:** Grounded Q&A assistant answering questions strictly from verified institutional guidelines.

### 2. Operations & Staff Portals (RBAC)
- **Gate Scanner Workstation:** QR camera verification interface enforcing the 4 mandatory admission checkpoints (modest attire, strict no-food baggage inspection, National ID, and safety briefing).
- **Duplicate Admission Denial:** Server atomically blocks repeat entries with exact timestamp and officer logging (Rule BR-05).
- **Pilgrim Checkout:** Departure logging that automatically releases beds back into bookable inventory.
- **Executive Operations Dashboard:** Live counters for on-site pilgrims, expected arrivals, total beds, occupancy %, reconciled M-Pesa revenue, and one-click CSV export.
- **One-Click Role Switcher:** Dropdown in the header to effortlessly test views for *Pilgrim, Gate Officer, Reception, Accommodation, Finance, Prayer Admin,* and *System Admin*.

---

## 🛠️ Tech Stack & Libraries
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3.4 (Vivid Orange + Clean Light Palette)
- **Icons:** Lucide React
- **QR Codes:** `qrcode.react` (SVG & Canvas rendering)
- **Real-Time:** Socket.io Client
- **Animations & Effects:** `canvas-confetti`, custom CSS micro-animations
- **PWA:** Web App Manifest + Service Worker support

---

## 🏃 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📱 Responsive & Cross-Platform Support
- **Mobile Phones:** Touch-friendly tap targets, responsive drawer menu, camera QR scanning.
- **Tablets & iPads:** Optimized horizontal sub-navigation with smooth scrolling.
- **Desktops & Laptops:** Full 2-tier executive navigation with zero layout overlap.
- **Print Friendly:** Dedicated print stylesheet for digital QR admission tickets.

---

## 📄 License
This project is proprietary and developed for **Heavens Gate Prayer Mountain**, Gilgil, Kenya by Dominion Softwares Ltd.
