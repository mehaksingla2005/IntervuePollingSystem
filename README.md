# 🗳️ Live Poll Studio

**Live Poll Studio** is a real-time classroom polling system built with React and Socket.IO. It allows teachers to conduct live polls, and students to respond interactively in real-time, with full session-based participation and result visualization.

---

## 🔗 Live Project

[🔗[https://intervue-polling-system-kappa.vercel.app/](https://intervue-polling-system-kappa.vercel.app/)]


---
##  Run Locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository and start the app

```bash
git clone https://github.com/mehaksingla2005/IntervuePollingSystem.git
cd IntervuePollingSystem
npm install
npm run dev
```
---

## 👨‍🏫 Teacher Features

* Create and launch new polls.
* View live poll results in real time.
* Restrict asking a new question until:

  * All students have responded, or
  * There is no active question.
* Set custom time limits per question (e.g., 60 seconds).
* Remove/kick specific students during the session.
* Access poll history (previous polls with results).
* **Interact directly with students via an in-app chat interface**.

---

## 🎓 Student Features

* Join by entering a name (unique to the current browser tab).

  * Opening a new tab allows joining again as a new student.
  * Refreshing the tab retains the session identity.
* Receive questions in real time and submit answers.
* Automatically see live results after submitting or after timeout.
* Each question must be answered within a 60-second window.
* **Chat live with the teacher** during the session.

---

## ✅ Summary of Implemented Features

### Core Functionality

* [x] Real-time poll system with socket-based syncing.
* [x] Role-based access: Teacher & Students.
* [x] Poll creation, answering, and result tracking.
* [x] Hosted full-stack solution (frontend + backend).

### Enhanced Features

* [x] Teacher-controlled time limits per question.
* [x] Kick out any student from the session.
* [x] View historical poll results (persisted, not localStorage-based).
* [x] **In-app teacher–student chat for real-time interaction**.

---

## 🖼️ Screenshots

<img width="1151" height="636" alt="Screenshot 2025-12-17 at 7 13 16 PM" src="https://github.com/user-attachments/assets/a39103d1-8e8c-452b-b592-d720b0f05eb3" />
<img width="1151" height="636" alt="Screenshot 2025-12-17 at 7 50 55 PM" src="https://github.com/user-attachments/assets/e165b781-6797-4c7f-9f9d-533f6a7d028d" />
<img width="1167" height="522" alt="Screenshot 2025-12-17 at 8 05 48 PM" src="https://github.com/user-attachments/assets/a419104a-a891-482c-8606-ab1c1c7ea2a0" />
<img width="1205" height="786" alt="Screenshot 2025-12-17 at 8 05 14 PM" src="https://github.com/user-attachments/assets/aeffc231-e327-478b-bc68-983c8bb3d8f1" />
<img width="1470" height="956" alt="Screenshot 2025-12-17 at 8 12 03 PM" src="https://github.com/user-attachments/assets/1dd806fa-2bcf-473d-8a37-9af67ba22821" />

<img width="1102" height="589" alt="Screenshot 2025-12-17 at 10 35 45 PM" src="https://github.com/user-attachments/assets/446ea73a-2a79-4e59-8564-c7af49aeaf5e" />
<img width="1467" height="809" alt="Screenshot 2025-12-17 at 10 36 31 PM" src="https://github.com/user-attachments/assets/c4e92bba-de8e-4177-b14e-8c47a84de8a9" />
<img width="766" height="519" alt="Screenshot 2025-12-17 at 10 37 40 PM" src="https://github.com/user-attachments/assets/49970b09-b1a3-4b94-8360-680c90a5bf9c" />

<img width="710" height="387" alt="Screenshot 2025-12-17 at 10 37 54 PM" src="https://github.com/user-attachments/assets/6378302c-b56a-48ad-ba45-d4626fc11094" />
<img width="1470" height="956" alt="Screenshot 2025-12-17 at 10 38 58 PM" src="https://github.com/user-attachments/assets/41cfeb17-0128-47f3-86ac-b808e3f89811" />


![Screenshot (81)](https://github.com/user-attachments/assets/f6f4e450-7a6c-42ef-9e68-da7c2145d5d1)



