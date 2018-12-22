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

document.getElementById("invia_richiesta").addEventListener("click", function(){
    postRequestSettings.body = "action=set&target=request&name="+nome+
        "&challenger="+nomeCombattente+"&surname="+cognome+"&mail="+mail;
    fetch("/php/request-handler.php", postRequestSettings).then(
    function(response) {
        console.log(response.json());
        hide();
        pulsantePrenota.innerHTML = "Richiesta inviata";
        pulsantePrenota.disabled = true;
        // TODO: set here style of pulsantePrenota when disabled
    });
});
