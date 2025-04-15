<?php
session_start();
include 'config.php';
include 'auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Prepare and execute query
    $stmt = $conn->prepare("SELECT id, name, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['email'] = $email;
            
            // Set remember me cookie if checked
            if (isset($_POST['remember'])) {
                $cookie_value = base64_encode($user['id'] . ':' . $email);
                setcookie('remember_me', $cookie_value, time() + (86400 * 30), "/"); // 30 days
            }
            
            echo json_encode(['success' => true, 'redirect' => 'dashboard.html']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
    
    $stmt->close();
}

$conn->close();
?>