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

var divScomparsa = document.getElementById('whoistotti');
var divTotti = document.getElementById('container_ale');
var tottiButton = document.getElementById('ancora')
var visibile = 1;
var testoTotti = document.getElementById('tottiText');

function showHideText(){
    if (visibile == 0) {
        divScomparsa.style.width = "0%";
        divTotti.style.width = "100%";
        visibile = 1;
        testoTotti.style.opacity = 0;
        tottiButton.innerHTML = "Chi è AleTotti?";
    }
    else if (visibile == 1) {
        divScomparsa.style.width = "50%";
        divTotti.style.width = "50%";
        visibile = 0;
        testoTotti.style.opacity = 0.9;
        tottiButton.innerHTML = "Chiudi";
    }
}
