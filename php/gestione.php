<!DOCTYPE html>
<html lang="it" dir="ltr">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="../css/management_style.css">
        <title>Area Gestione</title>
    </head>
    <body>
        <h1>Benvenuto nell'area Management. Noi siamo il Team Totti. Noi siamo il futuro.</h1>
        <div class="request-field" v-for="request in requests">
            <h3>Nome: {{requests.name}}</h3>
            <h3>Cognome: {{requests.surname}}</h3>
            <h3>Nome Combattente: {{requests.challenger}}</h3>
            <h3>E-mail: {{requests.mail}}</h3>
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
    </body>
</html>
