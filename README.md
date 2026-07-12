# Halt

<p align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-1-000000?style=for-the-badge&logo=lucide&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
</p>

A clean, modern frontend for **Halt** — a bus ticket booking platform. Built with React and Vite, and powered by the [Halt API](https://github.com/arunsabu21/halt-api) backend (Django REST Framework).

---

## Tech Stack

| Category     | Tool                                                 |
| ------------ | ---------------------------------------------------- |
| Framework    | React 18 (Vite)                                      |
| Routing      | React Router v6                                      |
| Server State | TanStack Query (React Query)                         |
| HTTP Client  | Axios (with JWT interceptor + auto-refresh)          |
| Styling      | Plain CSS with CSS custom properties (design tokens) |
| Icons        | Lucide React                                         |
| Font         | Figtree (Google Fonts)                               |

---

## Features

- **JWT authentication flow** — Register → Verify OTP → Login, with automatic access token refresh on expiry
- **Protected routes** — restricted pages redirect unauthenticated users to login
- **Global toast notification system** — animated success/error messages, usable from any page via a single hook
- **Field-level form validation** — inline error states with icons, validates on blur and on submit
- **Centralized design system** — colors, spacing, and typography defined once as CSS variables
- **Reusable component library** — logo, navbar, and form primitives built for reuse across pages

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [Halt API](https://github.com/arunsabu21/halt-api) backend running locally (or a deployed instance)

### Installation

```bash
git clone https://github.com/arunsabu21/halt.git
cd halt
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/
│   ├── common/       # Logo, Toast, ProtectedRoute, other shared UI
│   └── layout/        # Navbar, page layout wrappers
├── context/           # React Context providers (e.g. ToastContext)
├── hooks/             # Custom hooks (e.g. useToast)
├── pages/              # Route-level page components
├── routes/             # Route configuration
├── services/           # Axios instance + API calls, grouped by resource
├── styles/             # Global CSS and design tokens
└── utils/              # Validators and shared helper functions
```

---

## Design System

| Token                   | Value     | Usage                             |
| ----------------------- | --------- | --------------------------------- |
| `--color-primary`       | `#2D5F4C` | Primary actions, brand color      |
| `--color-primary-hover` | `#244A3D` | Hover state for primary elements  |
| `--color-accent`        | `#E8A33D` | Highlights, badges                |
| `--color-surface`       | `#FAFAF8` | Page background                   |
| `--color-surface-dark`  | `#14181A` | Dark surfaces (footer, dark mode) |
| `--color-danger`        | `#C4453A` | Errors, cancelled states          |
| `--color-success`       | `#3D8B5F` | Success states, confirmations     |
| `--color-text-primary`  | `#1A1F1C` | Primary text                      |
| `--color-text-muted`    | `#6B7570` | Secondary/muted text              |

Font: **Figtree** — used across all UI text.

---

## Roadmap

- [x] Register page with validation
- [x] Toast notification system
- [x] Protected route handling
- [ ] OTP verification page
- [ ] Login page (full flow)
- [ ] Trip search and listing
- [ ] Seat selection and booking flow
- [ ] My Bookings page

---

## Related Repository

Backend API: [Halt API](https://github.com/arunsabu21/halt-api) — Django REST Framework, PostgreSQL, Redis, JWT authentication

---

## Author

**Arun Sabu**
[GitHub](https://github.com/arunsabu21)
