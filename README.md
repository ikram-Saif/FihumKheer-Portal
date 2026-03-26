# 🖥️ Fihum Kheer - Management Dashboard

[![React Version](https://img.shields.io/badge/React-v19.0-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange.svg?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

The **Fihum Kheer Dashboard** is a high-performance, ultra-premium administrative interface for managing the charity portal. It leverages modern SaaS design principles (glassmorphism, interactive analytics) to allow administrators to effortlessly manage projects, volunteers, donations, and content through a sleek, highly responsive UI.

---

## ✨ Features & Enhancements

- **Premium SaaS Analytics Dashboard:** Fully refactored UI featuring deep glowing mesh gradients, backdrop-blur 3xl glassmorphism cards, and interactive hover-lift micro-animations.
- **Real-Time Visualizations:** Custom-built metric bar charts for **Donation Traffic** and **Visitor Analytics** with interactive floating tooltips and smooth transitions.
- **Global Network Tracking:** A dedicated 'Active Partners' widget highlighting ongoing collaborations globally, utilizing rich typography and badge indicators.
- **Project Lifecycle Management:** Full creation-to-completion management with automated goal tracking.
- **State Efficiency:** Lightweight, hyper-reactive state management via Zustand (`projectsStore`, `volunteersStore`).
- **Data Safety:** Multi-layer validation leveraging **Zod** (stable `^3.23.8`) and schema design patterns to prevent client-side data corruption.
- **Rich User Experience:**
  - Stunning animated sidebar with custom Flowbite themes.
  - Granular activity timelines equipped with customized status node LEDs.
  - Multi-media gallery handling and rich text editing integrations (Quill/Tiptap).

---

## 🛠️ Tech Stack & Architecture

- **Core:** [React 19](https://react.dev/)
- **Build & Dependency:** [Vite](https://vitejs.dev/)
- **Styling Architecture:** [Tailwind CSS v4](https://tailwindcss.com/) coupled with a highly customized [Flowbite React](https://flowbite-react.com/) theme.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for performant, boilerplate-free global state.
- **Validation:** **Zod** & **Yup** configuration for stringent form control.
- **Iconography:** [React Icons (Lu / Hi)](https://react-icons.github.io/react-icons/) optimized for visual balance.

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies using npm:
```bash
npm install
```
*(Note: Ensure you are on a compatible version of Node.js. If you encounter dependency caching issues, it is recommended to run `npm cache clean --force` or clear out `node_modules` before fresh installations.)*

### 2. Environment Variables
Create a `.env` file at the root of the project and define your backend API mapping:
```env
VITE_API_URL=http://localhost:1337
```

### 3. Running the Project
```bash
# Start the Vite development server with Hot Module Replacement (HMR)
npm run dev

# Build the optimized bundle for production deployment
npm run build
```

---

## 📁 Project Structure

```text
src/
├── components/   # Reusable UI elements (Sidebar, Navbar, custom Buttons)
├── pages/        # Main application views (Dashboard, Projects, Login)
├── services/     # API integration and abstracted data fetching logic
├── schemas/      # Validation schemas (Yup/Zod configurations)
└── store/        # Zustand state management stores (projectsStore.js, etc.)
```

---

## 🤝 Contribution & License

This project is a private repository intended for the **Fihum Kheer** initiative platform. Access and push rights are restricted to authorized contributors. 

---

<p align="center">
  <em>Developed with ❤️ for the community.</em>
</p>
