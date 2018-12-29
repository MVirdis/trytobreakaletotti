/*
** This script contains functions and objects which can be used in all those
** files that can link to this script (e.g. index.html).
** Exposed Objects are:
**  - matches: an array of match objects that contain the following properties:
**      * challenger: the name of the one who dares to challende Ale Totti
**      * date: the simple date in the format "yyyy-mm-dd"
**      * time: the hour of the match
**      * place: where it will be(or has been) disputed
**      * result: it equals null if the match is to be disputed or a constant
**          value (see below the constants) to indicate match result
**      To use this data (for example in index.html) iterate over the matches
**      array from an element with id match_container (IMPORTANT), for example:
**      <div id="match_container">
**          <div v-for="match in matches">
**            <h2>The challenger is: {{ match.challenger }}</h2>
**          </div>
**      </div>
**      Use this syntax to put a placeholder for values: {{ variable }}.
*/
const ALEWIN = 1;
const DRAW = 0;
const CHALLENGERWIN = 2;
const REQUESTURL = "/php/request-handler.php";

var postRequestSettings = {
    mode: 'no-cors',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const matches = new Vue({
    el: "#match_container",
    data: {
        matches: [],
        ALEWIN: 1,
        DRAW: 0,
        CHALLENGERWIN: 2
    }
});

(function() { // On start fetch upcoming challenges
    postRequestSettings.body = 'action=get&target=challenge&upcoming=true';
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        response.json().then(function(obj) {
            console.log(obj);
            matches.matches = obj.data;
        });
    });
})();

var correctFormFlag = false;
function formCheck() {
    correctFormFlag = true;
    if (!(/^\s*[A-Za-z\s]+\s*$/.test(nome.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il nome dev'essere composto di sole "+
            "lettere";
    }
    if (!(/^\s*[A-Za-z\s]+\s*$/.test(cognome.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il cognome dev'essere composto di sole "+
            "lettere";
    }
    if (!(/^\s*[A-Za-z\s]+[A-Za-z0-9_-\s]*\s*$/.test(nomeCombattente.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: il nome da combattente deve iniziare "+
            "con una lettera e può contenere lettere, numeri, _ -";
    }
    if (!(/^\s*[A-Za-z\.0-9_-]+@[a-z\.]+\s*$/.test(mail.value))) {
        correctFormFlag = false;
        errorText.innerHTML = "Errore: l'email non è in un formato valido";
    }
    requestFields.forEach(function(element){
        if (/^\s*$/.test(element.value)) {
            correctFormFlag = false;
            errorText.innerHTML = "Errore: il campo "+element.getAttribute('id')+
                " è vuoto";
        }
    });
}

function sendForm() {
    postRequestSettings.body = "action=set&target=request&name="+nome.value+
        "&challenger="+nomeCombattente.value+"&surname="+cognome.value+
        "&mail="+mail.value;
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        console.log(response.json());
        hide();
        pulsantePrenota.innerHTML = "Richiesta inviata";
        pulsantePrenota.disabled = true;
        correctFormFlag = false;
    }).finally(function() {
        errorText.style.visibility = "hidden";
    });
}

document.getElementById("invia_richiesta").addEventListener("click", function(){
    formCheck();
    if (correctFormFlag)
        sendForm();
    else
        errorText.style.visibility = "visible";
});

var showingPastMatches = false;
document.getElementById("past_matches_button").addEventListener("click",function(){
    postRequestSettings.body = 'action=get&target=challenge&upcoming=' +
        (showingPastMatches ? 'true' : 'false');
    fetch(REQUESTURL, postRequestSettings).then(
    function(response) {
        response.json().then(function(obj) {
            console.log(obj);
            matches.matches = obj.data;
        });
    });
    document.getElementById("past_matches_label").innerHTML =
        (showingPastMatches ? "Mostra " : "Nascondi ") + "incontri passati";
    showingPastMatches = !showingPastMatches;
});
