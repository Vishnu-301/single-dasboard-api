# single-dasboard-api

a signle dashboard api for electronics and home appliances for shopkeeper 
not for customers
 
 # product format
 ```json
  {
    "name": "LG Smart TV 55\" 4K UHD",
    "price": 320000,
    "img": ["/images/lg-tv.jpg"],
    "description": "LG Smart TV with 4K UHD resolution, HDR support, and smart streaming apps for an immersive viewing experience.",
    "category": "Televisions",
    "rating": 4.7,
    "stock": "In Stock",
    "specs": {
      "screenSize": "55\"",
      "resolution": "4K UHD",
      "smartTV": "Yes",
      "features": "HDR / WebOS / Voice Control"
    }
  }
  ```

  # details for product
  product_name
  price
  image
  description
  category
  rating
  stock
  specs : various product specifications
  created_at

  # database for products
  ```sql
  CREATE TABLE products (
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
  ```

  # admin format
  ```json
  {
    "username": "admin",
    "password": "password",
    "email": "[EMAIL_ADDRESS]",
    "role": "admin"
  }
  ```

  # UPDATES
- all tasks completed

# SETUP ON LOCAL MECHINE
- Clone repo to ur mechine
  ```bash
  git clone https://github.com/Vishnu-301/single-dasboard-api.git
  ```

- open file on your machine and install dependencies
  ```bash
  cd single-dasboard-api
  npm install
  ```

- create a databse in neon and add ur db url to .env file
  ```bash
  DATABASE_URL=ur_supabase_db_url
  ```

- run the server
  ```bash
  npm run dev
  ```
NOTE: THIS PROJECT WAS RAN LOCALLY AND BUUILT USING POSTGRESQL DATABASE WHIECH SHOULD BE COMATIBLE WITH NEON

- properly test all endpoints and make sure they all work with your frontend before deploying

