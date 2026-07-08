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