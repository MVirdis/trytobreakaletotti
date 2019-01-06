<?php
    include 'db-manager.php';
    if (!isset($_POST) || !isset($_POST['username']) || !isset($_POST['password'])) {
        header('location: ./../login.html');
        exit;
    }

    if (!isset($_SESSION))
        session_start();

    $dbmanager->openConnection();
    $username = $dbmanager->sqlInjectionFilter($_POST['username']);
    $password = hash('sha256', $_POST['password']);
    $query = <<<EOT
        SELECT *
        FROM user U
        WHERE U.username="$username" AND U.password="$password"
EOT;
    $res = $dbmanager->performQuery($query);
    $dbmanager->closeConnection();

    if ($res->num_rows) {
        $row = $res->fetch_assoc();
        $_SESSION['userID'] = $row['id'];
        header('location: ./gestione.php');
        exit;
    } else {
        header('location: ./../login.html');
        exit;
    }
?>
