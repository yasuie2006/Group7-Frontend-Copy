# Activity 7: ReactJS Events, State & API Integration

## Project Description
A Product Management application developed using ReactJS and Laravel REST API. This project demonstrates React events, state management, Axios API integration, and CRUD operations.

## Technologies Used
- ReactJS
- Vite
- Material UI (MUI)
- Axios
- Laravel
- MySQL
- PHP

## Features
- Display products from the API
- Add new products
- Edit product information
- Delete products
- Upload and update product images
- Image preview
- Form validation
- Loading indicator
- Empty state message
- Success notifications
- API error handling

## Project Setup

### Backend (Laravel)

1. Open the Laravel backend folder.
2. Start MySQL using XAMPP.
3. Run:

   ```bash
   php artisan migrate
   php artisan storage:link
   php artisan serve
   ```

### Frontend (React + Vite)

1. Open the frontend folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Function |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products/{id} | Get a product |
| POST | /api/products | Create a product |
| PUT/PATCH | /api/products/{id} | Update a product |
| DELETE | /api/products/{id} | Delete a product |

## Testing Results
All CRUD operations were tested successfully:
- Create Product
- Read Products
- Update Product
- Delete Product
- Upload and update product images

## Project Status
Completed and functional.