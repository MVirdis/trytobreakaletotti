var blocco = document.getElementById('prenotazione_incontro');
var pulsante_mostra = document.getElementById('prenota');

var nome_combattente = document.getElementById('nome_combattente');
var nome = document.getElementById('nome');
var cognome = document.getElementById('cognome');
var mail = document.getElementById('mail');

var request_fields = [nome_combattente, nome, cognome, mail];

function hide() {
    blocco.style.visibility = "hidden";
    blocco.style.margin = "20px auto";
    pulsante_mostra.style.visibility = "visible";
    pulsante_mostra.style.height = "40px";
    blocco.style.height = "40px";
    request_fields.forEach(function(field) { // Resets all input fields
        field.value = "";
    });
}

function show() {
    blocco.style.visibility = "visible";
    blocco.style.margin = "0 auto";
    pulsante_mostra.style.visibility = "hidden";
    pulsante_mostra.style.height = "0";
    blocco.style.height = "250px";
}
