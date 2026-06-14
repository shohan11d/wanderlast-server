# 🎓 MediQueue – Tutor Booking System

MediQueue is a dynamic tutor scheduling web application where students can seamlessly discover tutors, filter classes by subject or availability, and book online learning sessions with auto-generated session tokens. The system automates real-time slot tracking and provides comprehensive dashboard management tools for both students and tutors.

**🔗 [Live Site Deployment Link](https://your-live-site-url.com)**

---

## ✨ Key Features

* **⚡ Real-Time Atomic Slot Reservation:** Features smart, database-driven allocation logic that automatically decreases tutor slot availability upon successful checkout and prevents booking when limits reach zero.
* **🌓 Seamless Dark & Light Mode:** Includes a responsive site-wide theme context provider accessible right from the navbar, perfectly synchronizing your browsing layout to match your workspace preference.
* **🔍 Multi-Layer Search & Filtering:** Offers instant server-side data extraction combining case-insensitive `$regex` matching for tutor names along with `$gte` and `$lte` chronological date-range inputs.
* **🛡️ Secure JWT Session Security:** Private dashboard pathways and sensitive actions are verified with a secure backend cryptographic authorization layer using JSON Web Tokens (JWT) stored safely in client states.
* **📋 Intuitive Grid Layouts & CRUD Dashboards:** Built using structural Tailwind CSS configurations, giving users access to modal-based entry forms, responsive layout grids, and interactive data tables with real-time status patches.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), React Router DOM (v6), Tailwind CSS, Lucide React (Icons), React Hot Toast / SweetAlert2
* **Backend:** Node.js, Express.js, MongoDB
* **Authentication:** Firebase Auth (Google Sign-In & Email/Password validation) + JSON Web Tokens (JWT)

---

## 🚀 Local Installation & Configuration

Follow these steps to spin up the local development environment:

1. **Clone the repository:**
```bash
   git clone [https://github.com/your-username/mediqueue-client.git](https://github.com/your-username/mediqueue-client.git)
   cd mediqueue-client