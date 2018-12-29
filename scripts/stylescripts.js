var blocco = document.getElementById('prenotazione_incontro');
var pulsantePrenota = document.getElementById('prenota');

var nomeCombattente = document.getElementById('nome_combattente');
var nome = document.getElementById('nome');
var cognome = document.getElementById('cognome');
var mail = document.getElementById('mail');
var bloccoAnimato = document.getElementById('animazione');

var requestFields = [nomeCombattente, nome, cognome, mail];

var errorText = document.getElementById('request_error_text');

function hide() {
    blocco.style.visibility = "hidden";
    blocco.style.margin = "20px auto";
    pulsantePrenota.style.visibility = "visible";
    pulsantePrenota.style.height = "40px";
    blocco.style.height = "40px";
    errorText.style.visibility = "hidden";
    requestFields.forEach(function(field) { // Resets all input fields
        field.value = "";
    });
    animazione.setAttribute('class', '');
}

function show() {
    blocco.style.visibility = "visible";
    blocco.style.margin = "0 auto";
    pulsantePrenota.style.visibility = "hidden";
    pulsantePrenota.style.height = "0";
    blocco.style.height = "250px";
    animazione.setAttribute('class', 'animated fadeIn');
}
