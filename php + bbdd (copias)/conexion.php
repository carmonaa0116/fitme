<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fitme";

try {
   $conn = new mysqli($servername, $username, $password, $dbname);
} catch (mysqli_sql_exception $e) {
    die("Error de conexión: " . $e->getMessage());
}