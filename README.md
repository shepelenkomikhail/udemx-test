# Car Rental Application

A modern and responsive car rental application built with React. This project allows users to browse, search, and book cars for specific date ranges. It also includes a secure admin panel for managing the car inventory and viewing customer bookings.

## ✨ Features

### 👤 Public Interface
- **Date-Based Search**: Select a `from` and `to` date using a date range picker to find available cars.
- **Car Listings**: View a dynamic list of available cars with images, key details, and daily rental rates.
- **Detailed View**: Click on any car to see more details and access the reservation form.
- **Seamless Booking**: A user-friendly booking form with fields for name, email, address, and phone number.
- **Dynamic Cost Calculation**: The total booking cost is automatically calculated based on the number of rental days.
- **Robust Form Validation**: Client-side validation powered by Formik and Yup ensures data integrity.

### 🔐 Admin Panel (`/admin`)
- **Admin Login**: A dedicated login page for administrators.
- **Booking Overview**: View all customer bookings in a clear, organized list.
- **Car Inventory Management**:
  - **Add New Cars**: Easily add new vehicles to the fleet.
  - **Edit Existing Cars**: Update details for any car in the inventory.

## 🛠️ Tech Stack

- **Core Framework**: React
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **Form Management**: Formik
- **Schema Validation**: Yup
- **Mock Backend**: JSON Server

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
