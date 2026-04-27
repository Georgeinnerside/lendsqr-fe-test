# Lendsqr Frontend Assessment

## Overview

A highly, responsive frontend implementation of the Lendsqr User Management Dashboard. This project demonstrates advanced React/Next.js patterns, SASS/SCSS modular styling.

## Tech Stack

- Next.js (React)
- TypeScript
- SCSS Modules
- React Icons

## Features

- Login Page
  Simple authentication interface with form validation.
- Dashboard Layout
  Structured layout with sidebar navigation and topbar for seamless user experience.
- Users List (500 Records)
  Displays a large dataset of users with pagination-ready structure and optimized rendering.
- User Details Page
  Detailed profile view of each user including personal, educational, and social information.
- LocalStorage Persistence
  Selected user data is stored locally to maintain state across page reloads.
- Responsive Design
  Fully responsive across mobile, tablet, and desktop devices.

## 🔗 Live Demo
- https://lendsqr-fe-test-sand.vercel.app/


## 🧪 Testing

## 📁 Project Structure

.
├── app/ # App Router core
│ ├── (dashboard)/
│ │ └── users/
│ │ ├── page.tsx      # Main User Dashboard Logic
│ │ └── [id]/         # User Details dynamic route
│ ├── layout.tsx      # Root layout (Navbar & Sidebar integration)
│ ├── page.tsx        # Entry point / Redirect logic
│ └── globals.scss    # Global styles & custom scrollbars
├── components/       # Modular UI Components
│ ├── common/         # Shared UI (Pagination, SearchBar)
│ ├── layout/         # Global Layout (Navbar, Sidebar)
│ └── users/          # Domain-specific (Stats, Table)
├── public/           # Static assets
│ └── assets/         # Icons & Logos (.svg)
├── service/          # Data fetching & Mock API logic
├── styles/           # Design Tokens
│ └── variables.scss  # Lendsqr brand colors & variables
├── types/            # TypeScript Definitions
│ └── types.ts        # Global interfaces & types
├── next.config.js    # Next.js configuration
├── package.json      # Dependencies & Scripts
└── tsconfig.json     # TypeScript configuration

## ⚙️ Setup Instructions
-git clone https://github.com/Georgeinnerside/lendsqr-fe-test.git
- npm install
- npm run dev
- npm build