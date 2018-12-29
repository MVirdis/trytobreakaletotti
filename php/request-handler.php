<?php

    require './db-manager.php';
    require './response.php';

    $response = new Response();

    function send() {
        global $response;
        echo json_encode($response);
        exit;
    }

    if (!isset($_POST['action']) || !isset($_POST['target'])) { // (1)
        $response->message = "Error: missing action or target";
        send();
    }

    $dbmanager->openConnection();
    if ($_POST['action'] == 'set' && $_POST['target'] == 'request') {
        if (!isset($_POST['challenger']) || !isset($_POST['name']) ||
            !isset($_POST['surname']) || !isset($_POST['mail'])) {
            $response->message = "Error: missing one of mandatory parameters ".
                    "for setting a request [challenger, name, surname, mail]";
            send();
        }
        $safe_challenger = $dbmanager->sqlInjectionFilter($_POST['challenger']);
        $safe_name = $dbmanager->sqlInjectionFilter($_POST['name']);
        $safe_surname = $dbmanager->sqlInjectionFilter($_POST['surname']);
        $safe_mail = $dbmanager->sqlInjectionFilter($_POST['mail']);
        $query = <<<EOT
        INSERT INTO request(name, surname, nickname, email)
        VALUES ("$safe_name", "$safe_surname", "$safe_challenger", "$safe_mail");
EOT;
        $result = $dbmanager->performQuery($query);
        if (!$result)
            $response->message = "Error while performing query";
        else {
            $response->responseCode = 0;
            $response->message = "Successfully executed SET on request";
        }
        $dbmanager->closeConnection();
        send();
    }

    if ($_POST['action'] == 'get' && $_POST['target'] == 'challenge') {
        if (!isset($_POST['upcoming'])) {
            $response->message = "Error: missing upcoming parameter.";
            send();
        }
        $cmp = "";
        if ($_POST['upcoming'] == 'true')
            $query = <<<EOT
            SELECT *
            FROM challenge C
            WHERE C.date > CURRENT_DATE OR
                (C.date = CURRENT_DATE AND C.time >= CURRENT_TIME)
            ORDER BY C.date DESC, C.time DESC;
EOT;
        else
            $query = <<<EOT
            SELECT *
            FROM challenge C
            ORDER BY C.date DESC, C.time DESC;
EOT;
        $result = $dbmanager->performQuery($query);
        $dbmanager->closeConnection();
        $response->responseCode = 1;
        $response->message = "Successfully retrieved data";
        $i = 0;
		while($row = $result->fetch_assoc()) {
			$response->data[$i] = $row;
			$i = $i+1;
		}
        send();
    }

/*
(1): If the type parameter of the POST request is not specified return a default
     response (an error)
*/
?>
