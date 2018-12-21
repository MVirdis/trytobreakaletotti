<?php

require 'configurationDB.php';

$dbmanager = new DBManager();

class DBManager {
    private $connection = null;

    function openConnection(){
        if (!$this->isOpened()){
            global $host;
            global $username;
            global $password;
            global $dbName;

            $this->connection = new mysqli($host, $username, $password);
            if ($this->connection->connect_error)
            die('Errore di connessione (' . $this->connection->connect_errno . ') ' . $this->connection->connect_error);
            $this->connection->select_db($dbName) or
            die ('Non posso usare il database selezionato: ' . mysqli_error());
        }
    }

    // Controlla se la connessione è aperta
    function isOpened(){
        return ($this->connection != null);
    }

    // Esegue una query e ritorna l'oggetto result
    function performQuery($queryText) {
        if (!$this->isOpened())
            $this->openConnection();
        return $this->connection->query($queryText);
    }

    // Filtra gli input protezione contro sqlinjection
    function sqlInjectionFilter($parameter){
        if(!$this->isOpened())
        $this->openConnection();

        if ($parameter == null)
        return null;

        return $this->connection->real_escape_string($parameter);
    }

    // Chiude la connessione con il database
    function closeConnection(){
        if($this->connection !== null)
        $this->connection->close();
        $this->connection = null;
    }
}

?>
