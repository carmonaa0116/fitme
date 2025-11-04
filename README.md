FitMe
Project Overview
FitMe is a web application designed to help users manage their fitness routines, track progress, and discover new exercises. This project combines a frontend built with Astro, a backend powered by PHP, and a MySQL database to provide a comprehensive fitness management experience.

Key Features & Benefits
Exercise Management: Add, edit, and delete exercises with detailed information.
Routine Creation: Build custom workout routines tailored to specific goals.
User Authentication: Secure user accounts with Firebase authentication.
Progress Tracking: Monitor workout history and visualize progress.
Responsive Design: Accessible and usable on various devices.
Prerequisites & Dependencies
Before you begin, ensure you have the following installed:

Node.js: (v18 or higher recommended) - Required for running Astro and managing frontend dependencies.
npm: (or yarn) - Package manager for JavaScript dependencies.
XAMPP: (or similar PHP environment) - Needed to run the PHP backend.
MySQL: - Database server for storing workout data.
Frontend Dependencies:

astro
cors
dotenv
driver.js
express
firebase
gsap
puter
socket.io
Backend Dependencies:

PHP
Installation & Setup Instructions
Follow these steps to get FitMe up and running:

Clone the repository:

git clone git@github.com:carmonaa0116/fitme.git
cd fitme
Install Frontend Dependencies:

npm install
Configure Firebase:

Create a Firebase project in the Firebase Console (https://console.firebase.google.com/).

Obtain your Firebase configuration details.

Update the src/firebase.js file with your Firebase configuration:

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
Setup PHP Backend:

Copy the php + bbdd (copias) directory to your XAMPP htdocs folder (or equivalent for your PHP environment).

Create a MySQL database.

Update the database connection details in php + bbdd (copias)/conexion.php with your MySQL credentials:

<?php
$servername = "localhost";
$username = "YOUR_USERNAME";
$password = "YOUR_PASSWORD";
$dbname = "YOUR_DATABASE_NAME";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
Start Development Servers:

Start the Astro frontend development server:

npm run dev
Start the XAMPP (or your PHP environment) to run the PHP backend. Ensure the Apache server and MySQL database are running.

Access the Application:

Open your web browser and navigate to http://localhost:4321 to access the FitMe frontend.
Usage Examples & API Documentation
Frontend (Astro)
The frontend utilizes Astro components for building the user interface. The src/js/api/apiEjercicios.js file provides example API calls to the PHP backend:

import { getDatosSesion } from './auth'; // Example for handling session data

export async function insertarEjercicios(formData) {
  try {
    const musculos = formData.getAll("musculos[]");
    formData.delete("musculos[]");
    formData.append("musculos", JSON.stringify(musculos));
    // ... rest of the code
  } catch (error) {
    console.error("Error inserting exercise:", error);
  }
}
Backend (PHP)
The PHP files in the php + bbdd (copias) directory handle database interactions and API endpoints. For example, insertarEjercicio.php handles inserting new exercises into the database. Accessing the backend requires sending HTTP requests to the corresponding PHP files hosted on the XAMPP server. For example: http://localhost/php-fitme/insertarEjercicio.php

Configuration Options
Environment Variables: You can use environment variables to configure API keys, database credentials, and other sensitive information. Create a .env file in the root directory of the project and define your variables:

DATABASE_URL=mysql://user:password@host:port/database
Then, load these variables in your JavaScript and PHP code using dotenv.

Firebase Configuration: Ensure your Firebase configuration is correctly set in src/firebase.js.

Contributing Guidelines
We welcome contributions to FitMe! To contribute, please follow these guidelines:

Fork the repository.
Create a new branch for your feature or bug fix.
Implement your changes and write tests if applicable.
Submit a pull request with a clear description of your changes.
License Information
This project is open-source. License not specified.

Acknowledgments
Astro
Firebase
XAMPP
GSAP
Driver.js
