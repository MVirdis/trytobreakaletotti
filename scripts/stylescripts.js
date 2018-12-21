var blocco = document.getElementById('prenotazione_incontro');
var pulsanteMostra = document.getElementById('prenota');

var nomeCombattente = document.getElementById('nome_combattente');
var nome = document.getElementById('nome');
var cognome = document.getElementById('cognome');
var mail = document.getElementById('mail');

var requestFields = [nomeCombattente, nome, cognome, mail];

function hide() {
    blocco.style.visibility = "hidden";
    blocco.style.margin = "20px auto";
    pulsanteMostra.style.visibility = "visible";
    pulsanteMostra.style.height = "40px";
    blocco.style.height = "40px";
    requestFields.forEach(function(field) { // Resets all input fields
        field.value = "";
    });
}

function show() {
    blocco.style.visibility = "visible";
    blocco.style.margin = "0 auto";
    pulsanteMostra.style.visibility = "hidden";
    pulsanteMostra.style.height = "0";
    blocco.style.height = "250px";
}
