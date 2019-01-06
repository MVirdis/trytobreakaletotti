<?php
    if (!isset($_SESSION))
        session_start();
    if (!isset($_SESSION['userID'])) {
        header('location: ./../login.html');
        exit;
    }

    include "./db-manager.php";

    $dbmanager->openConnection();
    $query = <<<EOT
        SELECT *
        FROM request;
EOT;
    $res = $dbmanager->performQuery($query);
    $dbmanager->closeConnection();
?>
<!DOCTYPE html>
<html lang="it" dir="ltr">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="../css/management_style.css">
        <title>Area Gestione</title>
    </head>
    <body>
        <h1>Benvenuto nell'area Management. Noi siamo il Team Totti. Noi siamo il futuro.</h1>
        <?php
            if ($res->num_rows) {
                $tot = $res->num_rows;
                for ($i = 0; $i < $tot; $i++) {
                    $row = $res->fetch_assoc();
        ?>
                    <div class="request-field" v-for="request in requests">
                        <h3>Nome: <?php echo $row['name']; ?></h3>
                        <h3>Cognome: <?php echo $row['surname']; ?></h3>
                        <h3>Nome Combattente: <?php echo $row['nickname']; ?></h3>
                        <h3>E-mail: <?php echo $row['email']; ?></h3>
                        <form>
                            <label>Luogo:</label>
                            <input id="luogo" type="text" name="luogo">
                            <br>
                            <br>
                            <label>Data:</label>
                            <input id="data-match" type="text" name="data">
                            <br>
                            <br>
                            <label>Ora:</label>
                            <input id="orario" type="text" name="ora">
                            <br>
                            <br>
                            <button type="submit" name="insert-button">Inserisci</button>
                            <button name="delete-button">Annulla</button>
                        </form>
                    </div>
        <?php
                }
            } else {
        ?>
                <h2>Non ci sono richieste al momento!</h2>
        <?php
            }
        ?>
    </body>
</html>
