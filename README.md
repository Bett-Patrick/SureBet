# ⚽ SureBet – Sports Predictions Platform

**SureBet** is a responsive web application designed to deliver expert-based football match predictions to users based on their subscription plans. The platform includes robust admin functionalities, real-time fixture fetching, and seamless user authentication using Firebase. SureBet showcases end-to-end development from frontend UI/UX to backend logic and API integration.

---

## 🚀 Features

### 👨‍💼 Admin Features
- ➕ **Add Predictions**: Input prediction details such as teams, date, time, stadium, referee, and prediction types.
- 🔍 **Search Fixtures**: Search for upcoming fixtures via team names with data auto-filled from the API.
- 🏷️ **Assign Subscription Plans**: Allocate predictions to different plans (Free, Silver, Gold, Platinum).
- 🛠️ **User Management**: Promote or demote users to/from admin roles.

### 🙋‍♂️ User Features
- 📅 **View Predictions**: Access predictions based on assigned plans.
- 📱 **Fully Responsive Design**: Mobile-first interface for a seamless experience across all screen sizes.
- 🔐 **Secure Access**: Only authenticated users can view predictions.

---

## 🧰 Tech Stack

### 🎨 Frontend
- **React** – Component-based UI development
- **Tailwind CSS** – Utility-first responsive styling
- **React Select** – Dynamic dropdowns for prediction input

### 🔙 Backend & Auth
- **Firebase Authentication** – Manages secure user login and role-based access
- **Firestore Database** – Cloud-hosted NoSQL DB for users and predictions

### 🌐 External API
- **API-Football (Nokiasport / RapidAPI)** – Fetches live fixtures, teams, stadiums, and more

---

## 🔒 Firebase Architecture

### 🔐 Authentication
- Handles user sign-in
- Verifies admin roles
- Restricts access to key features based on roles

### 📁 Firestore Collections

#### `users`
- `uid`, `email`, `role` (`user` or `admin`)

#### `predictions`
- `fixtureId`, `homeTeam`, `awayTeam`, `date`, `time`
- `referee`, `stadium`, `predictionType`, `predictionValue`
- `plans` (Free, Silver, Gold, Platinum)
- `createdBy`, `createdAt`

---

## 🧪 Skills Demonstrated

- ✅ Responsive frontend development using **Tailwind CSS**
- ✅ Firebase **Authentication** & **Firestore** integration
- ✅ Role-based access control (RBAC)
- ✅ Real-time data updates
- ✅ External **API consumption** (fixture data via API-Football)
- ✅ UI logic with **React Hooks**

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- Firebase project setup with Firestore & Authentication enabled
- API-Football credentials from RapidAPI

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Bett-Patrick/SureBet.git
cd surebet

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
