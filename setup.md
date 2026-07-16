# Store Server Setup & API Reference Guide

Welcome to the backend repository of the Store Server dashboard API. This guide is designed to help frontend developers set up their local development environment, configure the database with Neon PostgreSQL, integrate with the API endpoints, and collaborate safely via GitHub.

---

## Table of Contents
1. [Prerequisites & Installation](#1-prerequisites--installation)
2. [Database Setup with Neon PostgreSQL](#2-database-setup-with-neon-postgresql)
3. [Running the Application](#3-running-the-application)
4. [API Route & Endpoint Reference](#4-api-route--endpoint-reference)
5. [How to Commit to GitHub Safely](#5-how-to-commit-to-github-safely)

---

## 1. Prerequisites & Installation

Before running the server, ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed on your system.

### Step 1: Clone the Repository
```bash
git clone https://github.com/Vishnu-301/single-dasboard-api.git
cd single-dasboard-api
```

### Step 2: Install Dependencies
Run the following command to install the required Node.js packages:
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the provided `.env.example` file to create a local `.env` configuration file:
```bash
cp .env.example .env
```
Open the `.env` file and replace the placeholder database URL with your actual credentials (see the next section on how to get this from Neon).

---

## 2. Database Setup with Neon PostgreSQL

This project uses [Neon](https://neon.tech), a fully managed serverless PostgreSQL database. Follow these steps to set it up:

### Step 1: Create a Neon Database
1. Go to [Neon.tech](https://neon.tech) and sign up for a free account.
2. Create a new project. You can name it `store-server` and select your preferred region.
3. Once the project is created, copy the **Connection String** provided in the Neon Dashboard (ensure the dropdown format is set to `node-postgres` or just copy the connection URI). It will look something like this:
   ```text
   postgresql://alex:AbCdEf12345@ep-cool-snowflake-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Update the `.env` File
Paste the connection string into your local `.env` file:
```env
DATABASE_URL=postgresql://alex:AbCdEf12345@ep-cool-snowflake-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
PORT=5000
```

### Step 3: Initialize the Database Schema
To create the necessary tables (`products` and `admins`), you need to run the SQL commands in [src/data/data.sql](file:///home/vishnu/Documents/store-server/src/data/data.sql).
1. Go to your **Neon Dashboard**.
2. Click on the **SQL Editor** tab in the left-hand sidebar.
3. Paste the contents of `src/data/data.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS products (
       id SERIAL PRIMARY KEY,
       product_name TEXT NOT NULL,
       price BIGINT NOT NULL,
       image TEXT,
       description TEXT,
       category TEXT,
       rating BIGINT,
       stock TEXT,
       specs JSON,
       created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE IF NOT EXISTS admins (
       id SERIAL PRIMARY KEY,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL,
       role TEXT DEFAULT 'admin',
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Click **Run** to execute the query and initialize the tables.

---

## 3. Running the Application

Once your database is configured, you can run the server.

### Development Mode (with Hot-reloading)
Runs the server using `nodemon` which restarts automatically when files are modified:
```bash
npm run dev
```

### Production Mode
Runs the server normally using standard Node.js:
```bash
npm start
```

### Verify Setup
To check if the server is running properly, open your browser or API client (Postman/Thunder Client) and visit:
* **URL:** `http://localhost:5000/api`
* **Expected JSON Response:**
  ```json
  {
    "message": "STORE SERVER API conected"
  }
  ```

---

## 4. API Route & Endpoint Reference

All backend requests must include the header `Content-Type: application/json`. The default base URL is `http://localhost:5000`.

### A. Admin Authentication

#### 1. Register Admin
* **Endpoint:** `POST /api/admin/register`
* **Description:** Register a new admin user. The password will be automatically hashed using `bcrypt` before database storage.
* **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (`201 Created`):**
  ```json
  {
    "message": "Admin created successfully",
    "data": {
      "id": 1,
      "email": "admin@example.com",
      "created_at": "2026-07-16T08:00:00.000Z"
    }
  }
  ```
* **Error Response (`400 Bad Request`):**
  ```json
  {
    "message": "Email and password are required"
  }
  ```

#### 2. Admin Login
* **Endpoint:** `POST /api/admin/login`
* **Description:** Authenticate an admin user and retrieve their identity.
* **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "Admin login successfully",
    "data": {
      "id": 1,
      "email": "admin@example.com"
    }
  }
  ```
* **Error Response (`401 Unauthorized`):**
  ```json
  {
    "message": "Invalid password"
  }
  ```

---

### B. Products API

#### 1. Add Product
* **Endpoint:** `POST /api/products/add`
* **Description:** Add a new product to the catalog. All fields are mandatory.
* **Request Body:**
  ```json
  {
    "product_name": "Smart OLED TV 55\"",
    "price": 1200,
    "image": "https://example.com/images/tv.jpg",
    "description": "A high-definition 4K HDR OLED smart television.",
    "category": "Electronics",
    "rating": 5,
    "stock": "45",
    "specs": {
      "resolution": "4K UHD",
      "refresh_rate": "120Hz",
      "hdmi_ports": 4
    }
  }
  ```
* **Success Response (`201 Created`):**
  ```json
  {
    "message": "Product added successfully",
    "data": {
      "id": 1,
      "product_name": "Smart OLED TV 55\"",
      "price": 1200,
      "image": "https://example.com/images/tv.jpg",
      "description": "A high-definition 4K HDR OLED smart television.",
      "category": "Electronics",
      "rating": "5",
      "stock": "45",
      "specs": {
        "resolution": "4K UHD",
        "refresh_rate": "120Hz",
        "hdmi_ports": 4
      },
      "created_at": "2026-07-16T08:15:00.000Z"
    }
  }
  ```

#### 2. Get Product By ID
* **Endpoint:** `GET /api/products/:id`
* **Description:** Fetch detail of a single product using its unique database ID.
* **Path Parameter:** `id` (e.g., `http://localhost:5000/api/products/1`)
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "Product found successfully",
    "data": {
      "id": 1,
      "product_name": "Smart OLED TV 55\"",
      "price": 1200,
      "image": "https://example.com/images/tv.jpg",
      "description": "A high-definition 4K HDR OLED smart television.",
      "category": "Electronics",
      "rating": "5",
      "stock": "45",
      "specs": {
        "resolution": "4K UHD",
        "refresh_rate": "120Hz",
        "hdmi_ports": 4
      },
      "created_at": "2026-07-16T08:15:00.000Z"
    }
  }
  ```

#### 3. Update Product By ID
* **Endpoint:** `PUT /api/products/:id`
* **Description:** Edit existing product parameters.
* **Path Parameter:** `id`
* **Request Body:**
  ```json
  {
    "product_name": "Smart OLED TV 55\" - Upgraded",
    "price": 1150,
    "image": "https://example.com/images/tv-upgraded.jpg",
    "description": "Updated OLED TV specs and discount pricing.",
    "category": "Electronics",
    "rating": 5,
    "stock": "40",
    "specs": {
      "resolution": "4K UHD",
      "refresh_rate": "120Hz",
      "hdmi_ports": 4,
      "hdr": "Dolby Vision"
    }
  }
  ```
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "Product updated successfully"
  }
  ```

#### 4. Delete Product By ID
* **Endpoint:** `DELETE /api/products/:id`
* **Description:** Remove a product from the database catalog.
* **Path Parameter:** `id`
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

---

## 5. How to Commit to GitHub Safely

Security is crucial when working on collaborative public or private repositories. Follow these guidelines to prevent leaking passwords, keys, and connection strings:

### 1. Never Commit the `.env` File
Your `.env` file contains sensitive information such as database passwords and API tokens. It should **never** be pushed to GitHub.
* Ensure the `.env` file is listed inside the `.gitignore` file.
* Run the following command to double-check which files Git is tracking:
  ```bash
  git status
  ```
  If `.env` shows up under "Untracked files", make sure it is added to `.gitignore`.

### 2. Sharing Required Environment Variables
Instead of pushing your secrets, share a template file:
* Update `.env.example` when adding any new environment variables required by the project.
* Push **only** `.env.example` to the repository. Other developers can copy and configure it locally.

### 3. Check Staged Files Before Committing
Avoid committing all files blindly with `git add .`. Instead:
1. Stage specific files:
   ```bash
   git add src/routes/productsRoute.js src/controller/productController.js
   ```
2. Or if you use `git add .`, run:
   ```bash
   git diff --staged
   ```
   to inspect all line-by-line modifications before creating the commit.

### 4. What to Do If You Accidentally Commit Sensitive Data
If you accidentally commit the `.env` file or hardcode credentials, do the following immediately:
1. **Remove the file from Git cache** without deleting it locally:
   ```bash
   git rm --cached .env
   ```
2. Commit and push the fix:
   ```bash
   git commit -m "Remove .env from tracked files"
   git push origin main
   ```
3. **Change your database credentials immediately.** Simply deleting a file in a new commit does not erase it from Git's history; anyone can check out previous commits to see your leaked secrets. If you pushed to a public repository, reset your passwords and generate a new connection string on Neon.

NOTE: bro i don try abeg this thing took alot of time to simplify