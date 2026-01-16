# Spring Boot React Product Management Application

## Project Overview
This project is a Spring Boot and React based application for managing products. It provides a user-friendly interface to manage product listings, including creating, updating, and deleting products.

## Entity Models
### Product
- **id**: Long - Unique identifier for the product
- **name**: String - Name of the product
- **description**: String - Description of the product
- **price**: BigDecimal - Price of the product
- **quantity**: Integer - Available quantity of the product

### User
- **id**: Long - Unique identifier for the user
- **username**: String - User's username
- **password**: String - User's password
- **role**: String - Role of the user (e.g., ADMIN, USER)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/VelkaressiaBlutkrone/spring-react-product-mng.git
   cd spring-react-product-mng
   ```

2. Install dependencies:
   For the Spring Boot backend:
   ```bash
   cd backend
   ./mvnw install
   ```
   For the React frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Run the application:
   - Start the Spring Boot application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   - Start the React application:
   ```bash
   cd frontend
   npm start
   ```

## API Documentation
### Base URL
```
http://localhost:8080/api
```

### Endpoints
#### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.

#### Create a New Product
- **URL**: `/products`
- **Method**: `POST`
- **Description**: Creates a new product.
- **Request Body**:
  ```json
  {
      "name": "Product Name",
      "description": "Product Description",
      "price": 19.99,
      "quantity": 100
  }
  ```

#### Update a Product
- **URL**: `/products/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing product.
- **Request Body**: Same as create.

#### Delete a Product
- **URL**: `/products/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a product by ID.

### Authentication
Basic authentication is used for securing endpoints. Use the usernames and passwords defined in your database settings to authenticate requests.