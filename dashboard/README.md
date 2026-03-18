# 🖥️ Fihum Kheer - Management Dashboard

[![React Version](https://img.shields.io/badge/React-v19.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind-38B2AC.svg)](https://tailwindcss.com/)

The **Fihum Kheer Dashboard** is a modern, high-performance administrative interface for managing the charity portal. It allows administrators to effortlessly manage projects, volunteers, and content through a sleek, responsive UI.

---

## ✨ Features

- **Dashboard Overview:** Real-time visual summary of charity performance.
- **Project Lifecycle:** Full creation-to-completion management with goal tracking.
- **Advanced Pagination:** Efficient data loading for large project lists.
- **Multi-Media Handling:** Seamless upload and display of project galleries.
- **Rich Text Editing:** Professional content creation using Tiptap and Quill.
- **Smart Team Assignment:** Visual volunteer selection with avatar integration.
- **Premium Visualization:** Interactive sliders and progress indicators for project transparency.
- **Data Safety:** Multi-layer validation using Formik and Zod/Schema patterns.
- **State Efficiency:** Lightweight, reactive state management via Zustand.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.js.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Flowbite React](https://flowbite-react.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Management:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **UI Components:** [Mantine UI](https://mantine.dev/), [React-Icons](https://react-icons.github.io/react-icons/)
- **Utilities:** Axios, SweetAlert2, Swiper

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies using npm:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file and set your Backend API URL:
```env
VITE_API_URL=http://localhost:1337
```

### 3. Running the Project
```bash
# Start the development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

- `src/components/`: Reusable UI components (Forms, Tables, Layouts).
- `src/pages/`: Main application views (Dashboard, Projects, Login).
- `src/services/`: API integration and data fetching logic.
- `src/schemas/`: Validation schemas (Yup/Zod).
- `src/store/`: Zustand state management stores.

---

## 📄 License

This project is private and intended for the Fihum Kheer platform.

---

<p align="center">
  Developed with ❤️ for the community.
</p>
