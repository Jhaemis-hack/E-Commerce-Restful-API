
---

# E-Commerce Restful API

A robust and scalable RESTful API for managing an e-commerce platform. This API supports features such as user authentication, product management, order processing, and more. Built using Node.js, Express, and MongoDB, it follows modern development practices for maintainability and performance.

---

## Features

- **User Management**:
  - User registration and login with JWT-based authentication.
  - Role-based access control (e.g., admin and customer roles).

- **Product Management**:
  - CRUD operations for products.
  - Product categorization and filtering.

- **Order Management**:
  - Create, update, and view orders.
  - Track order status.

- **Cart System**:
  - Add, remove, and update cart items.
  - Persistent carts for logged-in users.

- **Secure Payments**:
  - Integration with payment gateways (e.g., Stripe, PayPal).

- **Admin Dashboard**:
  - Manage users, products, and orders.


---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Middleware**: Express middleware for validation, error handling, and logging
- **Others**: 
  - `bcryptjs` for password hashing.
  - `morgan` for logging.
  - `dotenv` for environment variable management.

---

## Installation

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Jhaemis-hack/E-Commerce-Restful-API.git
   cd E-Commerce-Restful-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/ecommerce
     JWT_SECRET=your_secret_key
     ```

4. Start the server:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:3000`.

---

## API Endpoints

### **Authentication**
| Method | Endpoint          | Description           |
|--------|--------------------|-----------------------|
| POST   | `/auth/register`   | Register a new user.  |
| POST   | `/auth/login`      | Log in and get a token.|

### **Products**
| Method | Endpoint         | Description               |
|--------|-------------------|---------------------------|
| GET    | `/products`       | Get all products.         |
| POST   | `/products`       | Add a new product (admin).|
| PUT    | `/products/:id`   | Update product details.   |
| DELETE | `/products/:id`   | Delete a product (admin). |

### **User mangement**
| Method | Endpoint            | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/user`              | View cart items.             |
| POST   | `/user/add`          | Add a product to the cart.   |
| PUT    | `/user/:id`          | Update cart item quantity.   |
| DELETE | `/user/:id`          | Remove an item from the cart.|

### **Orders**
| Method | Endpoint          | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/orders`          | View all orders (admin only). |
| POST   | `/orders`          | Create a new order.           |
| PUT    | `/orders/:id`      | Update order status (admin).  |

---

## Folder Structure

```
E-Commerce-Restful-API/
├── models/             # MongoDB schemas for users, products, orders, etc.
├── routes/             # API route definitions
├── controllers/        # Controller logic for handling requests
├── middleware/         # Custom middleware (e.g., authentication, validation)
├── config/             # Database and environment configuration
├── .env                # Environment variables
├── package.json        # Dependency management
└── app.js           # Main server entry point
```

---

## Testing

1. Run tests (if implemented):
   ```bash
   npm test
   ```

2. Use tools like Postman or Thunder Client to test endpoints manually.

---

## Contribution

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


