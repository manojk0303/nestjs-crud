# NESTjs CRUD API Documentation

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
   - [Users](#users)
   - [WalletAddress](#walletaddress)
3. [Data Validation](#data-validation)
4. [Error Handling](#error-handling)

## Setup Instructions

### Database Setup

1. Ensure PostgreSQL is installed and running on your system.
2. Create a new PostgreSQL database:

   ```bash
   createdb crud_nest
   ```

3. Connect to the database and create the tables:

   ```sql
   \c crud_nest

   CREATE TABLE "user" (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE wallet_address (
       id SERIAL PRIMARY KEY,
       address VARCHAR(255) NOT NULL,
       "userId" INTEGER NOT NULL,
       FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
   );
   ```

### NESTjs Application

1. Clone the repository or create a new NESTjs project.
2. Install the necessary dependencies:

   ```bash
   npm install @nestjs/typeorm typeorm pg @nestjs/common @nestjs/core @nestjs/cli
   ```

3. Configure the database connection in `src/app.module.ts`:

   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { UsersModule } from './users/users.module';
   import { WalletAddressModule } from './wallet-address/wallet-address.module';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'your_db_user',
         password: 'your_db_password',
         database: 'crud_nest',
         autoLoadEntities: true,
         synchronize: true,
       }),
       UsersModule,
       WalletAddressModule,
     ],
   })
   export class AppModule {}
   ```

4. Implement the Users and WalletAddress modules, controllers, and services as described in the provided code snippets.
5. Start the application:

   ```bash
   npm run start
   ```

## API Endpoints

### Users

- **Create User**
  - **Endpoint:** `POST /users`
  - **Request Body:**

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

  - **Response:**
    - `201 Created`: User created successfully
    - `400 Bad Request`: Validation error

- **Get All Users**
  - **Endpoint:** `GET /users`
  - **Response:**
    - `200 OK`: List of all users

- **Get User by ID**
  - **Endpoint:** `GET /users/:id`
  - **Response:**
    - `200 OK`: User details
    - `404 Not Found`: User not found

- **Update User**
  - **Endpoint:** `PUT /users/:id`
  - **Request Body:**

    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```

  - **Response:**
    - `200 OK`: User updated successfully
    - `404 Not Found`: User not found
    - `400 Bad Request`: Validation error

- **Delete User**
  - **Endpoint:** `DELETE /users/:id`
  - **Response:**
    - `204 No Content`: User deleted successfully
    - `404 Not Found`: User not found

### WalletAddress

- **Create Wallet Address**
  - **Endpoint:** `POST /wallets`
  - **Request Body:**

    ```json
    {
      "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "userId": 1
    }
    ```

  - **Response:**
    - `201 Created`: Wallet address created successfully
    - `404 Not Found`: User not found
    - `400 Bad Request`: Validation error

- **Get All Wallet Addresses**
  - **Endpoint:** `GET /wallets`
  - **Response:**
    - `200 OK`: List of all wallet addresses

- **Get Wallet Address by ID**
  - **Endpoint:** `GET /wallets/:id`
  - **Response:**
    - `200 OK`: Wallet address details
    - `404 Not Found`: Wallet address not found

- **Update Wallet Address**
  - **Endpoint:** `PUT /wallets/:id`
  - **Request Body:**

    ```json
    {
      "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "userId": 1
    }
    ```

  - **Response:**
    - `200 OK`: Wallet address updated successfully
    - `404 Not Found`: Wallet address not found
    - `400 Bad Request`: Validation error

- **Delete Wallet Address**
  - **Endpoint:** `DELETE /wallets/:id`
  - **Response:**
    - `204 No Content`: Wallet address deleted successfully
    - `404 Not Found`: Wallet address not found

## Data Validation

Ensure that all input data conforms to the expected formats and constraints. Use class-validator to add validation decorators in DTOs:

```typescript
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
```

## Error Handling

Provide meaningful error messages and handle common errors like validation errors, not found errors, and database connection errors.

- **Validation Errors:** Return `400 Bad Request` with error details.
- **Not Found Errors:** Return `404 Not Found` with an appropriate message.
- **Database Errors:** Return `500 Internal Server Error` with a general error message.

### Example Error Response

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "name should not be empty"],
  "error": "Bad Request"
}
```
