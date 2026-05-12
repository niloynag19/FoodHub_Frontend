# 🍔 FoodHub - Premium Food Delivery Platform

FoodHub is a state-of-the-art, high-performance food delivery and management platform built with the latest technologies. It offers a seamless experience for customers to browse meals, manage their carts, and track orders, while providing a robust dashboard for administrators to manage the entire ecosystem.

![Banner](https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop)

---

## 🚀 Key Features

-   **✨ Premium UI/UX**: Crafted with Tailwind CSS 4 and Radix UI for a modern, responsive, and accessible interface.
-   **🎭 Smooth Animations**: Integrated with GSAP, Framer Motion, and Lenis for fluid transitions and smooth scrolling.
-   **🔐 Robust Authentication**: Powered by Better Auth for secure and flexible user management.
-   **🛒 Advanced Cart System**: Real-time cart management with persistent storage.
-   **🍱 Meal Management**: Comprehensive system for browsing, filtering, and searching meals.
-   **📊 Dual Dashboards**: Dedicated interfaces for Customers and Administrators.
-   **📝 Type-Safe Forms**: Built using TanStack React Form and Zod for bulletproof validation.
-   **⚡ High Performance**: Leveraging Next.js 16 (React 19) features for optimal speed and SEO.

---

## 🛠️ Tech Stack

### Frontend Core
-   ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
-   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
-   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Styling & UI
-   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
-   ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
-   ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### State & Data
-   ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
-   ![Zod](https://img.shields.io/badge/Zod-3068b7?style=for-the-badge&logo=zod&logoColor=white)

---

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router routes
│   ├── (commonLayout)    # Public routes (Home, About, Meals)
│   └── (dashboardLayout) # Protected User/Admin routes
├── components/      # Reusable UI & Business components
│   ├── ui/          # Atomic Radix/Shadcn-like components
│   ├── layout/      # Shared layout parts
│   └── meals/       # Meal-specific features
├── hooks/           # Custom React hooks
├── services/        # API calls & External services
├── lib/             # Utilities & Configuration
└── types/           # TypeScript definitions
```

---

## 🏁 Getting Started

### Prerequisites
-   Node.js (LTS version)
-   npm / yarn / pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/niloynag19/FoodHub_Frontend.git
    cd foodhub-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root and add your configuration (refer to `.env.example` if available).

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Niloy Nag](https://github.com/niloynag19)

