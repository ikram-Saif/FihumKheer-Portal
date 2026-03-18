# 🌙 Fihum Kheer Charity Platform

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen.svg)](https://github.com/ikram-Saif/FihumKheer-Portal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Strapi](https://img.shields.io/badge/Made%20with-Strapi-blue.svg)](https://strapi.io/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)

**Fihum Kheer** is a comprehensive digital solution for charity management, designed to bridge the gap between donors and those in need. This repository contains both the robust administration dashboard (Frontend) and the powerful content API (Backend).

---

## 📂 Project Architecture

```text
FihumKheer-Portal/
├── bakend/             # Strapi 5 Headless CMS (API)
│   ├── src/api/        # Data models & Business logic
│   └── public/uploads/ # Hosted media assets
└── dashboard/          # React 19 Admin Portal (Frontend)
    ├── src/components/ # Reusable UI components
    ├── src/store/      # Zustand state management
    └── src/pages/      # Application views
```

| Component | Role | Primary Stack |
| :--- | :--- | :--- |
| **Backend** | Data Source & Auth | Strapi 5, Node.js, SQLite |
| **Dashboard** | Admin Interface | React 19, Vite, Tailwind CSS v4 |

---

## 🖥️ Frontend (Dashboard)

The dashboard provides a user-friendly interface for managing all aspects of the charity initiative.

### Core Features
- **Project Management:** Create, edit, and track charity projects.
- **Volunteer Coordination:** Manage volunteer applications and assignments.
- **Donation Tracking:** Real-time monitoring of contributions.
- **Resource Management:** Handle sectors, events, and gallery items.
- **User Authentication:** Secure login for authorized administrators.

### Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS & Flowbite
- **Form Handling:** Formik & Yup
- **UI Components:** Mantine, React-Icons, SweetAlert2

👉 **[Go to Dashboard README](./dashboard/README.md)** for setup and technical details.

---

## ⚙️ Backend (API)

A powerful headless CMS built with Strapi to manage data models and provide high-performance API endpoints.

### Core Architecture
- **Collection Types:** Projects, Volunteers, Articles, Categories, Sectors, and more.
- **Permissions:** Granular access control using the Strapi Users-Permissions plugin.
- **Media Library:** Centralized asset management for images and documents.

### Tech Stack
- **CMS:** Strapi 5
- **Language:** TypeScript
- **Database:** SQLite (Better-SQLite3)

👉 **[Go to Backend README](./bakend/README.md)** for API documentation and deployment steps.

---

## 🚀 Quick Start

To get the full system up and running locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ikram-Saif/FihumKheer-Portal.git
cd FihumKheer-Portal
```

### 2. Setup the Backend
```bash
cd bakend
npm install
npm run develop
```

### 3. Setup the Dashboard
```bash
cd dashboard
npm install
npm run dev
```

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue.

## 📄 License

This project is licensed under the MIT License - see the `license.txt` file for details.

---

<p align="center">
  Developed with ❤️ for the community.
</p>
