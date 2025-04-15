<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'smartpark');

// Create database connection
function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Helper function to execute queries
function executeQuery($sql, $params = []) {
    $conn = connectDB();
    $stmt = $conn->prepare($sql);
    
    if ($params) {
        $types = str_repeat('s', count($params));
        $stmt->bind_param($types, ...$params);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $stmt->close();
    $conn->close();
    
    return $result;
}

// Helper function for single row queries
function fetchOne($sql, $params = []) {
    $result = executeQuery($sql, $params);
    return $result->fetch_assoc();
}

// Helper function for multiple row queries
function fetchAll($sql, $params = []) {
    $result = executeQuery($sql, $params);
    return $result->fetch_all(MYSQLI_ASSOC);
}
