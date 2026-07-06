# Backend System Requirements

## Overview

Build the backend for an electronics and home appliances e-commerce website. Customers do **not** have accounts or log in. Only administrators have access to the dashboard.

The backend should expose REST APIs that power both the public website and the admin dashboard.

---

## Admin Authentication

Implement secure admin authentication using JWT.

Features:

* Admin login
* Password hashing with bcrypt
* Protected admin routes
* Session/token validation
* Logout

No customer authentication is required.

---

## Product Management

The admin should be able to:

* Add new products
* Edit products
* Delete products
* Upload one or multiple product images
* Set product name
* Set description
* Set price
* Assign category
* Assign brand
* Set stock quantity
* Set availability status
* Mark/unmark products as Trending
* Set discount (optional for future expansion)

Each product should contain:

* Name
* Description
* Price
* Brand
* Category
* Images
* Quantity
* Availability Status
* Trending Status
* Date Created
* Last Updated

---

## Inventory Management

The backend should function as a digital inventory system.

Admin can:

* Increase stock
* Reduce stock
* Update stock quantity
* Mark product as Out of Stock
* View current inventory

Rules:

* If quantity > 0 → Product is Available.
* If quantity = 0 → Automatically change status to Out of Stock.
* Stock updates should immediately reflect on the frontend.

Example:

Quantity:
5

After recording one sale:

Quantity:
4

If quantity reaches zero:

Status:
Out of Stock

---

## Categories Management

Create CRUD APIs for categories.

Examples:

* Air Conditioners
* Televisions
* Refrigerators
* Freezers
* Washing Machines
* Gas Cookers
* Kitchen Appliances
* Home Electronics

Products belong to one category.

---

## Brand Management

Create CRUD APIs for brands.

Examples:

* Panasonic
* Midea
* Aeon
* Bruhm
* Kenstar
* Gramstar

Products belong to one brand.

---

## Trending Products

Admin should be able to:

* Add product to Trending
* Remove from Trending
* Change display order (optional)

Homepage should automatically fetch only products marked as Trending.

---

## Dashboard Analytics

Create endpoints that return:

* Total Products
* Available Products
* Out of Stock Products
* Low Stock Products
* Trending Products Count
* Total Categories
* Total Brands

Low stock threshold should be configurable (example: below 5).

---

## Public APIs

Customers should be able to:

* Get all products
* Get single product
* Search products
* Filter by category
* Filter by brand
* View Trending products
* View only available products

No login required.

---

## Automatic Synchronization

Every admin action should automatically update the public website.

Examples:

* New product appears instantly.
* Edited product updates instantly.
* Deleted product disappears.
* Stock quantity updates immediately.
* Trending products update automatically.

The frontend should never require manual changes after admin updates.

---

## Database Collections

### Admin

* id
* username
* email
* password
* role
* createdAt

### Products

* id
* name
* description
* price
* categoryId
* brandId
* images
* quantity
* status
* trending
* createdAt
* updatedAt

### Categories

* id
* name
* createdAt

### Brands

* id
* name
* createdAt

---

## File Upload

Support image uploads using:

* Cloudinary (preferred)

or

* Local storage

Store image URLs in the database.

---

## API Requirements

Create REST APIs for:

Authentication

* POST /login

Products

* GET products
* GET product by ID
* POST product
* PUT product
* DELETE product

Categories

* GET
* POST
* PUT
* DELETE

Brands

* GET
* POST
* PUT
* DELETE

Trending

* GET trending
* Update trending status

Dashboard

* Analytics endpoint
* Inventory statistics endpoint

---

## Expected Behavior

The admin dashboard is the single source of truth.

Any change made by the admin—including adding, editing, deleting products, updating stock, or marking products as trending—must be immediately reflected on the public website without requiring manual updates.

Customers should always see the latest products, accurate prices, correct stock quantities, and current availability.