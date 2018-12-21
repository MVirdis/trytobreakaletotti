function hide(){
    var blocco = document.getElementById('prenotazione_incontro');
    var pulsante_mostra = document.getElementById('prenota');
    blocco.style.visibility = "hidden";
    blocco.style.margin = "20px auto";
    pulsante_mostra.style.visibility = "visible";
    pulsante_mostra.style.height = "40px";
    blocco.style.height = "40px";
}

function show(){
    var blocco = document.getElementById('prenotazione_incontro');
    var pulsante_mostra = document.getElementById('prenota');
    blocco.style.visibility = "visible";
    blocco.style.margin = "0 auto";
    pulsante_mostra.style.visibility = "hidden";
    pulsante_mostra.style.height = "0";
    blocco.style.height = "250px";
}
