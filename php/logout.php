<?php
include 'auth.php';

session_destroy();
header('Location: ../index.html');
exit;
?>