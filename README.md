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