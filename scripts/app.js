/*
** This script contains functions and objects which can be used in all those
** files that can link to this script (e.g. index.html).
** Exposed Objects are:
**  - matches: an array of match objects that contain the following properties:
**      * challenger: the name of the one who dares to challende Ale Totti
**      * date: the simple date in the format "yyyy-mm-dd"
**      * time: the hour of the match
**      * place: where it will be(or has been) disputed
**      To use this data (for example in index.html) iterate over the matches
**      array from an element with id match_container (IMPORTANT), for example:
**      <div id="match_container">
**          <div v-for="match in matches">
**            <h2>The challenger is: {{ match.challenger }}</h2>
**          </div>
**      </div>
**      Use this syntax to put a placeholder for values: {{ variable }}.
*/
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
        matches: []
    }
});

(function() { // On start fetch upcoming challenges
    postRequestSettings.body = 'action=get&target=challenge&upcoming=true';
    fetch("/php/request-handler.php", postRequestSettings).then(
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
    fetch("/php/request-handler.php", postRequestSettings).then(
    function(response) {
        console.log(response.json());
        hide();
        pulsantePrenota.innerHTML = "Richiesta inviata";
        pulsantePrenota.disabled = true;
        correctFormFlag = false;
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
