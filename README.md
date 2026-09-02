# TaskFlow — Modern Task Manager

A sleek, responsive dark-themed task management dashboard built with vanilla JavaScript. It delivers complete CRUD functionality, real-time counters, search, priority tagging, and localStorage persistence for a streamlined workflow.

🔗 **Live Demo:** [itsvivekdev.github.io/Task-manager](https://itsvivekdev.github.io/Task-manager/)

---

## ✨ Features

- **Full CRUD Support:** Create, edit inline, mark as complete, or remove tasks instantly.
- **Persistent Data:** Syncs automatically with browser `localStorage` so tasks remain saved across refreshes.
- **Priority & Status Filtering:** Filter tasks by completion state (All, Pending, Completed) or priority level (High, Medium, Low).
- **Search & Sort:** Live search bar for instant title/description queries paired with multi-criteria sorting dropdowns.
- **Task Metadata:** Support for custom task descriptions, category tags, and due dates.
- **Bulk Operations:** One-click `Delete All` action to reset the board.
- **Live Metrics:** Real-time counters updating active, pending, and completed task tallies.
- **Modern Dark UI:** Clean dashboard design with smooth transitions built entirely using custom CSS.

---

## 🛠 Tech Stack

- **HTML5:** Semantic dashboard layout
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid, Dark Mode aesthetics
- **JavaScript (ES6+):** DOM manipulation, state management, and filtering logic
- **Storage:** Browser LocalStorage API

---

## 📂 Project Structure

```text
Task-manager/
├── index.html     # Semantic dashboard structure
├── index.css      # Dark theme, layout, and component styling
└── index.js       # App state, CRUD operations, and LocalStorage logic
