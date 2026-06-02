# Softone ERP Backend (Flask + XAMPP MySQL)

This is the backend server for the Softone ERP system, built using **Python Flask** and **MySQL**. It is designed to work seamlessly with **XAMPP MySQL** running on localhost.

---

## 🚀 Features

1. **Automatic Database Initialization**: The backend automatically creates the database (`softone_erp`), creates all required tables, and inserts default seed data on startup. No manual SQL importing is required!
2. **Role-Based Authentication**: Secure login endpoint verifying passwords against hashed values, with a developer-friendly fallback for plain-text passwords.
3. **Full CRUD APIs**: Complete endpoints for:
   - **Auth**: `/api/auth/login`
   - **Telecaller CRM**: `/api/telecaller/entries` (GET, POST, PUT, search by mobile, search by QR token)
   - **Appointments**: `/api/appointments` (GET, POST, PUT status, check slot availability)
   - **Clinical Queue**: `/api/queue` (GET, POST, PUT status)
   - **Reception Day Summary**: `/api/reception/summary` (GET, POST)
   - **Clinic Branches**: `/api/branches` (GET)

---

## 🛠️ Prerequisites

Before running the backend, make sure you have:
1. **Python 3.8+** installed. You can download it from [python.org](https://www.python.org/downloads/).
   - *Important*: Ensure you check the box **"Add Python to PATH"** during installation.
2. **XAMPP** installed. You can download it from [apachefriends.org](https://www.apachefriends.org/index.html).

---

## ⚙️ Setup & Running

### Step 1: Start XAMPP MySQL
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL** (and **Apache** if you want to use phpMyAdmin).
3. Ensure MySQL is running on its default port (**3306**).

### Step 2: Run the Backend
We have provided a convenient Windows batch script that automatically creates a virtual environment, installs all dependencies, and starts the Flask server.

1. Double-click the **`run.bat`** file in this folder.
2. The script will:
   - Check your Python installation.
   - Create a virtual environment (`venv`).
   - Install dependencies (`Flask`, `Flask-Cors`, `PyMySQL`, etc.).
   - Initialize the database and tables in XAMPP MySQL.
   - Start the Flask server on **`http://localhost:5000`**.

*(Alternatively, you can run it manually in PowerShell/CMD:)*
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

---

## 🔑 Default Login Credentials

The database is pre-populated with the following users for the **6 active roles**. You can use these credentials to log in:

| Username | Password | Role | Scoped Clinic |
| :--- | :--- | :--- | :--- |
| **admin** | `admin123` | Super Admin | *All Branches* |
| **manager** | `manager123` | Branch Manager | Delhi Gate Clinic |
| **receptionist** | `reception123` | Front Desk Executive | Delhi Gate Clinic |
| **audiologist** | `audio123` | Audiologist | Delhi Gate Clinic |
| **telecaller** | `tele123` | Telecaller | *All Branches* |
| **finance** | `finance123` | Finance Team | *All Branches* |

---

## 📁 Project Structure

- `app.py`: Main Flask application containing all REST API endpoints.
- `db.py`: Database connection helper and query execution wrapper.
- `schema.sql`: SQL schema defining tables and seed data.
- `requirements.txt`: Python package dependencies.
- `run.bat`: Windows batch script to run the backend easily.
- `.env`: Environment variables (database host, user, password, name).

---

## 🔌 Connecting the Frontend

The Flask server runs on `http://localhost:5000`. It has **CORS** enabled, meaning the React frontend (running on `http://localhost:5173`) can make requests to it.

To connect the frontend:
1. Ensure the Flask backend is running (`run.bat`).
2. The frontend can make standard `fetch` or `axios` calls to `http://localhost:5000/api/...`.
